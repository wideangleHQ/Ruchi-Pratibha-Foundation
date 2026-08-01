import { ApiPropertyOptional } from '@nestjs/swagger';
import { EventType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto';

export class EventQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: EventType })
  @IsOptional()
  @IsEnum(EventType)
  eventType?: EventType;
}
