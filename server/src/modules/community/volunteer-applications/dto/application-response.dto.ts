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

export class AdminApplicationResponseDto extends ApplicationResponseDto {
  @ApiPropertyOptional() adminRemarks?: string | null;

  static fromEntityAdmin(a: VolunteerApplication): AdminApplicationResponseDto {
    const dto = new AdminApplicationResponseDto();
    Object.assign(dto, ApplicationResponseDto.fromEntity(a));
    dto.adminRemarks = a.adminRemarks;
    return dto;
  }
}
