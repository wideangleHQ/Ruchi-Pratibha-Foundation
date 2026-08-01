import { Injectable, Logger } from '@nestjs/common';
import { AssignmentStatus, SelectionStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
  ForbiddenResourceException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import {
  AssignmentQueryDto,
  AssignmentResponseDto,
  BulkAssignDto,
  CreateAssignmentDto,
  ReassignDto,
  UpdateAssignmentDto,
} from './dto';
import { VolunteerAssignmentsRepository } from './volunteer-assignments.repository';

const VALID_TRANSITIONS: Record<AssignmentStatus, AssignmentStatus[]> = {
  [AssignmentStatus.ASSIGNED]: [AssignmentStatus.CONFIRMED, AssignmentStatus.DECLINED, AssignmentStatus.REASSIGNED, AssignmentStatus.CANCELLED],
  [AssignmentStatus.CONFIRMED]: [AssignmentStatus.REASSIGNED, AssignmentStatus.CANCELLED],
  [AssignmentStatus.DECLINED]: [],
  [AssignmentStatus.REASSIGNED]: [AssignmentStatus.CONFIRMED, AssignmentStatus.DECLINED, AssignmentStatus.CANCELLED],
  [AssignmentStatus.CANCELLED]: [],
};

@Injectable()
export class VolunteerAssignmentsService {
  private readonly logger = new Logger(VolunteerAssignmentsService.name);

  constructor(private readonly repository: VolunteerAssignmentsRepository) {}

  async createAssignment(dto: CreateAssignmentDto, adminId: string) {
    const selection = await this.repository.selectionExists(dto.selectionId);
    if (!selection.exists) throw new EntityNotFoundException('VolunteerSelection', dto.selectionId);
    if (selection.selectionStatus !== SelectionStatus.SELECTED) {
      throw new BusinessException('Only SELECTED volunteers can receive assignments');
    }

    const existingAssignment = await this.repository.findBySelectionId(dto.selectionId);
    if (existingAssignment) throw new EntityConflictException('VolunteerAssignment', 'selectionId');

    const duplicate = await this.repository.findActiveByVolunteerAndEdition(selection.volunteerId!, selection.editionId!);
    if (duplicate) throw new EntityConflictException('VolunteerAssignment', 'volunteer+edition');

    await this.validateResources(dto.departmentId, dto.roleId, dto.shiftId, dto.venueId);

    const assignmentCode = await this.generateCode();
    const assignment = await this.repository.create({
      assignmentCode,
      selectionId: dto.selectionId,
      volunteerId: selection.volunteerId!,
      editionId: selection.editionId!,
      departmentId: dto.departmentId,
      roleId: dto.roleId,
      shiftId: dto.shiftId,
      venueId: dto.venueId,
      reportingManager: dto.reportingManager ?? null,
      reportingInstructions: dto.reportingInstructions ?? null,
      reportingTime: dto.reportingTime ? new Date(dto.reportingTime) : null,
      assignmentStatus: AssignmentStatus.ASSIGNED,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Assignment ${assignment.assignmentCode} created for selection ${dto.selectionId}`);
    return ApiResponseDto.success(AssignmentResponseDto.fromEntity(assignment), 'Assignment created');
  }

  async updateAssignment(code: string, dto: UpdateAssignmentDto, adminId: string) {
    const assignment = await this.repository.findByCode(code);
    if (!assignment) throw new EntityNotFoundException('VolunteerAssignment', code);

    if (assignment.assignmentStatus === AssignmentStatus.CANCELLED || assignment.assignmentStatus === AssignmentStatus.DECLINED) {
      throw new BusinessException(`Cannot update a ${assignment.assignmentStatus} assignment`);
    }

    const data: Record<string, unknown> = {
      updatedBy: adminId,
      version: { increment: 1 },
    };
    if (dto.reportingManager !== undefined) data.reportingManager = dto.reportingManager;
    if (dto.reportingInstructions !== undefined) data.reportingInstructions = dto.reportingInstructions;
    if (dto.reportingTime !== undefined) data.reportingTime = new Date(dto.reportingTime);

    const updated = await this.repository.update(assignment.id, data);
    this.logger.log(`Assignment ${code} updated by admin ${adminId}`);
    return ApiResponseDto.success(AssignmentResponseDto.fromEntity(updated), 'Assignment updated');
  }

  async reassign(code: string, dto: ReassignDto, adminId: string) {
    const assignment = await this.repository.findByCode(code);
    if (!assignment) throw new EntityNotFoundException('VolunteerAssignment', code);

    this.validateTransition(assignment.assignmentStatus, AssignmentStatus.REASSIGNED);

    if (dto.departmentId) {
      const exists = await this.repository.departmentExists(dto.departmentId);
      if (!exists) throw new EntityNotFoundException('EventDepartment', dto.departmentId);
    }
    if (dto.roleId) {
      const exists = await this.repository.roleExists(dto.roleId);
      if (!exists) throw new EntityNotFoundException('VolunteerRole', dto.roleId);
    }
    if (dto.shiftId) {
      const exists = await this.repository.shiftExists(dto.shiftId);
      if (!exists) throw new EntityNotFoundException('EventShift', dto.shiftId);
    }
    if (dto.venueId) {
      const exists = await this.repository.venueExists(dto.venueId);
      if (!exists) throw new EntityNotFoundException('Venue', dto.venueId);
    }

    const data: Record<string, unknown> = {
      assignmentStatus: AssignmentStatus.REASSIGNED,
      updatedBy: adminId,
      version: { increment: 1 },
    };
    if (dto.departmentId) data.departmentId = dto.departmentId;
    if (dto.roleId) data.roleId = dto.roleId;
    if (dto.shiftId) data.shiftId = dto.shiftId;
    if (dto.venueId) data.venueId = dto.venueId;
    if (dto.reportingManager !== undefined) data.reportingManager = dto.reportingManager;
    if (dto.reportingInstructions !== undefined) data.reportingInstructions = dto.reportingInstructions;
    if (dto.reportingTime !== undefined) data.reportingTime = new Date(dto.reportingTime);

    const updated = await this.repository.update(assignment.id, data);
    this.logger.log(`Assignment ${code} reassigned by admin ${adminId}`);
    return ApiResponseDto.success(AssignmentResponseDto.fromEntity(updated), 'Assignment reassigned');
  }

  async cancelAssignment(code: string, adminId: string) {
    const assignment = await this.repository.findByCode(code);
    if (!assignment) throw new EntityNotFoundException('VolunteerAssignment', code);

    this.validateTransition(assignment.assignmentStatus, AssignmentStatus.CANCELLED);

    const updated = await this.repository.update(assignment.id, {
      assignmentStatus: AssignmentStatus.CANCELLED,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Assignment ${code} cancelled by admin ${adminId}`);
    return ApiResponseDto.success(AssignmentResponseDto.fromEntity(updated), 'Assignment cancelled');
  }

  async acceptAssignment(volunteerId: string, code: string) {
    const assignment = await this.repository.findByCode(code);
    if (!assignment) throw new EntityNotFoundException('VolunteerAssignment', code);
    if (assignment.volunteerId !== volunteerId) throw new ForbiddenResourceException('assignment');

    this.validateTransition(assignment.assignmentStatus, AssignmentStatus.CONFIRMED);

    const updated = await this.repository.update(assignment.id, {
      assignmentStatus: AssignmentStatus.CONFIRMED,
      updatedBy: volunteerId,
      version: { increment: 1 },
    });

    this.logger.log(`Assignment ${code} accepted by volunteer ${volunteerId}`);
    return ApiResponseDto.success(AssignmentResponseDto.fromEntity(updated), 'Assignment accepted');
  }

  async declineAssignment(volunteerId: string, code: string) {
    const assignment = await this.repository.findByCode(code);
    if (!assignment) throw new EntityNotFoundException('VolunteerAssignment', code);
    if (assignment.volunteerId !== volunteerId) throw new ForbiddenResourceException('assignment');

    this.validateTransition(assignment.assignmentStatus, AssignmentStatus.DECLINED);

    const updated = await this.repository.update(assignment.id, {
      assignmentStatus: AssignmentStatus.DECLINED,
      updatedBy: volunteerId,
      version: { increment: 1 },
    });

    this.logger.log(`Assignment ${code} declined by volunteer ${volunteerId}`);
    return ApiResponseDto.success(AssignmentResponseDto.fromEntity(updated), 'Assignment declined');
  }

  async bulkAssign(dto: BulkAssignDto, adminId: string) {
    await this.validateResources(dto.departmentId, dto.roleId, dto.shiftId, dto.venueId);

    const selections = await this.repository.findSelectedSelections(dto.selectionIds);
    if (selections.length !== dto.selectionIds.length) {
      throw new BusinessException('One or more selection IDs are invalid');
    }

    const notSelected = selections.filter((s) => s.selectionStatus !== SelectionStatus.SELECTED);
    if (notSelected.length > 0) {
      throw new BusinessException(`${notSelected.length} selection(s) are not in SELECTED status`);
    }

    const alreadyAssigned = await this.repository.findExistingAssignmentsForSelections(dto.selectionIds);
    if (alreadyAssigned.length > 0) {
      throw new BusinessException(`${alreadyAssigned.length} selection(s) already have assignments`);
    }

    const baseCount = await this.repository.countAll();
    const assignments = selections.map((sel, i) => ({
      assignmentCode: `RPF-ASN-${(baseCount + i + 1).toString().padStart(6, '0')}`,
      selectionId: sel.id,
      volunteerId: sel.volunteerId,
      editionId: sel.editionId,
      departmentId: dto.departmentId,
      roleId: dto.roleId,
      shiftId: dto.shiftId,
      venueId: dto.venueId,
      reportingManager: dto.reportingManager ?? null,
      reportingInstructions: dto.reportingInstructions ?? null,
      reportingTime: dto.reportingTime ? new Date(dto.reportingTime) : null,
      assignmentStatus: AssignmentStatus.ASSIGNED,
      createdBy: adminId,
      updatedBy: adminId,
    }));

    const count = await this.repository.createMany(assignments);
    this.logger.log(`Bulk assigned ${count} volunteers by admin ${adminId}`);
    return ApiResponseDto.success({ created: count }, `${count} assignment(s) created`);
  }

  async getAdminAssignments(query: AssignmentQueryDto) {
    const { data, total } = await this.repository.findManyForAdmin({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
      editionId: query.editionId,
      departmentId: query.departmentId,
      roleId: query.roleId,
      shiftId: query.shiftId,
      venueId: query.venueId,
    });
    const items = data.map((a) => AssignmentResponseDto.fromEntity(a));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Assignments retrieved');
  }

  async getAdminAssignmentByCode(code: string) {
    const assignment = await this.repository.findByCode(code);
    if (!assignment) throw new EntityNotFoundException('VolunteerAssignment', code);
    return ApiResponseDto.success(AssignmentResponseDto.fromEntity(assignment), 'Assignment retrieved');
  }

  async getVolunteerAssignments(volunteerId: string, query: AssignmentQueryDto) {
    const { data, total } = await this.repository.findManyByVolunteer(volunteerId, {
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
    const items = data.map((a) => AssignmentResponseDto.fromEntity(a));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Assignments retrieved');
  }

  async getVolunteerAssignmentByCode(volunteerId: string, code: string) {
    const assignment = await this.repository.findByCode(code);
    if (!assignment) throw new EntityNotFoundException('VolunteerAssignment', code);
    if (assignment.volunteerId !== volunteerId) throw new ForbiddenResourceException('assignment');
    return ApiResponseDto.success(AssignmentResponseDto.fromEntity(assignment), 'Assignment retrieved');
  }

  private validateTransition(from: AssignmentStatus, to: AssignmentStatus): void {
    const allowed = VALID_TRANSITIONS[from];
    if (!allowed || !allowed.includes(to)) {
      throw new BusinessException(`Cannot transition assignment from "${from}" to "${to}"`);
    }
  }

  private async validateResources(departmentId: string, roleId: string, shiftId: string, venueId: string): Promise<void> {
    const [deptOk, roleOk, shiftOk, venueOk] = await Promise.all([
      this.repository.departmentExists(departmentId),
      this.repository.roleExists(roleId),
      this.repository.shiftExists(shiftId),
      this.repository.venueExists(venueId),
    ]);
    if (!deptOk) throw new EntityNotFoundException('EventDepartment', departmentId);
    if (!roleOk) throw new EntityNotFoundException('VolunteerRole', roleId);
    if (!shiftOk) throw new EntityNotFoundException('EventShift', shiftId);
    if (!venueOk) throw new EntityNotFoundException('Venue', venueId);
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-ASN-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
