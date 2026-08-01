import { ApiPropertyOptional } from '@nestjs/swagger';
import { DeploymentStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto';

export class DeploymentQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: DeploymentStatus })
  @IsOptional()
  @IsEnum(DeploymentStatus)
  status?: DeploymentStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  editionId?: string;
}
