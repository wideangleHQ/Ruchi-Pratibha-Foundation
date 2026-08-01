import { Injectable, Logger } from '@nestjs/common';
import { IdentityDocumentType } from '@prisma/client';
import { VolunteersRepository, VolunteerWithIdentities } from './volunteers.repository';
import { RegisterVolunteerDto } from './dto/register-volunteer.dto';
import { CreateVolunteerIdentityDto } from './dto/create-volunteer-identity.dto';
import { VolunteerResponseDto } from './dto/volunteer-response.dto';
import { StorageService } from '../../../storage';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { HttpStatus } from '@nestjs/common';
import { ApiResponseDto } from '../../../common/dto';

@Injectable()
export class VolunteersService {
  private readonly logger = new Logger(VolunteersService.name);

  constructor(
    private readonly repository: VolunteersRepository,
    private readonly storageService: StorageService,
  ) {}

  async register(
    dto: RegisterVolunteerDto,
    identityDto?: CreateVolunteerIdentityDto,
    profilePhoto?: Express.Multer.File,
    identityDocument?: Express.Multer.File,
  ) {
    await this.validateNoDuplicate(dto.email, dto.phone);

    if (identityDto) {
      this.validateDocumentNumber(identityDto.documentType, identityDto.documentNumber);
    }

    let profilePhotoKey: string | undefined;
    if (profilePhoto) {
      const result = await this.storageService.uploadFile(
        {
          buffer: profilePhoto.buffer,
          mimetype: profilePhoto.mimetype,
          originalname: profilePhoto.originalname,
          size: profilePhoto.size,
        },
        'volunteers/photos',
      );
      profilePhotoKey = result.key;
    }

    const volunteerCode = await this.generateVolunteerCode();

    const volunteer = await this.repository.create({
      volunteerCode,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      dateOfBirth: new Date(dto.dateOfBirth),
      gender: dto.gender,
      bloodGroup: dto.bloodGroup,
      occupation: dto.occupation,
      organization: dto.organization,
      addressLine1: dto.addressLine1,
      addressLine2: dto.addressLine2,
      city: dto.city,
      state: dto.state,
      pincode: dto.pincode,
      country: dto.country ?? 'India',
      profilePhotoKey,
      emergencyName: dto.emergencyName,
      emergencyPhone: dto.emergencyPhone,
      motivation: dto.motivation,
      skills: dto.skills ?? [],
      languages: dto.languages ?? [],
      availableDays: dto.availableDays ?? [],
    });

    if (identityDto) {
      let documentFileKey: string | undefined;
      if (identityDocument) {
        const result = await this.storageService.uploadFile(
          {
            buffer: identityDocument.buffer,
            mimetype: identityDocument.mimetype,
            originalname: identityDocument.originalname,
            size: identityDocument.size,
          },
          'volunteers/identity-documents',
        );
        documentFileKey = result.key;
      }

      await this.repository.createIdentity({
        volunteerId: volunteer.id,
        documentType: identityDto.documentType,
        documentNumber: identityDto.documentNumber,
        documentFileKey,
      });
    }

    const created = await this.repository.findById(volunteer.id);
    const photoUrl = await this.resolveProfilePhotoUrl(created);

    this.logger.log(`Volunteer registered: ${volunteerCode} (${dto.email})`);

    return ApiResponseDto.success(
      VolunteerResponseDto.fromEntity(created!, photoUrl),
      'Volunteer registered successfully',
    );
  }

  async findById(id: string) {
    const volunteer = await this.repository.findById(id);
    if (!volunteer) {
      throw new EntityNotFoundException('Volunteer', id);
    }

    const photoUrl = await this.resolveProfilePhotoUrl(volunteer);

    return ApiResponseDto.success(
      VolunteerResponseDto.fromEntity(volunteer, photoUrl),
    );
  }

  async findByCode(code: string) {
    const volunteer = await this.repository.findByCode(code);
    if (!volunteer) {
      throw new EntityNotFoundException('Volunteer', code);
    }

    const photoUrl = await this.resolveProfilePhotoUrl(volunteer);

    return ApiResponseDto.success(
      VolunteerResponseDto.fromEntity(volunteer, photoUrl),
    );
  }

  private async validateNoDuplicate(email: string, phone: string): Promise<void> {
    const existingByEmail = await this.repository.findByEmail(email);
    if (existingByEmail) {
      throw new EntityConflictException('Volunteer', 'email');
    }

    const existingByPhone = await this.repository.findByPhone(phone);
    if (existingByPhone) {
      throw new EntityConflictException('Volunteer', 'phone');
    }
  }

  async generateVolunteerCode(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.repository.countByYear(year);
    const sequence = String(count + 1).padStart(5, '0');
    return `RPF-VOL-${year}-${sequence}`;
  }

  private validateDocumentNumber(type: IdentityDocumentType, number: string): void {
    const stripped = number.replace(/[\s-]/g, '');

    const patterns: Record<IdentityDocumentType, { regex: RegExp; label: string }> = {
      [IdentityDocumentType.AADHAAR]: { regex: /^\d{12}$/, label: 'Aadhaar must be 12 digits' },
      [IdentityDocumentType.PAN]: { regex: /^[A-Z]{5}\d{4}[A-Z]$/, label: 'PAN must be in format ABCDE1234F' },
      [IdentityDocumentType.VOTER_ID]: { regex: /^[A-Z]{3}\d{7}$/, label: 'Voter ID must be in format ABC1234567' },
      [IdentityDocumentType.DRIVING_LICENSE]: { regex: /^[A-Z]{2}\d{2}\s?\d{11}$/, label: 'Driving License format is invalid' },
      [IdentityDocumentType.PASSPORT]: { regex: /^[A-Z]\d{7}$/, label: 'Passport must be in format A1234567' },
    };

    const rule = patterns[type];
    if (!rule.regex.test(stripped)) {
      throw new BusinessException(
        rule.label,
        HttpStatus.BAD_REQUEST,
        'INVALID_DOCUMENT_NUMBER',
      );
    }
  }

  private async resolveProfilePhotoUrl(
    volunteer: VolunteerWithIdentities | null,
  ): Promise<string | null> {
    if (!volunteer?.profilePhotoKey) return null;
    try {
      return await this.storageService.getSignedUrl(volunteer.profilePhotoKey);
    } catch {
      return null;
    }
  }
}
