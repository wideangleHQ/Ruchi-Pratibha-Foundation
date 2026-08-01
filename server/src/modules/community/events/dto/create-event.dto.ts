import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Ruchi Prativa Sanman' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @Transform(({ value }: { value: string }) => value.trim())
  title!: string;

  @ApiProperty({ example: 'Annual award ceremony recognizing outstanding community contributors.' })
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

  @ApiProperty({ enum: EventType, example: EventType.AWARD })
  @IsNotEmpty()
  @IsEnum(EventType)
  eventType!: EventType;

  @ApiPropertyOptional({ example: '#FF5722' })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'primaryColor must be a valid hex color' })
  primaryColor?: string;

  @ApiPropertyOptional({ example: '#2196F3' })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'secondaryColor must be a valid hex color' })
  secondaryColor?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @ApiPropertyOptional({ example: 'Ruchi Prativa Sanman | RPF' })
  @IsOptional()
  @IsString()
  @MaxLength(70)
  seoTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(160)
  seoDescription?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  seoKeywords?: string[];
}
