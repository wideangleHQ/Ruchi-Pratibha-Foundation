import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventSpeaker } from '@prisma/client';

export class SpeakerResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() speakerCode!: string;
  @ApiProperty() name!: string;
  @ApiProperty() slug!: string;
  @ApiPropertyOptional() designation?: string | null;
  @ApiPropertyOptional() organization?: string | null;
  @ApiPropertyOptional() biography?: string | null;
  @ApiPropertyOptional() shortBio?: string | null;
  @ApiPropertyOptional() photoAssetId?: string | null;
  @ApiPropertyOptional() email?: string | null;
  @ApiPropertyOptional() phone?: string | null;
  @ApiPropertyOptional() website?: string | null;
  @ApiPropertyOptional() linkedinUrl?: string | null;
  @ApiPropertyOptional() twitterUrl?: string | null;
  @ApiProperty() speakerStatus!: string;
  @ApiProperty() sortOrder!: number;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: EventSpeaker): SpeakerResponseDto {
    const dto = new SpeakerResponseDto();
    dto.id = entity.id;
    dto.speakerCode = entity.speakerCode;
    dto.name = entity.name;
    dto.slug = entity.slug;
    dto.designation = entity.designation;
    dto.organization = entity.organization;
    dto.biography = entity.biography;
    dto.shortBio = entity.shortBio;
    dto.photoAssetId = entity.photoAssetId;
    dto.email = entity.email;
    dto.phone = entity.phone;
    dto.website = entity.website;
    dto.linkedinUrl = entity.linkedinUrl;
    dto.twitterUrl = entity.twitterUrl;
    dto.speakerStatus = entity.speakerStatus;
    dto.sortOrder = entity.sortOrder;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
