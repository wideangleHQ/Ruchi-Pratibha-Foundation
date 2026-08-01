import { Injectable, Logger } from '@nestjs/common';
import { DeploymentStatus, ParticipationStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
  ForbiddenResourceException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import {
  BulkDeploymentActionDto,
  BulkParticipationDto,
  CoordinatorRemarksDto,
  ParticipationQueryDto,
  ParticipationResponseDto,
} from './dto';
import { VolunteerParticipationRepository } from './volunteer-participation.repository';

const VALID_TRANSITIONS: Record<ParticipationStatus, ParticipationStatus[]> = {
  [ParticipationStatus.PENDING]: [ParticipationStatus.REPORTED, ParticipationStatus.NO_SHOW, ParticipationStatus.CANCELLED],
  [ParticipationStatus.REPORTED]: [ParticipationStatus.COMPLETED, ParticipationStatus.NOT_COMPLETED, ParticipationStatus.NO_SHOW],
  [ParticipationStatus.COMPLETED]: [],
  [ParticipationStatus.NOT_COMPLETED]: [],
  [ParticipationStatus.NO_SHOW]: [],
  [ParticipationStatus.CANCELLED]: [],
};

@Injectable()
export class VolunteerParticipationService {
  private readonly logger = new Logger(VolunteerParticipationService.name);

  constructor(private readonly repository: VolunteerParticipationRepository) {}

  async reportParticipation(deploymentCode: string, adminId: string) {
    const deployment = await this.repository.deploymentExistsByCode(deploymentCode);
    if (!deployment.exists) throw new EntityNotFoundException('VolunteerDeployment', deploymentCode);
    if (deployment.deploymentStatus !== DeploymentStatus.CONFIRMED) {
      throw new BusinessException(`Cannot report participation for deployment with status "${deployment.deploymentStatus}"`);
    }

    const existing = await this.repository.findByDeploymentId(deployment.id!);
    if (existing) throw new EntityConflictException('VolunteerParticipation', 'deploymentId');

    const participationCode = await this.generateCode();
    const participation = await this.repository.create({
      participationCode,
      deploymentId: deployment.id!,
      assignmentId: deployment.assignmentId!,
      volunteerId: deployment.volunteerId!,
      editionId: deployment.editionId!,
      participationStatus: ParticipationStatus.REPORTED,
      reportedDate: new Date(),
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Participation ${participation.participationCode} reported for deployment ${deploymentCode}`);
    return ApiResponseDto.success(ParticipationResponseDto.fromEntity(participation), 'Participation reported');
  }

  async markCompleted(code: string, dto: CoordinatorRemarksDto, adminId: string) {
    return this.transitionParticipation(code, ParticipationStatus.COMPLETED, adminId, 'marked as completed', {
      completionDate: new Date(),
      coordinatorRemarks: dto.coordinatorRemarks ?? undefined,
    });
  }

  async markNotCompleted(code: string, dto: CoordinatorRemarksDto, adminId: string) {
    return this.transitionParticipation(code, ParticipationStatus.NOT_COMPLETED, adminId, 'marked as not completed', {
      coordinatorRemarks: dto.coordinatorRemarks ?? undefined,
    });
  }

  async markNoShow(code: string, adminId: string) {
    return this.transitionParticipation(code, ParticipationStatus.NO_SHOW, adminId, 'marked as no-show');
  }

  async cancelParticipation(code: string, adminId: string) {
    return this.transitionParticipation(code, ParticipationStatus.CANCELLED, adminId, 'cancelled');
  }

  async verifyParticipation(code: string, adminId: string) {
    const participation = await this.repository.findByCode(code);
    if (!participation) throw new EntityNotFoundException('VolunteerParticipation', code);
    if (participation.participationStatus !== ParticipationStatus.COMPLETED) {
      throw new BusinessException('Only completed participations can be verified');
    }
    if (participation.verifiedBy) {
      throw new BusinessException('Participation has already been verified');
    }

    const updated = await this.repository.update(participation.id, {
      verifiedBy: adminId,
      verifiedAt: new Date(),
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Participation ${code} verified by admin ${adminId}`);
    return ApiResponseDto.success(ParticipationResponseDto.fromEntity(updated), 'Participation verified');
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

  async bulkReport(dto: BulkDeploymentActionDto, adminId: string) {
    const deployments = await this.repository.findDeploymentsByIds(dto.deploymentIds);
    if (deployments.length !== dto.deploymentIds.length) {
      const foundIds = new Set(deployments.map((d) => d.id));
      const missingIds = dto.deploymentIds.filter((id) => !foundIds.has(id));
      throw new EntityNotFoundException('VolunteerDeployment', missingIds.join(', '));
    }

    const nonConfirmed = deployments.filter((d) => d.deploymentStatus !== DeploymentStatus.CONFIRMED);
    if (nonConfirmed.length > 0) {
      throw new BusinessException(`${nonConfirmed.length} deployment(s) are not in CONFIRMED status`);
    }

    const existingDeploymentIds = await this.repository.findExistingParticipationsForDeployments(dto.deploymentIds);
    if (existingDeploymentIds.length > 0) {
      throw new EntityConflictException('VolunteerParticipation', `${existingDeploymentIds.length} deployment(s) already have participation records`);
    }

    const baseCount = await this.repository.countAll();
    const records = deployments.map((d, i) => ({
      participationCode: `RPF-PRT-${(baseCount + i + 1).toString().padStart(6, '0')}`,
      deploymentId: d.id,
      assignmentId: d.assignmentId,
      volunteerId: d.volunteerId,
      editionId: d.editionId,
      participationStatus: ParticipationStatus.REPORTED as ParticipationStatus,
      reportedDate: new Date(),
      createdBy: adminId,
      updatedBy: adminId,
    }));

    const count = await this.repository.createMany(records);
    this.logger.log(`Bulk reported ${count} participations by admin ${adminId}`);
    return ApiResponseDto.success({ count }, `${count} participations reported`);
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
      completionDate: new Date(),
      coordinatorRemarks: dto.coordinatorRemarks ?? undefined,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Bulk completed ${count} participations by admin ${adminId}`);
    return ApiResponseDto.success({ count }, `${count} participations completed`);
  }

  async bulkMarkNoShow(dto: BulkParticipationDto, adminId: string) {
    const participations = await this.repository.findByIds(dto.participationIds);
    if (participations.length !== dto.participationIds.length) {
      const foundIds = new Set(participations.map((p) => p.id));
      const missingIds = dto.participationIds.filter((id) => !foundIds.has(id));
      throw new EntityNotFoundException('VolunteerParticipation', missingIds.join(', '));
    }

    const invalid = participations.filter((p) => !VALID_TRANSITIONS[p.participationStatus].includes(ParticipationStatus.NO_SHOW));
    if (invalid.length > 0) {
      throw new BusinessException(`${invalid.length} participation(s) cannot transition to NO_SHOW`);
    }

    const count = await this.repository.updateMany(dto.participationIds, {
      participationStatus: ParticipationStatus.NO_SHOW,
      coordinatorRemarks: dto.coordinatorRemarks ?? undefined,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Bulk marked ${count} participations as no-show by admin ${adminId}`);
    return ApiResponseDto.success({ count }, `${count} participations marked as no-show`);
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
