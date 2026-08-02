import { Injectable } from '@nestjs/common';
import { GalleryAlbum, GalleryImage, MediaVisibility, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class GalleryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAlbum(data: Prisma.GalleryAlbumUncheckedCreateInput): Promise<GalleryAlbum> {
    return this.prisma.galleryAlbum.create({ data });
  }

  async findAlbumById(id: string): Promise<GalleryAlbum | null> {
    return this.prisma.galleryAlbum.findFirst({ where: { id, deletedAt: null } });
  }

  async findAlbumByCode(code: string): Promise<GalleryAlbum | null> {
    return this.prisma.galleryAlbum.findFirst({ where: { albumCode: code, deletedAt: null } });
  }

  async findAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
    return this.prisma.galleryAlbum.findFirst({ where: { slug, deletedAt: null } });
  }

  async countAllAlbums(): Promise<number> {
    return this.prisma.galleryAlbum.count({ where: { deletedAt: null } });
  }

  async updateAlbum(id: string, data: Prisma.GalleryAlbumUpdateInput): Promise<GalleryAlbum> {
    return this.prisma.galleryAlbum.update({ where: { id }, data });
  }

  async findManyAlbums(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    category?: string;
    visibility?: string;
    isFeatured?: boolean;
    eventEditionId?: string;
    tag?: string;
  }): Promise<{ data: GalleryAlbum[]; total: number }> {
    const where: Prisma.GalleryAlbumWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { albumCode: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.category) where.category = options.category;
    if (options.visibility) where.visibility = options.visibility as MediaVisibility;
    if (options.isFeatured !== undefined) where.isFeatured = options.isFeatured;
    if (options.eventEditionId) where.eventEditionId = options.eventEditionId;
    if (options.tag) where.tags = { has: options.tag };

    const allowedSortFields = ['createdAt', 'title', 'sortOrder'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.galleryAlbum.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.galleryAlbum.count({ where }),
    ]);
    return { data, total };
  }

  async createImage(data: Prisma.GalleryImageUncheckedCreateInput): Promise<GalleryImage> {
    return this.prisma.galleryImage.create({ data });
  }

  async findImageById(id: string): Promise<GalleryImage | null> {
    return this.prisma.galleryImage.findFirst({ where: { id, deletedAt: null } });
  }

  async findImageByAlbumAndAsset(albumId: string, assetId: string): Promise<GalleryImage | null> {
    return this.prisma.galleryImage.findFirst({
      where: { albumId, assetId, deletedAt: null },
    });
  }

  async updateImage(id: string, data: Prisma.GalleryImageUpdateInput): Promise<GalleryImage> {
    return this.prisma.galleryImage.update({ where: { id }, data });
  }

  async findImagesByAlbum(albumId: string): Promise<GalleryImage[]> {
    return this.prisma.galleryImage.findMany({
      where: { albumId, deletedAt: null },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async countImagesByAlbum(albumId: string): Promise<number> {
    return this.prisma.galleryImage.count({ where: { albumId, deletedAt: null } });
  }
}
