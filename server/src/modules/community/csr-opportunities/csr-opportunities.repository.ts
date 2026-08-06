import { Injectable } from '@nestjs/common';
import { CsrOpportunity, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database';

const eventInclude = { event: { select: { title: true, eventCode: true } } } satisfies Prisma.CsrOpportunityInclude;

export type CsrOpportunityWithEvent = Prisma.CsrOpportunityGetPayload<{
  include: typeof eventInclude;
}>;

@Injectable()
export class CsrOpportunitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CsrOpportunityCreateInput): Promise<CsrOpportunity> {
    return this.prisma.csrOpportunity.create({ data });
  }

  async findById(id: string) {
    return this.prisma.csrOpportunity.findFirst({
      where: { id, deletedAt: null },
      include: eventInclude,
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.csrOpportunity.findFirst({
      where: { slug, deletedAt: null },
      include: eventInclude,
    });
  }

  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const where: Prisma.CsrOpportunityWhereInput = { slug, deletedAt: null };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    const count = await this.prisma.csrOpportunity.count({ where });
    return count > 0;
  }

  async countAll(): Promise<number> {
    return this.prisma.csrOpportunity.count();
  }

  async update(id: string, data: Prisma.CsrOpportunityUpdateInput): Promise<CsrOpportunity> {
    return this.prisma.csrOpportunity.update({ where: { id }, data });
  }

  async findMany(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    opportunityStatus?: string;
    opportunityType?: string;
    mode?: string;
    district?: string;
    state?: string;
  }): Promise<{ data: CsrOpportunityWithEvent[]; total: number }> {
    const where: Prisma.CsrOpportunityWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { shortDescription: { contains: options.search, mode: 'insensitive' } },
        { opportunityCode: { contains: options.search, mode: 'insensitive' } },
        { district: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    if (options.opportunityStatus) {
      where.opportunityStatus = options.opportunityStatus as Prisma.EnumOpportunityStatusFilter['equals'];
    }
    if (options.opportunityType) {
      where.opportunityType = options.opportunityType as Prisma.EnumOpportunityTypeFilter['equals'];
    }
    if (options.mode) {
      where.mode = options.mode as Prisma.EnumOpportunityModeFilter['equals'];
    }
    if (options.district) {
      where.district = { contains: options.district, mode: 'insensitive' };
    }
    if (options.state) {
      where.state = { contains: options.state, mode: 'insensitive' };
    }

    const allowedSortFields = ['createdAt', 'title', 'opportunityStatus', 'eventStartDate', 'registrationCloses'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.csrOpportunity.findMany({
        where,
        include: eventInclude,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.csrOpportunity.count({ where }),
    ]);

    return { data, total };
  }

  async findPublished(options: {
    skip: number;
    take: number;
    search?: string;
    opportunityType?: string;
    mode?: string;
    district?: string;
    state?: string;
  }): Promise<{ data: CsrOpportunityWithEvent[]; total: number }> {
    const where: Prisma.CsrOpportunityWhereInput = {
      deletedAt: null,
      acceptRegistrations: true,
      showOnCsrPage: true,
      opportunityStatus: {
        in: ['PUBLISHED', 'REGISTRATION_OPEN'],
      },
      AND: [
        { OR: [{ registrationOpens: null }, { registrationOpens: { lte: new Date() } }] },
        { OR: [{ registrationCloses: null }, { registrationCloses: { gte: new Date() } }] },
      ],
    };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { shortDescription: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.opportunityType) {
      where.opportunityType = options.opportunityType as Prisma.EnumOpportunityTypeFilter['equals'];
    }
    if (options.mode) {
      where.mode = options.mode as Prisma.EnumOpportunityModeFilter['equals'];
    }
    if (options.district) {
      where.district = { contains: options.district, mode: 'insensitive' };
    }
    if (options.state) {
      where.state = { contains: options.state, mode: 'insensitive' };
    }

    const [data, total] = await Promise.all([
      this.prisma.csrOpportunity.findMany({
        where,
        include: eventInclude,
        orderBy: { createdAt: 'desc' },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.csrOpportunity.count({ where }),
    ]);

    return { data, total };
  }

  async findBySlugPublished(slug: string) {
    return this.prisma.csrOpportunity.findFirst({
      where: {
        slug,
        deletedAt: null,
        acceptRegistrations: true,
        showOnCsrPage: true,
        opportunityStatus: {
          in: ['PUBLISHED', 'REGISTRATION_OPEN'],
        },
        AND: [
          { OR: [{ registrationOpens: null }, { registrationOpens: { lte: new Date() } }] },
          { OR: [{ registrationCloses: null }, { registrationCloses: { gte: new Date() } }] },
        ],
      },
      include: eventInclude,
    });
  }

  async getStats(id: string) {
    const applications = await this.prisma.volunteerApplication.groupBy({
      by: ['applicationStatus'],
      where: {
        edition: { csrOpportunity: { id } },
        deletedAt: null,
      },
      _count: true,
    });

    const total = applications.reduce((sum, item) => sum + item._count, 0);
    return {
      total,
      applications: applications.map((item) => ({
        status: item.applicationStatus,
        count: item._count,
      })),
    };
  }

  async findArchived(options: {
    skip: number;
    take: number;
    search?: string;
  }): Promise<{ data: CsrOpportunityWithEvent[]; total: number }> {
    const where: Prisma.CsrOpportunityWhereInput = {
      deletedAt: null,
      opportunityStatus: 'ARCHIVED',
    };

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { shortDescription: { contains: options.search, mode: 'insensitive' } },
        { opportunityCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.csrOpportunity.findMany({
        where,
        include: eventInclude,
        orderBy: { updatedAt: 'desc' },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.csrOpportunity.count({ where }),
    ]);

    return { data, total };
  }
}
