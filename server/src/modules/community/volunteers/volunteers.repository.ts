import { Injectable } from '@nestjs/common';
import { Prisma, Volunteer, VolunteerIdentity, VolunteerStatus } from '@prisma/client';
import { PrismaService } from '../../../database';

export type VolunteerWithIdentities = Volunteer & { identities: VolunteerIdentity[] };

@Injectable()
export class VolunteersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.VolunteerCreateInput,
  ): Promise<VolunteerWithIdentities> {
    return this.prisma.volunteer.create({
      data,
      include: { identities: true },
    });
  }

  async findById(id: string): Promise<VolunteerWithIdentities | null> {
    return this.prisma.volunteer.findFirst({
      where: { id, deletedAt: null },
      include: { identities: { where: { deletedAt: null } } },
    });
  }

  async findByIdWithApplications(id: string) {
    return this.prisma.volunteer.findFirst({
      where: { id, deletedAt: null },
      include: {
        identities: { where: { deletedAt: null } },
        applications: {
          where: { deletedAt: null },
          orderBy: { createdAt: 'desc' },
          include: {
            edition: {
              select: { editionName: true, year: true, event: { select: { title: true } } },
            },
          },
        },
      },
    });
  }

  async findByCode(code: string): Promise<VolunteerWithIdentities | null> {
    return this.prisma.volunteer.findFirst({
      where: { volunteerCode: code, deletedAt: null },
      include: { identities: { where: { deletedAt: null } } },
    });
  }

  async findByEmail(email: string): Promise<Volunteer | null> {
    return this.prisma.volunteer.findFirst({
      where: { email, deletedAt: null },
    });
  }

  async findByPhone(phone: string): Promise<Volunteer | null> {
    return this.prisma.volunteer.findFirst({
      where: { phone, deletedAt: null },
    });
  }

  async countByYear(year: number): Promise<number> {
    return this.prisma.volunteer.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00.000Z`),
          lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
        },
      },
    });
  }

  async createIdentity(
    data: Prisma.VolunteerIdentityUncheckedCreateInput,
  ): Promise<VolunteerIdentity> {
    return this.prisma.volunteerIdentity.create({ data });
  }

  async findIdentityByVolunteerAndType(
    volunteerId: string,
    documentType: string,
  ): Promise<VolunteerIdentity | null> {
    return this.prisma.volunteerIdentity.findFirst({
      where: {
        volunteerId,
        documentType: documentType as Prisma.EnumIdentityDocumentTypeFilter['equals'],
        deletedAt: null,
      },
    });
  }

  async update(id: string, data: Prisma.VolunteerUpdateInput): Promise<Volunteer> {
    return this.prisma.volunteer.update({ where: { id }, data });
  }

  async findManyForAdmin(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    volunteerStatus?: VolunteerStatus;
    city?: string;
    state?: string;
  }): Promise<{ data: Volunteer[]; total: number }> {
    const where: Prisma.VolunteerWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { firstName: { contains: options.search, mode: 'insensitive' } },
        { lastName: { contains: options.search, mode: 'insensitive' } },
        { email: { contains: options.search, mode: 'insensitive' } },
        { phone: { contains: options.search, mode: 'insensitive' } },
        { volunteerCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.volunteerStatus) where.volunteerStatus = options.volunteerStatus;
    if (options.city) where.city = { contains: options.city, mode: 'insensitive' };
    if (options.state) where.state = { contains: options.state, mode: 'insensitive' };

    const allowedSortFields = ['createdAt', 'firstName', 'volunteerCode', 'volunteerStatus', 'city'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteer.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteer.count({ where }),
    ]);
    return { data, total };
  }

  async getStats(): Promise<{
    total: number;
    pending: number;
    verified: number;
    rejected: number;
    thisMonth: number;
  }> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, pending, verified, rejected, thisMonth] = await Promise.all([
      this.prisma.volunteer.count({ where: { deletedAt: null } }),
      this.prisma.volunteer.count({ where: { deletedAt: null, volunteerStatus: VolunteerStatus.PENDING_VERIFICATION } }),
      this.prisma.volunteer.count({ where: { deletedAt: null, volunteerStatus: VolunteerStatus.VERIFIED } }),
      this.prisma.volunteer.count({ where: { deletedAt: null, volunteerStatus: VolunteerStatus.REJECTED } }),
      this.prisma.volunteer.count({ where: { deletedAt: null, createdAt: { gte: monthStart } } }),
    ]);

    return { total, pending, verified, rejected, thisMonth };
  }

  async getApplicationStats(): Promise<{
    total: number;
    submitted: number;
    underReview: number;
    approved: number;
    rejected: number;
  }> {
    const [total, submitted, underReview, approved, rejected] = await Promise.all([
      this.prisma.volunteerApplication.count({ where: { deletedAt: null } }),
      this.prisma.volunteerApplication.count({ where: { deletedAt: null, applicationStatus: 'SUBMITTED' } }),
      this.prisma.volunteerApplication.count({ where: { deletedAt: null, applicationStatus: 'UNDER_REVIEW' } }),
      this.prisma.volunteerApplication.count({ where: { deletedAt: null, applicationStatus: 'APPROVED' } }),
      this.prisma.volunteerApplication.count({ where: { deletedAt: null, applicationStatus: 'REJECTED' } }),
    ]);

    return { total, submitted, underReview, approved, rejected };
  }
}
