import { Injectable, Logger } from '@nestjs/common';
import { MediaVisibility } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { PaginationQueryDto } from '../../../common/dto';
import { CreateFolderDto, FolderResponseDto, MoveFolderDto, UpdateFolderDto } from './dto';
import { FoldersRepository } from './folders.repository';

@Injectable()
export class FoldersService {
  private readonly logger = new Logger(FoldersService.name);

  constructor(private readonly repository: FoldersRepository) {}

  async create(dto: CreateFolderDto, userId: string) {
    const slug = this.slugify(dto.name);

    if (dto.parentId) {
      const parent = await this.repository.findById(dto.parentId);
      if (!parent) throw new EntityNotFoundException('MediaFolder', dto.parentId);
    }

    const existing = await this.repository.findByParentAndSlug(dto.parentId ?? null, slug);
    if (existing) throw new EntityConflictException('MediaFolder', 'name');

    let path: string;
    let depth: number;

    if (dto.parentId) {
      const parent = await this.repository.findById(dto.parentId);
      path = `${parent!.path}/${slug}`;
      depth = parent!.depth + 1;
    } else {
      path = `/${slug}`;
      depth = 0;
    }

    const folderCode = await this.generateCode();

    const folder = await this.repository.create({
      folderCode,
      name: dto.name,
      slug,
      parentId: dto.parentId ?? null,
      path,
      depth,
      sortOrder: dto.sortOrder ?? 0,
      description: dto.description ?? null,
      visibility: dto.visibility ?? MediaVisibility.PUBLIC,
      createdBy: userId,
      updatedBy: userId,
    });

    this.logger.log(`Folder ${folder.folderCode} created: ${folder.path}`);
    return ApiResponseDto.success(FolderResponseDto.fromEntity(folder), 'Folder created');
  }

  async update(code: string, dto: UpdateFolderDto, userId: string) {
    const folder = await this.repository.findByCode(code);
    if (!folder) throw new EntityNotFoundException('MediaFolder', code);

    const updateData: Record<string, unknown> = { updatedBy: userId, version: { increment: 1 } };

    if (dto.name !== undefined) {
      const newSlug = this.slugify(dto.name);
      const existing = await this.repository.findByParentAndSlug(folder.parentId, newSlug);
      if (existing && existing.id !== folder.id) {
        throw new EntityConflictException('MediaFolder', 'name');
      }
      updateData.name = dto.name;
      updateData.slug = newSlug;
    }
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.visibility !== undefined) updateData.visibility = dto.visibility;
    if (dto.sortOrder !== undefined) updateData.sortOrder = dto.sortOrder;

    const updated = await this.repository.update(folder.id, updateData);
    this.logger.log(`Folder ${code} updated`);
    return ApiResponseDto.success(FolderResponseDto.fromEntity(updated), 'Folder updated');
  }

  async move(code: string, dto: MoveFolderDto, userId: string) {
    const folder = await this.repository.findByCode(code);
    if (!folder) throw new EntityNotFoundException('MediaFolder', code);

    const newParentId = dto.parentId ?? null;

    if (newParentId === folder.id) {
      throw new BusinessException('Cannot move folder into itself');
    }

    if (newParentId) {
      const parent = await this.repository.findById(newParentId);
      if (!parent) throw new EntityNotFoundException('MediaFolder', newParentId);
      if (parent.path.startsWith(folder.path + '/')) {
        throw new BusinessException('Cannot move folder into its own descendant');
      }
    }

    const existingSlug = await this.repository.findByParentAndSlug(newParentId, folder.slug);
    if (existingSlug && existingSlug.id !== folder.id) {
      throw new EntityConflictException('MediaFolder', 'slug in target parent');
    }

    let newPath: string;
    let newDepth: number;
    if (newParentId) {
      const parent = await this.repository.findById(newParentId);
      newPath = `${parent!.path}/${folder.slug}`;
      newDepth = parent!.depth + 1;
    } else {
      newPath = `/${folder.slug}`;
      newDepth = 0;
    }

    const oldPath = folder.path;
    const descendants = await this.repository.findDescendants(oldPath);

    await this.repository.update(folder.id, {
      parentId: newParentId,
      path: newPath,
      depth: newDepth,
      updatedBy: userId,
      version: { increment: 1 },
    });

    for (const desc of descendants) {
      const updatedDescPath = desc.path.replace(oldPath, newPath);
      const depthDiff = newDepth - folder.depth;
      await this.repository.update(desc.id, {
        path: updatedDescPath,
        depth: desc.depth + depthDiff,
      });
    }

    const updated = await this.repository.findById(folder.id);
    this.logger.log(`Folder ${code} moved to ${newPath}`);
    return ApiResponseDto.success(FolderResponseDto.fromEntity(updated!), 'Folder moved');
  }

  async remove(code: string, userId: string) {
    const folder = await this.repository.findByCode(code);
    if (!folder) throw new EntityNotFoundException('MediaFolder', code);

    const hasChildren = await this.repository.hasChildren(folder.id);
    if (hasChildren) throw new BusinessException('Cannot delete folder with subfolders');

    const hasAssets = await this.repository.hasAssets(folder.id);
    if (hasAssets) throw new BusinessException('Cannot delete folder with assets');

    await this.repository.update(folder.id, {
      deletedAt: new Date(),
      updatedBy: userId,
    });

    this.logger.log(`Folder ${code} soft-deleted`);
    return ApiResponseDto.success(null, 'Folder deleted');
  }

  async findByCode(code: string) {
    const folder = await this.repository.findByCode(code);
    if (!folder) throw new EntityNotFoundException('MediaFolder', code);
    return ApiResponseDto.success(FolderResponseDto.fromEntity(folder), 'Folder retrieved');
  }

  async getChildren(parentId: string | null) {
    const children = await this.repository.findChildren(parentId);
    const items = children.map((f) => FolderResponseDto.fromEntity(f));
    return ApiResponseDto.success(items, 'Children retrieved');
  }

  async getTree() {
    const all = await this.repository.findTree();
    const items = all.map((f) => FolderResponseDto.fromEntity(f));
    return ApiResponseDto.success(items, 'Folder tree retrieved');
  }

  async getStatistics(code: string) {
    const folder = await this.repository.findByCode(code);
    if (!folder) throw new EntityNotFoundException('MediaFolder', code);
    const stats = await this.repository.getStatistics(folder.id);
    return ApiResponseDto.success(stats, 'Folder statistics retrieved');
  }

  async getBreadcrumb(code: string) {
    const folder = await this.repository.findByCode(code);
    if (!folder) throw new EntityNotFoundException('MediaFolder', code);

    const parts = folder.path.split('/').filter(Boolean);
    const breadcrumb: Array<{ name: string; path: string }> = [];
    let currentPath = '';
    for (const part of parts) {
      currentPath += `/${part}`;
      breadcrumb.push({ name: part, path: currentPath });
    }
    return ApiResponseDto.success(breadcrumb, 'Breadcrumb retrieved');
  }

  async list(query: PaginationQueryDto & { parentId?: string; visibility?: string }) {
    const { data, total } = await this.repository.findManyForAdmin({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      parentId: query.parentId,
      visibility: query.visibility,
    });
    const items = data.map((f) => FolderResponseDto.fromEntity(f));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Folders retrieved');
  }

  private slugify(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 255);
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-FLD-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
