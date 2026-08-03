import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  editionId!: string;

  @ApiProperty({ example: 'Registration & Welcome' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(500)
  @Transform(({ value }: { value: string }) => value.trim())
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  sessionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  speakerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  venueId?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startTime!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endTime!: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;
}
