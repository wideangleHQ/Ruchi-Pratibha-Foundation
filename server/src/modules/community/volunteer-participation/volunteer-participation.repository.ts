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

  async findByDeploymentId(deploymentId: string): Promise<VolunteerParticipation | null> {
    return this.prisma.volunteerParticipation.findFirst({ where: { deploymentId } });
  }

  async findByIds(ids: string[]): Promise<VolunteerParticipation[]> {
    return this.prisma.volunteerParticipation.findMany({ where: { id: { in: ids } } });
  }

  async countAll(): Promise<number> {
    return this.prisma.volunteerParticipation.count();
  }

  async update(id: string, data: Prisma.VolunteerParticipationUpdateInput): Promise<VolunteerParticipation> {
    return this.prisma.volunteerParticipation.update({ where: { id }, data });
  }

  async updateMany(ids: string[], data: Prisma.VolunteerParticipationUpdateInput): Promise<number> {
    const result = await this.prisma.volunteerParticipation.updateMany({
      where: { id: { in: ids } },
      data: data as Prisma.VolunteerParticipationUpdateManyMutationInput,
    });
    return result.count;
  }

  async deploymentExists(deploymentId: string): Promise<{
    exists: boolean;
    deploymentStatus?: string;
    volunteerId?: string;
    editionId?: string;
    assignmentId?: string;
  }> {
    const dep = await this.prisma.volunteerDeployment.findUnique({
      where: { id: deploymentId },
      select: { deploymentStatus: true, volunteerId: true, editionId: true, assignmentId: true },
    });
    if (!dep) return { exists: false };
    return {
      exists: true,
      deploymentStatus: dep.deploymentStatus,
      volunteerId: dep.volunteerId,
      editionId: dep.editionId,
      assignmentId: dep.assignmentId,
    };
  }

  async deploymentExistsByCode(code: string): Promise<{
    exists: boolean;
    id?: string;
    deploymentStatus?: string;
    volunteerId?: string;
    editionId?: string;
    assignmentId?: string;
  }> {
    const dep = await this.prisma.volunteerDeployment.findFirst({
      where: { deploymentCode: code },
      select: { id: true, deploymentStatus: true, volunteerId: true, editionId: true, assignmentId: true },
    });
    if (!dep) return { exists: false };
    return {
      exists: true,
      id: dep.id,
      deploymentStatus: dep.deploymentStatus,
      volunteerId: dep.volunteerId,
      editionId: dep.editionId,
      assignmentId: dep.assignmentId,
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

    const allowedSortFields = ['createdAt', 'participationStatus', 'participationCode', 'reportedDate', 'completionDate'];
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
    const allowedSortFields = ['createdAt', 'participationStatus', 'reportedDate', 'completionDate'];
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

  async findDeploymentsByIds(ids: string[]): Promise<Array<{
    id: string;
    deploymentStatus: string;
    volunteerId: string;
    editionId: string;
    assignmentId: string;
  }>> {
    const deployments = await this.prisma.volunteerDeployment.findMany({
      where: { id: { in: ids } },
      select: { id: true, deploymentStatus: true, volunteerId: true, editionId: true, assignmentId: true },
    });
    return deployments;
  }

  async findExistingParticipationsForDeployments(deploymentIds: string[]): Promise<string[]> {
    const existing = await this.prisma.volunteerParticipation.findMany({
      where: { deploymentId: { in: deploymentIds } },
      select: { deploymentId: true },
    });
    return existing.map((p) => p.deploymentId);
  }

  async createMany(data: Prisma.VolunteerParticipationUncheckedCreateInput[]): Promise<number> {
    const result = await this.prisma.volunteerParticipation.createMany({ data });
    return result.count;
  }
}
