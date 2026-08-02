import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CertificateType } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class GenerateCertificateDto {
  @ApiProperty()
  @IsUUID()
  participationId!: string;

  @ApiPropertyOptional({ enum: CertificateType })
  @IsOptional()
  @IsEnum(CertificateType)
  certificateType?: CertificateType;
}
