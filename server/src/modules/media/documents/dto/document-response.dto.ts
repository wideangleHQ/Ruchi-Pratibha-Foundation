import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from '@prisma/client';

export class DocumentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() documentCode!: string;
  @ApiProperty() title!: string;
  @ApiProperty() slug!: string;
  @ApiProperty() assetId!: string;
  @ApiProperty() category!: string;
  @ApiPropertyOptional() summary?: string | null;
  @ApiPropertyOptional() author?: string | null;
  @ApiPropertyOptional() publishDate?: Date | null;
  @ApiProperty() tags!: string[];
  @ApiProperty() visibility!: string;
  @ApiProperty() isFeatured!: boolean;
  @ApiProperty() downloadCount!: number;
  @ApiProperty() sortOrder!: number;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: Document): DocumentResponseDto {
    const dto = new DocumentResponseDto();
    dto.id = entity.id;
    dto.documentCode = entity.documentCode;
    dto.title = entity.title;
    dto.slug = entity.slug;
    dto.assetId = entity.assetId;
    dto.category = entity.category;
    dto.summary = entity.summary;
    dto.author = entity.author;
    dto.publishDate = entity.publishDate;
    dto.tags = entity.tags;
    dto.visibility = entity.visibility;
    dto.isFeatured = entity.isFeatured;
    dto.downloadCount = entity.downloadCount;
    dto.sortOrder = entity.sortOrder;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
