import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventSchedule } from '@prisma/client';

export class ScheduleResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() scheduleCode!: string;
  @ApiProperty() editionId!: string;
  @ApiPropertyOptional() sessionId?: string | null;
  @ApiPropertyOptional() speakerId?: string | null;
  @ApiPropertyOptional() venueId?: string | null;
  @ApiProperty() title!: string;
  @ApiPropertyOptional() description?: string | null;
  @ApiProperty() startTime!: Date;
  @ApiProperty() endTime!: Date;
  @ApiProperty() displayOrder!: number;
  @ApiProperty() scheduleStatus!: string;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: EventSchedule): ScheduleResponseDto {
    const dto = new ScheduleResponseDto();
    dto.id = entity.id;
    dto.scheduleCode = entity.scheduleCode;
    dto.editionId = entity.editionId;
    dto.sessionId = entity.sessionId;
    dto.speakerId = entity.speakerId;
    dto.venueId = entity.venueId;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.startTime = entity.startTime;
    dto.endTime = entity.endTime;
    dto.displayOrder = entity.displayOrder;
    dto.scheduleStatus = entity.scheduleStatus;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
