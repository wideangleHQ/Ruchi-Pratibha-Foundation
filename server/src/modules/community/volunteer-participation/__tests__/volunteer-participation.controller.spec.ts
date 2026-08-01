import { Test, TestingModule } from '@nestjs/testing';
import { ParticipationAdminController } from '../participation-admin.controller';
import { ParticipationVolunteerController } from '../participation-volunteer.controller';
import { VolunteerParticipationService } from '../volunteer-participation.service';

describe('ParticipationAdminController', () => {
  let controller: ParticipationAdminController;
  let service: jest.Mocked<VolunteerParticipationService>;

  beforeEach(async () => {
    const mockService = {
      reportParticipation: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      getAdminParticipations: jest.fn().mockResolvedValue({ data: [], message: 'ok' }),
      getAdminParticipationByCode: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      markCompleted: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      markNotCompleted: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      markNoShow: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      cancelParticipation: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      verifyParticipation: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      updateCoordinatorRemarks: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      bulkReport: jest.fn().mockResolvedValue({ data: { count: 2 }, message: 'ok' }),
      bulkComplete: jest.fn().mockResolvedValue({ data: { count: 2 }, message: 'ok' }),
      bulkMarkNoShow: jest.fn().mockResolvedValue({ data: { count: 2 }, message: 'ok' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipationAdminController],
      providers: [{ provide: VolunteerParticipationService, useValue: mockService }],
    }).compile();

    controller = module.get(ParticipationAdminController);
    service = module.get(VolunteerParticipationService);
  });

  it('should report participation', async () => {
    await controller.report('RPF-DEP-000001', 'admin-1');
    expect(service.reportParticipation).toHaveBeenCalledWith('RPF-DEP-000001', 'admin-1');
  });

  it('should list participations', async () => {
    await controller.findAll({} as any);
    expect(service.getAdminParticipations).toHaveBeenCalled();
  });

  it('should get participation by code', async () => {
    await controller.findByCode('RPF-PRT-000001');
    expect(service.getAdminParticipationByCode).toHaveBeenCalledWith('RPF-PRT-000001');
  });

  it('should mark complete', async () => {
    await controller.complete('RPF-PRT-000001', {}, 'admin-1');
    expect(service.markCompleted).toHaveBeenCalledWith('RPF-PRT-000001', {}, 'admin-1');
  });

  it('should mark not complete', async () => {
    await controller.notComplete('RPF-PRT-000001', { coordinatorRemarks: 'Incomplete' }, 'admin-1');
    expect(service.markNotCompleted).toHaveBeenCalledWith('RPF-PRT-000001', { coordinatorRemarks: 'Incomplete' }, 'admin-1');
  });

  it('should mark no-show', async () => {
    await controller.noShow('RPF-PRT-000001', 'admin-1');
    expect(service.markNoShow).toHaveBeenCalledWith('RPF-PRT-000001', 'admin-1');
  });

  it('should cancel participation', async () => {
    await controller.cancel('RPF-PRT-000001', 'admin-1');
    expect(service.cancelParticipation).toHaveBeenCalledWith('RPF-PRT-000001', 'admin-1');
  });

  it('should verify participation', async () => {
    await controller.verify('RPF-PRT-000001', 'admin-1');
    expect(service.verifyParticipation).toHaveBeenCalledWith('RPF-PRT-000001', 'admin-1');
  });

  it('should update remarks', async () => {
    await controller.remarks('RPF-PRT-000001', { coordinatorRemarks: 'Well done' }, 'admin-1');
    expect(service.updateCoordinatorRemarks).toHaveBeenCalledWith('RPF-PRT-000001', { coordinatorRemarks: 'Well done' }, 'admin-1');
  });

  it('should bulk report', async () => {
    await controller.bulkReport({ deploymentIds: ['dep-1'] }, 'admin-1');
    expect(service.bulkReport).toHaveBeenCalledWith({ deploymentIds: ['dep-1'] }, 'admin-1');
  });

  it('should bulk complete', async () => {
    await controller.bulkComplete({ participationIds: ['prt-1'] }, 'admin-1');
    expect(service.bulkComplete).toHaveBeenCalledWith({ participationIds: ['prt-1'] }, 'admin-1');
  });

  it('should bulk mark no-show', async () => {
    await controller.bulkNoShow({ participationIds: ['prt-1'] }, 'admin-1');
    expect(service.bulkMarkNoShow).toHaveBeenCalledWith({ participationIds: ['prt-1'] }, 'admin-1');
  });
});

describe('ParticipationVolunteerController', () => {
  let controller: ParticipationVolunteerController;
  let service: jest.Mocked<VolunteerParticipationService>;

  beforeEach(async () => {
    const mockService = {
      getVolunteerParticipations: jest.fn().mockResolvedValue({ data: [], message: 'ok' }),
      getVolunteerParticipationByCode: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipationVolunteerController],
      providers: [{ provide: VolunteerParticipationService, useValue: mockService }],
    }).compile();

    controller = module.get(ParticipationVolunteerController);
    service = module.get(VolunteerParticipationService);
  });

  it('should list volunteer participations', async () => {
    await controller.findAll({} as any, 'vol-1');
    expect(service.getVolunteerParticipations).toHaveBeenCalledWith('vol-1', {});
  });

  it('should get volunteer participation by code', async () => {
    await controller.findByCode('RPF-PRT-000001', 'vol-1');
    expect(service.getVolunteerParticipationByCode).toHaveBeenCalledWith('vol-1', 'RPF-PRT-000001');
  });
});
