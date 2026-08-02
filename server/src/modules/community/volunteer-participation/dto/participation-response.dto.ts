import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VolunteerParticipation } from '@prisma/client';

export class ParticipationResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() participationCode!: string;
  @ApiProperty() applicationId!: string;
  @ApiProperty() volunteerId!: string;
  @ApiProperty() editionId!: string;
  @ApiProperty() participationStatus!: string;
  @ApiPropertyOptional() startedAt?: Date | null;
  @ApiPropertyOptional() completedAt?: Date | null;
  @ApiPropertyOptional() coordinatorRemarks?: string | null;
  @ApiPropertyOptional() completionNotes?: string | null;
  @ApiProperty() certificateEligible!: boolean;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: VolunteerParticipation): ParticipationResponseDto {
    const dto = new ParticipationResponseDto();
    dto.id = entity.id;
    dto.participationCode = entity.participationCode;
    dto.applicationId = entity.applicationId;
    dto.volunteerId = entity.volunteerId;
    dto.editionId = entity.editionId;
    dto.participationStatus = entity.participationStatus;
    dto.startedAt = entity.startedAt;
    dto.completedAt = entity.completedAt;
    dto.coordinatorRemarks = entity.coordinatorRemarks;
    dto.completionNotes = entity.completionNotes;
    dto.certificateEligible = entity.certificateEligible;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
