import { Injectable } from '@nestjs/common';
import { Prisma, Volunteer, VolunteerIdentity } from '@prisma/client';
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
}
