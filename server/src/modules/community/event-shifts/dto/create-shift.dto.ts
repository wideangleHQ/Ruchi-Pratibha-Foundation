import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateShiftDto {
  @ApiProperty({ example: 'Morning Shift' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }: { value: string }) => value.trim())
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: '2026-10-01T06:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  startTime!: string;

  @ApiProperty({ example: '2026-10-01T12:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  endTime!: string;
}
