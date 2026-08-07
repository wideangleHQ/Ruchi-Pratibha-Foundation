import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import {
  ApplicationStatus,
  IdentityDocumentType,
  OpportunityStatus,
  WorkflowType,
} from '@prisma/client';
import { PrismaService } from '../../../database';
import { StorageService } from '../../../storage';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PublicRegisterDto } from './dto/public-register.dto';
import { RegistrationResponseDto } from './dto/registration-response.dto';

@Injectable()
export class PublicRegistrationService {
  private readonly logger = new Logger(PublicRegistrationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async registerForOpportunity(
    opportunityId: string,
    dto: PublicRegisterDto,
    profilePhoto?: Express.Multer.File,
    identityDocument?: Express.Multer.File,
  ) {
    const opportunity = await this.validateOpportunity(opportunityId);

    await this.validateNoDuplicateVolunteer(dto.email, dto.mobile);

    this.validateDocumentNumber(dto.identityDocumentType, dto.identityDocumentNumber);

    if (!identityDocument) {
      throw new BusinessException('Government ID document upload is required', HttpStatus.BAD_REQUEST, 'DOCUMENT_REQUIRED');
    }

    const { firstName, lastName } = this.splitFullName(dto.fullName);

    let profilePhotoKey: string | undefined;
    let documentFileKey: string | undefined;

    try {
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

      const docResult = await this.storageService.uploadFile(
        {
          buffer: identityDocument.buffer,
          mimetype: identityDocument.mimetype,
          originalname: identityDocument.originalname,
          size: identityDocument.size,
        },
        'volunteers/identity-documents',
      );
      documentFileKey = docResult.key;
    } catch {
      throw new BusinessException(
        'Failed to upload files. Please try again.',
        HttpStatus.BAD_REQUEST,
        'FILE_UPLOAD_FAILED',
      );
    }

    const volunteerCode = await this.generateVolunteerCode();
    const applicationCode = await this.generateApplicationCode();
    const now = new Date();

    const shouldAutoApprove = opportunity.workflowType === WorkflowType.AUTOMATIC;
    const applicationStatus = shouldAutoApprove
      ? ApplicationStatus.APPROVED
      : ApplicationStatus.SUBMITTED;

    const skillsArray = dto.skills
      ? dto.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const result = await this.prisma.$transaction(async (tx) => {
      const volunteer = await tx.volunteer.create({
        data: {
          volunteerCode,
          firstName,
          lastName,
          email: dto.email,
          phone: dto.mobile,
          dateOfBirth: new Date(dto.dateOfBirth),
          gender: dto.gender,
          occupation: dto.occupation ?? null,
          organization: dto.organizationOrCollege ?? null,
          addressLine1: dto.address,
          city: dto.district,
          state: dto.state,
          pincode: dto.pincode,
          country: 'India',
          profilePhotoKey: profilePhotoKey ?? null,
          emergencyName: dto.emergencyContactName,
          emergencyPhone: dto.emergencyContactMobile,
          motivation: dto.whyVolunteer ?? null,
          skills: skillsArray,
          availableDays: dto.availability ?? [],
        },
      });

      await tx.volunteerIdentity.create({
        data: {
          volunteerId: volunteer.id,
          documentType: dto.identityDocumentType,
          documentNumber: dto.identityDocumentNumber,
          documentFileKey,
        },
      });

      if (!opportunity.editionId) {
        throw new BusinessException(
          'This opportunity is not linked to an event edition. Please contact the administrator.',
          HttpStatus.BAD_REQUEST,
          'NO_EDITION_LINKED',
        );
      }

      const existingApplication = await tx.volunteerApplication.findFirst({
        where: {
          volunteerId: volunteer.id,
          editionId: opportunity.editionId,
          deletedAt: null,
          applicationStatus: { notIn: [ApplicationStatus.WITHDRAWN, ApplicationStatus.EXPIRED] },
        },
      });

      if (existingApplication) {
        throw new EntityConflictException('VolunteerApplication', 'volunteer+edition');
      }

      const application = await tx.volunteerApplication.create({
        data: {
          applicationCode,
          volunteerId: volunteer.id,
          editionId: opportunity.editionId,
          applicationStatus: applicationStatus,
          motivation: dto.whyVolunteer ?? null,
          relevantExperience: dto.previousExperience ?? null,
          skills: skillsArray,
          emergencyContactName: dto.emergencyContactName,
          emergencyContactPhone: dto.emergencyContactMobile,
          availabilityNotes: dto.additionalNotes ?? null,
          termsAccepted: true,
          submittedAt: now,
          reviewedAt: shouldAutoApprove ? now : null,
          createdBy: volunteer.id,
          updatedBy: volunteer.id,
        },
      });

      return { volunteer, application };
    });

    this.logger.log(
      `Public registration: volunteer ${volunteerCode}, application ${applicationCode} for opportunity ${opportunity.opportunityCode}`,
    );

    return ApiResponseDto.success(
      RegistrationResponseDto.create({
        applicationCode: result.application.applicationCode,
        volunteerCode: result.volunteer.volunteerCode,
        applicationStatus: result.application.applicationStatus,
        opportunityTitle: opportunity.title,
        opportunitySlug: opportunity.slug,
        submittedAt: result.application.submittedAt!,
      }),
      'Registration completed successfully. Your application has been submitted.',
    );
  }

  private async validateOpportunity(opportunityId: string) {
    const opportunity = await this.prisma.csrOpportunity.findFirst({
      where: { id: opportunityId, deletedAt: null },
    });

    if (!opportunity) {
      throw new EntityNotFoundException('Opportunity', opportunityId);
    }

    if (!['PUBLISHED', 'REGISTRATION_OPEN'].includes(opportunity.opportunityStatus)) {
      throw new BusinessException(
        'This opportunity is not currently accepting registrations',
        HttpStatus.BAD_REQUEST,
        'OPPORTUNITY_NOT_PUBLISHED',
      );
    }

    if (!opportunity.acceptRegistrations) {
      throw new BusinessException(
        'Registrations are not enabled for this opportunity',
        HttpStatus.BAD_REQUEST,
        'REGISTRATIONS_DISABLED',
      );
    }

    if (opportunity.opportunityStatus === OpportunityStatus.ARCHIVED) {
      throw new BusinessException(
        'This opportunity has been archived',
        HttpStatus.BAD_REQUEST,
        'OPPORTUNITY_ARCHIVED',
      );
    }

    const now = new Date();

    if (opportunity.registrationOpens && now < opportunity.registrationOpens) {
      throw new BusinessException(
        'Registration has not opened yet',
        HttpStatus.BAD_REQUEST,
        'REGISTRATION_NOT_OPEN',
      );
    }

    if (opportunity.registrationCloses && now > opportunity.registrationCloses) {
      throw new BusinessException(
        'Registration deadline has passed',
        HttpStatus.BAD_REQUEST,
        'REGISTRATION_CLOSED',
      );
    }

    if (opportunity.maxApplications > 0 && opportunity.editionId) {
      const applicationCount = await this.prisma.volunteerApplication.count({
        where: {
          editionId: opportunity.editionId,
          deletedAt: null,
          applicationStatus: { notIn: [ApplicationStatus.WITHDRAWN, ApplicationStatus.EXPIRED, ApplicationStatus.REJECTED] },
        },
      });

      if (applicationCount >= opportunity.maxApplications) {
        throw new BusinessException(
          'This opportunity has reached its maximum number of applications',
          HttpStatus.BAD_REQUEST,
          'OPPORTUNITY_FULL',
        );
      }
    }

    return opportunity;
  }

  private async validateNoDuplicateVolunteer(email: string, phone: string): Promise<void> {
    const existingByEmail = await this.prisma.volunteer.findFirst({
      where: { email, deletedAt: null },
    });
    if (existingByEmail) {
      throw new EntityConflictException('Volunteer', 'email');
    }

    const existingByPhone = await this.prisma.volunteer.findFirst({
      where: { phone, deletedAt: null },
    });
    if (existingByPhone) {
      throw new EntityConflictException('Volunteer', 'phone');
    }
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
      throw new BusinessException(rule.label, HttpStatus.BAD_REQUEST, 'INVALID_DOCUMENT_NUMBER');
    }
  }

  private splitFullName(fullName: string): { firstName: string; lastName: string } {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: '' };
    }
    const lastName = parts.pop()!;
    const firstName = parts.join(' ');
    return { firstName, lastName };
  }

  private async generateVolunteerCode(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.volunteer.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00.000Z`),
          lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
        },
      },
    });
    return `RPF-VOL-${year}-${String(count + 1).padStart(5, '0')}`;
  }

  private async generateApplicationCode(): Promise<string> {
    const total = await this.prisma.volunteerApplication.count();
    return `RPF-APP-${(total + 1).toString().padStart(6, '0')}`;
  }
}
