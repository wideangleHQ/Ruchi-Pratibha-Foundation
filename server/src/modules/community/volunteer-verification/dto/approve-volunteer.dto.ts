import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ApproveVolunteerDto {
  @ApiPropertyOptional({ example: 'Identity verified. Aadhaar matches profile.' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  remarks?: string;
}
