import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventShift } from '@prisma/client';

export class ShiftResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() shiftCode!: string;
  @ApiProperty() editionId!: string;
  @ApiProperty() name!: string;
  @ApiPropertyOptional() description?: string | null;
  @ApiProperty() startTime!: Date;
  @ApiProperty() endTime!: Date;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(s: EventShift): ShiftResponseDto {
    const dto = new ShiftResponseDto();
    dto.id = s.id;
    dto.shiftCode = s.shiftCode;
    dto.editionId = s.editionId;
    dto.name = s.name;
    dto.description = s.description;
    dto.startTime = s.startTime;
    dto.endTime = s.endTime;
    dto.status = s.status;
    dto.createdAt = s.createdAt;
    dto.updatedAt = s.updatedAt;
    return dto;
  }
}
