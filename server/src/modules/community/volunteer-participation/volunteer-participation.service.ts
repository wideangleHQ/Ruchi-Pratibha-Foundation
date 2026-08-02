import { Injectable, Logger } from '@nestjs/common';
import { ApplicationStatus, ParticipationStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
  ForbiddenResourceException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import {
  BulkParticipationDto,
  CoordinatorRemarksDto,
  ParticipationQueryDto,
  ParticipationResponseDto,
} from './dto';
import { VolunteerParticipationRepository } from './volunteer-participation.repository';

const VALID_TRANSITIONS: Record<ParticipationStatus, ParticipationStatus[]> = {
  [ParticipationStatus.NOT_STARTED]: [ParticipationStatus.ACTIVE, ParticipationStatus.CANCELLED],
  [ParticipationStatus.ACTIVE]: [ParticipationStatus.COMPLETED, ParticipationStatus.CANCELLED],
  [ParticipationStatus.COMPLETED]: [],
  [ParticipationStatus.CANCELLED]: [],
};

@Injectable()
export class VolunteerParticipationService {
  private readonly logger = new Logger(VolunteerParticipationService.name);

  constructor(private readonly repository: VolunteerParticipationRepository) {}

  async createFromApplication(applicationId: string, adminId: string) {
    const application = await this.repository.applicationExists(applicationId);
    if (!application.exists) throw new EntityNotFoundException('VolunteerApplication', applicationId);
    if (application.applicationStatus !== ApplicationStatus.APPROVED) {
      throw new BusinessException(`Cannot create participation for application with status "${application.applicationStatus}"`);
    }

    const existing = await this.repository.findByApplicationId(applicationId);
    if (existing) throw new EntityConflictException('VolunteerParticipation', 'applicationId');

    const participationCode = await this.generateCode();
    const participation = await this.repository.create({
      participationCode,
      applicationId,
      volunteerId: application.volunteerId!,
      editionId: application.editionId!,
      participationStatus: ParticipationStatus.NOT_STARTED,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Participation ${participation.participationCode} created for application ${applicationId}`);
    return ApiResponseDto.success(ParticipationResponseDto.fromEntity(participation), 'Participation created');
  }

  async startParticipation(code: string, adminId: string) {
    return this.transitionParticipation(code, ParticipationStatus.ACTIVE, adminId, 'started', {
      startedAt: new Date(),
    });
  }

  async markCompleted(code: string, dto: CoordinatorRemarksDto, adminId: string) {
    return this.transitionParticipation(code, ParticipationStatus.COMPLETED, adminId, 'marked as completed', {
      completedAt: new Date(),
      coordinatorRemarks: dto.coordinatorRemarks ?? undefined,
      certificateEligible: true,
    });
  }

  async cancelParticipation(code: string, dto: CoordinatorRemarksDto, adminId: string) {
    return this.transitionParticipation(code, ParticipationStatus.CANCELLED, adminId, 'cancelled', {
      coordinatorRemarks: dto.coordinatorRemarks ?? undefined,
    });
  }

  async updateCoordinatorRemarks(code: string, dto: CoordinatorRemarksDto, adminId: string) {
    const participation = await this.repository.findByCode(code);
    if (!participation) throw new EntityNotFoundException('VolunteerParticipation', code);

    const updated = await this.repository.update(participation.id, {
      coordinatorRemarks: dto.coordinatorRemarks ?? null,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Participation ${code} remarks updated by admin ${adminId}`);
    return ApiResponseDto.success(ParticipationResponseDto.fromEntity(updated), 'Coordinator remarks updated');
  }

  async updateCompletionNotes(code: string, completionNotes: string, adminId: string) {
    const participation = await this.repository.findByCode(code);
    if (!participation) throw new EntityNotFoundException('VolunteerParticipation', code);

    const updated = await this.repository.update(participation.id, {
      completionNotes,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Participation ${code} completion notes updated by admin ${adminId}`);
    return ApiResponseDto.success(ParticipationResponseDto.fromEntity(updated), 'Completion notes updated');
  }

  async setCertificateEligibility(code: string, eligible: boolean, adminId: string) {
    const participation = await this.repository.findByCode(code);
    if (!participation) throw new EntityNotFoundException('VolunteerParticipation', code);

    const updated = await this.repository.update(participation.id, {
      certificateEligible: eligible,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Participation ${code} certificate eligibility set to ${eligible} by admin ${adminId}`);
    return ApiResponseDto.success(ParticipationResponseDto.fromEntity(updated), 'Certificate eligibility updated');
  }

  async bulkComplete(dto: BulkParticipationDto, adminId: string) {
    const participations = await this.repository.findByIds(dto.participationIds);
    if (participations.length !== dto.participationIds.length) {
      const foundIds = new Set(participations.map((p) => p.id));
      const missingIds = dto.participationIds.filter((id) => !foundIds.has(id));
      throw new EntityNotFoundException('VolunteerParticipation', missingIds.join(', '));
    }

    const invalid = participations.filter((p) => !VALID_TRANSITIONS[p.participationStatus].includes(ParticipationStatus.COMPLETED));
    if (invalid.length > 0) {
      throw new BusinessException(`${invalid.length} participation(s) cannot transition to COMPLETED`);
    }

    const count = await this.repository.updateMany(dto.participationIds, {
      participationStatus: ParticipationStatus.COMPLETED,
      completedAt: new Date(),
      certificateEligible: true,
      coordinatorRemarks: dto.coordinatorRemarks ?? undefined,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Bulk completed ${count} participations by admin ${adminId}`);
    return ApiResponseDto.success({ count }, `${count} participations completed`);
  }

  async getAdminParticipations(query: ParticipationQueryDto) {
    const { data, total } = await this.repository.findManyForAdmin({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
      editionId: query.editionId,
    });
    const items = data.map((p) => ParticipationResponseDto.fromEntity(p));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Participations retrieved');
  }

  async getAdminParticipationByCode(code: string) {
    const participation = await this.repository.findByCode(code);
    if (!participation) throw new EntityNotFoundException('VolunteerParticipation', code);
    return ApiResponseDto.success(ParticipationResponseDto.fromEntity(participation), 'Participation retrieved');
  }

  async getVolunteerParticipations(volunteerId: string, query: ParticipationQueryDto) {
    const { data, total } = await this.repository.findManyByVolunteer(volunteerId, {
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
    const items = data.map((p) => ParticipationResponseDto.fromEntity(p));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Participations retrieved');
  }

  async getVolunteerParticipationByCode(volunteerId: string, code: string) {
    const participation = await this.repository.findByCode(code);
    if (!participation) throw new EntityNotFoundException('VolunteerParticipation', code);
    if (participation.volunteerId !== volunteerId) throw new ForbiddenResourceException('participation');
    return ApiResponseDto.success(ParticipationResponseDto.fromEntity(participation), 'Participation retrieved');
  }

  private async transitionParticipation(
    code: string,
    targetStatus: ParticipationStatus,
    adminId: string,
    action: string,
    extra?: Record<string, unknown>,
  ) {
    const participation = await this.repository.findByCode(code);
    if (!participation) throw new EntityNotFoundException('VolunteerParticipation', code);

    this.validateTransition(participation.participationStatus, targetStatus);

    const updated = await this.repository.update(participation.id, {
      participationStatus: targetStatus,
      updatedBy: adminId,
      version: { increment: 1 },
      ...extra,
    });

    this.logger.log(`Participation ${code} ${action} by admin ${adminId}`);
    return ApiResponseDto.success(ParticipationResponseDto.fromEntity(updated), `Participation ${action}`);
  }

  private validateTransition(from: ParticipationStatus, to: ParticipationStatus): void {
    const allowed = VALID_TRANSITIONS[from];
    if (!allowed || !allowed.includes(to)) {
      throw new BusinessException(`Cannot transition participation from "${from}" to "${to}"`);
    }
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-PRT-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
