import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EditionVisibility } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEditionDto {
  @ApiProperty({ example: 'Ruchi Prativa Sanman 2026' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  @Transform(({ value }: { value: string }) => value.trim())
  editionName!: string;

  @ApiProperty({ example: 2026 })
  @IsNotEmpty()
  @IsInt()
  @Min(2000)
  year!: number;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  editionNumber?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  theme?: string;

  @ApiProperty({ example: 'The 2026 edition honoring outstanding Odisha contributors.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  shortDescription!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  detailedDescription?: string;

  @ApiProperty({ example: 'Bhubaneswar Convention Centre' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  venue!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  venueAddress?: string;

  @ApiPropertyOptional({ example: 'https://maps.google.com/?q=...' })
  @IsOptional()
  @IsUrl()
  @MaxLength(2000)
  googleMapsUrl?: string;

  @ApiPropertyOptional({ example: '2026-09-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  registrationOpens?: string;

  @ApiPropertyOptional({ example: '2026-09-15T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  registrationCloses?: string;

  @ApiProperty({ example: '2026-10-01T09:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  eventStarts!: string;

  @ApiProperty({ example: '2026-10-01T18:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  eventEnds!: string;

  @ApiPropertyOptional({ example: 50, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  volunteerCapacity?: number;

  @ApiPropertyOptional({ example: 200, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxRegistrations?: number;

  @ApiPropertyOptional({ enum: EditionVisibility, default: EditionVisibility.PUBLIC })
  @IsOptional()
  @IsEnum(EditionVisibility)
  visibility?: EditionVisibility;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  registrationEnabled?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  attendanceEnabled?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  certificateEnabled?: boolean;
}
