import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Event } from '@prisma/client';

export class EventResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  eventCode!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  shortDescription!: string;

  @ApiPropertyOptional()
  detailedDescription?: string | null;

  @ApiProperty()
  eventType!: string;

  @ApiPropertyOptional()
  logoAssetKey?: string | null;

  @ApiPropertyOptional()
  defaultBannerKey?: string | null;

  @ApiPropertyOptional()
  primaryColor?: string | null;

  @ApiPropertyOptional()
  secondaryColor?: string | null;

  @ApiProperty()
  isRecurring!: boolean;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  sortOrder!: number;

  @ApiPropertyOptional()
  seoTitle?: string | null;

  @ApiPropertyOptional()
  seoDescription?: string | null;

  @ApiProperty({ type: [String] })
  seoKeywords!: string[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static fromEntity(event: Event): EventResponseDto {
    const dto = new EventResponseDto();
    dto.id = event.id;
    dto.eventCode = event.eventCode;
    dto.slug = event.slug;
    dto.title = event.title;
    dto.shortDescription = event.shortDescription;
    dto.detailedDescription = event.detailedDescription;
    dto.eventType = event.eventType;
    dto.logoAssetKey = event.logoAssetKey;
    dto.defaultBannerKey = event.defaultBannerKey;
    dto.primaryColor = event.primaryColor;
    dto.secondaryColor = event.secondaryColor;
    dto.isRecurring = event.isRecurring;
    dto.isActive = event.isActive;
    dto.sortOrder = event.sortOrder;
    dto.seoTitle = event.seoTitle;
    dto.seoDescription = event.seoDescription;
    dto.seoKeywords = event.seoKeywords;
    dto.createdAt = event.createdAt;
    dto.updatedAt = event.updatedAt;
    return dto;
  }
}

export class EventListItemDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  eventCode!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  shortDescription!: string;

  @ApiProperty()
  eventType!: string;

  @ApiPropertyOptional()
  logoAssetKey?: string | null;

  @ApiProperty()
  isRecurring!: boolean;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  sortOrder!: number;

  @ApiProperty()
  createdAt!: Date;

  static fromEntity(event: Event): EventListItemDto {
    const dto = new EventListItemDto();
    dto.id = event.id;
    dto.eventCode = event.eventCode;
    dto.slug = event.slug;
    dto.title = event.title;
    dto.shortDescription = event.shortDescription;
    dto.eventType = event.eventType;
    dto.logoAssetKey = event.logoAssetKey;
    dto.isRecurring = event.isRecurring;
    dto.isActive = event.isActive;
    dto.sortOrder = event.sortOrder;
    dto.createdAt = event.createdAt;
    return dto;
  }
}
