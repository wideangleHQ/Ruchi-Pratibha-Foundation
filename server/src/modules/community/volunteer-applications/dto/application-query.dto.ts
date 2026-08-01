import { ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto';

export class ApplicationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: ApplicationStatus })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  editionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  preferredDepartmentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  preferredRoleId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  preferredShiftId?: string;
}
