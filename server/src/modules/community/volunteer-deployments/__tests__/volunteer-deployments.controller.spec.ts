import { Test, TestingModule } from '@nestjs/testing';
import { DeploymentsAdminController } from '../deployments-admin.controller';
import { DeploymentsVolunteerController } from '../deployments-volunteer.controller';
import { VolunteerDeploymentsService } from '../volunteer-deployments.service';

describe('DeploymentsAdminController', () => {
  let controller: DeploymentsAdminController;
  let service: jest.Mocked<VolunteerDeploymentsService>;

  beforeEach(async () => {
    const mockService = {
      createDeployment: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      getAdminDeployments: jest.fn().mockResolvedValue({ data: [], message: 'ok' }),
      getAdminDeploymentByCode: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      confirmDeployment: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      cancelDeployment: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      markNoShow: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeploymentsAdminController],
      providers: [{ provide: VolunteerDeploymentsService, useValue: mockService }],
    }).compile();

    controller = module.get(DeploymentsAdminController);
    service = module.get(VolunteerDeploymentsService);
  });

  it('should create a deployment', async () => {
    await controller.create({ assignmentId: 'asn-1' }, 'admin-1');
    expect(service.createDeployment).toHaveBeenCalledWith({ assignmentId: 'asn-1' }, 'admin-1');
  });

  it('should list deployments', async () => {
    await controller.findAll({} as any);
    expect(service.getAdminDeployments).toHaveBeenCalled();
  });

  it('should get deployment by code', async () => {
    await controller.findByCode('RPF-DEP-000001');
    expect(service.getAdminDeploymentByCode).toHaveBeenCalledWith('RPF-DEP-000001');
  });

  it('should confirm deployment', async () => {
    await controller.confirm('RPF-DEP-000001', 'admin-1');
    expect(service.confirmDeployment).toHaveBeenCalledWith('RPF-DEP-000001', 'admin-1');
  });

  it('should cancel deployment', async () => {
    await controller.cancel('RPF-DEP-000001', 'admin-1');
    expect(service.cancelDeployment).toHaveBeenCalledWith('RPF-DEP-000001', 'admin-1');
  });

  it('should mark no-show', async () => {
    await controller.noShow('RPF-DEP-000001', 'admin-1');
    expect(service.markNoShow).toHaveBeenCalledWith('RPF-DEP-000001', 'admin-1');
  });
});

describe('DeploymentsVolunteerController', () => {
  let controller: DeploymentsVolunteerController;
  let service: jest.Mocked<VolunteerDeploymentsService>;

  beforeEach(async () => {
    const mockService = {
      getVolunteerDeployments: jest.fn().mockResolvedValue({ data: [], message: 'ok' }),
      getVolunteerDeploymentByCode: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeploymentsVolunteerController],
      providers: [{ provide: VolunteerDeploymentsService, useValue: mockService }],
    }).compile();

    controller = module.get(DeploymentsVolunteerController);
    service = module.get(VolunteerDeploymentsService);
  });

  it('should list volunteer deployments', async () => {
    await controller.findAll({} as any, 'vol-1');
    expect(service.getVolunteerDeployments).toHaveBeenCalledWith('vol-1', {});
  });

  it('should get volunteer deployment by code', async () => {
    await controller.findByCode('RPF-DEP-000001', 'vol-1');
    expect(service.getVolunteerDeploymentByCode).toHaveBeenCalledWith('vol-1', 'RPF-DEP-000001');
  });
});
