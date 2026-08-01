import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationStatus, VolunteerApplication, EditionStatus, VolunteerStatus } from '@prisma/client';
import { BusinessException, EntityConflictException, EntityNotFoundException, ForbiddenResourceException } from '../../../../common/exceptions';
import { VolunteerApplicationsService } from '../volunteer-applications.service';
import { VolunteerApplicationsRepository } from '../volunteer-applications.repository';

describe('VolunteerApplicationsService', () => {
  let service: VolunteerApplicationsService;
  let repository: jest.Mocked<VolunteerApplicationsRepository>;

  const volunteerId = 'vol-uuid-001';
  const editionId = 'ed-uuid-001';
  const adminId = 'admin-uuid-001';

  const mockApp: VolunteerApplication = {
    id: 'app-uuid-001',
    applicationCode: 'RPF-APP-000001',
    volunteerId,
    editionId,
    applicationStatus: ApplicationStatus.SUBMITTED,
    motivation: 'I want to help the community',
    relevantExperience: '3 years volunteering',
    skills: ['leadership', 'communication'],
    languages: ['English', 'Odia'],
    medicalConditions: null,
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+91-9876543210',
    availabilityNotes: null,
    preferredShiftId: null,
    preferredDepartmentId: null,
    preferredRoleId: null,
    expectedHours: 8,
    termsAccepted: true,
    adminRemarks: null,
    submittedAt: new Date('2026-09-01'),
    reviewedAt: null,
    version: 1,
    createdAt: new Date('2026-09-01'),
    updatedAt: new Date('2026-09-01'),
    deletedAt: null,
    createdBy: volunteerId,
    updatedBy: volunteerId,
    deletedBy: null,
  };

  const validDto = {
    editionId,
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '+91-9876543210',
    termsAccepted: true,
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCode: jest.fn(),
      findActiveByVolunteerAndEdition: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      volunteerExists: jest.fn(),
      editionExists: jest.fn(),
      shiftExists: jest.fn(),
      departmentExists: jest.fn(),
      roleExists: jest.fn(),
      findManyForAdmin: jest.fn(),
      findManyByVolunteer: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerApplicationsService,
        { provide: VolunteerApplicationsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(VolunteerApplicationsService);
    repository = module.get(VolunteerApplicationsRepository);
  });

  describe('submitApplication', () => {
    it('should submit application for verified volunteer with open registration', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({
        exists: true,
        editionStatus: EditionStatus.REGISTRATION_OPEN,
        registrationEnabled: true,
        registrationCloses: new Date('2099-12-31'),
      });
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockApp);

      const result = await service.submitApplication(volunteerId, validDto);
      expect(result.success).toBe(true);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ applicationCode: 'RPF-APP-000001', applicationStatus: ApplicationStatus.SUBMITTED }),
      );
    });

    it('should reject if terms not accepted', async () => {
      await expect(
        service.submitApplication(volunteerId, { ...validDto, termsAccepted: false }),
      ).rejects.toThrow(BusinessException);
    });

    it('should reject unverified volunteer', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.PENDING_VERIFICATION });
      await expect(service.submitApplication(volunteerId, validDto)).rejects.toThrow(BusinessException);
    });

    it('should reject if volunteer not found', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: false });
      await expect(service.submitApplication(volunteerId, validDto)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject if edition not found', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({ exists: false });
      await expect(service.submitApplication(volunteerId, validDto)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject if edition is cancelled', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({
        exists: true, editionStatus: EditionStatus.CANCELLED, registrationEnabled: true, registrationCloses: null,
      });
      await expect(service.submitApplication(volunteerId, validDto)).rejects.toThrow(BusinessException);
    });

    it('should reject if edition is archived', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({
        exists: true, editionStatus: EditionStatus.ARCHIVED, registrationEnabled: true, registrationCloses: null,
      });
      await expect(service.submitApplication(volunteerId, validDto)).rejects.toThrow(BusinessException);
    });

    it('should reject if registration not enabled', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({
        exists: true, editionStatus: EditionStatus.PUBLISHED, registrationEnabled: false, registrationCloses: null,
      });
      await expect(service.submitApplication(volunteerId, validDto)).rejects.toThrow(BusinessException);
    });

    it('should reject if deadline passed', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({
        exists: true, editionStatus: EditionStatus.REGISTRATION_OPEN, registrationEnabled: true,
        registrationCloses: new Date('2020-01-01'),
      });
      await expect(service.submitApplication(volunteerId, validDto)).rejects.toThrow(BusinessException);
    });

    it('should reject duplicate active application', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({
        exists: true, editionStatus: EditionStatus.REGISTRATION_OPEN, registrationEnabled: true, registrationCloses: null,
      });
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(mockApp);
      await expect(service.submitApplication(volunteerId, validDto)).rejects.toThrow(EntityConflictException);
    });

    it('should reject if preferred shift not found', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({
        exists: true, editionStatus: EditionStatus.REGISTRATION_OPEN, registrationEnabled: true, registrationCloses: null,
      });
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(null);
      repository.shiftExists.mockResolvedValue(false);
      await expect(
        service.submitApplication(volunteerId, { ...validDto, preferredShiftId: 'bad-shift' }),
      ).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject if preferred department not found', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({
        exists: true, editionStatus: EditionStatus.REGISTRATION_OPEN, registrationEnabled: true, registrationCloses: null,
      });
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(null);
      repository.departmentExists.mockResolvedValue(false);
      await expect(
        service.submitApplication(volunteerId, { ...validDto, preferredDepartmentId: 'bad-dept' }),
      ).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject if preferred role not found', async () => {
      repository.volunteerExists.mockResolvedValue({ exists: true, status: VolunteerStatus.VERIFIED });
      repository.editionExists.mockResolvedValue({
        exists: true, editionStatus: EditionStatus.REGISTRATION_OPEN, registrationEnabled: true, registrationCloses: null,
      });
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(null);
      repository.roleExists.mockResolvedValue(false);
      await expect(
        service.submitApplication(volunteerId, { ...validDto, preferredRoleId: 'bad-role' }),
      ).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getVolunteerApplicationByCode', () => {
    it('should return application owned by volunteer', async () => {
      repository.findByCode.mockResolvedValue(mockApp);
      const result = await service.getVolunteerApplicationByCode(volunteerId, 'RPF-APP-000001');
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.getVolunteerApplicationByCode(volunteerId, 'BAD')).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject access by different volunteer (IDOR protection)', async () => {
      repository.findByCode.mockResolvedValue(mockApp);
      await expect(service.getVolunteerApplicationByCode('other-vol', 'RPF-APP-000001')).rejects.toThrow(ForbiddenResourceException);
    });
  });

  describe('withdrawApplication', () => {
    it('should withdraw submitted application', async () => {
      repository.findByCode.mockResolvedValue(mockApp);
      repository.update.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.WITHDRAWN });

      const result = await service.withdrawApplication(volunteerId, 'RPF-APP-000001');
      expect(result.success).toBe(true);
    });

    it('should reject withdrawal by different volunteer', async () => {
      repository.findByCode.mockResolvedValue(mockApp);
      await expect(service.withdrawApplication('other-vol', 'RPF-APP-000001')).rejects.toThrow(ForbiddenResourceException);
    });

    it('should reject withdrawal of approved application', async () => {
      repository.findByCode.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.APPROVED });
      await expect(service.withdrawApplication(volunteerId, 'RPF-APP-000001')).rejects.toThrow(BusinessException);
    });

    it('should reject withdrawal of rejected application', async () => {
      repository.findByCode.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.REJECTED });
      await expect(service.withdrawApplication(volunteerId, 'RPF-APP-000001')).rejects.toThrow(BusinessException);
    });

    it('should reject withdrawal of under review application', async () => {
      repository.findByCode.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.UNDER_REVIEW });
      await expect(service.withdrawApplication(volunteerId, 'RPF-APP-000001')).rejects.toThrow(BusinessException);
    });
  });

  describe('moveToReview', () => {
    it('should move submitted application to under review', async () => {
      repository.findByCode.mockResolvedValue(mockApp);
      repository.update.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.UNDER_REVIEW });

      const result = await service.moveToReview('RPF-APP-000001', { adminRemarks: 'Looking good' }, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject review of draft application', async () => {
      repository.findByCode.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.DRAFT });
      await expect(service.moveToReview('RPF-APP-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });

    it('should throw not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.moveToReview('BAD', {}, adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('approveApplication', () => {
    it('should approve application under review', async () => {
      repository.findByCode.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.UNDER_REVIEW });
      repository.update.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.APPROVED });

      const result = await service.approveApplication('RPF-APP-000001', { adminRemarks: 'Approved' }, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject approving submitted application (must go through review)', async () => {
      repository.findByCode.mockResolvedValue(mockApp);
      await expect(service.approveApplication('RPF-APP-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });

    it('should reject approving already approved', async () => {
      repository.findByCode.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.APPROVED });
      await expect(service.approveApplication('RPF-APP-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('rejectApplication', () => {
    it('should reject application under review', async () => {
      repository.findByCode.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.UNDER_REVIEW });
      repository.update.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.REJECTED });

      const result = await service.rejectApplication('RPF-APP-000001', { adminRemarks: 'Not suitable' }, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject rejecting submitted application (must go through review)', async () => {
      repository.findByCode.mockResolvedValue(mockApp);
      await expect(service.rejectApplication('RPF-APP-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });

    it('should reject rejecting withdrawn application', async () => {
      repository.findByCode.mockResolvedValue({ ...mockApp, applicationStatus: ApplicationStatus.WITHDRAWN });
      await expect(service.rejectApplication('RPF-APP-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('getAdminApplications', () => {
    it('should return paginated applications', async () => {
      repository.findManyForAdmin.mockResolvedValue({ data: [mockApp], total: 1 });
      const result = await service.getAdminApplications({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });
  });

  describe('getVolunteerApplications', () => {
    it('should return volunteer own applications', async () => {
      repository.findManyByVolunteer.mockResolvedValue({ data: [mockApp], total: 1 });
      const result = await service.getVolunteerApplications(volunteerId, { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });
  });
});
