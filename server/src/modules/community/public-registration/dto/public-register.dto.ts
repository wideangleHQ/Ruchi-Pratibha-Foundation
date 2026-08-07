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
import { Gender, IdentityDocumentType } from '@prisma/client';

export class PublicRegisterDto {
  // ─── Section 1: Personal Details ──────────────────────────────────────
  @ApiProperty({ example: 'Rahul Sharma' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  @Transform(({ value }: { value: string }) => value.trim())
  fullName!: string;

  @ApiProperty({ example: '1995-06-15' })
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth!: string;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender!: Gender;

  // ─── Section 2: Contact ───────────────────────────────────────────────
  @ApiProperty({ example: '+919876543210' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+91[6-9]\d{9}$/, { message: 'Mobile must be a valid Indian mobile number with +91 prefix' })
  mobile!: string;

  @ApiPropertyOptional({ example: '+919876543210' })
  @IsOptional()
  @IsString()
  @Matches(/^\+91[6-9]\d{9}$/, { message: 'WhatsApp number must be a valid Indian mobile number with +91 prefix' })
  whatsapp?: string;

  @ApiProperty({ example: 'rahul.sharma@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email!: string;

  // ─── Section 3: Address ───────────────────────────────────────────────
  @ApiProperty({ example: '42, MG Road, Near City Mall' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  address!: string;

  @ApiProperty({ example: 'Khordha' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  district!: string;

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

  // ─── Section 4: Government Identity ───────────────────────────────────
  @ApiProperty({ enum: IdentityDocumentType, example: IdentityDocumentType.AADHAAR })
  @IsNotEmpty()
  @IsEnum(IdentityDocumentType)
  identityDocumentType!: IdentityDocumentType;

  @ApiProperty({ example: '1234-5678-9012' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  identityDocumentNumber!: string;

  // ─── Section 5: Emergency Contact ─────────────────────────────────────
  @ApiProperty({ example: 'Priya Sharma' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  emergencyContactName!: string;

  @ApiProperty({ example: 'Mother' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  emergencyContactRelationship!: string;

  @ApiProperty({ example: '+919876543211' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+91[6-9]\d{9}$/, { message: 'Emergency contact mobile must be a valid Indian mobile number with +91 prefix' })
  emergencyContactMobile!: string;

  // ─── Section 6: Education ─────────────────────────────────────────────
  @ApiPropertyOptional({ example: 'Bachelor of Technology' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  qualification?: string;

  @ApiPropertyOptional({ example: 'Software Engineer' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  occupation?: string;

  @ApiPropertyOptional({ example: 'IIT Bhubaneswar' })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  organizationOrCollege?: string;

  // ─── Section 7: Skills ────────────────────────────────────────────────
  @ApiPropertyOptional({ example: 'Teaching, Photography, First Aid' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  skills?: string;

  // ─── Section 8: Availability ──────────────────────────────────────────
  @ApiPropertyOptional({ example: ['Weekdays', 'Morning', 'Afternoon'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  availability?: string[];

  // ─── Section 9: Application ───────────────────────────────────────────
  @ApiPropertyOptional({ example: 'I want to contribute to rural education initiatives' })
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  whyVolunteer?: string;

  @ApiPropertyOptional({ example: 'Volunteered at NGO XYZ for 2 years' })
  @IsOptional()
  @IsString()
  @MaxLength(3000)
  previousExperience?: string;

  @ApiPropertyOptional({ example: 'Available only on weekends' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  additionalNotes?: string;
}
