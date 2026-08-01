import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BloodGroup, Gender } from '@prisma/client';

export class RegisterVolunteerDto {
  @ApiProperty({ example: 'Rahul' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }: { value: string }) => value.trim())
  firstName!: string;

  @ApiProperty({ example: 'Sharma' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }: { value: string }) => value.trim())
  lastName!: string;

  @ApiProperty({ example: 'rahul.sharma@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email!: string;

  @ApiProperty({ example: '+919876543210' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+91[6-9]\d{9}$/, { message: 'Phone must be a valid Indian mobile number with +91 prefix' })
  phone!: string;

  @ApiProperty({ example: '1995-06-15' })
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth!: string;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender!: Gender;

  @ApiPropertyOptional({ enum: BloodGroup, example: BloodGroup.O_POSITIVE })
  @IsOptional()
  @IsEnum(BloodGroup)
  bloodGroup?: BloodGroup;

  @ApiPropertyOptional({ example: 'Software Engineer' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  occupation?: string;

  @ApiPropertyOptional({ example: 'Tata Consultancy Services' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  organization?: string;

  @ApiProperty({ example: '42, MG Road' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  addressLine1!: string;

  @ApiPropertyOptional({ example: 'Near City Mall' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  addressLine2?: string;

  @ApiProperty({ example: 'Bhubaneswar' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  city!: string;

  @ApiProperty({ example: 'Odisha' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  state!: string;

  @ApiProperty({ example: '751001' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{6}$/, { message: 'Pincode must be a 6-digit number' })
  pincode!: string;

  @ApiPropertyOptional({ example: 'India', default: 'India' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({ example: 'Priya Sharma' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  emergencyName?: string;

  @ApiPropertyOptional({ example: '+919876543211' })
  @IsOptional()
  @IsString()
  @Matches(/^\+91[6-9]\d{9}$/, { message: 'Emergency phone must be a valid Indian mobile number with +91 prefix' })
  emergencyPhone?: string;

  @ApiPropertyOptional({ example: 'I want to contribute to rural education initiatives' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  motivation?: string;

  @ApiPropertyOptional({ example: ['Teaching', 'First Aid', 'Photography'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({ example: ['Hindi', 'Odia', 'English'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @ApiPropertyOptional({ example: ['Saturday', 'Sunday'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  availableDays?: string[];
}
