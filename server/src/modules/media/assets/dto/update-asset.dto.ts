import { ApiPropertyOptional } from '@nestjs/swagger';
import { MediaVisibility } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateAssetDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  altText?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ enum: MediaVisibility })
  @IsOptional()
  @IsEnum(MediaVisibility)
  visibility?: MediaVisibility;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  folderId?: string | null;
}

export class MoveAssetDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  folderId?: string | null;
}

export class CopyAssetDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  folderId?: string | null;
}

export class BulkDeleteAssetsDto {
  @IsArray()
  @IsString({ each: true })
  ids!: string[];
}
