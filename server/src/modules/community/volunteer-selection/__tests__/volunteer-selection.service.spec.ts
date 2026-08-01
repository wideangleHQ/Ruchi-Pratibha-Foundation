import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationStatus, SelectionStatus, VolunteerSelection, VolunteerStatus } from '@prisma/client';
import { BusinessException, EntityConflictException, EntityNotFoundException } from '../../../../common/exceptions';
import { VolunteerSelectionService } from '../volunteer-selection.service';
import { VolunteerSelectionRepository } from '../volunteer-selection.repository';

describe('VolunteerSelectionService', () => {
  let service: VolunteerSelectionService;
  let repository: jest.Mocked<VolunteerSelectionRepository>;

  const adminId = 'admin-uuid-001';
  const applicationId = 'app-uuid-001';
  const volunteerId = 'vol-uuid-001';

  const mockSelection: VolunteerSelection = {
    id: 'sel-uuid-001',
    selectionCode: 'RPF-SEL-000001',
    applicationId,
    selectionScore: null,
    recommendationScore: 45,
    selectionStatus: SelectionStatus.PENDING,
    selectionNotes: null,
    selectedBy: null,
    selectedAt: null,
    version: 1,
    createdAt: new Date('2026-09-01'),
    updatedAt: new Date('2026-09-01'),
    createdBy: adminId,
    updatedBy: adminId,
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCode: jest.fn(),
      findByApplicationId: jest.fn(),
      findByIds: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      applicationExists: jest.fn(),
      getVolunteerProfile: jest.fn(),
      countPreviousApprovedApplications: jest.fn(),
      countPreviousSelections: jest.fn(),
      findManyForAdmin: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerSelectionService,
        { provide: VolunteerSelectionRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(VolunteerSelectionService);
    repository = module.get(VolunteerSelectionRepository);
  });

  describe('createSelectionFromApplication', () => {
    it('should create selection from approved application', async () => {
      repository.applicationExists.mockResolvedValue({
        exists: true,
        applicationStatus: ApplicationStatus.APPROVED,
        volunteerId,
        editionId: 'ed-001',
        skills: ['leadership'],
        preferredDepartmentId: 'dept-001',
        preferredRoleId: null,
        preferredShiftId: null,
      });
      repository.findByApplicationId.mockResolvedValue(null);
      repository.getVolunteerProfile.mockResolvedValue({
        volunteerStatus: VolunteerStatus.VERIFIED,
        skills: ['leadership'],
        languages: ['English'],
      });
      repository.countPreviousApprovedApplications.mockResolvedValue(1);
      repository.countPreviousSelections.mockResolvedValue(0);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockSelection);

      const result = await service.createSelectionFromApplication(applicationId, adminId);
      expect(result.success).toBe(true);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ selectionCode: 'RPF-SEL-000001', selectionStatus: SelectionStatus.PENDING }),
      );
    });

    it('should reject non-approved application', async () => {
      repository.applicationExists.mockResolvedValue({
        exists: true,
        applicationStatus: ApplicationStatus.SUBMITTED,
        volunteerId,
        editionId: 'ed-001',
        skills: [],
        preferredDepartmentId: null,
        preferredRoleId: null,
        preferredShiftId: null,
      });
      await expect(service.createSelectionFromApplication(applicationId, adminId)).rejects.toThrow(BusinessException);
    });

    it('should reject if application not found', async () => {
      repository.applicationExists.mockResolvedValue({ exists: false });
      await expect(service.createSelectionFromApplication(applicationId, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject duplicate selection for same application', async () => {
      repository.applicationExists.mockResolvedValue({
        exists: true,
        applicationStatus: ApplicationStatus.APPROVED,
        volunteerId,
        editionId: 'ed-001',
        skills: [],
        preferredDepartmentId: null,
        preferredRoleId: null,
        preferredShiftId: null,
      });
      repository.findByApplicationId.mockResolvedValue(mockSelection);
      await expect(service.createSelectionFromApplication(applicationId, adminId)).rejects.toThrow(EntityConflictException);
    });
  });

  describe('shortlist', () => {
    it('should shortlist a pending selection', async () => {
      repository.findByCode.mockResolvedValue(mockSelection);
      repository.update.mockResolvedValue({ ...mockSelection, selectionStatus: SelectionStatus.SHORTLISTED });

      const result = await service.shortlist('RPF-SEL-000001', {}, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject shortlisting a selected selection', async () => {
      repository.findByCode.mockResolvedValue({ ...mockSelection, selectionStatus: SelectionStatus.SELECTED });
      await expect(service.shortlist('RPF-SEL-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('select', () => {
    it('should select a shortlisted selection', async () => {
      repository.findByCode.mockResolvedValue({ ...mockSelection, selectionStatus: SelectionStatus.SHORTLISTED });
      repository.update.mockResolvedValue({ ...mockSelection, selectionStatus: SelectionStatus.SELECTED });

      const result = await service.select('RPF-SEL-000001', {}, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject selecting a rejected selection', async () => {
      repository.findByCode.mockResolvedValue({ ...mockSelection, selectionStatus: SelectionStatus.REJECTED });
      await expect(service.select('RPF-SEL-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });

    it('should throw not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.select('BAD', {}, adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('reject', () => {
    it('should reject a pending selection', async () => {
      repository.findByCode.mockResolvedValue(mockSelection);
      repository.update.mockResolvedValue({ ...mockSelection, selectionStatus: SelectionStatus.REJECTED });

      const result = await service.reject('RPF-SEL-000001', {}, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject rejecting an already selected selection', async () => {
      repository.findByCode.mockResolvedValue({ ...mockSelection, selectionStatus: SelectionStatus.SELECTED });
      await expect(service.reject('RPF-SEL-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('waitlist', () => {
    it('should waitlist a pending selection', async () => {
      repository.findByCode.mockResolvedValue(mockSelection);
      repository.update.mockResolvedValue({ ...mockSelection, selectionStatus: SelectionStatus.WAITLISTED });

      const result = await service.waitlist('RPF-SEL-000001', {}, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject waitlisting a rejected selection', async () => {
      repository.findByCode.mockResolvedValue({ ...mockSelection, selectionStatus: SelectionStatus.REJECTED });
      await expect(service.waitlist('RPF-SEL-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('bulkSelect', () => {
    it('should bulk select eligible selections', async () => {
      const sel1 = { ...mockSelection, id: 'sel-1', selectionStatus: SelectionStatus.SHORTLISTED };
      const sel2 = { ...mockSelection, id: 'sel-2', selectionStatus: SelectionStatus.SHORTLISTED };
      repository.findByIds.mockResolvedValue([sel1, sel2]);
      repository.updateMany.mockResolvedValue(2);

      const result = await service.bulkSelect({ selectionIds: ['sel-1', 'sel-2'] }, adminId);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ updated: 2 });
    });

    it('should reject if some IDs are invalid', async () => {
      repository.findByIds.mockResolvedValue([mockSelection]);
      await expect(
        service.bulkSelect({ selectionIds: ['sel-1', 'sel-2'] }, adminId),
      ).rejects.toThrow(BusinessException);
    });

    it('should reject if status transitions are invalid', async () => {
      const rejected = { ...mockSelection, id: 'sel-1', selectionStatus: SelectionStatus.REJECTED };
      repository.findByIds.mockResolvedValue([rejected]);
      await expect(
        service.bulkSelect({ selectionIds: ['sel-1'] }, adminId),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('bulkReject', () => {
    it('should bulk reject eligible selections', async () => {
      const sel1 = { ...mockSelection, id: 'sel-1', selectionStatus: SelectionStatus.PENDING };
      repository.findByIds.mockResolvedValue([sel1]);
      repository.updateMany.mockResolvedValue(1);

      const result = await service.bulkReject({ selectionIds: ['sel-1'] }, adminId);
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ updated: 1 });
    });
  });

  describe('getSelections', () => {
    it('should return paginated selections', async () => {
      repository.findManyForAdmin.mockResolvedValue({ data: [mockSelection], total: 1 });
      const result = await service.getSelections({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });
  });

  describe('getSelectionByCode', () => {
    it('should return a selection', async () => {
      repository.findByCode.mockResolvedValue(mockSelection);
      const result = await service.getSelectionByCode('RPF-SEL-000001');
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.getSelectionByCode('BAD')).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('computeRecommendationScore', () => {
    it('should compute score for verified volunteer with history', async () => {
      repository.getVolunteerProfile.mockResolvedValue({
        volunteerStatus: VolunteerStatus.VERIFIED,
        skills: ['leadership', 'communication'],
        languages: ['English'],
      });
      repository.countPreviousApprovedApplications.mockResolvedValue(2);
      repository.countPreviousSelections.mockResolvedValue(1);

      const score = await service.computeRecommendationScore(volunteerId, {
        skills: ['leadership', 'first-aid'],
        preferredDepartmentId: 'dept-001',
        preferredRoleId: 'role-001',
        preferredShiftId: null,
      });

      // 20 (verified) + 20 (2 prev approved * 10) + 15 (1 prev selection * 15) + 4 (2 skills * 2) + 10 (2 prefs * 5) = 69
      expect(score).toBe(69);
    });

    it('should return 0 if volunteer not found', async () => {
      repository.getVolunteerProfile.mockResolvedValue(null);
      const score = await service.computeRecommendationScore(volunteerId, {});
      expect(score).toBe(0);
    });

    it('should cap at 100', async () => {
      repository.getVolunteerProfile.mockResolvedValue({
        volunteerStatus: VolunteerStatus.VERIFIED,
        skills: [],
        languages: [],
      });
      repository.countPreviousApprovedApplications.mockResolvedValue(10);
      repository.countPreviousSelections.mockResolvedValue(10);

      const score = await service.computeRecommendationScore(volunteerId, {
        skills: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        preferredDepartmentId: 'dept',
        preferredRoleId: 'role',
        preferredShiftId: 'shift',
      });

      // 20 + 30 (capped) + 30 (capped) + 10 (capped) + 15 = 105 → capped at 100
      expect(score).toBe(100);
    });
  });
});
