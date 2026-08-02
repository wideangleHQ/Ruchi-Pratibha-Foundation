import { Injectable } from '@nestjs/common';
import { Document, DocumentCategory, MediaVisibility, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class DocumentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.DocumentUncheckedCreateInput): Promise<Document> {
    return this.prisma.document.create({ data });
  }

  async findById(id: string): Promise<Document | null> {
    return this.prisma.document.findFirst({ where: { id, deletedAt: null } });
  }

  async findByCode(code: string): Promise<Document | null> {
    return this.prisma.document.findFirst({ where: { documentCode: code, deletedAt: null } });
  }

  async findBySlug(slug: string): Promise<Document | null> {
    return this.prisma.document.findFirst({ where: { slug, deletedAt: null } });
  }

  async findByAssetId(assetId: string): Promise<Document | null> {
    return this.prisma.document.findFirst({ where: { assetId, deletedAt: null } });
  }

  async countAll(): Promise<number> {
    return this.prisma.document.count({ where: { deletedAt: null } });
  }

  async update(id: string, data: Prisma.DocumentUpdateInput): Promise<Document> {
    return this.prisma.document.update({ where: { id }, data });
  }

  async incrementDownloadCount(id: string): Promise<Document> {
    return this.prisma.document.update({
      where: { id },
      data: { downloadCount: { increment: 1 } },
    });
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    category?: DocumentCategory;
    visibility?: MediaVisibility;
    isFeatured?: boolean;
    tag?: string;
    author?: string;
  }): Promise<{ data: Document[]; total: number }> {
    const where: Prisma.DocumentWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { documentCode: { contains: options.search, mode: 'insensitive' } },
        { summary: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.category) where.category = options.category;
    if (options.visibility) where.visibility = options.visibility;
    if (options.isFeatured !== undefined) where.isFeatured = options.isFeatured;
    if (options.tag) where.tags = { has: options.tag };
    if (options.author) where.author = { contains: options.author, mode: 'insensitive' };

    const allowedSortFields = ['createdAt', 'title', 'sortOrder', 'publishDate', 'downloadCount'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.document.count({ where }),
    ]);
    return { data, total };
  }
}
