import { Injectable, Logger } from '@nestjs/common';
import { AssignmentStatus, DeploymentStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
  ForbiddenResourceException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateDeploymentDto, DeploymentQueryDto, DeploymentResponseDto } from './dto';
import { VolunteerDeploymentsRepository } from './volunteer-deployments.repository';

const VALID_TRANSITIONS: Record<DeploymentStatus, DeploymentStatus[]> = {
  [DeploymentStatus.EXPECTED]: [DeploymentStatus.CONFIRMED, DeploymentStatus.CANCELLED, DeploymentStatus.NO_SHOW],
  [DeploymentStatus.CONFIRMED]: [DeploymentStatus.CANCELLED],
  [DeploymentStatus.CANCELLED]: [],
  [DeploymentStatus.NO_SHOW]: [],
};

const ELIGIBLE_ASSIGNMENT_STATUSES = new Set<string>([
  AssignmentStatus.ASSIGNED,
  AssignmentStatus.CONFIRMED,
  AssignmentStatus.REASSIGNED,
]);

@Injectable()
export class VolunteerDeploymentsService {
  private readonly logger = new Logger(VolunteerDeploymentsService.name);

  constructor(private readonly repository: VolunteerDeploymentsRepository) {}

  async createDeployment(dto: CreateDeploymentDto, adminId: string) {
    const assignment = await this.repository.assignmentExists(dto.assignmentId);
    if (!assignment.exists) throw new EntityNotFoundException('VolunteerAssignment', dto.assignmentId);
    if (!ELIGIBLE_ASSIGNMENT_STATUSES.has(assignment.assignmentStatus as AssignmentStatus)) {
      throw new BusinessException(`Cannot deploy from assignment with status "${assignment.assignmentStatus}"`);
    }

    const existing = await this.repository.findByAssignmentId(dto.assignmentId);
    if (existing) throw new EntityConflictException('VolunteerDeployment', 'assignmentId');

    const deploymentCode = await this.generateCode();
    const deployment = await this.repository.create({
      deploymentCode,
      assignmentId: dto.assignmentId,
      volunteerId: assignment.volunteerId!,
      editionId: assignment.editionId!,
      deploymentStatus: DeploymentStatus.EXPECTED,
      reportingDate: dto.reportingDate ? new Date(dto.reportingDate) : null,
      reportingTime: dto.reportingTime ? new Date(dto.reportingTime) : null,
      reportingLocation: dto.reportingLocation ?? null,
      reportingInstructions: dto.reportingInstructions ?? null,
      coordinatorId: dto.coordinatorId ?? null,
      notes: dto.notes ?? null,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Deployment ${deployment.deploymentCode} created for assignment ${dto.assignmentId}`);
    return ApiResponseDto.success(DeploymentResponseDto.fromEntity(deployment), 'Deployment created');
  }

  async confirmDeployment(code: string, adminId: string) {
    return this.transitionDeployment(code, DeploymentStatus.CONFIRMED, adminId, 'confirmed');
  }

  async cancelDeployment(code: string, adminId: string) {
    return this.transitionDeployment(code, DeploymentStatus.CANCELLED, adminId, 'cancelled');
  }

  async markNoShow(code: string, adminId: string) {
    return this.transitionDeployment(code, DeploymentStatus.NO_SHOW, adminId, 'marked as no-show');
  }

  async getAdminDeployments(query: DeploymentQueryDto) {
    const { data, total } = await this.repository.findManyForAdmin({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
      editionId: query.editionId,
    });
    const items = data.map((d) => DeploymentResponseDto.fromEntity(d));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Deployments retrieved');
  }

  async getAdminDeploymentByCode(code: string) {
    const deployment = await this.repository.findByCode(code);
    if (!deployment) throw new EntityNotFoundException('VolunteerDeployment', code);
    return ApiResponseDto.success(DeploymentResponseDto.fromEntity(deployment), 'Deployment retrieved');
  }

  async getVolunteerDeployments(volunteerId: string, query: DeploymentQueryDto) {
    const { data, total } = await this.repository.findManyByVolunteer(volunteerId, {
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
    const items = data.map((d) => DeploymentResponseDto.fromEntity(d));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Deployments retrieved');
  }

  async getVolunteerDeploymentByCode(volunteerId: string, code: string) {
    const deployment = await this.repository.findByCode(code);
    if (!deployment) throw new EntityNotFoundException('VolunteerDeployment', code);
    if (deployment.volunteerId !== volunteerId) throw new ForbiddenResourceException('deployment');
    return ApiResponseDto.success(DeploymentResponseDto.fromEntity(deployment), 'Deployment retrieved');
  }

  private async transitionDeployment(code: string, targetStatus: DeploymentStatus, adminId: string, action: string) {
    const deployment = await this.repository.findByCode(code);
    if (!deployment) throw new EntityNotFoundException('VolunteerDeployment', code);

    this.validateTransition(deployment.deploymentStatus, targetStatus);

    const updated = await this.repository.update(deployment.id, {
      deploymentStatus: targetStatus,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Deployment ${code} ${action} by admin ${adminId}`);
    return ApiResponseDto.success(DeploymentResponseDto.fromEntity(updated), `Deployment ${action}`);
  }

  private validateTransition(from: DeploymentStatus, to: DeploymentStatus): void {
    const allowed = VALID_TRANSITIONS[from];
    if (!allowed || !allowed.includes(to)) {
      throw new BusinessException(`Cannot transition deployment from "${from}" to "${to}"`);
    }
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-DEP-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
