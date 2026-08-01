import { Injectable } from '@nestjs/common';
import { EditionStatus, EditionVisibility, EventEdition, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class EventEditionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EventEditionUncheckedCreateInput): Promise<EventEdition> {
    return this.prisma.eventEdition.create({ data });
  }

  async findById(id: string): Promise<EventEdition | null> {
    return this.prisma.eventEdition.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findBySlug(slug: string): Promise<EventEdition | null> {
    return this.prisma.eventEdition.findFirst({
      where: { slug, deletedAt: null },
    });
  }

  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const where: Prisma.EventEditionWhereInput = { slug, deletedAt: null };
    if (excludeId) where.id = { not: excludeId };
    const count = await this.prisma.eventEdition.count({ where });
    return count > 0;
  }

  async countByYear(year: number): Promise<number> {
    return this.prisma.eventEdition.count({ where: { year } });
  }

  async countAll(): Promise<number> {
    return this.prisma.eventEdition.count();
  }

  async update(id: string, data: Prisma.EventEditionUpdateInput): Promise<EventEdition> {
    return this.prisma.eventEdition.update({ where: { id }, data });
  }

  async findByEventId(eventId: string, options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    editionStatus?: string;
    visibility?: string;
    year?: number;
  }): Promise<{ data: EventEdition[]; total: number }> {
    const where: Prisma.EventEditionWhereInput = { eventId, deletedAt: null };

    if (options.search) {
      where.OR = [
        { editionName: { contains: options.search, mode: 'insensitive' } },
        { venue: { contains: options.search, mode: 'insensitive' } },
        { editionCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    if (options.editionStatus) {
      where.editionStatus = options.editionStatus as Prisma.EnumEditionStatusFilter['equals'];
    }
    if (options.visibility) {
      where.visibility = options.visibility as Prisma.EnumEditionVisibilityFilter['equals'];
    }
    if (options.year) {
      where.year = options.year;
    }

    const allowedSortFields = ['createdAt', 'editionName', 'year', 'eventStarts', 'eventEnds', 'editionStatus'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'year';

    const [data, total] = await Promise.all([
      this.prisma.eventEdition.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.eventEdition.count({ where }),
    ]);

    return { data, total };
  }

  async findUpcoming(options: { skip: number; take: number }): Promise<{ data: EventEdition[]; total: number }> {
    const now = new Date();
    const where: Prisma.EventEditionWhereInput = {
      deletedAt: null,
      visibility: EditionVisibility.PUBLIC,
      eventStarts: { gt: now },
      editionStatus: { in: [EditionStatus.PUBLISHED, EditionStatus.REGISTRATION_OPEN, EditionStatus.REGISTRATION_CLOSED] },
    };

    const [data, total] = await Promise.all([
      this.prisma.eventEdition.findMany({ where, orderBy: { eventStarts: 'asc' }, skip: options.skip, take: options.take }),
      this.prisma.eventEdition.count({ where }),
    ]);
    return { data, total };
  }

  async findFeatured(options: { skip: number; take: number }): Promise<{ data: EventEdition[]; total: number }> {
    const where: Prisma.EventEditionWhereInput = {
      deletedAt: null,
      visibility: EditionVisibility.PUBLIC,
      isFeatured: true,
      editionStatus: { notIn: [EditionStatus.DRAFT, EditionStatus.CANCELLED, EditionStatus.ARCHIVED] },
    };

    const [data, total] = await Promise.all([
      this.prisma.eventEdition.findMany({ where, orderBy: { eventStarts: 'desc' }, skip: options.skip, take: options.take }),
      this.prisma.eventEdition.count({ where }),
    ]);
    return { data, total };
  }

  async findPublicBySlug(slug: string): Promise<EventEdition | null> {
    return this.prisma.eventEdition.findFirst({
      where: {
        slug,
        deletedAt: null,
        visibility: EditionVisibility.PUBLIC,
        editionStatus: { notIn: [EditionStatus.DRAFT, EditionStatus.CANCELLED] },
      },
    });
  }

  async findPublicByEventSlug(eventSlug: string, options: {
    skip: number;
    take: number;
  }): Promise<{ data: EventEdition[]; total: number }> {
    const where: Prisma.EventEditionWhereInput = {
      deletedAt: null,
      visibility: EditionVisibility.PUBLIC,
      editionStatus: { notIn: [EditionStatus.DRAFT, EditionStatus.CANCELLED] },
      event: { slug: eventSlug, deletedAt: null, isActive: true },
    };

    const [data, total] = await Promise.all([
      this.prisma.eventEdition.findMany({ where, orderBy: { year: 'desc' }, skip: options.skip, take: options.take }),
      this.prisma.eventEdition.count({ where }),
    ]);
    return { data, total };
  }

  async eventExists(eventId: string): Promise<boolean> {
    const count = await this.prisma.event.count({ where: { id: eventId, deletedAt: null } });
    return count > 0;
  }
}
