import { Injectable } from '@nestjs/common';
import { Prisma, Venue } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class VenuesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VenueUncheckedCreateInput): Promise<Venue> {
    return this.prisma.venue.create({ data });
  }

  async findById(id: string): Promise<Venue | null> {
    return this.prisma.venue.findFirst({ where: { id, deletedAt: null } });
  }

  async findByName(name: string, excludeId?: string): Promise<Venue | null> {
    const where: Prisma.VenueWhereInput = { name, deletedAt: null };
    if (excludeId) where.id = { not: excludeId };
    return this.prisma.venue.findFirst({ where });
  }

  async countAll(): Promise<number> {
    return this.prisma.venue.count();
  }

  async update(id: string, data: Prisma.VenueUpdateInput): Promise<Venue> {
    return this.prisma.venue.update({ where: { id }, data });
  }

  async hasLinkedEditions(id: string): Promise<boolean> {
    const count = await this.prisma.eventEdition.count({ where: { venueId: id, deletedAt: null } });
    return count > 0;
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    venueStatus?: string;
    venueType?: string;
  }): Promise<{ data: Venue[]; total: number }> {
    const where: Prisma.VenueWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { address: { contains: options.search, mode: 'insensitive' } },
        { venueCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.venueStatus) {
      where.venueStatus = options.venueStatus as Prisma.EnumVenueStatusFilter['equals'];
    }
    if (options.venueType) {
      where.venueType = options.venueType as Prisma.EnumVenueTypeFilter['equals'];
    }

    const allowedSortFields = ['createdAt', 'name', 'capacity', 'venueStatus', 'venueType'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.venue.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.venue.count({ where }),
    ]);
    return { data, total };
  }
}
