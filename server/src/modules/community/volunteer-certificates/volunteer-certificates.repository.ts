import { Injectable } from '@nestjs/common';
import { CertificateStatus, CertificateType, Prisma, VolunteerCertificate } from '@prisma/client';
import { PrismaService } from '../../../database';

@Injectable()
export class VolunteerCertificatesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.VolunteerCertificateUncheckedCreateInput): Promise<VolunteerCertificate> {
    return this.prisma.volunteerCertificate.create({ data });
  }

  async findById(id: string): Promise<VolunteerCertificate | null> {
    return this.prisma.volunteerCertificate.findUnique({ where: { id } });
  }

  async findByCertificateNumber(num: string): Promise<VolunteerCertificate | null> {
    return this.prisma.volunteerCertificate.findFirst({ where: { certificateNumber: num, deletedAt: null } });
  }

  async findByVerificationToken(token: string): Promise<VolunteerCertificate | null> {
    return this.prisma.volunteerCertificate.findFirst({ where: { verificationToken: token, deletedAt: null } });
  }

  async findByParticipationAndType(participationId: string, type: CertificateType): Promise<VolunteerCertificate | null> {
    return this.prisma.volunteerCertificate.findFirst({
      where: { participationId, certificateType: type, deletedAt: null },
    });
  }

  async countAll(): Promise<number> {
    return this.prisma.volunteerCertificate.count({ where: { deletedAt: null } });
  }

  async countByYear(year: number): Promise<number> {
    return this.prisma.volunteerCertificate.count({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        },
        deletedAt: null,
      },
    });
  }

  async update(id: string, data: Prisma.VolunteerCertificateUpdateInput): Promise<VolunteerCertificate> {
    return this.prisma.volunteerCertificate.update({ where: { id }, data });
  }

  async participationContext(participationId: string): Promise<{
    exists: boolean;
    participationStatus?: string;
    volunteerId?: string;
    editionId?: string;
    volunteer?: { firstName: string; lastName: string; volunteerStatus: string };
    edition?: { editionName: string; year: number; event?: { title: string } | null };
  }> {
    const p = await this.prisma.volunteerParticipation.findUnique({
      where: { id: participationId },
      select: {
        participationStatus: true,
        volunteerId: true,
        editionId: true,
        volunteer: { select: { firstName: true, lastName: true, volunteerStatus: true } },
        edition: { select: { editionName: true, year: true, event: { select: { title: true } } } },
      },
    });
    if (!p) return { exists: false };
    return {
      exists: true,
      participationStatus: p.participationStatus,
      volunteerId: p.volunteerId,
      editionId: p.editionId,
      volunteer: p.volunteer,
      edition: { editionName: p.edition.editionName, year: p.edition.year, event: p.edition.event as { title: string } | null },
    };
  }

  async findManyForAdmin(options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    search?: string;
    status?: string;
    type?: string;
    editionId?: string;
  }): Promise<{ data: VolunteerCertificate[]; total: number }> {
    const where: Prisma.VolunteerCertificateWhereInput = { deletedAt: null };

    if (options.search) {
      where.OR = [
        { certificateNumber: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options.status) where.certificateStatus = options.status as CertificateStatus;
    if (options.type) where.certificateType = options.type as CertificateType;
    if (options.editionId) where.editionId = options.editionId;

    const allowedSortFields = ['createdAt', 'certificateNumber', 'certificateStatus', 'issueDate'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerCertificate.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerCertificate.count({ where }),
    ]);
    return { data, total };
  }

  async findManyByVolunteer(volunteerId: string, options: {
    skip: number;
    take: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }): Promise<{ data: VolunteerCertificate[]; total: number }> {
    const where: Prisma.VolunteerCertificateWhereInput = { volunteerId, deletedAt: null };
    const allowedSortFields = ['createdAt', 'certificateNumber', 'issueDate'];
    const sortBy = allowedSortFields.includes(options.sortBy) ? options.sortBy : 'createdAt';

    const [data, total] = await Promise.all([
      this.prisma.volunteerCertificate.findMany({
        where,
        orderBy: { [sortBy]: options.sortOrder },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.volunteerCertificate.count({ where }),
    ]);
    return { data, total };
  }
}
