import { Injectable, Logger } from '@nestjs/common';
import { ApplicationStatus, SelectionStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import { BusinessException, EntityConflictException, EntityNotFoundException } from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { BulkSelectionDto, SelectionQueryDto, SelectionResponseDto, SelectionReviewDto } from './dto';
import { VolunteerSelectionRepository } from './volunteer-selection.repository';

const VALID_TRANSITIONS: Record<SelectionStatus, SelectionStatus[]> = {
  [SelectionStatus.PENDING]: [SelectionStatus.SHORTLISTED, SelectionStatus.REJECTED, SelectionStatus.WAITLISTED],
  [SelectionStatus.SHORTLISTED]: [SelectionStatus.SELECTED, SelectionStatus.REJECTED, SelectionStatus.WAITLISTED],
  [SelectionStatus.WAITLISTED]: [SelectionStatus.SHORTLISTED, SelectionStatus.SELECTED, SelectionStatus.REJECTED],
  [SelectionStatus.SELECTED]: [],
  [SelectionStatus.REJECTED]: [],
};

@Injectable()
export class VolunteerSelectionService {
  private readonly logger = new Logger(VolunteerSelectionService.name);

  constructor(private readonly repository: VolunteerSelectionRepository) {}

  async createSelectionFromApplication(applicationId: string, adminId: string) {
    const app = await this.repository.applicationExists(applicationId);
    if (!app.exists) throw new EntityNotFoundException('VolunteerApplication', applicationId);
    if (app.applicationStatus !== ApplicationStatus.APPROVED) {
      throw new BusinessException('Only approved applications can enter the selection process');
    }

    const existing = await this.repository.findByApplicationId(applicationId);
    if (existing) throw new EntityConflictException('VolunteerSelection', 'applicationId');

    const recommendationScore = await this.computeRecommendationScore(app.volunteerId!, app);

    const selectionCode = await this.generateCode();
    const selection = await this.repository.create({
      selectionCode,
      applicationId,
      recommendationScore,
      selectionStatus: SelectionStatus.PENDING,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Selection ${selection.selectionCode} created for application ${applicationId}`);
    return ApiResponseDto.success(SelectionResponseDto.fromEntity(selection), 'Selection created');
  }

  async shortlist(code: string, dto: SelectionReviewDto, adminId: string) {
    return this.transitionSelection(code, SelectionStatus.SHORTLISTED, dto, adminId, 'shortlisted');
  }

  async select(code: string, dto: SelectionReviewDto, adminId: string) {
    return this.transitionSelection(code, SelectionStatus.SELECTED, dto, adminId, 'selected');
  }

  async reject(code: string, dto: SelectionReviewDto, adminId: string) {
    return this.transitionSelection(code, SelectionStatus.REJECTED, dto, adminId, 'rejected');
  }

  async waitlist(code: string, dto: SelectionReviewDto, adminId: string) {
    return this.transitionSelection(code, SelectionStatus.WAITLISTED, dto, adminId, 'waitlisted');
  }

  async bulkSelect(dto: BulkSelectionDto, adminId: string) {
    const selections = await this.repository.findByIds(dto.selectionIds);
    if (selections.length !== dto.selectionIds.length) {
      throw new BusinessException('One or more selection IDs are invalid');
    }

    const invalid = selections.filter(
      (s) => !VALID_TRANSITIONS[s.selectionStatus]?.includes(SelectionStatus.SELECTED),
    );
    if (invalid.length > 0) {
      throw new BusinessException(
        `Cannot select ${invalid.length} selection(s) due to invalid status transitions`,
      );
    }

    const count = await this.repository.updateMany(dto.selectionIds, {
      selectionStatus: SelectionStatus.SELECTED,
      selectedBy: adminId,
      selectedAt: new Date(),
      selectionNotes: dto.selectionNotes ?? undefined,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Bulk selected ${count} selections by admin ${adminId}`);
    return ApiResponseDto.success({ updated: count }, `${count} volunteer(s) selected`);
  }

  async bulkReject(dto: BulkSelectionDto, adminId: string) {
    const selections = await this.repository.findByIds(dto.selectionIds);
    if (selections.length !== dto.selectionIds.length) {
      throw new BusinessException('One or more selection IDs are invalid');
    }

    const invalid = selections.filter(
      (s) => !VALID_TRANSITIONS[s.selectionStatus]?.includes(SelectionStatus.REJECTED),
    );
    if (invalid.length > 0) {
      throw new BusinessException(
        `Cannot reject ${invalid.length} selection(s) due to invalid status transitions`,
      );
    }

    const count = await this.repository.updateMany(dto.selectionIds, {
      selectionStatus: SelectionStatus.REJECTED,
      selectedBy: adminId,
      selectedAt: new Date(),
      selectionNotes: dto.selectionNotes ?? undefined,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Bulk rejected ${count} selections by admin ${adminId}`);
    return ApiResponseDto.success({ updated: count }, `${count} volunteer(s) rejected`);
  }

  async getSelections(query: SelectionQueryDto) {
    const { data, total } = await this.repository.findManyForAdmin({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
      editionId: query.editionId,
      applicationId: query.applicationId,
    });
    const items = data.map((s) => SelectionResponseDto.fromEntity(s));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Selections retrieved');
  }

  async getSelectionByCode(code: string) {
    const selection = await this.repository.findByCode(code);
    if (!selection) throw new EntityNotFoundException('VolunteerSelection', code);
    return ApiResponseDto.success(SelectionResponseDto.fromEntity(selection), 'Selection retrieved');
  }

  async computeRecommendationScore(
    volunteerId: string,
    appContext: {
      skills?: string[];
      preferredDepartmentId?: string | null;
      preferredRoleId?: string | null;
      preferredShiftId?: string | null;
    },
  ): Promise<number> {
    let score = 0;

    const profile = await this.repository.getVolunteerProfile(volunteerId);
    if (!profile) return score;

    // Verified volunteer: +20
    if (profile.volunteerStatus === 'VERIFIED') score += 20;

    // Previous approved applications: +10 per (max 30)
    const prevApproved = await this.repository.countPreviousApprovedApplications(volunteerId);
    score += Math.min(prevApproved * 10, 30);

    // Previous selections: +15 per (max 30)
    const prevSelections = await this.repository.countPreviousSelections(volunteerId);
    score += Math.min(prevSelections * 15, 30);

    // Skills provided: +2 per skill (max 10)
    const skillCount = (appContext.skills ?? []).length;
    score += Math.min(skillCount * 2, 10);

    // Preference completeness: +5 each (max 15)
    if (appContext.preferredDepartmentId) score += 5;
    if (appContext.preferredRoleId) score += 5;
    if (appContext.preferredShiftId) score += 5;

    return Math.min(score, 100);
  }

  private async transitionSelection(
    code: string,
    targetStatus: SelectionStatus,
    dto: SelectionReviewDto,
    adminId: string,
    action: string,
  ) {
    const selection = await this.repository.findByCode(code);
    if (!selection) throw new EntityNotFoundException('VolunteerSelection', code);

    this.validateTransition(selection.selectionStatus, targetStatus);

    const data: Record<string, unknown> = {
      selectionStatus: targetStatus,
      selectedBy: adminId,
      selectedAt: new Date(),
      updatedBy: adminId,
      version: { increment: 1 },
    };
    if (dto.selectionNotes !== undefined) data.selectionNotes = dto.selectionNotes;

    const updated = await this.repository.update(selection.id, data);
    this.logger.log(`Selection ${selection.selectionCode} ${action} by admin ${adminId}`);
    return ApiResponseDto.success(SelectionResponseDto.fromEntity(updated), `Selection ${action}`);
  }

  private validateTransition(from: SelectionStatus, to: SelectionStatus): void {
    const allowed = VALID_TRANSITIONS[from];
    if (!allowed || !allowed.includes(to)) {
      throw new BusinessException(`Cannot transition selection from "${from}" to "${to}"`);
    }
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-SEL-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
