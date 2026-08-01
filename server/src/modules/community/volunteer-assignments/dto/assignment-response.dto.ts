import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VolunteerAssignment } from '@prisma/client';

export class AssignmentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() assignmentCode!: string;
  @ApiProperty() selectionId!: string;
  @ApiProperty() volunteerId!: string;
  @ApiProperty() editionId!: string;
  @ApiProperty() departmentId!: string;
  @ApiProperty() roleId!: string;
  @ApiProperty() shiftId!: string;
  @ApiProperty() venueId!: string;
  @ApiPropertyOptional() reportingManager?: string | null;
  @ApiPropertyOptional() reportingInstructions?: string | null;
  @ApiPropertyOptional() reportingTime?: Date | null;
  @ApiProperty() assignmentStatus!: string;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: VolunteerAssignment): AssignmentResponseDto {
    const dto = new AssignmentResponseDto();
    dto.id = entity.id;
    dto.assignmentCode = entity.assignmentCode;
    dto.selectionId = entity.selectionId;
    dto.volunteerId = entity.volunteerId;
    dto.editionId = entity.editionId;
    dto.departmentId = entity.departmentId;
    dto.roleId = entity.roleId;
    dto.shiftId = entity.shiftId;
    dto.venueId = entity.venueId;
    dto.reportingManager = entity.reportingManager;
    dto.reportingInstructions = entity.reportingInstructions;
    dto.reportingTime = entity.reportingTime;
    dto.assignmentStatus = entity.assignmentStatus;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
