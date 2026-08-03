import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventSession } from '@prisma/client';

export class SessionResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() sessionCode!: string;
  @ApiProperty() editionId!: string;
  @ApiProperty() title!: string;
  @ApiProperty() slug!: string;
  @ApiPropertyOptional() description?: string | null;
  @ApiPropertyOptional() sessionType?: string | null;
  @ApiPropertyOptional() speakerId?: string | null;
  @ApiPropertyOptional() venueId?: string | null;
  @ApiPropertyOptional() startTime?: Date | null;
  @ApiPropertyOptional() endTime?: Date | null;
  @ApiPropertyOptional() capacity?: number | null;
  @ApiProperty() sessionStatus!: string;
  @ApiProperty() sortOrder!: number;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: EventSession): SessionResponseDto {
    const dto = new SessionResponseDto();
    dto.id = entity.id;
    dto.sessionCode = entity.sessionCode;
    dto.editionId = entity.editionId;
    dto.title = entity.title;
    dto.slug = entity.slug;
    dto.description = entity.description;
    dto.sessionType = entity.sessionType;
    dto.speakerId = entity.speakerId;
    dto.venueId = entity.venueId;
    dto.startTime = entity.startTime;
    dto.endTime = entity.endTime;
    dto.capacity = entity.capacity;
    dto.sessionStatus = entity.sessionStatus;
    dto.sortOrder = entity.sortOrder;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
