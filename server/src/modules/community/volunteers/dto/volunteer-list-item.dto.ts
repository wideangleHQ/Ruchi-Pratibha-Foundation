import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Volunteer, VolunteerStatus } from '@prisma/client';

export class VolunteerListItemDto {
  @ApiProperty() id!: string;
  @ApiProperty() volunteerCode!: string;
  @ApiProperty() firstName!: string;
  @ApiProperty() lastName!: string;
  @ApiProperty() email!: string;
  @ApiProperty() phone!: string;
  @ApiProperty() city!: string;
  @ApiProperty() state!: string;
  @ApiProperty({ enum: VolunteerStatus }) volunteerStatus!: VolunteerStatus;
  @ApiPropertyOptional() occupation?: string | null;
  @ApiPropertyOptional() organization?: string | null;
  @ApiProperty() skills!: string[];
  @ApiProperty() createdAt!: Date;

  static fromEntity(v: Volunteer): VolunteerListItemDto {
    const dto = new VolunteerListItemDto();
    dto.id = v.id;
    dto.volunteerCode = v.volunteerCode;
    dto.firstName = v.firstName;
    dto.lastName = v.lastName;
    dto.email = v.email;
    dto.phone = v.phone;
    dto.city = v.city;
    dto.state = v.state;
    dto.volunteerStatus = v.volunteerStatus;
    dto.occupation = v.occupation;
    dto.organization = v.organization;
    dto.skills = v.skills;
    dto.createdAt = v.createdAt;
    return dto;
  }
}
