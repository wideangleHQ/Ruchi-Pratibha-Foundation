import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDateString, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class BulkAssignDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  selectionIds!: string[];

  @ApiProperty()
  @IsUUID()
  departmentId!: string;

  @ApiProperty()
  @IsUUID()
  roleId!: string;

  @ApiProperty()
  @IsUUID()
  shiftId!: string;

  @ApiProperty()
  @IsUUID()
  venueId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  reportingManager?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  reportingInstructions?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  reportingTime?: string;
}
