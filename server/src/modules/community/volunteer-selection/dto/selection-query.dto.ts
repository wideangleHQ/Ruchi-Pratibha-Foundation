import { ApiPropertyOptional } from '@nestjs/swagger';
import { SelectionStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto';

export class SelectionQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: SelectionStatus })
  @IsOptional()
  @IsEnum(SelectionStatus)
  status?: SelectionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  editionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  applicationId?: string;
}
