import { Test, TestingModule } from '@nestjs/testing';
import { VerificationAction, VolunteerStatus } from '@prisma/client';
import { BusinessException, EntityNotFoundException } from '../../../../common/exceptions';
import { VolunteerVerificationRepository } from '../volunteer-verification.repository';
import { VolunteerVerificationService } from '../volunteer-verification.service';

describe('VolunteerVerificationService', () => {
  let service: VolunteerVerificationService;
  let repository: jest.Mocked<VolunteerVerificationRepository>;

  const mockVerification = {
    id: 'ver-001',
    volunteerId: 'vol-001',
    action: VerificationAction.APPROVED,
    previousStatus: VolunteerStatus.PENDING_VERIFICATION,
    currentStatus: VolunteerStatus.VERIFIED,
    remarks: 'Approved',
    verifiedById: 'admin-001',
    verificationDate: new Date(),
    ipAddress: '127.0.0.1',
    userAgent: 'test-agent',
    createdAt: new Date(),
  };

  const mockVerificationWithAdmin = {
    ...mockVerification,
    verifiedBy: { name: 'Admin User', email: 'admin@example.com' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerVerificationService,
        {
          provide: VolunteerVerificationRepository,
          useValue: {
            approveVolunteer: jest.fn(),
            rejectVolunteer: jest.fn(),
            findPending: jest.fn(),
            findVolunteerForAdmin: jest.fn(),
            findVerificationHistory: jest.fn(),
            volunteerExists: jest.fn(),
            getVolunteerStatus: jest.fn(),
            hasIdentityDocuments: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(VolunteerVerificationService);
    repository = module.get(VolunteerVerificationRepository);
  });

  describe('approveVolunteer', () => {
    it('should approve a pending volunteer with identity documents', async () => {
      repository.getVolunteerStatus.mockResolvedValue(VolunteerStatus.PENDING_VERIFICATION);
      repository.hasIdentityDocuments.mockResolvedValue(true);
      repository.approveVolunteer.mockResolvedValue(mockVerification);

      const result = await service.approveVolunteer('vol-001', 'admin-001', {}, '127.0.0.1', 'test-agent');
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ verificationId: 'ver-001' });
      expect(repository.approveVolunteer).toHaveBeenCalledWith(
        'vol-001', 'admin-001', VolunteerStatus.PENDING_VERIFICATION, undefined, '127.0.0.1', 'test-agent',
      );
    });

    it('should approve a previously rejected volunteer', async () => {
      repository.getVolunteerStatus.mockResolvedValue(VolunteerStatus.REJECTED);
      repository.hasIdentityDocuments.mockResolvedValue(true);
      repository.approveVolunteer.mockResolvedValue(mockVerification);

      const result = await service.approveVolunteer('vol-001', 'admin-001', { remarks: 'Re-verified' });
      expect(result.success).toBe(true);
    });

    it('should throw when volunteer not found', async () => {
      repository.getVolunteerStatus.mockResolvedValue(null);
      await expect(service.approveVolunteer('nonexistent', 'admin-001', {}))
        .rejects.toThrow(EntityNotFoundException);
    });

    it('should throw when volunteer is already verified', async () => {
      repository.getVolunteerStatus.mockResolvedValue(VolunteerStatus.VERIFIED);
      await expect(service.approveVolunteer('vol-001', 'admin-001', {}))
        .rejects.toThrow(BusinessException);
    });

    it('should throw when volunteer has invalid status for approval', async () => {
      repository.getVolunteerStatus.mockResolvedValue(VolunteerStatus.SUSPENDED);
      await expect(service.approveVolunteer('vol-001', 'admin-001', {}))
        .rejects.toThrow(BusinessException);
    });

    it('should throw when volunteer has no identity documents', async () => {
      repository.getVolunteerStatus.mockResolvedValue(VolunteerStatus.PENDING_VERIFICATION);
      repository.hasIdentityDocuments.mockResolvedValue(false);
      await expect(service.approveVolunteer('vol-001', 'admin-001', {}))
        .rejects.toThrow(BusinessException);
    });
  });

  describe('rejectVolunteer', () => {
    const rejectBody = { reason: 'Document is blurred and unreadable' };

    it('should reject a pending volunteer', async () => {
      repository.getVolunteerStatus.mockResolvedValue(VolunteerStatus.PENDING_VERIFICATION);
      const rejectVerification = {
        ...mockVerification,
        action: VerificationAction.REJECTED,
        currentStatus: VolunteerStatus.REJECTED,
      };
      repository.rejectVolunteer.mockResolvedValue(rejectVerification);

      const result = await service.rejectVolunteer('vol-001', 'admin-001', rejectBody, '127.0.0.1', 'agent');
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ verificationId: 'ver-001' });
    });

    it('should reject a previously verified volunteer', async () => {
      repository.getVolunteerStatus.mockResolvedValue(VolunteerStatus.VERIFIED);
      repository.rejectVolunteer.mockResolvedValue(mockVerification);

      const result = await service.rejectVolunteer('vol-001', 'admin-001', rejectBody);
      expect(result.success).toBe(true);
    });

    it('should throw when volunteer not found', async () => {
      repository.getVolunteerStatus.mockResolvedValue(null);
      await expect(service.rejectVolunteer('nonexistent', 'admin-001', rejectBody))
        .rejects.toThrow(EntityNotFoundException);
    });

    it('should throw when volunteer is already rejected', async () => {
      repository.getVolunteerStatus.mockResolvedValue(VolunteerStatus.REJECTED);
      await expect(service.rejectVolunteer('vol-001', 'admin-001', rejectBody))
        .rejects.toThrow(BusinessException);
    });

    it('should throw when volunteer has invalid status for rejection', async () => {
      repository.getVolunteerStatus.mockResolvedValue(VolunteerStatus.INACTIVE);
      await expect(service.rejectVolunteer('vol-001', 'admin-001', rejectBody))
        .rejects.toThrow(BusinessException);
    });
  });

  describe('getPendingVolunteers', () => {
    it('should return paginated pending volunteers', async () => {
      repository.findPending.mockResolvedValue({
        data: [
          {
            id: 'vol-001',
            volunteerCode: 'RPF-VOL-2026-00001',
            firstName: 'Rahul',
            lastName: 'Sharma',
            email: 'rahul@example.com',
            phone: '+919876543210',
            city: 'Bhubaneswar',
            state: 'Odisha',
            volunteerStatus: VolunteerStatus.PENDING_VERIFICATION,
            createdAt: new Date(),
            identities: [{ id: 'id-001' }],
          },
        ],
        total: 1,
      });

      const query = { page: 1, pageSize: 10, sortBy: 'createdAt', sortOrder: 'desc' as const, skip: 0, take: 10 };
      const result = await service.getPendingVolunteers(query as never);
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].hasIdentityDocument).toBe(true);
    });

    it('should return empty list when no pending volunteers', async () => {
      repository.findPending.mockResolvedValue({ data: [], total: 0 });
      const query = { page: 1, pageSize: 10, sortBy: 'createdAt', sortOrder: 'desc' as const, skip: 0, take: 10 };
      const result = await service.getPendingVolunteers(query as never);
      expect(result.data).toHaveLength(0);
      expect(result.meta).toBeDefined();
    });
  });

  describe('getVolunteerDetail', () => {
    it('should return full volunteer detail with identities and history', async () => {
      repository.findVolunteerForAdmin.mockResolvedValue({
        id: 'vol-001',
        volunteerCode: 'RPF-VOL-2026-00001',
        firstName: 'Rahul',
        lastName: 'Sharma',
        email: 'rahul@test.com',
        phone: '+919876543210',
        dateOfBirth: new Date('1995-01-01'),
        gender: 'MALE',
        bloodGroup: 'O_POSITIVE',
        occupation: null,
        organization: null,
        addressLine1: '42 MG Road',
        addressLine2: null,
        city: 'Bhubaneswar',
        state: 'Odisha',
        pincode: '751001',
        country: 'India',
        profilePhotoKey: null,
        emergencyName: null,
        emergencyPhone: null,
        motivation: null,
        skills: [],
        languages: [],
        availableDays: [],
        volunteerStatus: VolunteerStatus.PENDING_VERIFICATION,
        status: 'PENDING',
        version: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
        identities: [
          {
            id: 'id-001',
            volunteerId: 'vol-001',
            documentType: 'AADHAAR',
            documentNumber: '123456789012',
            documentFileKey: null,
            verificationStatus: 'PENDING',
            verifiedAt: null,
            verifiedBy: null,
            rejectionReason: null,
            version: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          },
        ],
        verifications: [mockVerificationWithAdmin],
      } as never);

      const result = await service.getVolunteerDetail('vol-001');
      expect(result.success).toBe(true);
      expect(result.data.identities).toHaveLength(1);
      expect(result.data.identities[0].documentNumber).toBe('********9012');
      expect(result.data.verificationHistory).toHaveLength(1);
    });

    it('should throw when volunteer not found', async () => {
      repository.findVolunteerForAdmin.mockResolvedValue(null);
      await expect(service.getVolunteerDetail('nonexistent'))
        .rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getVerificationHistory', () => {
    it('should return verification history for an existing volunteer', async () => {
      repository.volunteerExists.mockResolvedValue(true);
      repository.findVerificationHistory.mockResolvedValue([mockVerificationWithAdmin]);

      const result = await service.getVerificationHistory('vol-001');
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].verifiedByName).toBe('Admin User');
    });

    it('should throw when volunteer not found', async () => {
      repository.volunteerExists.mockResolvedValue(false);
      await expect(service.getVerificationHistory('nonexistent'))
        .rejects.toThrow(EntityNotFoundException);
    });

    it('should return empty array when no verification records exist', async () => {
      repository.volunteerExists.mockResolvedValue(true);
      repository.findVerificationHistory.mockResolvedValue([]);

      const result = await service.getVerificationHistory('vol-001');
      expect(result.data).toHaveLength(0);
    });
  });
});
