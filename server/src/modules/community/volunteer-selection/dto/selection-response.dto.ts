import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VolunteerSelection } from '@prisma/client';

export class SelectionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() selectionCode!: string;
  @ApiProperty() applicationId!: string;
  @ApiPropertyOptional() selectionScore?: number | null;
  @ApiPropertyOptional() recommendationScore?: number | null;
  @ApiProperty() selectionStatus!: string;
  @ApiPropertyOptional() selectionNotes?: string | null;
  @ApiPropertyOptional() selectedBy?: string | null;
  @ApiPropertyOptional() selectedAt?: Date | null;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: VolunteerSelection): SelectionResponseDto {
    const dto = new SelectionResponseDto();
    dto.id = entity.id;
    dto.selectionCode = entity.selectionCode;
    dto.applicationId = entity.applicationId;
    dto.selectionScore = entity.selectionScore;
    dto.recommendationScore = entity.recommendationScore;
    dto.selectionStatus = entity.selectionStatus;
    dto.selectionNotes = entity.selectionNotes;
    dto.selectedBy = entity.selectedBy;
    dto.selectedAt = entity.selectedAt;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
