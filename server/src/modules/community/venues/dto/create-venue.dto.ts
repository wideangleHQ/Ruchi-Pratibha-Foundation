import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VenueType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateVenueDto {
  @ApiProperty({ example: 'Bhubaneswar Convention Centre' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  @Transform(({ value }: { value: string }) => value.trim())
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({ example: 'Janpath, Bhubaneswar, Odisha 751001' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  address!: string;

  @ApiPropertyOptional({ example: 'Khurda' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string;

  @ApiProperty({ example: 'Odisha' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  state!: string;

  @ApiPropertyOptional({ default: 'India' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({ example: 20.2961 })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({ example: 85.8245 })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(2000)
  googleMapsUrl?: string;

  @ApiPropertyOptional({ example: 500, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  capacity?: number;

  @ApiPropertyOptional({ enum: VenueType, default: VenueType.INDOOR })
  @IsOptional()
  @IsEnum(VenueType)
  venueType?: VenueType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  accessibilityDetails?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  parkingInfo?: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  emergencyContact?: string;
}
