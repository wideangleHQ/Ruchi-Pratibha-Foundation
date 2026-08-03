import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  editionId!: string;

  @ApiProperty({ example: 'Opening Keynote' })
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

  @ApiPropertyOptional({ example: 'KEYNOTE' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  sessionType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  speakerId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  venueId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  capacity?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}
