import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MediaAsset } from '@prisma/client';

export class AssetResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() mediaCode!: string;
  @ApiProperty() originalFilename!: string;
  @ApiProperty() storedFilename!: string;
  @ApiProperty() bucketName!: string;
  @ApiProperty() objectPath!: string;
  @ApiPropertyOptional() publicUrl?: string | null;
  @ApiProperty() contentType!: string;
  @ApiProperty() extension!: string;
  @ApiProperty() fileSize!: number;
  @ApiProperty() mediaType!: string;
  @ApiPropertyOptional() width?: number | null;
  @ApiPropertyOptional() height?: number | null;
  @ApiPropertyOptional() duration?: number | null;
  @ApiProperty() checksum!: string;
  @ApiProperty() uploadedBy!: string;
  @ApiPropertyOptional() folderId?: string | null;
  @ApiProperty() tags!: string[];
  @ApiPropertyOptional() description?: string | null;
  @ApiPropertyOptional() altText?: string | null;
  @ApiProperty() visibility!: string;
  @ApiProperty() assetStatus!: string;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: MediaAsset): AssetResponseDto {
    const dto = new AssetResponseDto();
    dto.id = entity.id;
    dto.mediaCode = entity.mediaCode;
    dto.originalFilename = entity.originalFilename;
    dto.storedFilename = entity.storedFilename;
    dto.bucketName = entity.bucketName;
    dto.objectPath = entity.objectPath;
    dto.publicUrl = entity.publicUrl;
    dto.contentType = entity.contentType;
    dto.extension = entity.extension;
    dto.fileSize = entity.fileSize;
    dto.mediaType = entity.mediaType;
    dto.width = entity.width;
    dto.height = entity.height;
    dto.duration = entity.duration;
    dto.checksum = entity.checksum;
    dto.uploadedBy = entity.uploadedBy;
    dto.folderId = entity.folderId;
    dto.tags = entity.tags;
    dto.description = entity.description;
    dto.altText = entity.altText;
    dto.visibility = entity.visibility;
    dto.assetStatus = entity.assetStatus;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
