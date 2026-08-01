import { Test, TestingModule } from '@nestjs/testing';
import { EventShiftsController } from '../event-shifts.controller';
import { EventShiftsService } from '../event-shifts.service';

describe('EventShiftsController', () => {
  let controller: EventShiftsController;
  let service: jest.Mocked<EventShiftsService>;

  beforeEach(async () => {
    const mockService = {
      createShift: jest.fn().mockResolvedValue({ success: true }),
      getShiftsByEdition: jest.fn().mockResolvedValue({ success: true }),
      getShiftById: jest.fn().mockResolvedValue({ success: true }),
      updateShift: jest.fn().mockResolvedValue({ success: true }),
      deleteShift: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventShiftsController],
      providers: [{ provide: EventShiftsService, useValue: mockService }],
    }).compile();

    controller = module.get(EventShiftsController);
    service = module.get(EventShiftsService);
  });

  it('should delegate create to service', async () => {
    await controller.create('edition-uuid', {} as any, 'admin-id');
    expect(service.createShift).toHaveBeenCalledWith('edition-uuid', expect.anything(), 'admin-id');
  });

  it('should delegate findByEdition to service', async () => {
    await controller.findByEdition('edition-uuid', {} as any);
    expect(service.getShiftsByEdition).toHaveBeenCalledWith('edition-uuid', expect.anything());
  });

  it('should delegate findOne to service', async () => {
    await controller.findOne('s-uuid');
    expect(service.getShiftById).toHaveBeenCalledWith('s-uuid');
  });

  it('should delegate update to service', async () => {
    await controller.update('s-uuid', {} as any, 'admin-id');
    expect(service.updateShift).toHaveBeenCalledWith('s-uuid', expect.anything(), 'admin-id');
  });

  it('should delegate remove to service', async () => {
    await controller.remove('s-uuid', 'admin-id');
    expect(service.deleteShift).toHaveBeenCalledWith('s-uuid', 'admin-id');
  });
});
