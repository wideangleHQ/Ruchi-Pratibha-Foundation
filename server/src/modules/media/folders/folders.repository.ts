import { Injectable } from '@nestjs/common';
import { MediaVisibility, Prisma, MediaFolder } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class FoldersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MediaFolderUncheckedCreateInput): Promise<MediaFolder> {
    return this.prisma.mediaFolder.create({ data });
  }

  async findById(id: string): Promise<MediaFolder | null> {
    return this.prisma.mediaFolder.findFirst({ where: { id, deletedAt: null } });
  }

  async findByCode(code: string): Promise<MediaFolder | null> {
    return this.prisma.mediaFolder.findFirst({ where: { folderCode: code, deletedAt: null } });
  }

  async findByParentAndSlug(parentId: string | null, slug: string): Promise<MediaFolder | null> {
    return this.prisma.mediaFolder.findFirst({
      where: { parentId: parentId ?? null, slug, deletedAt: null },
    });
  }

  async countAll(): Promise<number> {
    return this.prisma.mediaFolder.count({ where: { deletedAt: null } });
  }

  async update(id: string, data: Prisma.MediaFolderUncheckedUpdateInput): Promise<MediaFolder> {
    return this.prisma.mediaFolder.update({ where: { id }, data });
  }

  async findChildren(parentId: string | null): Promise<MediaFolder[]> {
    return this.prisma.mediaFolder.findMany({
      where: { parentId: parentId ?? null, deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
  }

  async findTree(): Promise<MediaFolder[]> {
    return this.prisma.mediaFolder.findMany({
      where: { deletedAt: null },
      orderBy: [{ depth: 'asc' }, { sortOrder: 'asc' }, { name: 'asc' }],
    });
  }

  async findDescendants(path: string): Promise<MediaFolder[]> {
    return this.prisma.mediaFolder.findMany({
      where: { path: { startsWith: path + '/' }, deletedAt: null },
    });
  }

  async hasChildren(id: string): Promise<boolean> {
    const count = await this.prisma.mediaFolder.count({
      where: { parentId: id, deletedAt: null },
    });
    return count > 0;
  }

  async hasAssets(id: string): Promise<boolean> {
    const count = await this.prisma.mediaAsset.count({
      where: { folderId: id, deletedAt: null },
    });
    return count > 0;
  }

  async getStatistics(id: string): Promise<{ childCount: number; assetCount: number }> {
    const [childCount, assetCount] = await Promise.all([
      this.prisma.mediaFolder.count({ where: { parentId: id, deletedAt: null } }),
      this.prisma.mediaAsset.count({ where: { folderId: id, deletedAt: null } }),
    ]);
    return { childCount, assetCount };
  }

  async findManyForAdmin(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    parentId?: string | null;
    visibility?: string;
  }): Promise<{ data: MediaFolder[]; total: number }> {
    const where: Prisma.MediaFolderWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { folderCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.parentId !== undefined) where.parentId = options.parentId;
    if (options.visibility) where.visibility = options.visibility as MediaVisibility;

    const allowedSortFields = ['createdAt', 'name', 'sortOrder', 'depth'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.mediaFolder.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.mediaFolder.count({ where }),
    ]);
    return { data, total };
  }
}
