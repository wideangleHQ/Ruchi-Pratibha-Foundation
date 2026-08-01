import { ApiPropertyOptional } from '@nestjs/swagger';
import { EditionStatus, EditionVisibility } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto';

export class EditionQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: EditionStatus })
  @IsOptional()
  @IsEnum(EditionStatus)
  editionStatus?: EditionStatus;

  @ApiPropertyOptional({ enum: EditionVisibility })
  @IsOptional()
  @IsEnum(EditionVisibility)
  visibility?: EditionVisibility;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(2000)
  year?: number;
}
