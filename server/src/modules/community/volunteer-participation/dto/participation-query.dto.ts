import { ApiPropertyOptional } from '@nestjs/swagger';
import { ParticipationStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto';

export class ParticipationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: ParticipationStatus })
  @IsOptional()
  @IsEnum(ParticipationStatus)
  status?: ParticipationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  editionId?: string;
}
