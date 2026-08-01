import { Injectable } from '@nestjs/common';
import { DeploymentStatus, Prisma, VolunteerDeployment } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class VolunteerDeploymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VolunteerDeploymentUncheckedCreateInput): Promise<VolunteerDeployment> {
    return this.prisma.volunteerDeployment.create({ data });
  }

  async findById(id: string): Promise<VolunteerDeployment | null> {
    return this.prisma.volunteerDeployment.findUnique({ where: { id } });
  }

  async findByCode(code: string): Promise<VolunteerDeployment | null> {
    return this.prisma.volunteerDeployment.findFirst({ where: { deploymentCode: code } });
  }

  async findByAssignmentId(assignmentId: string): Promise<VolunteerDeployment | null> {
    return this.prisma.volunteerDeployment.findFirst({ where: { assignmentId } });
  }

  async countAll(): Promise<number> {
    return this.prisma.volunteerDeployment.count();
  }

  async update(id: string, data: Prisma.VolunteerDeploymentUpdateInput): Promise<VolunteerDeployment> {
    return this.prisma.volunteerDeployment.update({ where: { id }, data });
  }

  async assignmentExists(assignmentId: string): Promise<{
    exists: boolean;
    assignmentStatus?: string;
    volunteerId?: string;
    editionId?: string;
  }> {
    const asn = await this.prisma.volunteerAssignment.findUnique({
      where: { id: assignmentId },
      select: { assignmentStatus: true, volunteerId: true, editionId: true },
    });
    if (!asn) return { exists: false };
    return {
      exists: true,
      assignmentStatus: asn.assignmentStatus,
      volunteerId: asn.volunteerId,
      editionId: asn.editionId,
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
  }): Promise<{ data: VolunteerDeployment[]; total: number }> {
    const where: Prisma.VolunteerDeploymentWhereInput = {};

    if (options.search) {
      where.OR = [
        { deploymentCode: { contains: options.search, mode: 'insensitive' } },
        { notes: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) where.deploymentStatus = options.status as DeploymentStatus;
    if (options.editionId) where.editionId = options.editionId;

    const allowedSortFields = ['createdAt', 'deploymentStatus', 'deploymentCode', 'reportingDate'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerDeployment.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerDeployment.count({ where }),
    ]);
    return { data, total };
  }

  async findManyByVolunteer(volunteerId: string, options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }): Promise<{ data: VolunteerDeployment[]; total: number }> {
    const where: Prisma.VolunteerDeploymentWhereInput = { volunteerId };
    const allowedSortFields = ['createdAt', 'deploymentStatus', 'reportingDate'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerDeployment.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerDeployment.count({ where }),
    ]);
    return { data, total };
  }
}
