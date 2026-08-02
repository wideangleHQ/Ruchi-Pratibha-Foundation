import { Injectable } from '@nestjs/common';
import { MediaType, MediaVisibility, Prisma, MediaAsset } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class AssetsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MediaAssetUncheckedCreateInput): Promise<MediaAsset> {
    return this.prisma.mediaAsset.create({ data });
  }

  async createMany(data: Prisma.MediaAssetCreateManyInput[]): Promise<number> {
    const result = await this.prisma.mediaAsset.createMany({ data });
    return result.count;
  }

  async findById(id: string): Promise<MediaAsset | null> {
    return this.prisma.mediaAsset.findFirst({ where: { id, deletedAt: null } });
  }

  async findByCode(code: string): Promise<MediaAsset | null> {
    return this.prisma.mediaAsset.findFirst({ where: { mediaCode: code, deletedAt: null } });
  }

  async findByChecksum(checksum: string): Promise<MediaAsset | null> {
    return this.prisma.mediaAsset.findFirst({ where: { checksum, deletedAt: null } });
  }

  async findByIds(ids: string[]): Promise<MediaAsset[]> {
    return this.prisma.mediaAsset.findMany({ where: { id: { in: ids }, deletedAt: null } });
  }

  async countAll(): Promise<number> {
    return this.prisma.mediaAsset.count({ where: { deletedAt: null } });
  }

  async update(id: string, data: Prisma.MediaAssetUncheckedUpdateInput): Promise<MediaAsset> {
    return this.prisma.mediaAsset.update({ where: { id }, data });
  }

  async softDeleteMany(ids: string[]): Promise<number> {
    const result = await this.prisma.mediaAsset.updateMany({
      where: { id: { in: ids }, deletedAt: null },
      data: { deletedAt: new Date() },
    });
    return result.count;
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    mediaType?: string;
    visibility?: string;
    folderId?: string;
    contentType?: string;
    tag?: string;
    uploadedBy?: string;
  }): Promise<{ data: MediaAsset[]; total: number }> {
    const where: Prisma.MediaAssetWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { originalFilename: { contains: options.search, mode: 'insensitive' } },
        { mediaCode: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.mediaType) where.mediaType = options.mediaType as MediaType;
    if (options.visibility) where.visibility = options.visibility as MediaVisibility;
    if (options.folderId) where.folderId = options.folderId;
    if (options.contentType) where.contentType = { startsWith: options.contentType };
    if (options.tag) where.tags = { has: options.tag };
    if (options.uploadedBy) where.uploadedBy = options.uploadedBy;

    const allowedSortFields = ['createdAt', 'originalFilename', 'fileSize', 'mediaType'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.mediaAsset.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.mediaAsset.count({ where }),
    ]);
    return { data, total };
  }
}
