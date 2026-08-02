import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MediaFolder } from '@prisma/client';

export class FolderResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() folderCode!: string;
  @ApiProperty() name!: string;
  @ApiProperty() slug!: string;
  @ApiPropertyOptional() parentId?: string | null;
  @ApiProperty() path!: string;
  @ApiProperty() depth!: number;
  @ApiProperty() sortOrder!: number;
  @ApiPropertyOptional() description?: string | null;
  @ApiProperty() visibility!: string;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: MediaFolder): FolderResponseDto {
    const dto = new FolderResponseDto();
    dto.id = entity.id;
    dto.folderCode = entity.folderCode;
    dto.name = entity.name;
    dto.slug = entity.slug;
    dto.parentId = entity.parentId;
    dto.path = entity.path;
    dto.depth = entity.depth;
    dto.sortOrder = entity.sortOrder;
    dto.description = entity.description;
    dto.visibility = entity.visibility;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
