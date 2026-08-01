import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Venue } from '@prisma/client';

export class VenueResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() venueCode!: string;
  @ApiProperty() name!: string;
  @ApiPropertyOptional() description?: string | null;
  @ApiProperty() address!: string;
  @ApiPropertyOptional() district?: string | null;
  @ApiProperty() state!: string;
  @ApiProperty() country!: string;
  @ApiPropertyOptional() latitude?: number | null;
  @ApiPropertyOptional() longitude?: number | null;
  @ApiPropertyOptional() googleMapsUrl?: string | null;
  @ApiProperty() capacity!: number;
  @ApiProperty() venueType!: string;
  @ApiPropertyOptional() accessibilityDetails?: string | null;
  @ApiPropertyOptional() parkingInfo?: string | null;
  @ApiPropertyOptional() emergencyContact?: string | null;
  @ApiProperty() venueStatus!: string;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(v: Venue): VenueResponseDto {
    const dto = new VenueResponseDto();
    dto.id = v.id;
    dto.venueCode = v.venueCode;
    dto.name = v.name;
    dto.description = v.description;
    dto.address = v.address;
    dto.district = v.district;
    dto.state = v.state;
    dto.country = v.country;
    dto.latitude = v.latitude;
    dto.longitude = v.longitude;
    dto.googleMapsUrl = v.googleMapsUrl;
    dto.capacity = v.capacity;
    dto.venueType = v.venueType;
    dto.accessibilityDetails = v.accessibilityDetails;
    dto.parkingInfo = v.parkingInfo;
    dto.emergencyContact = v.emergencyContact;
    dto.venueStatus = v.venueStatus;
    dto.createdAt = v.createdAt;
    dto.updatedAt = v.updatedAt;
    return dto;
  }
}
