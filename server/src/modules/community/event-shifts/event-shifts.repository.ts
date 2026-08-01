import { Injectable } from '@nestjs/common';
import { EventShift, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class EventShiftsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventShiftUncheckedCreateInput): Promise<EventShift> {
    return this.prisma.eventShift.create({ data });
  }

  async findById(id: string): Promise<EventShift | null> {
    return this.prisma.eventShift.findFirst({ where: { id, deletedAt: null } });
  }

  async countAll(): Promise<number> {
    return this.prisma.eventShift.count();
  }

  async update(id: string, data: Prisma.EventShiftUpdateInput): Promise<EventShift> {
    return this.prisma.eventShift.update({ where: { id }, data });
  }

  async editionExists(editionId: string): Promise<boolean> {
    const count = await this.prisma.eventEdition.count({
      where: { id: editionId, deletedAt: null },
    });
    return count > 0;
  }

  async findOverlapping(
    editionId: string,
    startTime: Date,
    endTime: Date,
    excludeId?: string,
  ): Promise<EventShift | null> {
    const where: Prisma.EventShiftWhereInput = {
      editionId,
      deletedAt: null,
      startTime: { lt: endTime },
      endTime: { gt: startTime },
    };
    if (excludeId) where.id = { not: excludeId };
    return this.prisma.eventShift.findFirst({ where });
  }

  async findMany(options: {
    editionId: string;
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    status?: string;
  }): Promise<{ data: EventShift[]; total: number }> {
    const where: Prisma.EventShiftWhereInput = {
      editionId: options.editionId,
      deletedAt: null,
    };

    if (options.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { shiftCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) {
      where.status = options.status as Prisma.EnumShiftStatusFilter['equals'];
    }

    const allowedSortFields = ['createdAt', 'name', 'startTime', 'endTime', 'status'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'startTime';

    const [data, total] = await Promise.all([
      this.prisma.eventShift.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.eventShift.count({ where }),
    ]);
    return { data, total };
  }
}
