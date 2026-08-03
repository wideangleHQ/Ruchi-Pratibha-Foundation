import { Test, TestingModule } from '@nestjs/testing';
import { EventSession, SessionStatus } from '@prisma/client';
import { EntityNotFoundException, BusinessException } from '../../../../common/exceptions';
import { EventSessionsService } from '../event-sessions.service';
import { EventSessionsRepository } from '../event-sessions.repository';

describe('EventSessionsService', () => {
  let service: EventSessionsService;
  let repository: jest.Mocked<EventSessionsRepository>;

  const mockSession: EventSession = {
    id: 'ses-uuid-001',
    sessionCode: 'RPF-SES-000001',
    editionId: 'edition-uuid-001',
    title: 'Opening Keynote',
    slug: 'opening-keynote',
    description: 'Welcome address and keynote.',
    sessionType: 'KEYNOTE',
    speakerId: 'spk-uuid-001',
    venueId: 'venue-uuid-001',
    startTime: new Date('2026-03-15T09:00:00Z'),
    endTime: new Date('2026-03-15T10:00:00Z'),
    capacity: 500,
    sessionStatus: SessionStatus.DRAFT,
    sortOrder: 0,
    version: 1,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    deletedAt: null,
    createdBy: 'admin-uuid-001',
    updatedBy: 'admin-uuid-001',
  };

  const adminId = 'admin-uuid-001';

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findBySlug: jest.fn(),
      slugExists: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findByEditionPublic: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventSessionsService,
        { provide: EventSessionsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(EventSessionsService);
    repository = module.get(EventSessionsRepository);
  });

  describe('createSession', () => {
    it('should create a session with generated slug and code', async () => {
      repository.slugExists.mockResolvedValue(false);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockSession);

      const result = await service.createSession({
        editionId: 'edition-uuid-001',
        title: 'Opening Keynote',
        sessionType: 'KEYNOTE',
        speakerId: 'spk-uuid-001',
        venueId: 'venue-uuid-001',
        startTime: '2026-03-15T09:00:00Z',
        endTime: '2026-03-15T10:00:00Z',
        capacity: 500,
      }, adminId);

      expect(result.success).toBe(true);
      expect(result.data?.title).toBe('Opening Keynote');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          sessionCode: 'RPF-SES-000001',
          slug: 'opening-keynote',
          editionId: 'edition-uuid-001',
        }),
      );
    });

    it('should append counter when slug exists', async () => {
      repository.slugExists.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
      repository.countAll.mockResolvedValue(3);
      repository.create.mockResolvedValue({ ...mockSession, slug: 'opening-keynote-1' });

      await service.createSession({ editionId: 'edition-uuid-001', title: 'Opening Keynote' }, adminId);

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'opening-keynote-1', sessionCode: 'RPF-SES-000004' }),
      );
    });
  });

  describe('updateSession', () => {
    it('should update session fields', async () => {
      const updated = { ...mockSession, description: 'Updated desc' };
      repository.findById.mockResolvedValue(mockSession);
      repository.update.mockResolvedValue(updated);

      const result = await service.updateSession(mockSession.id, { description: 'Updated desc' }, adminId);
      expect(result.success).toBe(true);
      expect(result.data?.description).toBe('Updated desc');
    });

    it('should validate status transitions', async () => {
      repository.findById.mockResolvedValue(mockSession);
      repository.update.mockResolvedValue({ ...mockSession, sessionStatus: SessionStatus.CONFIRMED });

      const result = await service.updateSession(mockSession.id, { sessionStatus: SessionStatus.CONFIRMED }, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject invalid status transition', async () => {
      repository.findById.mockResolvedValue(mockSession);
      await expect(
        service.updateSession(mockSession.id, { sessionStatus: SessionStatus.COMPLETED }, adminId),
      ).rejects.toThrow(BusinessException);
    });

    it('should throw EntityNotFoundException for non-existent session', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateSession('nonexistent', { title: 'X' }, adminId))
        .rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('deleteSession', () => {
    it('should soft-delete a session', async () => {
      repository.findById.mockResolvedValue(mockSession);
      repository.update.mockResolvedValue({ ...mockSession, deletedAt: new Date() });

      const result = await service.deleteSession(mockSession.id, adminId);
      expect(result.success).toBe(true);
    });

    it('should throw for non-existent session', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteSession('nonexistent', adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getAdminSessions', () => {
    it('should return paginated admin session list', async () => {
      repository.findMany.mockResolvedValue({ data: [mockSession], total: 1 });

      const result = await service.getAdminSessions({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
      expect(result.meta?.totalItems).toBe(1);
    });
  });

  describe('getPublicSessionsByEdition', () => {
    it('should return paginated public sessions for edition', async () => {
      repository.findByEditionPublic.mockResolvedValue({ data: [{ ...mockSession, sessionStatus: SessionStatus.CONFIRMED }], total: 1 });

      const result = await service.getPublicSessionsByEdition('edition-uuid-001', { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'sortOrder', sortOrder: 'asc' } as any);
      expect(result.success).toBe(true);
    });
  });
});
