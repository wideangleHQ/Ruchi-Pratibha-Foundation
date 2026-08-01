import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VolunteerDeployment } from '@prisma/client';

export class DeploymentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() deploymentCode!: string;
  @ApiProperty() assignmentId!: string;
  @ApiProperty() volunteerId!: string;
  @ApiProperty() editionId!: string;
  @ApiProperty() deploymentStatus!: string;
  @ApiPropertyOptional() reportingDate?: Date | null;
  @ApiPropertyOptional() reportingTime?: Date | null;
  @ApiPropertyOptional() reportingLocation?: string | null;
  @ApiPropertyOptional() reportingInstructions?: string | null;
  @ApiPropertyOptional() coordinatorId?: string | null;
  @ApiPropertyOptional() notes?: string | null;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: VolunteerDeployment): DeploymentResponseDto {
    const dto = new DeploymentResponseDto();
    dto.id = entity.id;
    dto.deploymentCode = entity.deploymentCode;
    dto.assignmentId = entity.assignmentId;
    dto.volunteerId = entity.volunteerId;
    dto.editionId = entity.editionId;
    dto.deploymentStatus = entity.deploymentStatus;
    dto.reportingDate = entity.reportingDate;
    dto.reportingTime = entity.reportingTime;
    dto.reportingLocation = entity.reportingLocation;
    dto.reportingInstructions = entity.reportingInstructions;
    dto.coordinatorId = entity.coordinatorId;
    dto.notes = entity.notes;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
