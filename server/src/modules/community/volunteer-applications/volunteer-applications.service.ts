import { Injectable, Logger } from '@nestjs/common';
import { ApplicationStatus, EditionStatus, VolunteerStatus, WorkflowType } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
  ForbiddenResourceException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import {
  AdminApplicationResponseDto,
  AdminReviewDto,
  ApplicationQueryDto,
  ApplicationResponseDto,
  CreateApplicationDto,
} from './dto';
import { VolunteerApplicationsRepository } from './volunteer-applications.repository';

const VALID_TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  [ApplicationStatus.DRAFT]: [ApplicationStatus.SUBMITTED, ApplicationStatus.WITHDRAWN],
  [ApplicationStatus.SUBMITTED]: [ApplicationStatus.UNDER_REVIEW, ApplicationStatus.WITHDRAWN],
  [ApplicationStatus.UNDER_REVIEW]: [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED, ApplicationStatus.WAITLISTED],
  [ApplicationStatus.APPROVED]: [],
  [ApplicationStatus.REJECTED]: [],
  [ApplicationStatus.WAITLISTED]: [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED],
  [ApplicationStatus.WITHDRAWN]: [],
  [ApplicationStatus.EXPIRED]: [],
};

const INELIGIBLE_EDITION_STATUSES = new Set<string>([
  EditionStatus.DRAFT,
  EditionStatus.CANCELLED,
  EditionStatus.ARCHIVED,
  EditionStatus.COMPLETED,
]);

@Injectable()
export class VolunteerApplicationsService {
  private readonly logger = new Logger(VolunteerApplicationsService.name);

  constructor(private readonly repository: VolunteerApplicationsRepository) {}

  async submitApplication(volunteerId: string, dto: CreateApplicationDto) {
    if (!dto.termsAccepted) {
      throw new BusinessException('Terms and conditions must be accepted');
    }

    const volunteer = await this.repository.volunteerExists(volunteerId);
    if (!volunteer.exists) throw new EntityNotFoundException('Volunteer', volunteerId);
    if (volunteer.status !== VolunteerStatus.VERIFIED) {
      throw new BusinessException('Only verified volunteers can submit applications');
    }

    const edition = await this.repository.editionExists(dto.editionId);
    if (!edition.exists) throw new EntityNotFoundException('EventEdition', dto.editionId);
    if (INELIGIBLE_EDITION_STATUSES.has(edition.editionStatus!)) {
      throw new BusinessException(`Cannot apply to an edition with status "${edition.editionStatus}"`);
    }
    if (!edition.registrationEnabled) {
      throw new BusinessException('Registration is not enabled for this event edition');
    }
    if (edition.registrationCloses && new Date() > edition.registrationCloses) {
      throw new BusinessException('Application deadline has passed');
    }
    if (edition.csrOpportunity) {
      if (!edition.csrOpportunity.acceptRegistrations) {
        throw new BusinessException('This opportunity is not accepting registrations');
      }
      if (!['PUBLISHED', 'REGISTRATION_OPEN'].includes(edition.csrOpportunity.opportunityStatus)) {
        throw new BusinessException(`Cannot apply to an opportunity with status "${edition.csrOpportunity.opportunityStatus}"`);
      }
      if (edition.csrOpportunity.registrationOpens && new Date() < edition.csrOpportunity.registrationOpens) {
        throw new BusinessException('Registration is not open yet');
      }
      if (edition.csrOpportunity.registrationCloses && new Date() > edition.csrOpportunity.registrationCloses) {
        throw new BusinessException('Application deadline has passed');
      }
    }

    const existing = await this.repository.findActiveByVolunteerAndEdition(volunteerId, dto.editionId);
    if (existing) {
      throw new EntityConflictException('VolunteerApplication', 'volunteer+edition');
    }

    await this.validatePreferences(dto);

    const applicationCode = await this.generateCode();

    const shouldAutoApprove = edition.csrOpportunity?.workflowType === WorkflowType.AUTOMATIC;

    const application = await this.repository.create({
      applicationCode,
      volunteerId,
      editionId: dto.editionId,
      applicationStatus: shouldAutoApprove ? ApplicationStatus.APPROVED : ApplicationStatus.SUBMITTED,
      motivation: dto.motivation ?? null,
      relevantExperience: dto.relevantExperience ?? null,
      skills: dto.skills ?? [],
      languages: dto.languages ?? [],
      medicalConditions: dto.medicalConditions ?? null,
      emergencyContactName: dto.emergencyContactName,
      emergencyContactPhone: dto.emergencyContactPhone,
      availabilityNotes: dto.availabilityNotes ?? null,
      preferredShiftId: dto.preferredShiftId ?? null,
      preferredDepartmentId: dto.preferredDepartmentId ?? null,
      preferredRoleId: dto.preferredRoleId ?? null,
      expectedHours: dto.expectedHours ?? null,
      termsAccepted: true,
      submittedAt: new Date(),
      reviewedAt: shouldAutoApprove ? new Date() : null,
      createdBy: volunteerId,
      updatedBy: volunteerId,
    });

    this.logger.log(`Application ${application.applicationCode} submitted by volunteer ${volunteerId}`);
    return ApiResponseDto.success(ApplicationResponseDto.fromEntity(application), 'Application submitted successfully');
  }

