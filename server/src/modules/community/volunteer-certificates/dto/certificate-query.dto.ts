import { ApiPropertyOptional } from '@nestjs/swagger';
import { CertificateStatus, CertificateType } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from '../../../../common/dto';

export class CertificateQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: CertificateStatus })
  @IsOptional()
  @IsEnum(CertificateStatus)
  status?: CertificateStatus;

  @ApiPropertyOptional({ enum: CertificateType })
  @IsOptional()
  @IsEnum(CertificateType)
  type?: CertificateType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  editionId?: string;
}
