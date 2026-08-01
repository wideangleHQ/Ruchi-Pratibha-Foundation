import { Injectable } from '@nestjs/common';
import { AssignmentStatus, Prisma, VolunteerAssignment } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class VolunteerAssignmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VolunteerAssignmentUncheckedCreateInput): Promise<VolunteerAssignment> {
    return this.prisma.volunteerAssignment.create({ data });
  }

  async findById(id: string): Promise<VolunteerAssignment | null> {
    return this.prisma.volunteerAssignment.findUnique({ where: { id } });
  }

  async findByCode(code: string): Promise<VolunteerAssignment | null> {
    return this.prisma.volunteerAssignment.findFirst({ where: { assignmentCode: code } });
  }

  async findBySelectionId(selectionId: string): Promise<VolunteerAssignment | null> {
    return this.prisma.volunteerAssignment.findFirst({ where: { selectionId } });
  }

  async findActiveByVolunteerAndEdition(volunteerId: string, editionId: string): Promise<VolunteerAssignment | null> {
    return this.prisma.volunteerAssignment.findFirst({
      where: {
        volunteerId,
        editionId,
        assignmentStatus: { notIn: [AssignmentStatus.CANCELLED, AssignmentStatus.DECLINED] },
      },
    });
  }

  async countAll(): Promise<number> {
    return this.prisma.volunteerAssignment.count();
  }

  async update(id: string, data: Prisma.VolunteerAssignmentUpdateInput): Promise<VolunteerAssignment> {
    return this.prisma.volunteerAssignment.update({ where: { id }, data });
  }

  async selectionExists(selectionId: string): Promise<{
    exists: boolean;
    selectionStatus?: string;
    volunteerId?: string;
    editionId?: string;
  }> {
    const sel = await this.prisma.volunteerSelection.findUnique({
      where: { id: selectionId },
      select: {
        selectionStatus: true,
        application: {
          select: { volunteerId: true, editionId: true },
        },
      },
    });
    if (!sel) return { exists: false };
    return {
      exists: true,
      selectionStatus: sel.selectionStatus,
      volunteerId: sel.application.volunteerId,
      editionId: sel.application.editionId,
    };
  }

  async departmentExists(id: string): Promise<boolean> {
    const count = await this.prisma.eventDepartment.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async roleExists(id: string): Promise<boolean> {
    const count = await this.prisma.volunteerRole.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async shiftExists(id: string): Promise<boolean> {
    const count = await this.prisma.eventShift.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async venueExists(id: string): Promise<boolean> {
    const count = await this.prisma.venue.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async findManyForAdmin(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    status?: string;
    editionId?: string;
    departmentId?: string;
    roleId?: string;
    shiftId?: string;
    venueId?: string;
  }): Promise<{ data: VolunteerAssignment[]; total: number }> {
    const where: Prisma.VolunteerAssignmentWhereInput = {};

    if (options.search) {
      where.OR = [
        { assignmentCode: { contains: options.search, mode: 'insensitive' } },
        { reportingManager: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) where.assignmentStatus = options.status as AssignmentStatus;
    if (options.editionId) where.editionId = options.editionId;
    if (options.departmentId) where.departmentId = options.departmentId;
    if (options.roleId) where.roleId = options.roleId;
    if (options.shiftId) where.shiftId = options.shiftId;
    if (options.venueId) where.venueId = options.venueId;

    const allowedSortFields = ['createdAt', 'assignmentStatus', 'assignmentCode', 'reportingTime'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerAssignment.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerAssignment.count({ where }),
    ]);
    return { data, total };
  }

  async findManyByVolunteer(volunteerId: string, options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }): Promise<{ data: VolunteerAssignment[]; total: number }> {
    const where: Prisma.VolunteerAssignmentWhereInput = { volunteerId };
    const allowedSortFields = ['createdAt', 'assignmentStatus', 'reportingTime'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerAssignment.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerAssignment.count({ where }),
    ]);
    return { data, total };
  }

  async findSelectedSelections(selectionIds: string[]): Promise<Array<{
    id: string;
    selectionStatus: string;
    volunteerId: string;
    editionId: string;
  }>> {
    const selections = await this.prisma.volunteerSelection.findMany({
      where: { id: { in: selectionIds } },
      select: {
        id: true,
        selectionStatus: true,
        application: { select: { volunteerId: true, editionId: true } },
      },
    });
    return selections.map((s) => ({
      id: s.id,
      selectionStatus: s.selectionStatus,
      volunteerId: s.application.volunteerId,
      editionId: s.application.editionId,
    }));
  }

  async findExistingAssignmentsForSelections(selectionIds: string[]): Promise<string[]> {
    const existing = await this.prisma.volunteerAssignment.findMany({
      where: { selectionId: { in: selectionIds } },
      select: { selectionId: true },
    });
    return existing.map((a) => a.selectionId);
  }

  async createMany(data: Prisma.VolunteerAssignmentUncheckedCreateInput[]): Promise<number> {
    const result = await this.prisma.volunteerAssignment.createMany({ data });
    return result.count;
  }
}
