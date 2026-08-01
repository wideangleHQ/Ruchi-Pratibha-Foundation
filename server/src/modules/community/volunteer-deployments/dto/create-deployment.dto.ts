import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateDeploymentDto {
  @ApiProperty()
  @IsUUID()
  assignmentId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  reportingDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  reportingTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reportingLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  reportingInstructions?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  coordinatorId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;
}
