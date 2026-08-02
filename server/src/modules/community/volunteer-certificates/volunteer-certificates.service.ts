import { Injectable, Logger } from '@nestjs/common';
import { CertificateStatus, CertificateType, ParticipationStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
  ForbiddenResourceException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { SupabaseStorageService } from '../../../supabase-storage/supabase-storage.service';
import { CertificateQueryDto, CertificateResponseDto, GenerateCertificateDto } from './dto';
import { CertificatePdfService } from './certificate-pdf.service';
import { VolunteerCertificatesRepository } from './volunteer-certificates.repository';

const VALID_TRANSITIONS: Record<CertificateStatus, CertificateStatus[]> = {
  [CertificateStatus.DRAFT]: [CertificateStatus.ISSUED],
  [CertificateStatus.ISSUED]: [CertificateStatus.REVOKED],
  [CertificateStatus.REVOKED]: [],
  [CertificateStatus.EXPIRED]: [],
};

const ELIGIBLE_PARTICIPATION_STATUSES = new Set<string>([
  ParticipationStatus.COMPLETED,
]);

@Injectable()
export class VolunteerCertificatesService {
  private readonly logger = new Logger(VolunteerCertificatesService.name);

  constructor(
    private readonly repository: VolunteerCertificatesRepository,
    private readonly pdfService: CertificatePdfService,
    private readonly storageService: SupabaseStorageService,
  ) {}

  async generate(dto: GenerateCertificateDto, adminId: string) {
    const certType = dto.certificateType ?? CertificateType.PARTICIPATION;

    const context = await this.repository.participationContext(dto.participationId);
    if (!context.exists) {
      throw new EntityNotFoundException('VolunteerParticipation', dto.participationId);
    }

    if (!ELIGIBLE_PARTICIPATION_STATUSES.has(context.participationStatus!)) {
      throw new BusinessException(
        `Participation must be COMPLETED to generate a certificate (current: ${context.participationStatus})`,
      );
    }

    const existing = await this.repository.findByParticipationAndType(dto.participationId, certType);
    if (existing) {
      throw new EntityConflictException('VolunteerCertificate', 'participationId+type');
    }

    const now = new Date();
    const year = now.getFullYear();
    const certNumber = await this.generateCertificateNumber(year);
    const verificationToken = randomUUID();

    const volunteerName = `${context.volunteer!.firstName} ${context.volunteer!.lastName}`;
    const eventName = context.edition!.event?.title ?? 'Community Event';
    const editionName = context.edition!.editionName;
    const editionYear = context.edition!.year;

    const pdfBuffer = await this.pdfService.generate({
      certificateNumber: certNumber,
      volunteerName,
      eventName,
      editionName,
      editionYear,
      issueDate: now,
      certificateType: certType,
      verificationToken,
    });

    const objectPath = `certificates/${year}/${certNumber}.pdf`;
    const uploadResult = await this.storageService.upload(objectPath, pdfBuffer, 'application/pdf');

    const certificate = await this.repository.create({
      certificateNumber: certNumber,
      volunteerId: context.volunteerId!,
      participationId: dto.participationId,
      editionId: context.editionId!,
      certificateType: certType,
      certificateStatus: CertificateStatus.ISSUED,
      issueDate: now,
      issuedBy: adminId,
      verificationToken,
      bucketName: uploadResult.bucketName,
      objectPath: uploadResult.objectPath,
      publicUrl: uploadResult.publicUrl,
      contentType: uploadResult.contentType,
      fileSize: uploadResult.fileSize,
      checksum: uploadResult.checksum,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Certificate ${certNumber} issued for volunteer ${context.volunteerId}`);
    return ApiResponseDto.success(CertificateResponseDto.fromEntity(certificate), 'Certificate generated');
  }

  async regenerate(certNumber: string, adminId: string) {
    const cert = await this.repository.findByCertificateNumber(certNumber);
    if (!cert) throw new EntityNotFoundException('VolunteerCertificate', certNumber);

    if (cert.certificateStatus === CertificateStatus.REVOKED) {
      throw new BusinessException('Cannot regenerate a revoked certificate');
    }

    const context = await this.repository.participationContext(cert.participationId);
    if (!context.exists) {
      throw new EntityNotFoundException('VolunteerParticipation', cert.participationId);
    }

    const volunteerName = `${context.volunteer!.firstName} ${context.volunteer!.lastName}`;
    const eventName = context.edition!.event?.title ?? 'Community Event';
    const editionName = context.edition!.editionName;
    const editionYear = context.edition!.year;
    const newToken = randomUUID();

    const pdfBuffer = await this.pdfService.generate({
      certificateNumber: cert.certificateNumber,
      volunteerName,
      eventName,
      editionName,
      editionYear,
      issueDate: cert.issueDate ?? new Date(),
      certificateType: cert.certificateType,
      verificationToken: newToken,
    });

    const objectPath = cert.objectPath ?? `certificates/${editionYear}/${cert.certificateNumber}.pdf`;
    const uploadResult = await this.storageService.replace(objectPath, pdfBuffer, 'application/pdf');

    const updated = await this.repository.update(cert.id, {
      verificationToken: newToken,
      bucketName: uploadResult.bucketName,
      objectPath: uploadResult.objectPath,
      publicUrl: uploadResult.publicUrl,
      contentType: uploadResult.contentType,
      fileSize: uploadResult.fileSize,
      checksum: uploadResult.checksum,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Certificate ${certNumber} regenerated`);
    return ApiResponseDto.success(CertificateResponseDto.fromEntity(updated), 'Certificate regenerated');
  }

  async revoke(certNumber: string, adminId: string) {
    const cert = await this.repository.findByCertificateNumber(certNumber);
    if (!cert) throw new EntityNotFoundException('VolunteerCertificate', certNumber);

    this.validateTransition(cert.certificateStatus as CertificateStatus, CertificateStatus.REVOKED);

    if (cert.objectPath) {
      await this.storageService.delete(cert.objectPath).catch((err) => {
        this.logger.warn(`Failed to delete PDF for ${certNumber}: ${err.message}`);
      });
    }

    const updated = await this.repository.update(cert.id, {
      certificateStatus: CertificateStatus.REVOKED,
      publicUrl: null,
      objectPath: null,
      deletedAt: new Date(),
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Certificate ${certNumber} revoked by admin ${adminId}`);
    return ApiResponseDto.success(CertificateResponseDto.fromEntity(updated), 'Certificate revoked');
  }

  async verify(certNumber: string) {
    const cert = await this.repository.findByCertificateNumber(certNumber);
    if (!cert) throw new EntityNotFoundException('VolunteerCertificate', certNumber);

    const isValid = cert.certificateStatus === CertificateStatus.ISSUED;
    return ApiResponseDto.success(
      {
        certificateNumber: cert.certificateNumber,
        isValid,
        status: cert.certificateStatus,
        issueDate: cert.issueDate,
        certificateType: cert.certificateType,
      },
      isValid ? 'Certificate is valid' : 'Certificate is not valid',
    );
  }

  async getAdminCertificates(query: CertificateQueryDto) {
    const { data, total } = await this.repository.findManyForAdmin({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
      type: query.type,
      editionId: query.editionId,
    });
    const items = data.map((c) => CertificateResponseDto.fromEntity(c));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Certificates retrieved');
  }

  async getAdminCertificateByNumber(certNumber: string) {
    const cert = await this.repository.findByCertificateNumber(certNumber);
    if (!cert) throw new EntityNotFoundException('VolunteerCertificate', certNumber);
    return ApiResponseDto.success(CertificateResponseDto.fromEntity(cert), 'Certificate retrieved');
  }

  async getVolunteerCertificates(volunteerId: string, query: CertificateQueryDto) {
    const { data, total } = await this.repository.findManyByVolunteer(volunteerId, {
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
    const items = data.map((c) => CertificateResponseDto.fromEntity(c));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Certificates retrieved');
  }

  async getVolunteerCertificateByNumber(volunteerId: string, certNumber: string) {
    const cert = await this.repository.findByCertificateNumber(certNumber);
    if (!cert) throw new EntityNotFoundException('VolunteerCertificate', certNumber);
    if (cert.volunteerId !== volunteerId) throw new ForbiddenResourceException('certificate');
    return ApiResponseDto.success(CertificateResponseDto.fromEntity(cert), 'Certificate retrieved');
  }

  private validateTransition(current: CertificateStatus, target: CertificateStatus): void {
    const allowed = VALID_TRANSITIONS[current];
    if (!allowed?.includes(target)) {
      throw new BusinessException(`Cannot transition certificate from ${current} to ${target}`);
    }
  }

  private async generateCertificateNumber(year: number): Promise<string> {
    const count = await this.repository.countByYear(year);
    return `RPF-CERT-${year}-${(count + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
