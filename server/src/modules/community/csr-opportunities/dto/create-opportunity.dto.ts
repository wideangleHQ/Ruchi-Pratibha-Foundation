import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OpportunityMode, OpportunityStatus, OpportunityType, WorkflowType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateOpportunityDto {
  // Step 1: Basic Info
  @ApiProperty({ example: 'Beach Cleanup Drive 2025' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  @Transform(({ value }: { value: string }) => value.trim())
  title!: string;

  @ApiProperty({ enum: OpportunityType, example: OpportunityType.EVENT_BASED })
  @IsNotEmpty()
  @IsEnum(OpportunityType)
  opportunityType!: OpportunityType;

  @ApiPropertyOptional({ enum: OpportunityStatus, default: OpportunityStatus.DRAFT })
  @IsOptional()
  @IsEnum(OpportunityStatus)
  opportunityStatus?: OpportunityStatus;

  @ApiProperty({ example: 'A community beach cleanup drive for volunteers.' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  shortDescription!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  detailedDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  featuredImageKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bannerImageKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  eventId?: string;

  // Step 2: Schedule
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  registrationOpens?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  registrationCloses?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  eventStartDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  eventEndDate?: string;

  @ApiPropertyOptional({ example: '09:00' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  reportingTime?: string;

  @ApiPropertyOptional({ example: '17:00' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  closingTime?: string;

  @ApiPropertyOptional({ default: 'Asia/Kolkata' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  timeZone?: string;

  // Step 3: Location
  @ApiProperty({ enum: OpportunityMode, example: OpportunityMode.OFFLINE })
  @IsNotEmpty()
  @IsEnum(OpportunityMode)
  mode!: OpportunityMode;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(300)
  venue?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  landmark?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  pincode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  googleMapsUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  meetingLink?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  platform?: string;

  // Step 4: Volunteer Requirements
  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  volunteersRequired?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxApplications?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  minAge?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  maxAge?: number;

  @ApiPropertyOptional({ default: 'ANY' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  genderRestriction?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  experienceRequired?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requiredSkills?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  physicalRequirements?: string;

  // Step 5: Coordinator
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  coordinatorName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  coordinatorDesignation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  coordinatorEmail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(15)
  coordinatorMobile?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(15)
  coordinatorAltMobile?: string;

  // Step 6: Registration Form Config
  @ApiPropertyOptional({ example: { motivation: true, experience: true, skills: false, availability: true } })
  @IsOptional()
  @IsObject()
  formConfig?: Record<string, boolean>;

  // Step 7: Required Documents
  @ApiPropertyOptional({ type: [String], example: ['PROFILE_PHOTO', 'AADHAAR'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requiredDocuments?: string[];

  // Step 8: Media
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImageKeys?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brochureKey?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  supportingDocKeys?: string[];

  // Step 9: Visibility
  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  showOnHomepage?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  showOnCsrPage?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  acceptRegistrations?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  showCountdown?: boolean;

  // Step 10: SEO
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(70)
  metaTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(160)
  metaDescription?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ogImageKey?: string;

  // Step 11: Workflow
  @ApiPropertyOptional({ enum: WorkflowType, default: WorkflowType.MANUAL })
  @IsOptional()
  @IsEnum(WorkflowType)
  workflowType?: WorkflowType;

  // Step 12: Notifications
  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  notifyRegistration?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  notifyApproval?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  notifyRejection?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  notifyReminder?: boolean;

  // Step 14: Admin Notes
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  adminNotes?: string;
}
