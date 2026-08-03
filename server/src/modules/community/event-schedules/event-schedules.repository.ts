import { Injectable } from '@nestjs/common';
import { EventSchedule, Prisma, ScheduleStatus } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class EventSchedulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventScheduleUncheckedCreateInput): Promise<EventSchedule> {
    return this.prisma.eventSchedule.create({ data });
  }

  async findById(id: string): Promise<EventSchedule | null> {
    return this.prisma.eventSchedule.findFirst({ where: { id, deletedAt: null } });
  }

  async countAll(): Promise<number> {
    return this.prisma.eventSchedule.count();
  }

  async update(id: string, data: Prisma.EventScheduleUncheckedUpdateInput): Promise<EventSchedule> {
    return this.prisma.eventSchedule.update({ where: { id }, data });
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    editionId?: string;
    status?: string;
  }): Promise<{ data: EventSchedule[]; total: number }> {
    const where: Prisma.EventScheduleWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { scheduleCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.editionId) where.editionId = options.editionId;
    if (options.status) where.scheduleStatus = options.status as ScheduleStatus;

    const allowedSortFields = ['createdAt', 'title', 'displayOrder', 'startTime', 'scheduleStatus'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'displayOrder';

    const [data, total] = await Promise.all([
      this.prisma.eventSchedule.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.eventSchedule.count({ where }),
    ]);
    return { data, total };
  }

  async findByEditionPublic(options: {
    editionId: string;
    skip: number;
    take: number;
  }): Promise<{ data: EventSchedule[]; total: number }> {
    const where: Prisma.EventScheduleWhereInput = {
      deletedAt: null,
      editionId: options.editionId,
      scheduleStatus: ScheduleStatus.PUBLISHED,
    };

    const [data, total] = await Promise.all([
      this.prisma.eventSchedule.findMany({
        where,
        orderBy: [{ startTime: 'asc' }, { displayOrder: 'asc' }],
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.eventSchedule.count({ where }),
    ]);
    return { data, total };
  }
}
