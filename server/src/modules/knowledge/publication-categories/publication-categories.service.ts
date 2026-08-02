import { Injectable, Logger } from '@nestjs/common';
import { ApiResponseDto } from '../../../common/dto';
import {
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import {
  CreatePublicationCategoryDto,
  PublicationCategoryQueryDto,
  PublicationCategoryResponseDto,
  UpdatePublicationCategoryDto,
} from './dto';
import { PublicationCategoriesRepository } from './publication-categories.repository';

@Injectable()
export class PublicationCategoriesService {
  private readonly logger = new Logger(PublicationCategoriesService.name);

  constructor(private readonly repository: PublicationCategoriesRepository) {}

  async create(dto: CreatePublicationCategoryDto, userId: string) {
    const slug = this.slugify(dto.name);
    const existingSlug = await this.repository.findBySlug(slug);
    if (existingSlug) throw new EntityConflictException('PublicationCategory', 'slug');

    if (dto.parentId) {
      const parent = await this.repository.findById(dto.parentId);
      if (!parent) throw new EntityNotFoundException('PublicationCategory', dto.parentId);
    }

    const categoryCode = await this.generateCode();

    const category = await this.repository.create({
      categoryCode,
      name: dto.name,
      slug,
      description: dto.description ?? null,
      parentId: dto.parentId ?? null,
      iconUrl: dto.iconUrl ?? null,
      sortOrder: dto.sortOrder ?? 0,
      isActive: dto.isActive ?? true,
      createdBy: userId,
      updatedBy: userId,
    });

    this.logger.log(`PublicationCategory ${categoryCode} created: ${dto.name}`);
    return ApiResponseDto.success(PublicationCategoryResponseDto.fromEntity(category), 'Publication category created');
  }

  async update(code: string, dto: UpdatePublicationCategoryDto, userId: string) {
    const category = await this.repository.findByCode(code);
    if (!category) throw new EntityNotFoundException('PublicationCategory', code);

    const updateData: Record<string, unknown> = { updatedBy: userId, version: { increment: 1 } };

    if (dto.name !== undefined) {
      const newSlug = this.slugify(dto.name);
      const existingSlug = await this.repository.findBySlug(newSlug);
      if (existingSlug && existingSlug.id !== category.id) {
        throw new EntityConflictException('PublicationCategory', 'slug');
      }
      updateData.name = dto.name;
      updateData.slug = newSlug;
    }
    if (dto.parentId !== undefined) {
      if (dto.parentId !== null) {
        if (dto.parentId === category.id) {
          throw new EntityConflictException('PublicationCategory', 'parentId (self-reference)');
        }
        const parent = await this.repository.findById(dto.parentId);
        if (!parent) throw new EntityNotFoundException('PublicationCategory', dto.parentId);
      }
      updateData.parentId = dto.parentId;
    }
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.iconUrl !== undefined) updateData.iconUrl = dto.iconUrl;
    if (dto.sortOrder !== undefined) updateData.sortOrder = dto.sortOrder;
    if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

    const updated = await this.repository.update(category.id, updateData);
    this.logger.log(`PublicationCategory ${code} updated`);
    return ApiResponseDto.success(PublicationCategoryResponseDto.fromEntity(updated), 'Publication category updated');
  }

  async remove(code: string, userId: string) {
    const category = await this.repository.findByCode(code);
    if (!category) throw new EntityNotFoundException('PublicationCategory', code);

    await this.repository.update(category.id, { deletedAt: new Date(), updatedBy: userId });
    this.logger.log(`PublicationCategory ${code} deleted`);
    return ApiResponseDto.success(null, 'Publication category deleted');
  }

  async findByCode(code: string) {
    const category = await this.repository.findByCode(code);
    if (!category) throw new EntityNotFoundException('PublicationCategory', code);
    return ApiResponseDto.success(PublicationCategoryResponseDto.fromEntity(category), 'Publication category retrieved');
  }

  async findBySlug(slug: string) {
    const category = await this.repository.findBySlug(slug);
    if (!category) throw new EntityNotFoundException('PublicationCategory', slug);
    return ApiResponseDto.success(PublicationCategoryResponseDto.fromEntity(category), 'Publication category retrieved');
  }

  async getTree() {
    const tree = await this.repository.findTree();
    return ApiResponseDto.success(tree, 'Category tree retrieved');
  }

  async list(query: PublicationCategoryQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      isActive: query.isActive,
      parentId: query.parentId,
    });
    const items = data.map((c) => PublicationCategoryResponseDto.fromEntity(c));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Publication categories retrieved');
  }

  private slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 255);
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-PBC-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
