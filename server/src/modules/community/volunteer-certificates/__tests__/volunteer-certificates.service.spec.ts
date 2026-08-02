import { Test, TestingModule } from '@nestjs/testing';
import { CertificateStatus, CertificateType, ParticipationStatus } from '@prisma/client';
import { SupabaseStorageService } from '../../../../supabase-storage/supabase-storage.service';
import { CertificatePdfService } from '../certificate-pdf.service';
import { VolunteerCertificatesRepository } from '../volunteer-certificates.repository';
import { VolunteerCertificatesService } from '../volunteer-certificates.service';

describe('VolunteerCertificatesService', () => {
  let service: VolunteerCertificatesService;
  let repository: jest.Mocked<VolunteerCertificatesRepository>;
  let pdfService: jest.Mocked<CertificatePdfService>;
  let storageService: jest.Mocked<SupabaseStorageService>;

  const mockCert = {
    id: 'cert-1',
    certificateNumber: 'RPF-CERT-2026-000001',
    volunteerId: 'vol-1',
    participationId: 'prt-1',
    editionId: 'ed-1',
    certificateType: CertificateType.PARTICIPATION,
    certificateStatus: CertificateStatus.ISSUED,
    issueDate: new Date(),
    issuedBy: 'admin-1',
    verificationToken: 'token-uuid',
    bucketName: 'certificates',
    objectPath: 'certificates/2026/RPF-CERT-2026-000001.pdf',
    publicUrl: 'https://storage.example.com/cert.pdf',
    contentType: 'application/pdf',
    fileSize: 50000,
    checksum: 'sha256hash',
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null as Date | null,
    createdBy: 'admin-1',
    updatedBy: 'admin-1',
  };

  const mockContext = {
    exists: true,
    participationStatus: ParticipationStatus.COMPLETED,
    volunteerId: 'vol-1',
    editionId: 'ed-1',
    volunteer: { firstName: 'Test', lastName: 'User', volunteerStatus: 'ACTIVE' },
    edition: { editionName: 'Spring 2026', year: 2026, event: { title: 'Community Day' } },
  };

  const mockUploadResult = {
    bucketName: 'certificates',
    objectPath: 'certificates/2026/RPF-CERT-2026-000001.pdf',
    publicUrl: 'https://storage.example.com/cert.pdf',
    contentType: 'application/pdf',
    fileSize: 50000,
    checksum: 'sha256hash',
  };

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCertificateNumber: jest.fn(),
      findByVerificationToken: jest.fn(),
      findByParticipationAndType: jest.fn(),
      countAll: jest.fn(),
      countByYear: jest.fn(),
      update: jest.fn(),
      participationContext: jest.fn(),
      findManyForAdmin: jest.fn(),
      findManyByVolunteer: jest.fn(),
    };

    const mockPdf = {
      generate: jest.fn(),
    };

    const mockStorage = {
      upload: jest.fn(),
      delete: jest.fn(),
      replace: jest.fn(),
      getSignedUrl: jest.fn(),
      exists: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerCertificatesService,
        { provide: VolunteerCertificatesRepository, useValue: mockRepo },
        { provide: CertificatePdfService, useValue: mockPdf },
        { provide: SupabaseStorageService, useValue: mockStorage },
      ],
    }).compile();

    service = module.get(VolunteerCertificatesService);
    repository = module.get(VolunteerCertificatesRepository);
    pdfService = module.get(CertificatePdfService);
    storageService = module.get(SupabaseStorageService);
  });

  describe('generate', () => {
    it('should generate a certificate for completed participation', async () => {
      repository.participationContext.mockResolvedValue(mockContext);
      repository.findByParticipationAndType.mockResolvedValue(null);
      repository.countByYear.mockResolvedValue(0);
      pdfService.generate.mockResolvedValue(Buffer.from('pdf'));
      storageService.upload.mockResolvedValue(mockUploadResult);
      repository.create.mockResolvedValue(mockCert);

      const result = await service.generate({ participationId: 'prt-1' }, 'admin-1');
      expect(result.data.certificateNumber).toBe('RPF-CERT-2026-000001');
      expect(result.data.certificateStatus).toBe('ISSUED');
    });

    it('should throw if participation not found', async () => {
      repository.participationContext.mockResolvedValue({ exists: false });
      await expect(service.generate({ participationId: 'prt-999' }, 'admin-1')).rejects.toThrow('not found');
    });

    it('should throw if participation not COMPLETED', async () => {
      repository.participationContext.mockResolvedValue({
        ...mockContext,
        participationStatus: ParticipationStatus.ACTIVE,
      });
      await expect(service.generate({ participationId: 'prt-1' }, 'admin-1')).rejects.toThrow('COMPLETED');
    });

    it('should throw if certificate already exists for participation+type', async () => {
      repository.participationContext.mockResolvedValue(mockContext);
      repository.findByParticipationAndType.mockResolvedValue(mockCert);
      await expect(service.generate({ participationId: 'prt-1' }, 'admin-1')).rejects.toThrow('already exists');
    });
  });

  describe('regenerate', () => {
    it('should regenerate certificate PDF', async () => {
      repository.findByCertificateNumber.mockResolvedValue(mockCert);
      repository.participationContext.mockResolvedValue(mockContext);
      pdfService.generate.mockResolvedValue(Buffer.from('new-pdf'));
      storageService.replace.mockResolvedValue(mockUploadResult);
      repository.update.mockResolvedValue({ ...mockCert, version: 2 });

      const result = await service.regenerate('RPF-CERT-2026-000001', 'admin-1');
      expect(result.data.certificateNumber).toBe('RPF-CERT-2026-000001');
    });

    it('should throw if certificate not found', async () => {
      repository.findByCertificateNumber.mockResolvedValue(null);
      await expect(service.regenerate('RPF-CERT-999', 'admin-1')).rejects.toThrow('not found');
    });

    it('should throw if certificate is revoked', async () => {
      repository.findByCertificateNumber.mockResolvedValue({
        ...mockCert,
        certificateStatus: CertificateStatus.REVOKED,
      });
      await expect(service.regenerate('RPF-CERT-2026-000001', 'admin-1')).rejects.toThrow('revoked');
    });
  });

  describe('revoke', () => {
    it('should revoke an issued certificate', async () => {
      repository.findByCertificateNumber.mockResolvedValue(mockCert);
      storageService.delete.mockResolvedValue(undefined);
      repository.update.mockResolvedValue({
        ...mockCert,
        certificateStatus: CertificateStatus.REVOKED,
        deletedAt: new Date(),
      });

      const result = await service.revoke('RPF-CERT-2026-000001', 'admin-1');
      expect(result.data.certificateStatus).toBe('REVOKED');
    });

    it('should throw if certificate not found', async () => {
      repository.findByCertificateNumber.mockResolvedValue(null);
      await expect(service.revoke('RPF-CERT-999', 'admin-1')).rejects.toThrow('not found');
    });

    it('should throw for invalid transition from DRAFT', async () => {
      repository.findByCertificateNumber.mockResolvedValue({
        ...mockCert,
        certificateStatus: CertificateStatus.DRAFT,
      });
      await expect(service.revoke('RPF-CERT-2026-000001', 'admin-1')).rejects.toThrow('Cannot transition');
    });
  });

  describe('verify', () => {
    it('should verify an issued certificate as valid', async () => {
      repository.findByCertificateNumber.mockResolvedValue(mockCert);
      const result = await service.verify('RPF-CERT-2026-000001');
      expect(result.data.isValid).toBe(true);
    });

    it('should verify a revoked certificate as invalid', async () => {
      repository.findByCertificateNumber.mockResolvedValue({
        ...mockCert,
        certificateStatus: CertificateStatus.REVOKED,
      });
      const result = await service.verify('RPF-CERT-2026-000001');
      expect(result.data.isValid).toBe(false);
    });

    it('should throw if certificate not found', async () => {
      repository.findByCertificateNumber.mockResolvedValue(null);
      await expect(service.verify('RPF-CERT-999')).rejects.toThrow('not found');
    });
  });

  describe('getAdminCertificates', () => {
    it('should return paginated certificates', async () => {
      repository.findManyForAdmin.mockResolvedValue({ data: [mockCert], total: 1 });
      const result = await service.getAdminCertificates({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getVolunteerCertificateByNumber', () => {
    it('should return certificate for authorized volunteer', async () => {
      repository.findByCertificateNumber.mockResolvedValue(mockCert);
      const result = await service.getVolunteerCertificateByNumber('vol-1', 'RPF-CERT-2026-000001');
      expect(result.data.certificateNumber).toBe('RPF-CERT-2026-000001');
    });

    it('should throw if volunteer ID does not match (IDOR)', async () => {
      repository.findByCertificateNumber.mockResolvedValue(mockCert);
      await expect(service.getVolunteerCertificateByNumber('vol-other', 'RPF-CERT-2026-000001')).rejects.toThrow('forbidden');
    });

    it('should throw if not found', async () => {
      repository.findByCertificateNumber.mockResolvedValue(null);
      await expect(service.getVolunteerCertificateByNumber('vol-1', 'RPF-CERT-999')).rejects.toThrow('not found');
    });
  });
});
