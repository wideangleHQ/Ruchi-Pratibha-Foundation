import { Injectable } from '@nestjs/common';
import { EventDepartment, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class EventDepartmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventDepartmentUncheckedCreateInput): Promise<EventDepartment> {
    return this.prisma.eventDepartment.create({ data });
  }

  async findById(id: string): Promise<EventDepartment | null> {
    return this.prisma.eventDepartment.findFirst({ where: { id, deletedAt: null } });
  }

  async findByTitle(title: string, excludeId?: string): Promise<EventDepartment | null> {
    const where: Prisma.EventDepartmentWhereInput = { title, deletedAt: null };
    if (excludeId) where.id = { not: excludeId };
    return this.prisma.eventDepartment.findFirst({ where });
  }

  async countAll(): Promise<number> {
    return this.prisma.eventDepartment.count();
  }

  async update(id: string, data: Prisma.EventDepartmentUpdateInput): Promise<EventDepartment> {
    return this.prisma.eventDepartment.update({ where: { id }, data });
  }

  async hasRoles(id: string): Promise<boolean> {
    const count = await this.prisma.volunteerRole.count({ where: { departmentId: id, deletedAt: null } });
    return count > 0;
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    status?: string;
  }): Promise<{ data: EventDepartment[]; total: number }> {
    const where: Prisma.EventDepartmentWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { departmentCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) {
      where.status = options.status as Prisma.EnumEntityStatusFilter['equals'];
    }

    const allowedSortFields = ['createdAt', 'title', 'status'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.eventDepartment.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.eventDepartment.count({ where }),
    ]);
    return { data, total };
  }
}