  async getVolunteerApplications(volunteerId: string, query: ApplicationQueryDto) {
    const { data, total } = await this.repository.findManyByVolunteer(volunteerId, {
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
    const items = data.map((a) => ApplicationResponseDto.fromEntity(a));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Applications retrieved');
  }

  async getVolunteerApplicationByCode(volunteerId: string, code: string) {
    const app = await this.repository.findByCode(code);
    if (!app) throw new EntityNotFoundException('VolunteerApplication', code);
    if (app.volunteerId !== volunteerId) throw new ForbiddenResourceException('application');
    return ApiResponseDto.success(ApplicationResponseDto.fromEntity(app), 'Application retrieved');
  }

  async withdrawApplication(volunteerId: string, code: string) {
    const app = await this.repository.findByCode(code);
    if (!app) throw new EntityNotFoundException('VolunteerApplication', code);
    if (app.volunteerId !== volunteerId) throw new ForbiddenResourceException('application');

    this.validateTransition(app.applicationStatus, ApplicationStatus.WITHDRAWN);

    const updated = await this.repository.update(app.id, {
      applicationStatus: ApplicationStatus.WITHDRAWN,
      updatedBy: volunteerId,
      version: { increment: 1 },
    });

    this.logger.log(`Application ${app.applicationCode} withdrawn by volunteer ${volunteerId}`);
    return ApiResponseDto.success(ApplicationResponseDto.fromEntity(updated), 'Application withdrawn successfully');
  }

  async getAdminApplications(query: ApplicationQueryDto) {
    const { data, total } = await this.repository.findManyForAdmin({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
      editionId: query.editionId,
      preferredDepartmentId: query.preferredDepartmentId,
      preferredRoleId: query.preferredRoleId,
      preferredShiftId: query.preferredShiftId,
    });
    const items = data.map((a) => AdminApplicationResponseDto.fromEntityAdmin(a));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Applications retrieved');
  }

  async getAdminApplicationByCode(code: string) {
    const app = await this.repository.findByCode(code);
    if (!app) throw new EntityNotFoundException('VolunteerApplication', code);
    return ApiResponseDto.success(AdminApplicationResponseDto.fromEntityAdmin(app), 'Application retrieved');
  }

  async moveToReview(code: string, dto: AdminReviewDto, adminId: string) {
    const app = await this.repository.findByCode(code);
    if (!app) throw new EntityNotFoundException('VolunteerApplication', code);

    this.validateTransition(app.applicationStatus, ApplicationStatus.UNDER_REVIEW);

    const data: Record<string, unknown> = {
      applicationStatus: ApplicationStatus.UNDER_REVIEW,
      reviewedAt: new Date(),
      updatedBy: adminId,
      version: { increment: 1 },
    };
    if (dto.adminRemarks !== undefined) data.adminRemarks = dto.adminRemarks;

    const updated = await this.repository.update(app.id, data);
    this.logger.log(`Application ${app.applicationCode} moved to review by admin ${adminId}`);
    return ApiResponseDto.success(AdminApplicationResponseDto.fromEntityAdmin(updated), 'Application moved to review');
  }

  async approveApplication(code: string, dto: AdminReviewDto, adminId: string) {
    const app = await this.repository.findByCode(code);
    if (!app) throw new EntityNotFoundException('VolunteerApplication', code);

    this.validateTransition(app.applicationStatus, ApplicationStatus.APPROVED);

    const data: Record<string, unknown> = {
      applicationStatus: ApplicationStatus.APPROVED,
      updatedBy: adminId,
      version: { increment: 1 },
    };
    if (dto.adminRemarks !== undefined) data.adminRemarks = dto.adminRemarks;

    const updated = await this.repository.update(app.id, data);
    this.logger.log(`Application ${app.applicationCode} approved by admin ${adminId}`);
    return ApiResponseDto.success(AdminApplicationResponseDto.fromEntityAdmin(updated), 'Application approved');
  }

  async rejectApplication(code: string, dto: AdminReviewDto, adminId: string) {
    const app = await this.repository.findByCode(code);
    if (!app) throw new EntityNotFoundException('VolunteerApplication', code);

    this.validateTransition(app.applicationStatus, ApplicationStatus.REJECTED);

    const data: Record<string, unknown> = {
      applicationStatus: ApplicationStatus.REJECTED,
      updatedBy: adminId,
      version: { increment: 1 },
    };
    if (dto.adminRemarks !== undefined) data.adminRemarks = dto.adminRemarks;

    const updated = await this.repository.update(app.id, data);
    this.logger.log(`Application ${app.applicationCode} rejected by admin ${adminId}`);
    return ApiResponseDto.success(AdminApplicationResponseDto.fromEntityAdmin(updated), 'Application rejected');
  }

  async waitlistApplication(code: string, dto: AdminReviewDto, adminId: string) {
    const app = await this.repository.findByCode(code);
    if (!app) throw new EntityNotFoundException('VolunteerApplication', code);

    this.validateTransition(app.applicationStatus, ApplicationStatus.WAITLISTED);

    const data: Record<string, unknown> = {
      applicationStatus: ApplicationStatus.WAITLISTED,
      updatedBy: adminId,
      version: { increment: 1 },
    };
    if (dto.adminRemarks !== undefined) data.adminRemarks = dto.adminRemarks;

    const updated = await this.repository.update(app.id, data);
    this.logger.log(`Application ${app.applicationCode} waitlisted by admin ${adminId}`);
    return ApiResponseDto.success(AdminApplicationResponseDto.fromEntityAdmin(updated), 'Application waitlisted');
  }

  private validateTransition(from: ApplicationStatus, to: ApplicationStatus): void {
    const allowed = VALID_TRANSITIONS[from];
    if (!allowed || !allowed.includes(to)) {
      throw new BusinessException(`Cannot transition application from "${from}" to "${to}"`);
    }
  }

  private async validatePreferences(dto: CreateApplicationDto): Promise<void> {
    if (dto.preferredShiftId) {
      const exists = await this.repository.shiftExists(dto.preferredShiftId);
      if (!exists) throw new EntityNotFoundException('EventShift', dto.preferredShiftId);
    }
    if (dto.preferredDepartmentId) {
      const exists = await this.repository.departmentExists(dto.preferredDepartmentId);
      if (!exists) throw new EntityNotFoundException('EventDepartment', dto.preferredDepartmentId);
    }
    if (dto.preferredRoleId) {
      const exists = await this.repository.roleExists(dto.preferredRoleId);
      if (!exists) throw new EntityNotFoundException('VolunteerRole', dto.preferredRoleId);
    }
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-APP-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
