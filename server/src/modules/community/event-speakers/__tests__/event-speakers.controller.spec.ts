import { Test, TestingModule } from '@nestjs/testing';
import { SpeakersAdminController } from '../speakers-admin.controller';
import { SpeakersPublicController } from '../speakers-public.controller';
import { EventSpeakersService } from '../event-speakers.service';

describe('SpeakersAdminController', () => {
  let controller: SpeakersAdminController;
  let service: jest.Mocked<EventSpeakersService>;

  beforeEach(async () => {
    const mockService = {
      createSpeaker: jest.fn(),
      getAdminSpeakers: jest.fn(),
      getAdminSpeakerById: jest.fn(),
      updateSpeaker: jest.fn(),
      deleteSpeaker: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeakersAdminController],
      providers: [{ provide: EventSpeakersService, useValue: mockService }],
    }).compile();

    controller = module.get(SpeakersAdminController);
    service = module.get(EventSpeakersService);
  });

  it('should call createSpeaker', async () => {
    service.createSpeaker.mockResolvedValue({ success: true, data: { name: 'Test' } } as any);
    const result = await controller.create({ name: 'Test' } as any, 'admin-id');
    expect(service.createSpeaker).toHaveBeenCalledWith({ name: 'Test' }, 'admin-id');
    expect(result.success).toBe(true);
  });

  it('should call getAdminSpeakers', async () => {
    service.getAdminSpeakers.mockResolvedValue({ success: true, data: [] } as any);
    await controller.findAll({ page: 1, pageSize: 10 } as any);
    expect(service.getAdminSpeakers).toHaveBeenCalled();
  });

  it('should call getAdminSpeakerById', async () => {
    service.getAdminSpeakerById.mockResolvedValue({ success: true } as any);
    await controller.findOne('spk-uuid-001');
    expect(service.getAdminSpeakerById).toHaveBeenCalledWith('spk-uuid-001');
  });

  it('should call updateSpeaker', async () => {
    service.updateSpeaker.mockResolvedValue({ success: true } as any);
    await controller.update('spk-uuid-001', { designation: 'Keynote' } as any, 'admin-id');
    expect(service.updateSpeaker).toHaveBeenCalledWith('spk-uuid-001', { designation: 'Keynote' }, 'admin-id');
  });

  it('should call deleteSpeaker', async () => {
    service.deleteSpeaker.mockResolvedValue({ success: true } as any);
    await controller.remove('spk-uuid-001', 'admin-id');
    expect(service.deleteSpeaker).toHaveBeenCalledWith('spk-uuid-001', 'admin-id');
  });
});

describe('SpeakersPublicController', () => {
  let controller: SpeakersPublicController;
  let service: jest.Mocked<EventSpeakersService>;

  beforeEach(async () => {
    const mockService = {
      getPublicSpeakers: jest.fn(),
      getPublicSpeakerBySlug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeakersPublicController],
      providers: [{ provide: EventSpeakersService, useValue: mockService }],
    }).compile();

    controller = module.get(SpeakersPublicController);
    service = module.get(EventSpeakersService);
  });

  it('should call getPublicSpeakers', async () => {
    service.getPublicSpeakers.mockResolvedValue({ success: true, data: [] } as any);
    await controller.findAll({ page: 1, pageSize: 10 } as any);
    expect(service.getPublicSpeakers).toHaveBeenCalled();
  });

  it('should call getPublicSpeakerBySlug', async () => {
    service.getPublicSpeakerBySlug.mockResolvedValue({ success: true } as any);
    await controller.findBySlug('dr-ramesh-panda');
    expect(service.getPublicSpeakerBySlug).toHaveBeenCalledWith('dr-ramesh-panda');
  });
});
