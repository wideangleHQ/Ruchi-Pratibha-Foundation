import { Injectable, Logger } from '@nestjs/common';
import { MediaVisibility } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import {
  CreateDocumentDto,
  DocumentQueryDto,
  DocumentResponseDto,
  UpdateDocumentDto,
} from './dto';
import { DocumentsRepository } from './documents.repository';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);

  constructor(private readonly repository: DocumentsRepository) {}

  async create(dto: CreateDocumentDto, userId: string) {
    const existing = await this.repository.findByAssetId(dto.assetId);
    if (existing) throw new EntityConflictException('Document', 'assetId');

    const slug = this.slugify(dto.title);
    const existingSlug = await this.repository.findBySlug(slug);
    if (existingSlug) throw new EntityConflictException('Document', 'slug');

    const documentCode = await this.generateCode();

    const doc = await this.repository.create({
      documentCode,
      title: dto.title,
      slug,
      assetId: dto.assetId,
      category: dto.category ?? 'OTHER',
      summary: dto.summary ?? null,
      author: dto.author ?? null,
      publishDate: dto.publishDate ? new Date(dto.publishDate) : null,
      tags: dto.tags ?? [],
      visibility: dto.visibility ?? MediaVisibility.PUBLIC,
      isFeatured: dto.isFeatured ?? false,
      sortOrder: dto.sortOrder ?? 0,
      createdBy: userId,
      updatedBy: userId,
    });

    this.logger.log(`Document ${documentCode} created: ${dto.title}`);
    return ApiResponseDto.success(DocumentResponseDto.fromEntity(doc), 'Document created');
  }

  async update(code: string, dto: UpdateDocumentDto, userId: string) {
    const doc = await this.repository.findByCode(code);
    if (!doc) throw new EntityNotFoundException('Document', code);

    const updateData: Record<string, unknown> = { updatedBy: userId, version: { increment: 1 } };

    if (dto.title !== undefined) {
      const newSlug = this.slugify(dto.title);
      const existingSlug = await this.repository.findBySlug(newSlug);
      if (existingSlug && existingSlug.id !== doc.id) {
        throw new EntityConflictException('Document', 'slug');
      }
      updateData.title = dto.title;
      updateData.slug = newSlug;
    }
    if (dto.category !== undefined) updateData.category = dto.category;
    if (dto.summary !== undefined) updateData.summary = dto.summary;
    if (dto.author !== undefined) updateData.author = dto.author;
    if (dto.publishDate !== undefined) updateData.publishDate = new Date(dto.publishDate);
    if (dto.tags !== undefined) updateData.tags = dto.tags;
    if (dto.visibility !== undefined) updateData.visibility = dto.visibility;
    if (dto.isFeatured !== undefined) updateData.isFeatured = dto.isFeatured;
    if (dto.sortOrder !== undefined) updateData.sortOrder = dto.sortOrder;

    const updated = await this.repository.update(doc.id, updateData);
    this.logger.log(`Document ${code} updated`);
    return ApiResponseDto.success(DocumentResponseDto.fromEntity(updated), 'Document updated');
  }

  async remove(code: string, userId: string) {
    const doc = await this.repository.findByCode(code);
    if (!doc) throw new EntityNotFoundException('Document', code);

    await this.repository.update(doc.id, { deletedAt: new Date(), updatedBy: userId });
    this.logger.log(`Document ${code} deleted`);
    return ApiResponseDto.success(null, 'Document deleted');
  }

  async findByCode(code: string) {
    const doc = await this.repository.findByCode(code);
    if (!doc) throw new EntityNotFoundException('Document', code);
    return ApiResponseDto.success(DocumentResponseDto.fromEntity(doc), 'Document retrieved');
  }

  async findBySlug(slug: string) {
    const doc = await this.repository.findBySlug(slug);
    if (!doc) throw new EntityNotFoundException('Document', slug);
    return ApiResponseDto.success(DocumentResponseDto.fromEntity(doc), 'Document retrieved');
  }

  async trackDownload(code: string) {
    const doc = await this.repository.findByCode(code);
    if (!doc) throw new EntityNotFoundException('Document', code);

    const updated = await this.repository.incrementDownloadCount(doc.id);
    return ApiResponseDto.success(DocumentResponseDto.fromEntity(updated), 'Download tracked');
  }

  async list(query: DocumentQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      category: query.category,
      visibility: query.visibility,
      isFeatured: query.isFeatured,
      tag: query.tag,
      author: query.author,
    });
    const items = data.map((d) => DocumentResponseDto.fromEntity(d));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Documents retrieved');
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
    return `RPF-DOC-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
