import { Test, TestingModule } from '@nestjs/testing';
import { DeploymentStatus, ParticipationStatus } from '@prisma/client';
import { VolunteerParticipationRepository } from '../volunteer-participation.repository';
import { VolunteerParticipationService } from '../volunteer-participation.service';

describe('VolunteerParticipationService', () => {
  let service: VolunteerParticipationService;
  let repository: jest.Mocked<VolunteerParticipationRepository>;

  const mockParticipation = {
    id: 'prt-1',
    participationCode: 'RPF-PRT-000001',
    deploymentId: 'dep-1',
    assignmentId: 'asn-1',
    volunteerId: 'vol-1',
    editionId: 'ed-1',
    participationStatus: ParticipationStatus.REPORTED,
    reportedDate: new Date(),
    completionDate: null,
    coordinatorRemarks: null,
    verifiedBy: null,
    verifiedAt: null,
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
      findByDeploymentId: jest.fn(),
      findByIds: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      deploymentExists: jest.fn(),
      deploymentExistsByCode: jest.fn(),
      findManyForAdmin: jest.fn(),
      findManyByVolunteer: jest.fn(),
      findDeploymentsByIds: jest.fn(),
      findExistingParticipationsForDeployments: jest.fn(),
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

  describe('reportParticipation', () => {
    it('should report participation for a confirmed deployment', async () => {
      repository.deploymentExistsByCode.mockResolvedValue({
        exists: true,
        id: 'dep-1',
        deploymentStatus: DeploymentStatus.CONFIRMED,
        volunteerId: 'vol-1',
        editionId: 'ed-1',
        assignmentId: 'asn-1',
      });
      repository.findByDeploymentId.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockParticipation);

      const result = await service.reportParticipation('RPF-DEP-000001', 'admin-1');
      expect(result.data.participationCode).toBe('RPF-PRT-000001');
      expect(result.data.participationStatus).toBe('REPORTED');
    });

    it('should throw if deployment not found', async () => {
      repository.deploymentExistsByCode.mockResolvedValue({ exists: false });
      await expect(service.reportParticipation('RPF-DEP-999', 'admin-1')).rejects.toThrow('not found');
    });

    it('should throw if deployment is not CONFIRMED', async () => {
      repository.deploymentExistsByCode.mockResolvedValue({
        exists: true,
        id: 'dep-1',
        deploymentStatus: DeploymentStatus.EXPECTED,
        volunteerId: 'vol-1',
        editionId: 'ed-1',
        assignmentId: 'asn-1',
      });
      await expect(service.reportParticipation('RPF-DEP-000001', 'admin-1')).rejects.toThrow('Cannot report');
    });

    it('should throw if participation already exists for deployment', async () => {
      repository.deploymentExistsByCode.mockResolvedValue({
        exists: true,
        id: 'dep-1',
        deploymentStatus: DeploymentStatus.CONFIRMED,
        volunteerId: 'vol-1',
        editionId: 'ed-1',
        assignmentId: 'asn-1',
      });
      repository.findByDeploymentId.mockResolvedValue(mockParticipation);
      await expect(service.reportParticipation('RPF-DEP-000001', 'admin-1')).rejects.toThrow('already exists');
    });
  });

  describe('markCompleted', () => {
    it('should complete a REPORTED participation', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      repository.update.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.COMPLETED });
      const result = await service.markCompleted('RPF-PRT-000001', {}, 'admin-1');
      expect(result.data.participationStatus).toBe('COMPLETED');
    });

    it('should throw for invalid transition from COMPLETED', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.COMPLETED });
      await expect(service.markCompleted('RPF-PRT-000001', {}, 'admin-1')).rejects.toThrow('Cannot transition');
    });
  });

  describe('markNotCompleted', () => {
    it('should mark REPORTED as not completed', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      repository.update.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.NOT_COMPLETED });
      const result = await service.markNotCompleted('RPF-PRT-000001', { coordinatorRemarks: 'Did not finish' }, 'admin-1');
      expect(result.data.participationStatus).toBe('NOT_COMPLETED');
    });

    it('should throw for invalid transition from NO_SHOW', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.NO_SHOW });
      await expect(service.markNotCompleted('RPF-PRT-000001', {}, 'admin-1')).rejects.toThrow('Cannot transition');
    });
  });

  describe('markNoShow', () => {
    it('should mark PENDING as no-show', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.PENDING });
      repository.update.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.NO_SHOW });
      const result = await service.markNoShow('RPF-PRT-000001', 'admin-1');
      expect(result.data.participationStatus).toBe('NO_SHOW');
    });

    it('should mark REPORTED as no-show', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      repository.update.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.NO_SHOW });
      const result = await service.markNoShow('RPF-PRT-000001', 'admin-1');
      expect(result.data.participationStatus).toBe('NO_SHOW');
    });
  });

  describe('cancelParticipation', () => {
    it('should cancel a PENDING participation', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.PENDING });
      repository.update.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.CANCELLED });
      const result = await service.cancelParticipation('RPF-PRT-000001', 'admin-1');
      expect(result.data.participationStatus).toBe('CANCELLED');
    });

    it('should throw for invalid transition from COMPLETED', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.COMPLETED });
      await expect(service.cancelParticipation('RPF-PRT-000001', 'admin-1')).rejects.toThrow('Cannot transition');
    });
  });

  describe('verifyParticipation', () => {
    it('should verify a COMPLETED participation', async () => {
      repository.findByCode.mockResolvedValue({ ...mockParticipation, participationStatus: ParticipationStatus.COMPLETED });
      repository.update.mockResolvedValue({ ...mockParticipation, verifiedBy: 'admin-1', verifiedAt: new Date() });
      const result = await service.verifyParticipation('RPF-PRT-000001', 'admin-1');
      expect(result.data.verifiedBy).toBe('admin-1');
    });

    it('should throw if not COMPLETED', async () => {
      repository.findByCode.mockResolvedValue(mockParticipation);
      await expect(service.verifyParticipation('RPF-PRT-000001', 'admin-1')).rejects.toThrow('Only completed');
    });

    it('should throw if already verified', async () => {
      repository.findByCode.mockResolvedValue({
        ...mockParticipation,
        participationStatus: ParticipationStatus.COMPLETED,
        verifiedBy: 'admin-2',
      });
      await expect(service.verifyParticipation('RPF-PRT-000001', 'admin-1')).rejects.toThrow('already been verified');
    });

    it('should throw if not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.verifyParticipation('RPF-PRT-999', 'admin-1')).rejects.toThrow('not found');
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

  describe('bulkReport', () => {
    it('should bulk report participations from confirmed deployments', async () => {
      const deployments = [
        { id: 'dep-1', deploymentStatus: DeploymentStatus.CONFIRMED, volunteerId: 'vol-1', editionId: 'ed-1', assignmentId: 'asn-1' },
        { id: 'dep-2', deploymentStatus: DeploymentStatus.CONFIRMED, volunteerId: 'vol-2', editionId: 'ed-1', assignmentId: 'asn-2' },
      ];
      repository.findDeploymentsByIds.mockResolvedValue(deployments);
      repository.findExistingParticipationsForDeployments.mockResolvedValue([]);
      repository.countAll.mockResolvedValue(0);
      repository.createMany.mockResolvedValue(2);

      const result = await service.bulkReport({ deploymentIds: ['dep-1', 'dep-2'] }, 'admin-1');
      expect(result.data.count).toBe(2);
    });

    it('should throw if any deployment not found', async () => {
      repository.findDeploymentsByIds.mockResolvedValue([
        { id: 'dep-1', deploymentStatus: DeploymentStatus.CONFIRMED, volunteerId: 'vol-1', editionId: 'ed-1', assignmentId: 'asn-1' },
      ]);
      await expect(service.bulkReport({ deploymentIds: ['dep-1', 'dep-missing'] }, 'admin-1')).rejects.toThrow('not found');
    });

    it('should throw if any deployment is not CONFIRMED', async () => {
      repository.findDeploymentsByIds.mockResolvedValue([
        { id: 'dep-1', deploymentStatus: DeploymentStatus.CONFIRMED, volunteerId: 'vol-1', editionId: 'ed-1', assignmentId: 'asn-1' },
        { id: 'dep-2', deploymentStatus: DeploymentStatus.EXPECTED, volunteerId: 'vol-2', editionId: 'ed-1', assignmentId: 'asn-2' },
      ]);
      await expect(service.bulkReport({ deploymentIds: ['dep-1', 'dep-2'] }, 'admin-1')).rejects.toThrow('not in CONFIRMED');
    });

    it('should throw if deployments already have participation records', async () => {
      repository.findDeploymentsByIds.mockResolvedValue([
        { id: 'dep-1', deploymentStatus: DeploymentStatus.CONFIRMED, volunteerId: 'vol-1', editionId: 'ed-1', assignmentId: 'asn-1' },
      ]);
      repository.findExistingParticipationsForDeployments.mockResolvedValue(['dep-1']);
      await expect(service.bulkReport({ deploymentIds: ['dep-1'] }, 'admin-1')).rejects.toThrow('already have participation');
    });
  });

  describe('bulkComplete', () => {
    it('should bulk complete REPORTED participations', async () => {
      repository.findByIds.mockResolvedValue([mockParticipation, { ...mockParticipation, id: 'prt-2' }]);
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
        mockParticipation,
        { ...mockParticipation, id: 'prt-2', participationStatus: ParticipationStatus.NO_SHOW },
      ]);
      await expect(service.bulkComplete({ participationIds: ['prt-1', 'prt-2'] }, 'admin-1')).rejects.toThrow('cannot transition');
    });
  });

  describe('bulkMarkNoShow', () => {
    it('should bulk mark as no-show', async () => {
      repository.findByIds.mockResolvedValue([mockParticipation, { ...mockParticipation, id: 'prt-2' }]);
      repository.updateMany.mockResolvedValue(2);
      const result = await service.bulkMarkNoShow({ participationIds: ['prt-1', 'prt-2'] }, 'admin-1');
      expect(result.data.count).toBe(2);
    });

    it('should throw if any cannot transition to NO_SHOW', async () => {
      repository.findByIds.mockResolvedValue([
        { ...mockParticipation, participationStatus: ParticipationStatus.COMPLETED },
      ]);
      await expect(service.bulkMarkNoShow({ participationIds: ['prt-1'] }, 'admin-1')).rejects.toThrow('cannot transition');
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
