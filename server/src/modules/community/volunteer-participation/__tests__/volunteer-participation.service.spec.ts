import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationStatus, ParticipationStatus } from '@prisma/client';
import { VolunteerParticipationRepository } from '../volunteer-participation.repository';
import { VolunteerParticipationService } from '../volunteer-participation.service';

describe('VolunteerParticipationService', () => {
  let service: VolunteerParticipationService;
  let repository: jest.Mocked<VolunteerParticipationRepository>;

  const mockParticipation = {
    id: 'prt-1',
    participationCode: 'RPF-PRT-000001',
    applicationId: 'app-1',
    volunteerId: 'vol-1',
    editionId: 'ed-1',
    participationStatus: ParticipationStatus.NOT_STARTED,
    startedAt: null,
    completedAt: null,
    coordinatorRemarks: null,
    completionNotes: null,
    certificateEligible: false,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'admin-1',
    updatedBy: 'admin-1',
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
      findManyForAdmin: jest.fn(),
      findManyByVolunteer: jest.fn(),
      createMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerParticipationService,
        { provide: VolunteerParticipationRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(VolunteerParticipationService);
    repository = module.get(VolunteerParticipationRepository);
  });

  describe('createFromApplication', () => {
    it('should create participation from an approved application', async () => {
      repository.applicationExists.mockResolvedValue({
        exists: true,
        applicationStatus: ApplicationStatus.APPROVED,
        volunteerId: 'vol-1',
        editionId: 'ed-1',
      });
      repository.findByApplicationId.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockParticipation);

      const result = await service.createFromApplication('app-1', 'admin-1');
      expect(result.data.participationCode).toBe('RPF-PRT-000001');
      expect(result.data.participationStatus).toBe('NOT_STARTED');
    });

    it('should throw if application not found', async () => {
      repository.applicationExists.mockResolvedValue({ exists: false });
      await expect(service.createFromApplication('app-999', 'admin-1')).rejects.toThrow('not found');
    });

    it('should throw if application is not APPROVED', async () => {
      repository.applicationExists.mockResolvedValue({
        exists: true,
        applicationStatus: ApplicationStatus.SUBMITTED,
        volunteerId: 'vol-1',
        editionId: 'ed-1',
      });
      await expect(service.createFromApplication('app-1', 'admin-1')).rejects.toThrow('Cannot create participation');
    });

    it('should throw if participation already exists for application', async () => {
      repository.applicationExists.mockResolvedValue({
        exists: true,
        applicationStatus: ApplicationStatus.APPROVED,
        volunteerId: 'vol-1',
        editionId: 'ed-1',
      });
      repository.findByApplicationId.mockResolvedValue(mockParticipation);
      await expect(service.createFromApplication('app-1', 'admin-1')).rejects.toThrow('already exists');
    });
  });

  describe('startParticipation', () => {
    it('should start a NOT_STARTED participation', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      repository.update.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.ACTIVE, startedAt: new Date() });
      const result = await service.startParticipation('RPF-PRT-000001', 'admin-1');
      expect(result.data.participationStatus).toBe('ACTIVE');
    });

    it('should throw for invalid transition from COMPLETED', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.COMPLETED });
      await expect(service.startParticipation('RPF-PRT-000001', 'admin-1')).rejects.toThrow('Cannot transition');
    });
  });

  describe('markCompleted', () => {
    it('should complete an ACTIVE participation', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.ACTIVE });
      repository.update.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.COMPLETED, certificateEligible: true });
      const result = await service.markCompleted('RPF-PRT-000001', {}, 'admin-1');
      expect(result.data.participationStatus).toBe('COMPLETED');
    });

    it('should throw for invalid transition from CANCELLED', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.CANCELLED });
      await expect(service.markCompleted('RPF-PRT-000001', {}, 'admin-1')).rejects.toThrow('Cannot transition');
    });
  });

  describe('cancelParticipation', () => {
    it('should cancel a NOT_STARTED participation', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      repository.update.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.CANCELLED });
      const result = await service.cancelParticipation('RPF-PRT-000001', {}, 'admin-1');
      expect(result.data.participationStatus).toBe('CANCELLED');
    });

    it('should cancel an ACTIVE participation', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.ACTIVE });
      repository.update.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.CANCELLED });
      const result = await service.cancelParticipation('RPF-PRT-000001', { coordinatorRemarks: 'No longer available' }, 'admin-1');
      expect(result.data.participationStatus).toBe('CANCELLED');
    });

    it('should throw for invalid transition from COMPLETED', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.COMPLETED });
      await expect(service.cancelParticipation('RPF-PRT-000001', {}, 'admin-1')).rejects.toThrow('Cannot transition');
    });
  });

  describe('updateCoordinatorRemarks', () => {
    it('should update remarks', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      repository.update.mockResolvedValue({ ...mockParticipation, coordinatorRemarks: 'Good job' });
      const result = await service.updateCoordinatorRemarks('RPF-PRT-000001', { coordinatorRemarks: 'Good job' }, 'admin-1');
      expect(result.data.coordinatorRemarks).toBe('Good job');
    });

    it('should throw if not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.updateCoordinatorRemarks('RPF-PRT-999', {}, 'admin-1')).rejects.toThrow('not found');
    });
  });

  describe('bulkComplete', () => {
    it('should bulk complete ACTIVE participations', async () => {
      repository.findByIds.mockResolvedValue([
        { ...mockParticipation, participationStatus: ParticipationStatus.ACTIVE },
        { ...mockParticipation, id: 'prt-2', participationStatus: ParticipationStatus.ACTIVE },
      ]);
      repository.updateMany.mockResolvedValue(2);
      const result = await service.bulkComplete({ participationIds: ['prt-1', 'prt-2'] }, 'admin-1');
      expect(result.data.count).toBe(2);
    });

    it('should throw if any participation not found', async () => {
      repository.findByIds.mockResolvedValue([mockParticipation]);
      await expect(service.bulkComplete({ participationIds: ['prt-1', 'prt-missing'] }, 'admin-1')).rejects.toThrow('not found');
    });

    it('should throw if any participation cannot transition to COMPLETED', async () => {
      repository.findByIds.mockResolvedValue([
        { ...mockParticipation, participationStatus: ParticipationStatus.ACTIVE },
        { ...mockParticipation, id: 'prt-2', participationStatus: ParticipationStatus.CANCELLED },
      ]);
      await expect(service.bulkComplete({ participationIds: ['prt-1', 'prt-2'] }, 'admin-1')).rejects.toThrow('cannot transition');
    });
  });

  describe('getAdminParticipations', () => {
    it('should return paginated participations', async () => {
      repository.findManyForAdmin.mockResolvedValue({ data: [mockParticipation], total: 1 });
      const result = await service.getAdminParticipations({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getAdminParticipationByCode', () => {
    it('should return participation by code', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      const result = await service.getAdminParticipationByCode('RPF-PRT-000001');
      expect(result.data.participationCode).toBe('RPF-PRT-000001');
    });

    it('should throw if not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.getAdminParticipationByCode('RPF-PRT-999')).rejects.toThrow('not found');
    });
  });

  describe('getVolunteerParticipations', () => {
    it('should return volunteer participations', async () => {
      repository.findManyByVolunteer.mockResolvedValue({ data: [mockParticipation], total: 1 });
      const result = await service.getVolunteerParticipations('vol-1', { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getVolunteerParticipationByCode', () => {
    it('should return participation for authorized volunteer', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      const result = await service.getVolunteerParticipationByCode('vol-1', 'RPF-PRT-000001');
      expect(result.data.participationCode).toBe('RPF-PRT-000001');
    });

    it('should throw if volunteer ID does not match (IDOR)', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      await expect(service.getVolunteerParticipationByCode('vol-other', 'RPF-PRT-000001')).rejects.toThrow('forbidden');
    });

    it('should throw if not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.getVolunteerParticipationByCode('vol-1', 'RPF-PRT-999')).rejects.toThrow('not found');
    });
  });
});
