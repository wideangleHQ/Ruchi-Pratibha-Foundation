import { Injectable } from '@nestjs/common';
import {
  Prisma,
  VerificationAction,
  Volunteer,
  VolunteerIdentity,
  VolunteerStatus,
  VolunteerVerification,
} from '@prisma/client';
import { PrismaService } from '../../../database';

export type VolunteerWithIdentitiesAndVerifications = Volunteer & {
  identities: VolunteerIdentity[];
  verifications: (VolunteerVerification & {
    verifiedBy: { name: string; email: string };
  })[];
};

export interface PendingVolunteerRow {
  id: string;
  volunteerCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  volunteerStatus: VolunteerStatus;
  createdAt: Date;
  identities: { id: string }[];
}

@Injectable()
export class VolunteerVerificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async approveVolunteer(
    volunteerId: string,
    adminId: string,
    previousStatus: VolunteerStatus,
    remarks: string | undefined,
    ipAddress: string | undefined,
    userAgent: string | undefined,
  ): Promise<VolunteerVerification> {
    return this.prisma.$transaction(async (tx) => {
      await tx.volunteer.update({
        where: { id: volunteerId },
        data: {
          volunteerStatus: VolunteerStatus.VERIFIED,
          updatedBy: adminId,
          version: { increment: 1 },
        },
      });

      return tx.volunteerVerification.create({
        data: {
          volunteerId,
          action: VerificationAction.APPROVED,
          previousStatus,
          currentStatus: VolunteerStatus.VERIFIED,
          remarks: remarks ?? null,
          verifiedById: adminId,
          ipAddress: ipAddress ?? null,
          userAgent: userAgent ?? null,
        },
      });
    });
  }

  async rejectVolunteer(
    volunteerId: string,
    adminId: string,
    previousStatus: VolunteerStatus,
    reason: string,
    remarks: string | undefined,
    ipAddress: string | undefined,
    userAgent: string | undefined,
  ): Promise<VolunteerVerification> {
    const combinedRemarks = remarks ? `${reason}\n---\n${remarks}` : reason;

    return this.prisma.$transaction(async (tx) => {
      await tx.volunteer.update({
        where: { id: volunteerId },
        data: {
          volunteerStatus: VolunteerStatus.REJECTED,
          updatedBy: adminId,
          version: { increment: 1 },
        },
      });

      return tx.volunteerVerification.create({
        data: {
          volunteerId,
          action: VerificationAction.REJECTED,
          previousStatus,
          currentStatus: VolunteerStatus.REJECTED,
          remarks: combinedRemarks,
          verifiedById: adminId,
          ipAddress: ipAddress ?? null,
          userAgent: userAgent ?? null,
        },
      });
    });
  }

  async findPending(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    city?: string;
    state?: string;
  }): Promise<{ data: PendingVolunteerRow[]; total: number }> {
    const where: Prisma.VolunteerWhereInput = {
      deletedAt: null,
      volunteerStatus: VolunteerStatus.PENDING_VERIFICATION,
    };

    if (options.search) {
      where.OR = [
        { firstName: { contains: options.search, mode: 'insensitive' } },
        { lastName: { contains: options.search, mode: 'insensitive' } },
        { email: { contains: options.search, mode: 'insensitive' } },
        { volunteerCode: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    if (options.city) {
      where.city = { equals: options.city, mode: 'insensitive' };
    }

    if (options.state) {
      where.state = { equals: options.state, mode: 'insensitive' };
    }

    const allowedSortFields = ['createdAt', 'firstName', 'lastName', 'city', 'state', 'volunteerCode'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteer.findMany({
        where,
        select: {
          id: true,
          volunteerCode: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          city: true,
          state: true,
          volunteerStatus: true,
          createdAt: true,
          identities: { select: { id: true }, where: { deletedAt: null } },
        },
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteer.count({ where }),
    ]);

    return { data, total };
  }

  async findVolunteerForAdmin(
    id: string,
  ): Promise<VolunteerWithIdentitiesAndVerifications | null> {
    return this.prisma.volunteer.findFirst({
      where: { id, deletedAt: null },
      include: {
        identities: { where: { deletedAt: null } },
        verifications: {
          include: { verifiedBy: { select: { name: true, email: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async findVerificationHistory(
    volunteerId: string,
  ): Promise<
    (VolunteerVerification & { verifiedBy: { name: string; email: string } })[]
  > {
    return this.prisma.volunteerVerification.findMany({
      where: { volunteerId },
      include: { verifiedBy: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async volunteerExists(id: string): Promise<boolean> {
    const count = await this.prisma.volunteer.count({
      where: { id, deletedAt: null },
    });
    return count > 0;
  }

  async getVolunteerStatus(id: string): Promise<VolunteerStatus | null> {
    const volunteer = await this.prisma.volunteer.findFirst({
      where: { id, deletedAt: null },
      select: { volunteerStatus: true },
    });
    return volunteer?.volunteerStatus ?? null;
  }

  async hasIdentityDocuments(volunteerId: string): Promise<boolean> {
    const count = await this.prisma.volunteerIdentity.count({
      where: { volunteerId, deletedAt: null },
    });
    return count > 0;
  }
}
