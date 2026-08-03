import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesAdminController } from '../schedules-admin.controller';
import { SchedulesPublicController } from '../schedules-public.controller';
import { EventSchedulesService } from '../event-schedules.service';

describe('SchedulesAdminController', () => {
  let controller: SchedulesAdminController;
  let service: jest.Mocked<EventSchedulesService>;

  beforeEach(async () => {
    const mockService = {
      createSchedule: jest.fn(),
      getAdminSchedules: jest.fn(),
      getAdminScheduleById: jest.fn(),
      updateSchedule: jest.fn(),
      deleteSchedule: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesAdminController],
      providers: [{ provide: EventSchedulesService, useValue: mockService }],
    }).compile();

    controller = module.get(SchedulesAdminController);
    service = module.get(EventSchedulesService);
  });

  it('should call createSchedule', async () => {
    service.createSchedule.mockResolvedValue({ success: true, data: { title: 'Test' } } as any);
    const result = await controller.create({
      editionId: 'ed-1',
      title: 'Test',
      startTime: '2026-03-15T08:00:00Z',
      endTime: '2026-03-15T09:00:00Z',
    } as any, 'admin-id');
    expect(service.createSchedule).toHaveBeenCalled();
    expect(result.success).toBe(true);
  });

  it('should call getAdminSchedules', async () => {
    service.getAdminSchedules.mockResolvedValue({ success: true, data: [] } as any);
    await controller.findAll({ page: 1, pageSize: 10 } as any);
    expect(service.getAdminSchedules).toHaveBeenCalled();
  });

  it('should call getAdminScheduleById', async () => {
    service.getAdminScheduleById.mockResolvedValue({ success: true } as any);
    await controller.findOne('sch-uuid-001');
    expect(service.getAdminScheduleById).toHaveBeenCalledWith('sch-uuid-001');
  });

  it('should call updateSchedule', async () => {
    service.updateSchedule.mockResolvedValue({ success: true } as any);
    await controller.update('sch-uuid-001', { title: 'Updated' } as any, 'admin-id');
    expect(service.updateSchedule).toHaveBeenCalledWith('sch-uuid-001', { title: 'Updated' }, 'admin-id');
  });

  it('should call deleteSchedule', async () => {
    service.deleteSchedule.mockResolvedValue({ success: true } as any);
    await controller.remove('sch-uuid-001', 'admin-id');
    expect(service.deleteSchedule).toHaveBeenCalledWith('sch-uuid-001', 'admin-id');
  });
});

describe('SchedulesPublicController', () => {
  let controller: SchedulesPublicController;
  let service: jest.Mocked<EventSchedulesService>;

  beforeEach(async () => {
    const mockService = {
      getPublicSchedulesByEdition: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesPublicController],
      providers: [{ provide: EventSchedulesService, useValue: mockService }],
    }).compile();

    controller = module.get(SchedulesPublicController);
    service = module.get(EventSchedulesService);
  });

  it('should call getPublicSchedulesByEdition', async () => {
    service.getPublicSchedulesByEdition.mockResolvedValue({ success: true, data: [] } as any);
    await controller.findByEdition('edition-uuid-001', { page: 1, pageSize: 10 } as any);
    expect(service.getPublicSchedulesByEdition).toHaveBeenCalledWith('edition-uuid-001', { page: 1, pageSize: 10 });
  });
});
