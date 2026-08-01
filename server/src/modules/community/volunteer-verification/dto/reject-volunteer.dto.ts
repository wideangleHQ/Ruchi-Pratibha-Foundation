import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RejectVolunteerDto {
  @ApiProperty({ example: 'Document image is blurred and unreadable.' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  reason!: string;

  @ApiPropertyOptional({ example: 'Please re-upload a clear photo of your Aadhaar card.' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  remarks?: string;
}
