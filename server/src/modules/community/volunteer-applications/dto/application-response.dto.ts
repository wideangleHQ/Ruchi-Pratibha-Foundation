import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VolunteerApplication } from '@prisma/client';

export class ApplicationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() applicationCode!: string;
  @ApiProperty() volunteerId!: string;
  @ApiProperty() editionId!: string;
  @ApiProperty() applicationStatus!: string;
  @ApiPropertyOptional() motivation?: string | null;
  @ApiPropertyOptional() relevantExperience?: string | null;
  @ApiProperty() skills!: string[];
  @ApiProperty() languages!: string[];
  @ApiPropertyOptional() medicalConditions?: string | null;
  @ApiProperty() emergencyContactName!: string;
  @ApiProperty() emergencyContactPhone!: string;
  @ApiPropertyOptional() availabilityNotes?: string | null;
  @ApiPropertyOptional() preferredShiftId?: string | null;
  @ApiPropertyOptional() preferredDepartmentId?: string | null;
  @ApiPropertyOptional() preferredRoleId?: string | null;
  @ApiPropertyOptional() expectedHours?: number | null;
  @ApiProperty() termsAccepted!: boolean;
  @ApiPropertyOptional() submittedAt?: Date | null;
  @ApiPropertyOptional() reviewedAt?: Date | null;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(a: VolunteerApplication): ApplicationResponseDto {
    const dto = new ApplicationResponseDto();
    dto.id = a.id;
    dto.applicationCode = a.applicationCode;
    dto.volunteerId = a.volunteerId;
    dto.editionId = a.editionId;
    dto.applicationStatus = a.applicationStatus;
    dto.motivation = a.motivation;
    dto.relevantExperience = a.relevantExperience;
    dto.skills = a.skills;
    dto.languages = a.languages;
    dto.medicalConditions = a.medicalConditions;
    dto.emergencyContactName = a.emergencyContactName;
    dto.emergencyContactPhone = a.emergencyContactPhone;
    dto.availabilityNotes = a.availabilityNotes;
    dto.preferredShiftId = a.preferredShiftId;
    dto.preferredDepartmentId = a.preferredDepartmentId;
    dto.preferredRoleId = a.preferredRoleId;
    dto.expectedHours = a.expectedHours;
    dto.termsAccepted = a.termsAccepted;
    dto.submittedAt = a.submittedAt;
    dto.reviewedAt = a.reviewedAt;
    dto.createdAt = a.createdAt;
    dto.updatedAt = a.updatedAt;
    return dto;
  }
}

interface ApplicationWithRelations extends VolunteerApplication {
  volunteer?: {
    firstName: string;
    lastName: string;
    email: string;
    volunteerCode: string;
    volunteerStatus?: string;
    phone?: string;
    city?: string;
    state?: string;
    skills?: string[];
  };
  edition?: {
    editionName: string;
    year: number;
    event: { title: string };
  };
}

export class AdminApplicationResponseDto extends ApplicationResponseDto {
  @ApiPropertyOptional() adminRemarks?: string | null;
  @ApiPropertyOptional() volunteerName?: string;
  @ApiPropertyOptional() volunteerEmail?: string;
  @ApiPropertyOptional() volunteerCode?: string;
  @ApiPropertyOptional() volunteerStatus?: string;
  @ApiPropertyOptional() volunteerCity?: string;
  @ApiPropertyOptional() volunteerState?: string;
  @ApiPropertyOptional() editionName?: string;
  @ApiPropertyOptional() eventTitle?: string;
  @ApiPropertyOptional() editionYear?: number;

  static fromEntityAdmin(a: ApplicationWithRelations): AdminApplicationResponseDto {
    const dto = new AdminApplicationResponseDto();
    Object.assign(dto, ApplicationResponseDto.fromEntity(a));
    dto.adminRemarks = a.adminRemarks;
    if (a.volunteer) {
      dto.volunteerName = `${a.volunteer.firstName} ${a.volunteer.lastName}`;
      dto.volunteerEmail = a.volunteer.email;
      dto.volunteerCode = a.volunteer.volunteerCode;
      dto.volunteerStatus = a.volunteer.volunteerStatus;
      dto.volunteerCity = a.volunteer.city;
      dto.volunteerState = a.volunteer.state;
    }
    if (a.edition) {
      dto.editionName = a.edition.editionName;
      dto.eventTitle = a.edition.event.title;
      dto.editionYear = a.edition.year;
    }
    return dto;
  }
}
