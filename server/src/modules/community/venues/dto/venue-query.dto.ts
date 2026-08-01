import { ApiPropertyOptional } from '@nestjs/swagger';
import { VenueStatus, VenueType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto';

export class VenueQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: VenueStatus })
  @IsOptional()
  @IsEnum(VenueStatus)
  venueStatus?: VenueStatus;

  @ApiPropertyOptional({ enum: VenueType })
  @IsOptional()
  @IsEnum(VenueType)
  venueType?: VenueType;
}
