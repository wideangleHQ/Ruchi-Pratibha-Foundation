import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BloodGroup, EntityStatus, Gender, Volunteer } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class VolunteerResponseDto {
  @Expose()
  @ApiProperty()
  id!: string;

  @Expose()
  @ApiProperty({ example: 'RPF-VOL-2026-00001' })
  volunteerCode!: string;

  @Expose()
  @ApiProperty()
  firstName!: string;

  @Expose()
  @ApiProperty()
  lastName!: string;

  @Expose()
  @ApiProperty()
  email!: string;

  @Expose()
  @ApiProperty()
  phone!: string;

  @Expose()
  @ApiProperty()
  dateOfBirth!: Date;

  @Expose()
  @ApiProperty({ enum: Gender })
  gender!: Gender;

  @Expose()
  @ApiProperty({ enum: BloodGroup })
  bloodGroup!: BloodGroup;

  @Expose()
  @ApiPropertyOptional()
  occupation?: string | null;

  @Expose()
  @ApiPropertyOptional()
  organization?: string | null;

  @Expose()
  @ApiProperty()
  addressLine1!: string;

  @Expose()
  @ApiPropertyOptional()
  addressLine2?: string | null;

  @Expose()
  @ApiProperty()
  city!: string;

  @Expose()
  @ApiProperty()
  state!: string;

  @Expose()
  @ApiProperty()
  pincode!: string;

  @Expose()
  @ApiProperty()
  country!: string;

  @Expose()
  @ApiPropertyOptional()
  profilePhotoUrl?: string | null;

  @Expose()
  @ApiPropertyOptional()
  emergencyName?: string | null;

  @Expose()
  @ApiPropertyOptional()
  emergencyPhone?: string | null;

  @Expose()
  @ApiPropertyOptional()
  motivation?: string | null;

  @Expose()
  @ApiProperty({ type: [String] })
  skills!: string[];

  @Expose()
  @ApiProperty({ type: [String] })
  languages!: string[];

  @Expose()
  @ApiProperty({ type: [String] })
  availableDays!: string[];

  @Expose()
  @ApiProperty({ enum: EntityStatus })
  status!: EntityStatus;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  @Expose()
  @ApiPropertyOptional({ type: [Object] })
  identities?: VolunteerIdentityResponseDto[];

  static fromEntity(volunteer: Volunteer & { identities?: VolunteerIdentityData[] }, profilePhotoUrl?: string | null): VolunteerResponseDto {
    const dto = new VolunteerResponseDto();
    dto.id = volunteer.id;
    dto.volunteerCode = volunteer.volunteerCode;
    dto.firstName = volunteer.firstName;
    dto.lastName = volunteer.lastName;
    dto.email = volunteer.email;
    dto.phone = volunteer.phone;
    dto.dateOfBirth = volunteer.dateOfBirth;
    dto.gender = volunteer.gender;
    dto.bloodGroup = volunteer.bloodGroup;
    dto.occupation = volunteer.occupation;
    dto.organization = volunteer.organization;
    dto.addressLine1 = volunteer.addressLine1;
    dto.addressLine2 = volunteer.addressLine2;
    dto.city = volunteer.city;
    dto.state = volunteer.state;
    dto.pincode = volunteer.pincode;
    dto.country = volunteer.country;
    dto.profilePhotoUrl = profilePhotoUrl ?? null;
    dto.emergencyName = volunteer.emergencyName;
    dto.emergencyPhone = volunteer.emergencyPhone;
    dto.motivation = volunteer.motivation;
    dto.skills = volunteer.skills;
    dto.languages = volunteer.languages;
    dto.availableDays = volunteer.availableDays;
    dto.status = volunteer.status;
    dto.createdAt = volunteer.createdAt;

    if (volunteer.identities) {
      dto.identities = volunteer.identities.map(VolunteerIdentityResponseDto.fromEntity);
    }

    return dto;
  }
}

interface VolunteerIdentityData {
  id: string;
  documentType: string;
  documentNumber: string;
  verificationStatus: string;
  createdAt: Date;
}

@Exclude()
export class VolunteerIdentityResponseDto {
  @Expose()
  @ApiProperty()
  id!: string;

  @Expose()
  @ApiProperty()
  documentType!: string;

  @Expose()
  @ApiProperty({ description: 'Masked document number' })
  documentNumber!: string;

  @Expose()
  @ApiProperty()
  verificationStatus!: string;

  @Expose()
  @ApiProperty()
  createdAt!: Date;

  static fromEntity(identity: VolunteerIdentityData): VolunteerIdentityResponseDto {
    const dto = new VolunteerIdentityResponseDto();
    dto.id = identity.id;
    dto.documentType = identity.documentType;
    dto.documentNumber = maskDocumentNumber(identity.documentNumber);
    dto.verificationStatus = identity.verificationStatus;
    dto.createdAt = identity.createdAt;
    return dto;
  }
}

function maskDocumentNumber(docNumber: string): string {
  if (docNumber.length <= 4) return '****';
  return '*'.repeat(docNumber.length - 4) + docNumber.slice(-4);
}
