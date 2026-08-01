import { Injectable } from '@nestjs/common';
import { ApplicationStatus, Prisma, SelectionStatus, VolunteerSelection } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class VolunteerSelectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VolunteerSelectionUncheckedCreateInput): Promise<VolunteerSelection> {
    return this.prisma.volunteerSelection.create({ data });
  }

  async findById(id: string): Promise<VolunteerSelection | null> {
    return this.prisma.volunteerSelection.findUnique({ where: { id } });
  }

  async findByCode(code: string): Promise<VolunteerSelection | null> {
    return this.prisma.volunteerSelection.findFirst({ where: { selectionCode: code } });
  }

  async findByApplicationId(applicationId: string): Promise<VolunteerSelection | null> {
    return this.prisma.volunteerSelection.findFirst({ where: { applicationId } });
  }

  async findByIds(ids: string[]): Promise<VolunteerSelection[]> {
    return this.prisma.volunteerSelection.findMany({ where: { id: { in: ids } } });
  }

  async countAll(): Promise<number> {
    return this.prisma.volunteerSelection.count();
  }

  async update(id: string, data: Prisma.VolunteerSelectionUpdateInput): Promise<VolunteerSelection> {
    return this.prisma.volunteerSelection.update({ where: { id }, data });
  }

  async updateMany(ids: string[], data: Prisma.VolunteerSelectionUpdateInput): Promise<number> {
    const result = await this.prisma.volunteerSelection.updateMany({
      where: { id: { in: ids } },
      data: data as Prisma.VolunteerSelectionUpdateManyMutationInput,
    });
    return result.count;
  }

  async applicationExists(applicationId: string): Promise<{
    exists: boolean;
    applicationStatus?: string;
    volunteerId?: string;
    editionId?: string;
    skills?: string[];
    preferredDepartmentId?: string | null;
    preferredRoleId?: string | null;
    preferredShiftId?: string | null;
  }> {
    const app = await this.prisma.volunteerApplication.findFirst({
      where: { id: applicationId, deletedAt: null },
      select: {
        applicationStatus: true,
        volunteerId: true,
        editionId: true,
        skills: true,
        preferredDepartmentId: true,
        preferredRoleId: true,
        preferredShiftId: true,
      },
    });
    if (!app) return { exists: false };
    return {
      exists: true,
      applicationStatus: app.applicationStatus,
      volunteerId: app.volunteerId,
      editionId: app.editionId,
      skills: app.skills,
      preferredDepartmentId: app.preferredDepartmentId,
      preferredRoleId: app.preferredRoleId,
      preferredShiftId: app.preferredShiftId,
    };
  }

  async getVolunteerProfile(volunteerId: string): Promise<{
    volunteerStatus: string;
    skills: string[];
    languages: string[];
  } | null> {
    return this.prisma.volunteer.findFirst({
      where: { id: volunteerId, deletedAt: null },
      select: { volunteerStatus: true, skills: true, languages: true },
    });
  }

  async countPreviousApprovedApplications(volunteerId: string): Promise<number> {
    return this.prisma.volunteerApplication.count({
      where: {
        volunteerId,
        applicationStatus: ApplicationStatus.APPROVED,
        deletedAt: null,
      },
    });
  }

  async countPreviousSelections(volunteerId: string): Promise<number> {
    const apps = await this.prisma.volunteerApplication.findMany({
      where: { volunteerId, deletedAt: null },
      select: { id: true },
    });
    if (apps.length === 0) return 0;
    return this.prisma.volunteerSelection.count({
      where: {
        applicationId: { in: apps.map((a) => a.id) },
        selectionStatus: SelectionStatus.SELECTED,
      },
    });
  }

  async findManyForAdmin(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    status?: string;
    editionId?: string;
    applicationId?: string;
  }): Promise<{ data: VolunteerSelection[]; total: number }> {
    const where: Prisma.VolunteerSelectionWhereInput = {};

    if (options.search) {
      where.OR = [
        { selectionCode: { contains: options.search, mode: 'insensitive' } },
        { selectionNotes: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) where.selectionStatus = options.status as SelectionStatus;
    if (options.applicationId) where.applicationId = options.applicationId;
    if (options.editionId) {
      where.application = { editionId: options.editionId, deletedAt: null };
    }

    const allowedSortFields = ['createdAt', 'selectionStatus', 'selectionCode', 'recommendationScore', 'selectedAt'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerSelection.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerSelection.count({ where }),
    ]);
    return { data, total };
  }
}
