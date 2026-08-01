import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class EventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventCreateInput): Promise<Event> {
    return this.prisma.event.create({ data });
  }

  async findById(id: string): Promise<Event | null> {
    return this.prisma.event.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findBySlug(slug: string): Promise<Event | null> {
    return this.prisma.event.findFirst({
      where: { slug, deletedAt: null },
    });
  }

  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const where: Prisma.EventWhereInput = { slug, deletedAt: null };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    const count = await this.prisma.event.count({ where });
    return count > 0;
  }

  async countAll(): Promise<number> {
    return this.prisma.event.count();
  }

  async update(id: string, data: Prisma.EventUpdateInput): Promise<Event> {
    return this.prisma.event.update({ where: { id }, data });
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    eventType?: string;
  }): Promise<{ data: Event[]; total: number }> {
    const where: Prisma.EventWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { shortDescription: { contains: options.search, mode: 'insensitive' } },
        { eventCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    if (options.eventType) {
      where.eventType = options.eventType as Prisma.EnumEventTypeFilter['equals'];
    }

    const allowedSortFields = ['createdAt', 'title', 'eventType', 'sortOrder'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'sortOrder';

    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.event.count({ where }),
    ]);

    return { data, total };
  }

  async findActivePublic(options: {
    skip: number;
    take: number;
    search?: string;
    eventType?: string;
  }): Promise<{ data: Event[]; total: number }> {
    const where: Prisma.EventWhereInput = {
      deletedAt: null,
      isActive: true,
    };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { shortDescription: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    if (options.eventType) {
      where.eventType = options.eventType as Prisma.EnumEventTypeFilter['equals'];
    }

    const [data, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.event.count({ where }),
    ]);

    return { data, total };
  }

  async findActiveBySlug(slug: string): Promise<Event | null> {
    return this.prisma.event.findFirst({
      where: { slug, deletedAt: null, isActive: true },
    });
  }
}
