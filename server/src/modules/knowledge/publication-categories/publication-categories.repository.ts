import { Injectable } from '@nestjs/common';
import { Prisma, PublicationCategory } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class PublicationCategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PublicationCategoryUncheckedCreateInput): Promise<PublicationCategory> {
    return this.prisma.publicationCategory.create({ data });
  }

  async findById(id: string): Promise<PublicationCategory | null> {
    return this.prisma.publicationCategory.findFirst({ where: { id, deletedAt: null } });
  }

  async findByCode(code: string): Promise<PublicationCategory | null> {
    return this.prisma.publicationCategory.findFirst({ where: { categoryCode: code, deletedAt: null } });
  }

  async findBySlug(slug: string): Promise<PublicationCategory | null> {
    return this.prisma.publicationCategory.findFirst({ where: { slug, deletedAt: null } });
  }

  async countAll(): Promise<number> {
    return this.prisma.publicationCategory.count({ where: { deletedAt: null } });
  }

  async update(id: string, data: Prisma.PublicationCategoryUncheckedUpdateInput): Promise<PublicationCategory> {
    return this.prisma.publicationCategory.update({ where: { id }, data });
  }

  async findTree(): Promise<PublicationCategory[]> {
    return this.prisma.publicationCategory.findMany({
      where: { deletedAt: null, parentId: null },
      orderBy: { sortOrder: 'asc' },
      include: {
        children: {
          where: { deletedAt: null },
          orderBy: { sortOrder: 'asc' },
          include: {
            children: {
              where: { deletedAt: null },
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
    });
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    isActive?: boolean;
    parentId?: string;
  }): Promise<{ data: PublicationCategory[]; total: number }> {
    const where: Prisma.PublicationCategoryWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { categoryCode: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.isActive !== undefined) where.isActive = options.isActive;
    if (options.parentId !== undefined) where.parentId = options.parentId;

    const allowedSortFields = ['createdAt', 'name', 'sortOrder', 'categoryCode'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.publicationCategory.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.publicationCategory.count({ where }),
    ]);
    return { data, total };
  }
}
