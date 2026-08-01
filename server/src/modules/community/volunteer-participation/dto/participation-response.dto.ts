import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VolunteerParticipation } from '@prisma/client';

export class ParticipationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() participationCode!: string;
  @ApiProperty() deploymentId!: string;
  @ApiProperty() assignmentId!: string;
  @ApiProperty() volunteerId!: string;
  @ApiProperty() editionId!: string;
  @ApiProperty() participationStatus!: string;
  @ApiPropertyOptional() reportedDate?: Date | null;
  @ApiPropertyOptional() completionDate?: Date | null;
  @ApiPropertyOptional() coordinatorRemarks?: string | null;
  @ApiPropertyOptional() verifiedBy?: string | null;
  @ApiPropertyOptional() verifiedAt?: Date | null;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: VolunteerParticipation): ParticipationResponseDto {
    const dto = new ParticipationResponseDto();
    dto.id = entity.id;
    dto.participationCode = entity.participationCode;
    dto.deploymentId = entity.deploymentId;
    dto.assignmentId = entity.assignmentId;
    dto.volunteerId = entity.volunteerId;
    dto.editionId = entity.editionId;
    dto.participationStatus = entity.participationStatus;
    dto.reportedDate = entity.reportedDate;
    dto.completionDate = entity.completionDate;
    dto.coordinatorRemarks = entity.coordinatorRemarks;
    dto.verifiedBy = entity.verifiedBy;
    dto.verifiedAt = entity.verifiedAt;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
