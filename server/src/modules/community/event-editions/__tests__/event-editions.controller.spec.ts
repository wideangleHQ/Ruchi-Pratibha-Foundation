import { Test, TestingModule } from '@nestjs/testing';
import { EditionsAdminController } from '../editions-admin.controller';
import { EditionsPublicController } from '../editions-public.controller';
import { EventEditionsService } from '../event-editions.service';

describe('EditionsAdminController', () => {
  let controller: EditionsAdminController;
  let service: jest.Mocked<EventEditionsService>;

  beforeEach(async () => {
    const mockService = {
      createEdition: jest.fn().mockResolvedValue({ success: true }),
      getAdminEditions: jest.fn().mockResolvedValue({ success: true }),
      getAdminEditionById: jest.fn().mockResolvedValue({ success: true }),
      updateEdition: jest.fn().mockResolvedValue({ success: true }),
      deleteEdition: jest.fn().mockResolvedValue({ success: true }),
      publishEdition: jest.fn().mockResolvedValue({ success: true }),
      archiveEdition: jest.fn().mockResolvedValue({ success: true }),
      cancelEdition: jest.fn().mockResolvedValue({ success: true }),
      toggleFeatured: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditionsAdminController],
      providers: [{ provide: EventEditionsService, useValue: mockService }],
    }).compile();

    controller = module.get(EditionsAdminController);
    service = module.get(EventEditionsService);
  });

  it('should delegate create to service', async () => {
    await controller.create('event-uuid', {} as any, 'admin-id');
    expect(service.createEdition).toHaveBeenCalledWith('event-uuid', expect.anything(), 'admin-id');
  });

  it('should delegate findAllByEvent to service', async () => {
    await controller.findAllByEvent('event-uuid', {} as any);
    expect(service.getAdminEditions).toHaveBeenCalledWith('event-uuid', expect.anything());
  });

  it('should delegate findOne to service', async () => {
    await controller.findOne('edition-uuid');
    expect(service.getAdminEditionById).toHaveBeenCalledWith('edition-uuid');
  });

  it('should delegate update to service', async () => {
    await controller.update('edition-uuid', {} as any, 'admin-id');
    expect(service.updateEdition).toHaveBeenCalled();
  });

  it('should delegate remove to service', async () => {
    await controller.remove('edition-uuid', 'admin-id');
    expect(service.deleteEdition).toHaveBeenCalled();
  });

  it('should delegate publish to service', async () => {
    await controller.publish('edition-uuid', 'admin-id');
    expect(service.publishEdition).toHaveBeenCalled();
  });

  it('should delegate archive to service', async () => {
    await controller.archive('edition-uuid', 'admin-id');
    expect(service.archiveEdition).toHaveBeenCalled();
  });

  it('should delegate cancel to service', async () => {
    await controller.cancel('edition-uuid', 'admin-id');
    expect(service.cancelEdition).toHaveBeenCalled();
  });

  it('should delegate feature to service', async () => {
    await controller.feature('edition-uuid', 'admin-id');
    expect(service.toggleFeatured).toHaveBeenCalled();
  });
});

describe('EditionsPublicController', () => {
  let controller: EditionsPublicController;
  let service: jest.Mocked<EventEditionsService>;

  beforeEach(async () => {
    const mockService = {
      getPublicEditionsByEventSlug: jest.fn().mockResolvedValue({ success: true }),
      getUpcomingEditions: jest.fn().mockResolvedValue({ success: true }),
      getFeaturedEditions: jest.fn().mockResolvedValue({ success: true }),
      getEditionBySlug: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditionsPublicController],
      providers: [{ provide: EventEditionsService, useValue: mockService }],
    }).compile();

    controller = module.get(EditionsPublicController);
    service = module.get(EventEditionsService);
  });

  it('should delegate findByEventSlug to service', async () => {
    await controller.findByEventSlug('event-slug', {} as any);
    expect(service.getPublicEditionsByEventSlug).toHaveBeenCalledWith('event-slug', expect.anything());
  });

  it('should delegate findUpcoming to service', async () => {
    await controller.findUpcoming({} as any);
    expect(service.getUpcomingEditions).toHaveBeenCalled();
  });

  it('should delegate findFeatured to service', async () => {
    await controller.findFeatured({} as any);
    expect(service.getFeaturedEditions).toHaveBeenCalled();
  });

  it('should delegate findBySlug to service', async () => {
    await controller.findBySlug('edition-slug');
    expect(service.getEditionBySlug).toHaveBeenCalledWith('edition-slug');
  });
});
