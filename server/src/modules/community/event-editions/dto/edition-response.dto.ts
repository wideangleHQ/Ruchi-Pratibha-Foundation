import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventEdition } from '@prisma/client';

export class EditionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  eventId!: string;

  @ApiProperty()
  editionCode!: string;

  @ApiProperty()
  editionName!: string;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  editionNumber!: number;

  @ApiProperty()
  slug!: string;

  @ApiPropertyOptional()
  theme?: string | null;

  @ApiProperty()
  shortDescription!: string;

  @ApiPropertyOptional()
  detailedDescription?: string | null;

  @ApiProperty()
  venue!: string;

  @ApiPropertyOptional()
  venueAddress?: string | null;

  @ApiPropertyOptional()
  googleMapsUrl?: string | null;

  @ApiPropertyOptional()
  registrationOpens?: Date | null;

  @ApiPropertyOptional()
  registrationCloses?: Date | null;

  @ApiProperty()
  eventStarts!: Date;

  @ApiProperty()
  eventEnds!: Date;

  @ApiProperty()
  volunteerCapacity!: number;

  @ApiProperty()
  maxRegistrations!: number;

  @ApiPropertyOptional()
  bannerImageKey?: string | null;

  @ApiPropertyOptional()
  coverImageKey?: string | null;

  @ApiProperty()
  isFeatured!: boolean;

  @ApiProperty()
  visibility!: string;

  @ApiProperty()
  editionStatus!: string;

  @ApiProperty()
  registrationEnabled!: boolean;

  @ApiProperty()
  attendanceEnabled!: boolean;

  @ApiProperty()
  certificateEnabled!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static fromEntity(edition: EventEdition): EditionResponseDto {
    const dto = new EditionResponseDto();
    dto.id = edition.id;
    dto.eventId = edition.eventId;
    dto.editionCode = edition.editionCode;
    dto.editionName = edition.editionName;
    dto.year = edition.year;
    dto.editionNumber = edition.editionNumber;
    dto.slug = edition.slug;
    dto.theme = edition.theme;
    dto.shortDescription = edition.shortDescription;
    dto.detailedDescription = edition.detailedDescription;
    dto.venue = edition.venue;
    dto.venueAddress = edition.venueAddress;
    dto.googleMapsUrl = edition.googleMapsUrl;
    dto.registrationOpens = edition.registrationOpens;
    dto.registrationCloses = edition.registrationCloses;
    dto.eventStarts = edition.eventStarts;
    dto.eventEnds = edition.eventEnds;
    dto.volunteerCapacity = edition.volunteerCapacity;
    dto.maxRegistrations = edition.maxRegistrations;
    dto.bannerImageKey = edition.bannerImageKey;
    dto.coverImageKey = edition.coverImageKey;
    dto.isFeatured = edition.isFeatured;
    dto.visibility = edition.visibility;
    dto.editionStatus = edition.editionStatus;
    dto.registrationEnabled = edition.registrationEnabled;
    dto.attendanceEnabled = edition.attendanceEnabled;
    dto.certificateEnabled = edition.certificateEnabled;
    dto.createdAt = edition.createdAt;
    dto.updatedAt = edition.updatedAt;
    return dto;
  }
}

export class EditionListItemDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  eventId!: string;

  @ApiProperty()
  editionCode!: string;

  @ApiProperty()
  editionName!: string;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  venue!: string;

  @ApiProperty()
  eventStarts!: Date;

  @ApiProperty()
  eventEnds!: Date;

  @ApiProperty()
  editionStatus!: string;

  @ApiProperty()
  isFeatured!: boolean;

  @ApiProperty()
  visibility!: string;

  @ApiProperty()
  createdAt!: Date;

  static fromEntity(edition: EventEdition): EditionListItemDto {
    const dto = new EditionListItemDto();
    dto.id = edition.id;
    dto.eventId = edition.eventId;
    dto.editionCode = edition.editionCode;
    dto.editionName = edition.editionName;
    dto.year = edition.year;
    dto.slug = edition.slug;
    dto.venue = edition.venue;
    dto.eventStarts = edition.eventStarts;
    dto.eventEnds = edition.eventEnds;
    dto.editionStatus = edition.editionStatus;
    dto.isFeatured = edition.isFeatured;
    dto.visibility = edition.visibility;
    dto.createdAt = edition.createdAt;
    return dto;
  }
}
