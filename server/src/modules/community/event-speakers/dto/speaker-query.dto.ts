import { ApiPropertyOptional } from '@nestjs/swagger';
import { SpeakerStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto';

export class SpeakerQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: SpeakerStatus })
  @IsOptional()
  @IsEnum(SpeakerStatus)
  status?: SpeakerStatus;
}
