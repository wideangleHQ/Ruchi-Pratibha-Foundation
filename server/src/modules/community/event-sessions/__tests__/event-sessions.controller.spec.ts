import { Test, TestingModule } from '@nestjs/testing';
import { SessionsAdminController } from '../sessions-admin.controller';
import { SessionsPublicController } from '../sessions-public.controller';
import { EventSessionsService } from '../event-sessions.service';

describe('SessionsAdminController', () => {
  let controller: SessionsAdminController;
  let service: jest.Mocked<EventSessionsService>;

  beforeEach(async () => {
    const mockService = {
      createSession: jest.fn(),
      getAdminSessions: jest.fn(),
      getAdminSessionById: jest.fn(),
      updateSession: jest.fn(),
      deleteSession: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsAdminController],
      providers: [{ provide: EventSessionsService, useValue: mockService }],
    }).compile();

    controller = module.get(SessionsAdminController);
    service = module.get(EventSessionsService);
  });

  it('should call createSession', async () => {
    service.createSession.mockResolvedValue({ success: true, data: { title: 'Test' } } as any);
    const result = await controller.create({ editionId: 'ed-1', title: 'Test' } as any, 'admin-id');
    expect(service.createSession).toHaveBeenCalledWith({ editionId: 'ed-1', title: 'Test' }, 'admin-id');
    expect(result.success).toBe(true);
  });

  it('should call getAdminSessions', async () => {
    service.getAdminSessions.mockResolvedValue({ success: true, data: [] } as any);
    await controller.findAll({ page: 1, pageSize: 10 } as any);
    expect(service.getAdminSessions).toHaveBeenCalled();
  });

  it('should call getAdminSessionById', async () => {
    service.getAdminSessionById.mockResolvedValue({ success: true } as any);
    await controller.findOne('ses-uuid-001');
    expect(service.getAdminSessionById).toHaveBeenCalledWith('ses-uuid-001');
  });

  it('should call updateSession', async () => {
    service.updateSession.mockResolvedValue({ success: true } as any);
    await controller.update('ses-uuid-001', { title: 'Updated' } as any, 'admin-id');
    expect(service.updateSession).toHaveBeenCalledWith('ses-uuid-001', { title: 'Updated' }, 'admin-id');
  });

  it('should call deleteSession', async () => {
    service.deleteSession.mockResolvedValue({ success: true } as any);
    await controller.remove('ses-uuid-001', 'admin-id');
    expect(service.deleteSession).toHaveBeenCalledWith('ses-uuid-001', 'admin-id');
  });
});

describe('SessionsPublicController', () => {
  let controller: SessionsPublicController;
  let service: jest.Mocked<EventSessionsService>;

  beforeEach(async () => {
    const mockService = {
      getPublicSessionsByEdition: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsPublicController],
      providers: [{ provide: EventSessionsService, useValue: mockService }],
    }).compile();

    controller = module.get(SessionsPublicController);
    service = module.get(EventSessionsService);
  });

  it('should call getPublicSessionsByEdition', async () => {
    service.getPublicSessionsByEdition.mockResolvedValue({ success: true, data: [] } as any);
    await controller.findByEdition('edition-uuid-001', { page: 1, pageSize: 10 } as any);
    expect(service.getPublicSessionsByEdition).toHaveBeenCalledWith('edition-uuid-001', { page: 1, pageSize: 10 });
  });
});
