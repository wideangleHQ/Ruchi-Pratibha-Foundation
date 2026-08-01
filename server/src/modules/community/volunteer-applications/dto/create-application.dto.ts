import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ example: 'uuid-of-event-edition' })
  @IsNotEmpty()
  @IsUUID()
  editionId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  motivation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  relevantExperience?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  medicalConditions?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }: { value: string }) => value.trim())
  emergencyContactName!: string;

  @ApiProperty({ example: '+91-9876543210' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  emergencyContactPhone!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  availabilityNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  preferredShiftId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  preferredDepartmentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  preferredRoleId?: string;

  @ApiPropertyOptional({ example: 8 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(24)
  expectedHours?: number;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  termsAccepted!: boolean;
}
