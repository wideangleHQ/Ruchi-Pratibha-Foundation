import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublicationCategory } from '@prisma/client';

export class PublicationCategoryResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() categoryCode!: string;
  @ApiProperty() name!: string;
  @ApiProperty() slug!: string;
  @ApiPropertyOptional() description?: string | null;
  @ApiPropertyOptional() parentId?: string | null;
  @ApiPropertyOptional() iconUrl?: string | null;
  @ApiProperty() sortOrder!: number;
  @ApiProperty() isActive!: boolean;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: PublicationCategory): PublicationCategoryResponseDto {
    const dto = new PublicationCategoryResponseDto();
    dto.id = entity.id;
    dto.categoryCode = entity.categoryCode;
    dto.name = entity.name;
    dto.slug = entity.slug;
    dto.description = entity.description;
    dto.parentId = entity.parentId;
    dto.iconUrl = entity.iconUrl;
    dto.sortOrder = entity.sortOrder;
    dto.isActive = entity.isActive;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
