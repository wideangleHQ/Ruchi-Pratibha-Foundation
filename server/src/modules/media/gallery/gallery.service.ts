import { Injectable, Logger } from '@nestjs/common';
import { MediaVisibility } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import {
  AddGalleryImageDto,
  AlbumQueryDto,
  AlbumResponseDto,
  CreateAlbumDto,
  GalleryImageResponseDto,
  UpdateAlbumDto,
  UpdateGalleryImageDto,
} from './dto';
import { GalleryRepository } from './gallery.repository';

@Injectable()
export class GalleryService {
  private readonly logger = new Logger(GalleryService.name);

  constructor(private readonly repository: GalleryRepository) {}

  async createAlbum(dto: CreateAlbumDto, userId: string) {
    const slug = this.slugify(dto.title);
    const existing = await this.repository.findAlbumBySlug(slug);
    if (existing) throw new EntityConflictException('GalleryAlbum', 'slug');

    const albumCode = await this.generateAlbumCode();

    const album = await this.repository.createAlbum({
      albumCode,
      title: dto.title,
      slug,
      description: dto.description ?? null,
      coverImageId: dto.coverImageId ?? null,
      category: dto.category ?? null,
      tags: dto.tags ?? [],
      visibility: dto.visibility ?? MediaVisibility.PUBLIC,
      isFeatured: dto.isFeatured ?? false,
      sortOrder: dto.sortOrder ?? 0,
      eventEditionId: dto.eventEditionId ?? null,
      createdBy: userId,
      updatedBy: userId,
    });

    this.logger.log(`Album ${albumCode} created: ${dto.title}`);
    return ApiResponseDto.success(AlbumResponseDto.fromEntity(album), 'Album created');
  }

  async updateAlbum(code: string, dto: UpdateAlbumDto, userId: string) {
    const album = await this.repository.findAlbumByCode(code);
    if (!album) throw new EntityNotFoundException('GalleryAlbum', code);

    const updateData: Record<string, unknown> = { updatedBy: userId, version: { increment: 1 } };

    if (dto.title !== undefined) {
      const newSlug = this.slugify(dto.title);
      const existingSlug = await this.repository.findAlbumBySlug(newSlug);
      if (existingSlug && existingSlug.id !== album.id) {
        throw new EntityConflictException('GalleryAlbum', 'slug');
      }
      updateData.title = dto.title;
      updateData.slug = newSlug;
    }
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.coverImageId !== undefined) updateData.coverImageId = dto.coverImageId;
    if (dto.category !== undefined) updateData.category = dto.category;
    if (dto.tags !== undefined) updateData.tags = dto.tags;
    if (dto.visibility !== undefined) updateData.visibility = dto.visibility;
    if (dto.isFeatured !== undefined) updateData.isFeatured = dto.isFeatured;
    if (dto.sortOrder !== undefined) updateData.sortOrder = dto.sortOrder;

    const updated = await this.repository.updateAlbum(album.id, updateData);
    this.logger.log(`Album ${code} updated`);
    return ApiResponseDto.success(AlbumResponseDto.fromEntity(updated), 'Album updated');
  }

  async deleteAlbum(code: string, userId: string) {
    const album = await this.repository.findAlbumByCode(code);
    if (!album) throw new EntityNotFoundException('GalleryAlbum', code);

    await this.repository.updateAlbum(album.id, {
      deletedAt: new Date(),
      updatedBy: userId,
    });

    this.logger.log(`Album ${code} deleted`);
    return ApiResponseDto.success(null, 'Album deleted');
  }

  async findAlbumByCode(code: string) {
    const album = await this.repository.findAlbumByCode(code);
    if (!album) throw new EntityNotFoundException('GalleryAlbum', code);
    return ApiResponseDto.success(AlbumResponseDto.fromEntity(album), 'Album retrieved');
  }

  async findAlbumBySlug(slug: string) {
    const album = await this.repository.findAlbumBySlug(slug);
    if (!album) throw new EntityNotFoundException('GalleryAlbum', slug);
    return ApiResponseDto.success(AlbumResponseDto.fromEntity(album), 'Album retrieved');
  }

  async listAlbums(query: AlbumQueryDto) {
    const { data, total } = await this.repository.findManyAlbums({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      category: query.category,
      visibility: query.visibility,
      isFeatured: query.isFeatured,
      eventEditionId: query.eventEditionId,
      tag: query.tag,
    });
    const items = data.map((a) => AlbumResponseDto.fromEntity(a));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Albums retrieved');
  }

  async addImage(albumCode: string, dto: AddGalleryImageDto, userId: string) {
    const album = await this.repository.findAlbumByCode(albumCode);
    if (!album) throw new EntityNotFoundException('GalleryAlbum', albumCode);

    const existing = await this.repository.findImageByAlbumAndAsset(album.id, dto.assetId);
    if (existing) throw new EntityConflictException('GalleryImage', 'albumId+assetId');

    const image = await this.repository.createImage({
      albumId: album.id,
      assetId: dto.assetId,
      caption: dto.caption ?? null,
      sortOrder: dto.sortOrder ?? 0,
      isFeatured: dto.isFeatured ?? false,
      visibility: dto.visibility ?? MediaVisibility.PUBLIC,
      createdBy: userId,
    });

    this.logger.log(`Image ${dto.assetId} added to album ${albumCode}`);
    return ApiResponseDto.success(GalleryImageResponseDto.fromEntity(image), 'Image added to album');
  }

  async updateImage(imageId: string, dto: UpdateGalleryImageDto) {
    const image = await this.repository.findImageById(imageId);
    if (!image) throw new EntityNotFoundException('GalleryImage', imageId);

    const updateData: Record<string, unknown> = { version: { increment: 1 } };
    if (dto.caption !== undefined) updateData.caption = dto.caption;
    if (dto.sortOrder !== undefined) updateData.sortOrder = dto.sortOrder;
    if (dto.isFeatured !== undefined) updateData.isFeatured = dto.isFeatured;
    if (dto.visibility !== undefined) updateData.visibility = dto.visibility;

    const updated = await this.repository.updateImage(image.id, updateData);
    this.logger.log(`Gallery image ${imageId} updated`);
    return ApiResponseDto.success(GalleryImageResponseDto.fromEntity(updated), 'Image updated');
  }

  async removeImage(imageId: string) {
    const image = await this.repository.findImageById(imageId);
    if (!image) throw new EntityNotFoundException('GalleryImage', imageId);

    await this.repository.updateImage(image.id, { deletedAt: new Date() });
    this.logger.log(`Gallery image ${imageId} removed`);
    return ApiResponseDto.success(null, 'Image removed from album');
  }

  async getAlbumImages(albumCode: string) {
    const album = await this.repository.findAlbumByCode(albumCode);
    if (!album) throw new EntityNotFoundException('GalleryAlbum', albumCode);

    const images = await this.repository.findImagesByAlbum(album.id);
    const items = images.map((i) => GalleryImageResponseDto.fromEntity(i));
    return ApiResponseDto.success(items, 'Album images retrieved');
  }

  private slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 255);
  }

  private async generateAlbumCode(): Promise<string> {
    const total = await this.repository.countAllAlbums();
    return `RPF-ALB-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
