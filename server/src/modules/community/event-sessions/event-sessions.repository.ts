import { Injectable } from '@nestjs/common';
import { EventSession, Prisma, SessionStatus } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class EventSessionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventSessionUncheckedCreateInput): Promise<EventSession> {
    return this.prisma.eventSession.create({ data });
  }

  async findById(id: string): Promise<EventSession | null> {
    return this.prisma.eventSession.findFirst({ where: { id, deletedAt: null } });
  }

  async findBySlug(editionId: string, slug: string): Promise<EventSession | null> {
    return this.prisma.eventSession.findFirst({ where: { editionId, slug, deletedAt: null } });
  }

  async slugExists(editionId: string, slug: string, excludeId?: string): Promise<boolean> {
    const where: Prisma.EventSessionWhereInput = { editionId, slug, deletedAt: null };
    if (excludeId) where.id = { not: excludeId };
    return (await this.prisma.eventSession.count({ where })) > 0;
  }

  async countAll(): Promise<number> {
    return this.prisma.eventSession.count();
  }

  async update(id: string, data: Prisma.EventSessionUncheckedUpdateInput): Promise<EventSession> {
    return this.prisma.eventSession.update({ where: { id }, data });
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    editionId?: string;
    status?: string;
  }): Promise<{ data: EventSession[]; total: number }> {
    const where: Prisma.EventSessionWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { sessionCode: { contains: options.search, mode: 'insensitive' } },
        { sessionType: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.editionId) where.editionId = options.editionId;
    if (options.status) where.sessionStatus = options.status as SessionStatus;

    const allowedSortFields = ['createdAt', 'title', 'sortOrder', 'startTime', 'sessionStatus'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'sortOrder';

    const [data, total] = await Promise.all([
      this.prisma.eventSession.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.eventSession.count({ where }),
    ]);
    return { data, total };
  }

  async findByEditionPublic(options: {
    editionId: string;
    skip: number;
    take: number;
  }): Promise<{ data: EventSession[]; total: number }> {
    const where: Prisma.EventSessionWhereInput = {
      deletedAt: null,
      editionId: options.editionId,
      sessionStatus: { in: [SessionStatus.CONFIRMED, SessionStatus.COMPLETED] },
    };

    const [data, total] = await Promise.all([
      this.prisma.eventSession.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.eventSession.count({ where }),
    ]);
    return { data, total };
  }
}
