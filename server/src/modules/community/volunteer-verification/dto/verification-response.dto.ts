import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VerificationAction, VolunteerStatus, VolunteerVerification } from '@prisma/client';

export class VerificationHistoryItemDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: VerificationAction })
  action!: VerificationAction;

  @ApiProperty({ enum: VolunteerStatus })
  previousStatus!: VolunteerStatus;

  @ApiProperty({ enum: VolunteerStatus })
  currentStatus!: VolunteerStatus;

  @ApiPropertyOptional()
  remarks?: string | null;

  @ApiProperty()
  verifiedByName!: string;

  @ApiProperty()
  verifiedByEmail!: string;

  @ApiProperty()
  verificationDate!: Date;

  @ApiProperty()
  createdAt!: Date;

  static fromEntity(
    record: VolunteerVerification & { verifiedBy: { name: string; email: string } },
  ): VerificationHistoryItemDto {
    const dto = new VerificationHistoryItemDto();
    dto.id = record.id;
    dto.action = record.action;
    dto.previousStatus = record.previousStatus;
    dto.currentStatus = record.currentStatus;
    dto.remarks = record.remarks;
    dto.verifiedByName = record.verifiedBy.name;
    dto.verifiedByEmail = record.verifiedBy.email;
    dto.verificationDate = record.verificationDate;
    dto.createdAt = record.createdAt;
    return dto;
  }
}

export class AdminVolunteerDetailDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  volunteerCode!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  dateOfBirth!: Date;

  @ApiProperty()
  gender!: string;

  @ApiProperty()
  bloodGroup!: string;

  @ApiPropertyOptional()
  occupation?: string | null;

  @ApiPropertyOptional()
  organization?: string | null;

  @ApiProperty()
  addressLine1!: string;

  @ApiPropertyOptional()
  addressLine2?: string | null;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  state!: string;

  @ApiProperty()
  pincode!: string;

  @ApiProperty()
  country!: string;

  @ApiPropertyOptional()
  profilePhotoUrl?: string | null;

  @ApiPropertyOptional()
  motivation?: string | null;

  @ApiProperty({ type: [String] })
  skills!: string[];

  @ApiProperty({ type: [String] })
  languages!: string[];

  @ApiProperty()
  volunteerStatus!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ type: [Object] })
  identities!: AdminIdentityDto[];

  @ApiProperty({ type: [Object] })
  verificationHistory!: VerificationHistoryItemDto[];
}

export class AdminIdentityDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  documentType!: string;

  @ApiProperty()
  documentNumber!: string;

  @ApiPropertyOptional()
  documentFileUrl?: string | null;

  @ApiProperty()
  verificationStatus!: string;

  @ApiProperty()
  createdAt!: Date;
}

export class PendingVolunteerSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  volunteerCode!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  state!: string;

  @ApiProperty()
  volunteerStatus!: string;

  @ApiProperty()
  hasIdentityDocument!: boolean;

  @ApiProperty()
  createdAt!: Date;
}
