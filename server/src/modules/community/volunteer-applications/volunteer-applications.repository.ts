import { Injectable } from '@nestjs/common';
import { ApplicationStatus, Prisma, VolunteerApplication } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class VolunteerApplicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VolunteerApplicationUncheckedCreateInput): Promise<VolunteerApplication> {
    return this.prisma.volunteerApplication.create({ data });
  }

  async findById(id: string): Promise<VolunteerApplication | null> {
    return this.prisma.volunteerApplication.findFirst({ where: { id, deletedAt: null } });
  }

  async findByCode(code: string): Promise<VolunteerApplication | null> {
    return this.prisma.volunteerApplication.findFirst({ where: { applicationCode: code, deletedAt: null } });
  }

  async findActiveByVolunteerAndEdition(volunteerId: string, editionId: string): Promise<VolunteerApplication | null> {
    return this.prisma.volunteerApplication.findFirst({
      where: {
        volunteerId,
        editionId,
        deletedAt: null,
        applicationStatus: { notIn: [ApplicationStatus.WITHDRAWN, ApplicationStatus.EXPIRED] },
      },
    });
  }

  async countAll(): Promise<number> {
    return this.prisma.volunteerApplication.count();
  }

  async update(id: string, data: Prisma.VolunteerApplicationUpdateInput): Promise<VolunteerApplication> {
    return this.prisma.volunteerApplication.update({ where: { id }, data });
  }

  async volunteerExists(volunteerId: string): Promise<{ exists: boolean; status?: string }> {
    const vol = await this.prisma.volunteer.findFirst({
      where: { id: volunteerId, deletedAt: null },
      select: { volunteerStatus: true },
    });
    if (!vol) return { exists: false };
    return { exists: true, status: vol.volunteerStatus };
  }

  async editionExists(editionId: string): Promise<{
    exists: boolean;
    editionStatus?: string;
    registrationEnabled?: boolean;
    registrationCloses?: Date | null;
  }> {
    const ed = await this.prisma.eventEdition.findFirst({
      where: { id: editionId, deletedAt: null },
      select: { editionStatus: true, registrationEnabled: true, registrationCloses: true },
    });
    if (!ed) return { exists: false };
    return {
      exists: true,
      editionStatus: ed.editionStatus,
      registrationEnabled: ed.registrationEnabled,
      registrationCloses: ed.registrationCloses,
    };
  }

  async shiftExists(shiftId: string): Promise<boolean> {
    const count = await this.prisma.eventShift.count({ where: { id: shiftId, deletedAt: null } });
    return count > 0;
  }

  async departmentExists(deptId: string): Promise<boolean> {
    const count = await this.prisma.eventDepartment.count({ where: { id: deptId, deletedAt: null } });
    return count > 0;
  }

  async roleExists(roleId: string): Promise<boolean> {
    const count = await this.prisma.volunteerRole.count({ where: { id: roleId, deletedAt: null } });
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
    preferredDepartmentId?: string;
    preferredRoleId?: string;
    preferredShiftId?: string;
  }): Promise<{ data: VolunteerApplication[]; total: number }> {
    const where: Prisma.VolunteerApplicationWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { applicationCode: { contains: options.search, mode: 'insensitive' } },
        { motivation: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) where.applicationStatus = options.status as ApplicationStatus;
    if (options.editionId) where.editionId = options.editionId;
    if (options.preferredDepartmentId) where.preferredDepartmentId = options.preferredDepartmentId;
    if (options.preferredRoleId) where.preferredRoleId = options.preferredRoleId;
    if (options.preferredShiftId) where.preferredShiftId = options.preferredShiftId;

    const allowedSortFields = ['createdAt', 'submittedAt', 'applicationStatus', 'applicationCode'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerApplication.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerApplication.count({ where }),
    ]);
    return { data, total };
  }

  async findManyByVolunteer(volunteerId: string, options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }): Promise<{ data: VolunteerApplication[]; total: number }> {
    const where: Prisma.VolunteerApplicationWhereInput = { volunteerId, deletedAt: null };

    const [data, total] = await Promise.all([
      this.prisma.volunteerApplication.findMany({
        where,
        orderBy: { [options.sortBy === 'submittedAt' ? 'submittedAt' : 'createdAt']: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerApplication.count({ where }),
    ]);
    return { data, total };
  }
}
