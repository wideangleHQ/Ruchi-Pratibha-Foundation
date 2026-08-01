import { Test, TestingModule } from '@nestjs/testing';
import { SelectionAdminController } from '../selection-admin.controller';
import { VolunteerSelectionService } from '../volunteer-selection.service';

describe('SelectionAdminController', () => {
  let controller: SelectionAdminController;
  let service: jest.Mocked<VolunteerSelectionService>;

  beforeEach(async () => {
    const mockService = {
      createSelectionFromApplication: jest.fn().mockResolvedValue({ success: true }),
      getSelections: jest.fn().mockResolvedValue({ success: true }),
      getSelectionByCode: jest.fn().mockResolvedValue({ success: true }),
      shortlist: jest.fn().mockResolvedValue({ success: true }),
      select: jest.fn().mockResolvedValue({ success: true }),
      reject: jest.fn().mockResolvedValue({ success: true }),
      waitlist: jest.fn().mockResolvedValue({ success: true }),
      bulkSelect: jest.fn().mockResolvedValue({ success: true }),
      bulkReject: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionAdminController],
      providers: [{ provide: VolunteerSelectionService, useValue: mockService }],
    }).compile();

    controller = module.get(SelectionAdminController);
    service = module.get(VolunteerSelectionService);
  });

  it('should delegate create to service', async () => {
    await controller.create('app-id', 'admin-id');
    expect(service.createSelectionFromApplication).toHaveBeenCalledWith('app-id', 'admin-id');
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any);
    expect(service.getSelections).toHaveBeenCalled();
  });

  it('should delegate findByCode to service', async () => {
    await controller.findByCode('RPF-SEL-000001');
    expect(service.getSelectionByCode).toHaveBeenCalledWith('RPF-SEL-000001');
  });

  it('should delegate shortlist to service', async () => {
    await controller.shortlist('RPF-SEL-000001', {}, 'admin-id');
    expect(service.shortlist).toHaveBeenCalledWith('RPF-SEL-000001', {}, 'admin-id');
  });

  it('should delegate select to service', async () => {
    await controller.select('RPF-SEL-000001', {}, 'admin-id');
    expect(service.select).toHaveBeenCalledWith('RPF-SEL-000001', {}, 'admin-id');
  });

  it('should delegate reject to service', async () => {
    await controller.reject('RPF-SEL-000001', {}, 'admin-id');
    expect(service.reject).toHaveBeenCalledWith('RPF-SEL-000001', {}, 'admin-id');
  });

  it('should delegate waitlist to service', async () => {
    await controller.waitlist('RPF-SEL-000001', {}, 'admin-id');
    expect(service.waitlist).toHaveBeenCalledWith('RPF-SEL-000001', {}, 'admin-id');
  });

  it('should delegate bulkSelect to service', async () => {
    const dto = { selectionIds: ['id-1'] };
    await controller.bulkSelect(dto as any, 'admin-id');
    expect(service.bulkSelect).toHaveBeenCalledWith(dto, 'admin-id');
  });

  it('should delegate bulkReject to service', async () => {
    const dto = { selectionIds: ['id-1'] };
    await controller.bulkReject(dto as any, 'admin-id');
    expect(service.bulkReject).toHaveBeenCalledWith(dto, 'admin-id');
  });
});
