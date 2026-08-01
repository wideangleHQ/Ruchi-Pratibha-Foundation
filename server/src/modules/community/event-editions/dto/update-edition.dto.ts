import { ApiPropertyOptional } from '@nestjs/swagger';
import { EditionVisibility } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateEditionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  @Transform(({ value }: { value: string }) => value.trim())
  editionName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  theme?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  shortDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  detailedDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  venue?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  venueAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(2000)
  googleMapsUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  registrationOpens?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  registrationCloses?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  eventStarts?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  eventEnds?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  volunteerCapacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  maxRegistrations?: number;

  @ApiPropertyOptional({ enum: EditionVisibility })
  @IsOptional()
  @IsEnum(EditionVisibility)
  visibility?: EditionVisibility;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  registrationEnabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  attendanceEnabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  certificateEnabled?: boolean;
}
