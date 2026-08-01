import { Injectable } from '@nestjs/common';
import { Prisma, VolunteerRole } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class VolunteerRolesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VolunteerRoleUncheckedCreateInput): Promise<VolunteerRole> {
    return this.prisma.volunteerRole.create({ data });
  }

  async findById(id: string): Promise<VolunteerRole | null> {
    return this.prisma.volunteerRole.findFirst({ where: { id, deletedAt: null } });
  }

  async findByTitle(title: string, excludeId?: string): Promise<VolunteerRole | null> {
    const where: Prisma.VolunteerRoleWhereInput = { title, deletedAt: null };
    if (excludeId) where.id = { not: excludeId };
    return this.prisma.volunteerRole.findFirst({ where });
  }

  async countAll(): Promise<number> {
    return this.prisma.volunteerRole.count();
  }

  async update(id: string, data: Prisma.VolunteerRoleUpdateInput): Promise<VolunteerRole> {
    return this.prisma.volunteerRole.update({ where: { id }, data });
  }

  async departmentExists(departmentId: string): Promise<boolean> {
    const count = await this.prisma.eventDepartment.count({ where: { id: departmentId, deletedAt: null } });
    return count > 0;
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    status?: string;
    departmentId?: string;
  }): Promise<{ data: VolunteerRole[]; total: number }> {
    const where: Prisma.VolunteerRoleWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { roleCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) {
      where.status = options.status as Prisma.EnumEntityStatusFilter['equals'];
    }
    if (options.departmentId) {
      where.departmentId = options.departmentId;
    }

    const allowedSortFields = ['createdAt', 'title', 'priority', 'status'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'priority';

    const [data, total] = await Promise.all([
      this.prisma.volunteerRole.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerRole.count({ where }),
    ]);
    return { data, total };
  }
}
