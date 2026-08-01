import { Test, TestingModule } from '@nestjs/testing';
import { EventsAdminController } from '../events-admin.controller';
import { EventsPublicController } from '../events-public.controller';
import { EventsService } from '../events.service';

describe('EventsAdminController', () => {
  let controller: EventsAdminController;
  let service: jest.Mocked<EventsService>;

  beforeEach(async () => {
    const mockService = {
      createEvent: jest.fn().mockResolvedValue({ success: true }),
      getAdminEvents: jest.fn().mockResolvedValue({ success: true }),
      getAdminEventById: jest.fn().mockResolvedValue({ success: true }),
      updateEvent: jest.fn().mockResolvedValue({ success: true }),
      deleteEvent: jest.fn().mockResolvedValue({ success: true }),
      deactivateEvent: jest.fn().mockResolvedValue({ success: true }),
      activateEvent: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsAdminController],
      providers: [{ provide: EventsService, useValue: mockService }],
    }).compile();

    controller = module.get(EventsAdminController);
    service = module.get(EventsService);
  });

  it('should delegate create to service', async () => {
    await controller.create({} as any, 'admin-id');
    expect(service.createEvent).toHaveBeenCalled();
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any);
    expect(service.getAdminEvents).toHaveBeenCalled();
  });

  it('should delegate findOne to service', async () => {
    await controller.findOne('uuid');
    expect(service.getAdminEventById).toHaveBeenCalledWith('uuid');
  });

  it('should delegate update to service', async () => {
    await controller.update('uuid', {} as any, 'admin-id');
    expect(service.updateEvent).toHaveBeenCalled();
  });

  it('should delegate remove to service', async () => {
    await controller.remove('uuid', 'admin-id');
    expect(service.deleteEvent).toHaveBeenCalled();
  });

  it('should delegate deactivate to service', async () => {
    await controller.deactivate('uuid', 'admin-id');
    expect(service.deactivateEvent).toHaveBeenCalled();
  });

  it('should delegate activate to service', async () => {
    await controller.activate('uuid', 'admin-id');
    expect(service.activateEvent).toHaveBeenCalled();
  });
});

describe('EventsPublicController', () => {
  let controller: EventsPublicController;
  let service: jest.Mocked<EventsService>;

  beforeEach(async () => {
    const mockService = {
      getPublicEvents: jest.fn().mockResolvedValue({ success: true }),
      getEventBySlug: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsPublicController],
      providers: [{ provide: EventsService, useValue: mockService }],
    }).compile();

    controller = module.get(EventsPublicController);
    service = module.get(EventsService);
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any);
    expect(service.getPublicEvents).toHaveBeenCalled();
  });

  it('should delegate findBySlug to service', async () => {
    await controller.findBySlug('test-slug');
    expect(service.getEventBySlug).toHaveBeenCalledWith('test-slug');
  });
});
