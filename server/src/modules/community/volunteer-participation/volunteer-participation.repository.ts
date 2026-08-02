import { Injectable } from '@nestjs/common';
import { ParticipationStatus, Prisma, VolunteerParticipation } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class VolunteerParticipationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VolunteerParticipationUncheckedCreateInput): Promise<VolunteerParticipation> {
    return this.prisma.volunteerParticipation.create({ data });
  }

  async findById(id: string): Promise<VolunteerParticipation | null> {
    return this.prisma.volunteerParticipation.findUnique({ where: { id } });
  }

  async findByCode(code: string): Promise<VolunteerParticipation | null> {
    return this.prisma.volunteerParticipation.findFirst({ where: { participationCode: code } });
  }

  async findByApplicationId(applicationId: string): Promise<VolunteerParticipation | null> {
    return this.prisma.volunteerParticipation.findUnique({ where: { applicationId } });
  }

  async findByIds(ids: string[]): Promise<VolunteerParticipation[]> {
    return this.prisma.volunteerParticipation.findMany({ where: { id: { in: ids } } });
  }

  async countAll(): Promise<number> {
    return this.prisma.volunteerParticipation.count();
  }

  async update(id: string, data: Prisma.VolunteerParticipationUncheckedUpdateInput): Promise<VolunteerParticipation> {
    return this.prisma.volunteerParticipation.update({ where: { id }, data });
  }

  async updateMany(ids: string[], data: Prisma.VolunteerParticipationUncheckedUpdateInput): Promise<number> {
    const result = await this.prisma.volunteerParticipation.updateMany({
      where: { id: { in: ids } },
      data: data as Prisma.VolunteerParticipationUpdateManyMutationInput,
    });
    return result.count;
  }

  async applicationExists(applicationId: string): Promise<{
    exists: boolean;
    applicationStatus?: string;
    volunteerId?: string;
    editionId?: string;
  }> {
    const app = await this.prisma.volunteerApplication.findUnique({
      where: { id: applicationId },
      select: { applicationStatus: true, volunteerId: true, editionId: true },
    });
    if (!app) return { exists: false };
    return {
      exists: true,
      applicationStatus: app.applicationStatus,
      volunteerId: app.volunteerId,
      editionId: app.editionId,
    };
  }

  async findManyForAdmin(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    status?: string;
    editionId?: string;
  }): Promise<{ data: VolunteerParticipation[]; total: number }> {
    const where: Prisma.VolunteerParticipationWhereInput = {};

    if (options.search) {
      where.OR = [
        { participationCode: { contains: options.search, mode: 'insensitive' } },
        { coordinatorRemarks: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) where.participationStatus = options.status as ParticipationStatus;
    if (options.editionId) where.editionId = options.editionId;

    const allowedSortFields = ['createdAt', 'participationStatus', 'participationCode', 'startedAt', 'completedAt'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerParticipation.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerParticipation.count({ where }),
    ]);
    return { data, total };
  }

  async findManyByVolunteer(volunteerId: string, options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }): Promise<{ data: VolunteerParticipation[]; total: number }> {
    const where: Prisma.VolunteerParticipationWhereInput = { volunteerId };
    const allowedSortFields = ['createdAt', 'participationStatus', 'startedAt', 'completedAt'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerParticipation.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerParticipation.count({ where }),
    ]);
    return { data, total };
  }

  async createMany(data: Prisma.VolunteerParticipationUncheckedCreateInput[]): Promise<number> {
    const result = await this.prisma.volunteerParticipation.createMany({ data });
    return result.count;
  }
}
