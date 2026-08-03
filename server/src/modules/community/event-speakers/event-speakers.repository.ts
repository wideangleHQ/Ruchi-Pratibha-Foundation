import { Injectable } from '@nestjs/common';
import { EventSpeaker, Prisma, SpeakerStatus } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class EventSpeakersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventSpeakerUncheckedCreateInput): Promise<EventSpeaker> {
    return this.prisma.eventSpeaker.create({ data });
  }

  async findById(id: string): Promise<EventSpeaker | null> {
    return this.prisma.eventSpeaker.findFirst({ where: { id, deletedAt: null } });
  }

  async findBySlug(slug: string): Promise<EventSpeaker | null> {
    return this.prisma.eventSpeaker.findFirst({ where: { slug, deletedAt: null } });
  }

  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const where: Prisma.EventSpeakerWhereInput = { slug, deletedAt: null };
    if (excludeId) where.id = { not: excludeId };
    return (await this.prisma.eventSpeaker.count({ where })) > 0;
  }

  async countAll(): Promise<number> {
    return this.prisma.eventSpeaker.count();
  }

  async update(id: string, data: Prisma.EventSpeakerUncheckedUpdateInput): Promise<EventSpeaker> {
    return this.prisma.eventSpeaker.update({ where: { id }, data });
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    status?: string;
  }): Promise<{ data: EventSpeaker[]; total: number }> {
    const where: Prisma.EventSpeakerWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { designation: { contains: options.search, mode: 'insensitive' } },
        { organization: { contains: options.search, mode: 'insensitive' } },
        { speakerCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) where.speakerStatus = options.status as SpeakerStatus;

    const allowedSortFields = ['createdAt', 'name', 'sortOrder', 'speakerStatus'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'sortOrder';

    const [data, total] = await Promise.all([
      this.prisma.eventSpeaker.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.eventSpeaker.count({ where }),
    ]);
    return { data, total };
  }

  async findActivePublic(options: {
    skip: number;
    take: number;
    search?: string;
  }): Promise<{ data: EventSpeaker[]; total: number }> {
    const where: Prisma.EventSpeakerWhereInput = { deletedAt: null, speakerStatus: SpeakerStatus.ACTIVE };

    if (options.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { organization: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.eventSpeaker.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.eventSpeaker.count({ where }),
    ]);
    return { data, total };
  }
}
