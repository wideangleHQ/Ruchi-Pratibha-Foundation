import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsVolunteerController } from '../applications-volunteer.controller';
import { ApplicationsAdminController } from '../applications-admin.controller';
import { VolunteerApplicationsService } from '../volunteer-applications.service';

describe('ApplicationsVolunteerController', () => {
  let controller: ApplicationsVolunteerController;
  let service: jest.Mocked<VolunteerApplicationsService>;

  beforeEach(async () => {
    const mockService = {
      submitApplication: jest.fn().mockResolvedValue({ success: true }),
      getVolunteerApplications: jest.fn().mockResolvedValue({ success: true }),
      getVolunteerApplicationByCode: jest.fn().mockResolvedValue({ success: true }),
      withdrawApplication: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsVolunteerController],
      providers: [{ provide: VolunteerApplicationsService, useValue: mockService }],
    }).compile();

    controller = module.get(ApplicationsVolunteerController);
    service = module.get(VolunteerApplicationsService);
  });

  it('should delegate submit to service', async () => {
    await controller.submit({} as any, 'vol-id');
    expect(service.submitApplication).toHaveBeenCalledWith('vol-id', expect.anything());
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any, 'vol-id');
    expect(service.getVolunteerApplications).toHaveBeenCalledWith('vol-id', expect.anything());
  });

  it('should delegate findByCode to service', async () => {
    await controller.findByCode('RPF-APP-000001', 'vol-id');
    expect(service.getVolunteerApplicationByCode).toHaveBeenCalledWith('vol-id', 'RPF-APP-000001');
  });

  it('should delegate withdraw to service', async () => {
    await controller.withdraw('RPF-APP-000001', 'vol-id');
    expect(service.withdrawApplication).toHaveBeenCalledWith('vol-id', 'RPF-APP-000001');
  });
});

describe('ApplicationsAdminController', () => {
  let controller: ApplicationsAdminController;
  let service: jest.Mocked<VolunteerApplicationsService>;

  beforeEach(async () => {
    const mockService = {
      getAdminApplications: jest.fn().mockResolvedValue({ success: true }),
      getAdminApplicationByCode: jest.fn().mockResolvedValue({ success: true }),
      moveToReview: jest.fn().mockResolvedValue({ success: true }),
      approveApplication: jest.fn().mockResolvedValue({ success: true }),
      rejectApplication: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsAdminController],
      providers: [{ provide: VolunteerApplicationsService, useValue: mockService }],
    }).compile();

    controller = module.get(ApplicationsAdminController);
    service = module.get(VolunteerApplicationsService);
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any);
    expect(service.getAdminApplications).toHaveBeenCalled();
  });

  it('should delegate findByCode to service', async () => {
    await controller.findByCode('RPF-APP-000001');
    expect(service.getAdminApplicationByCode).toHaveBeenCalledWith('RPF-APP-000001');
  });

  it('should delegate review to service', async () => {
    await controller.review('RPF-APP-000001', {} as any, 'admin-id');
    expect(service.moveToReview).toHaveBeenCalledWith('RPF-APP-000001', expect.anything(), 'admin-id');
  });

  it('should delegate approve to service', async () => {
    await controller.approve('RPF-APP-000001', {} as any, 'admin-id');
    expect(service.approveApplication).toHaveBeenCalledWith('RPF-APP-000001', expect.anything(), 'admin-id');
  });

  it('should delegate reject to service', async () => {
    await controller.reject('RPF-APP-000001', {} as any, 'admin-id');
    expect(service.rejectApplication).toHaveBeenCalledWith('RPF-APP-000001', expect.anything(), 'admin-id');
  });
});
