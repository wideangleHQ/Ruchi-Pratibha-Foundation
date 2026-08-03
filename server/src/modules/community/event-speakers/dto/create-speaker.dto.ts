import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, MaxLength, Min, MinLength } from 'class-validator';

export class CreateSpeakerDto {
  @ApiProperty({ example: 'Dr. Ramesh Panda' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  @Transform(({ value }: { value: string }) => value.trim())
  name!: string;

  @ApiPropertyOptional({ example: 'Chief Guest' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  designation?: string;

  @ApiPropertyOptional({ example: 'Odisha State Government' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  organization?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  biography?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  shortBio?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  photoAssetId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  twitterUrl?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}
