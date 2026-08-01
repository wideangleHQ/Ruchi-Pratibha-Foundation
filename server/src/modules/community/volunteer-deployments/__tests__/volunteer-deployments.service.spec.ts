import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentStatus, DeploymentStatus } from '@prisma/client';
import { VolunteerDeploymentsRepository } from '../volunteer-deployments.repository';
import { VolunteerDeploymentsService } from '../volunteer-deployments.service';

describe('VolunteerDeploymentsService', () => {
  let service: VolunteerDeploymentsService;
  let repository: jest.Mocked<VolunteerDeploymentsRepository>;

  const mockDeployment = {
    id: 'dep-1',
    deploymentCode: 'RPF-DEP-000001',
    assignmentId: 'asn-1',
    volunteerId: 'vol-1',
    editionId: 'ed-1',
    deploymentStatus: DeploymentStatus.EXPECTED,
    reportingDate: null,
    reportingTime: null,
    reportingLocation: null,
    reportingInstructions: null,
    coordinatorId: null,
    notes: null,
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
      findByAssignmentId: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      assignmentExists: jest.fn(),
      findManyForAdmin: jest.fn(),
      findManyByVolunteer: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerDeploymentsService,
        { provide: VolunteerDeploymentsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(VolunteerDeploymentsService);
    repository = module.get(VolunteerDeploymentsRepository);
  });

  describe('createDeployment', () => {
    it('should create a deployment for a valid assignment', async () => {
      repository.assignmentExists.mockResolvedValue({
        exists: true,
        assignmentStatus: AssignmentStatus.CONFIRMED,
        volunteerId: 'vol-1',
        editionId: 'ed-1',
      });
      repository.findByAssignmentId.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockDeployment);

      const result = await service.createDeployment({ assignmentId: 'asn-1' }, 'admin-1');
      expect(result.data.deploymentCode).toBe('RPF-DEP-000001');
    });

    it('should throw if assignment not found', async () => {
      repository.assignmentExists.mockResolvedValue({ exists: false });
      await expect(service.createDeployment({ assignmentId: 'bad' }, 'admin-1')).rejects.toThrow('not found');
    });

    it('should throw if assignment status is not eligible', async () => {
      repository.assignmentExists.mockResolvedValue({
        exists: true,
        assignmentStatus: AssignmentStatus.CANCELLED,
        volunteerId: 'vol-1',
        editionId: 'ed-1',
      });
      await expect(service.createDeployment({ assignmentId: 'asn-1' }, 'admin-1')).rejects.toThrow('Cannot deploy');
    });

    it('should throw if deployment already exists for assignment', async () => {
      repository.assignmentExists.mockResolvedValue({
        exists: true,
        assignmentStatus: AssignmentStatus.ASSIGNED,
        volunteerId: 'vol-1',
        editionId: 'ed-1',
      });
      repository.findByAssignmentId.mockResolvedValue(mockDeployment);
      await expect(service.createDeployment({ assignmentId: 'asn-1' }, 'admin-1')).rejects.toThrow('already exists');
    });
  });

  describe('confirmDeployment', () => {
    it('should confirm an EXPECTED deployment', async () => {
      repository.findByCode.mockResolvedValue(mockDeployment);
      repository.update.mockResolvedValue({ ...mockDeployment, deploymentStatus: DeploymentStatus.CONFIRMED });
      const result = await service.confirmDeployment('RPF-DEP-000001', 'admin-1');
      expect(result.data.deploymentStatus).toBe('CONFIRMED');
    });

    it('should throw for invalid transition from CANCELLED', async () => {
      repository.findByCode.mockResolvedValue({ ...mockDeployment, deploymentStatus: DeploymentStatus.CANCELLED });
      await expect(service.confirmDeployment('RPF-DEP-000001', 'admin-1')).rejects.toThrow('Cannot transition');
    });
  });

  describe('cancelDeployment', () => {
    it('should cancel an EXPECTED deployment', async () => {
      repository.findByCode.mockResolvedValue(mockDeployment);
      repository.update.mockResolvedValue({ ...mockDeployment, deploymentStatus: DeploymentStatus.CANCELLED });
      const result = await service.cancelDeployment('RPF-DEP-000001', 'admin-1');
      expect(result.data.deploymentStatus).toBe('CANCELLED');
    });

    it('should cancel a CONFIRMED deployment', async () => {
      repository.findByCode.mockResolvedValue({ ...mockDeployment, deploymentStatus: DeploymentStatus.CONFIRMED });
      repository.update.mockResolvedValue({ ...mockDeployment, deploymentStatus: DeploymentStatus.CANCELLED });
      const result = await service.cancelDeployment('RPF-DEP-000001', 'admin-1');
      expect(result.data.deploymentStatus).toBe('CANCELLED');
    });
  });

  describe('markNoShow', () => {
    it('should mark EXPECTED as no-show', async () => {
      repository.findByCode.mockResolvedValue(mockDeployment);
      repository.update.mockResolvedValue({ ...mockDeployment, deploymentStatus: DeploymentStatus.NO_SHOW });
      const result = await service.markNoShow('RPF-DEP-000001', 'admin-1');
      expect(result.data.deploymentStatus).toBe('NO_SHOW');
    });

    it('should throw for invalid transition from NO_SHOW', async () => {
      repository.findByCode.mockResolvedValue({ ...mockDeployment, deploymentStatus: DeploymentStatus.NO_SHOW });
      await expect(service.markNoShow('RPF-DEP-000001', 'admin-1')).rejects.toThrow('Cannot transition');
    });
  });

  describe('getAdminDeployments', () => {
    it('should return paginated deployments', async () => {
      repository.findManyForAdmin.mockResolvedValue({ data: [mockDeployment], total: 1 });
      const result = await service.getAdminDeployments({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getAdminDeploymentByCode', () => {
    it('should return a deployment by code', async () => {
      repository.findByCode.mockResolvedValue(mockDeployment);
      const result = await service.getAdminDeploymentByCode('RPF-DEP-000001');
      expect(result.data.deploymentCode).toBe('RPF-DEP-000001');
    });

    it('should throw if not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.getAdminDeploymentByCode('RPF-DEP-999999')).rejects.toThrow('not found');
    });
  });

  describe('getVolunteerDeployments', () => {
    it('should return volunteer deployments', async () => {
      repository.findManyByVolunteer.mockResolvedValue({ data: [mockDeployment], total: 1 });
      const result = await service.getVolunteerDeployments('vol-1', { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getVolunteerDeploymentByCode', () => {
    it('should return deployment for authorized volunteer', async () => {
      repository.findByCode.mockResolvedValue(mockDeployment);
      const result = await service.getVolunteerDeploymentByCode('vol-1', 'RPF-DEP-000001');
      expect(result.data.deploymentCode).toBe('RPF-DEP-000001');
    });

    it('should throw if volunteer ID does not match (IDOR)', async () => {
      repository.findByCode.mockResolvedValue(mockDeployment);
      await expect(service.getVolunteerDeploymentByCode('vol-other', 'RPF-DEP-000001')).rejects.toThrow('forbidden');
    });

    it('should throw if not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.getVolunteerDeploymentByCode('vol-1', 'RPF-DEP-999999')).rejects.toThrow('not found');
    });
  });
});
