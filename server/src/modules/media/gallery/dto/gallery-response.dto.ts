import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GalleryAlbum, GalleryImage } from '@prisma/client';

export class AlbumResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() albumCode!: string;
  @ApiProperty() title!: string;
  @ApiProperty() slug!: string;
  @ApiPropertyOptional() description?: string | null;
  @ApiPropertyOptional() coverImageId?: string | null;
  @ApiPropertyOptional() category?: string | null;
  @ApiProperty() tags!: string[];
  @ApiProperty() visibility!: string;
  @ApiProperty() isFeatured!: boolean;
  @ApiProperty() sortOrder!: number;
  @ApiPropertyOptional() eventEditionId?: string | null;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: GalleryAlbum): AlbumResponseDto {
    const dto = new AlbumResponseDto();
    dto.id = entity.id;
    dto.albumCode = entity.albumCode;
    dto.title = entity.title;
    dto.slug = entity.slug;
    dto.description = entity.description;
    dto.coverImageId = entity.coverImageId;
    dto.category = entity.category;
    dto.tags = entity.tags;
    dto.visibility = entity.visibility;
    dto.isFeatured = entity.isFeatured;
    dto.sortOrder = entity.sortOrder;
    dto.eventEditionId = entity.eventEditionId;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}

export class GalleryImageResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() albumId!: string;
  @ApiProperty() assetId!: string;
  @ApiPropertyOptional() caption?: string | null;
  @ApiProperty() sortOrder!: number;
  @ApiProperty() isFeatured!: boolean;
  @ApiProperty() visibility!: string;
  @ApiProperty() createdAt!: Date;

  static fromEntity(entity: GalleryImage): GalleryImageResponseDto {
    const dto = new GalleryImageResponseDto();
    dto.id = entity.id;
    dto.albumId = entity.albumId;
    dto.assetId = entity.assetId;
    dto.caption = entity.caption;
    dto.sortOrder = entity.sortOrder;
    dto.isFeatured = entity.isFeatured;
    dto.visibility = entity.visibility;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}
