import { Test, TestingModule } from '@nestjs/testing';
import { Event, EventType } from '@prisma/client';
import { EntityNotFoundException, BusinessException } from '../../../../common/exceptions';
import { EventsService } from '../events.service';
import { EventsRepository } from '../events.repository';

describe('EventsService', () => {
  let service: EventsService;
  let repository: jest.Mocked<EventsRepository>;

  const mockEvent: Event = {
    id: 'e1b2c3d4-e5f6-7890-abcd-ef1234567890',
    eventCode: 'RPF-EVT-000001',
    slug: 'ruchi-prativa-sanman',
    title: 'Ruchi Prativa Sanman',
    shortDescription: 'Annual award ceremony honoring outstanding Odisha contributors.',
    detailedDescription: 'Detailed description of the event program.',
    eventType: EventType.AWARD,
    logoAssetKey: null,
    defaultBannerKey: null,
    primaryColor: '#FF5722',
    secondaryColor: null,
    themeConfig: null,
    isRecurring: true,
    isActive: true,
    sortOrder: 0,
    seoTitle: null,
    seoDescription: null,
    seoKeywords: [],
    version: 1,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    deletedAt: null,
    createdById: 'admin-uuid-001',
    updatedBy: 'admin-uuid-001',
    deletedBy: null,
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
      findActivePublic: jest.fn(),
      findActiveBySlug: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: EventsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(EventsService);
    repository = module.get(EventsRepository);
  });

  describe('createEvent', () => {
    it('should create an event program with generated slug and code', async () => {
      repository.slugExists.mockResolvedValue(false);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockEvent);

      const result = await service.createEvent({
        title: 'Ruchi Prativa Sanman',
        shortDescription: 'Annual award ceremony honoring outstanding Odisha contributors.',
        eventType: EventType.AWARD,
        primaryColor: '#FF5722',
      }, adminId);

      expect(result.success).toBe(true);
      expect(result.data?.title).toBe('Ruchi Prativa Sanman');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          eventCode: 'RPF-EVT-000001',
          slug: 'ruchi-prativa-sanman',
          title: 'Ruchi Prativa Sanman',
        }),
      );
    });

    it('should append counter when slug already exists', async () => {
      repository.slugExists.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
      repository.countAll.mockResolvedValue(5);
      repository.create.mockResolvedValue({ ...mockEvent, slug: 'ruchi-prativa-sanman-1' });

      await service.createEvent({
        title: 'Ruchi Prativa Sanman',
        shortDescription: 'Annual award ceremony honoring outstanding Odisha contributors.',
        eventType: EventType.AWARD,
      }, adminId);

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'ruchi-prativa-sanman-1', eventCode: 'RPF-EVT-000006' }),
      );
    });
  });

  describe('updateEvent', () => {
    it('should update event fields', async () => {
      const updated = { ...mockEvent, shortDescription: 'Updated description' };
      repository.findById.mockResolvedValue(mockEvent);
      repository.update.mockResolvedValue(updated);

      const result = await service.updateEvent(mockEvent.id, { shortDescription: 'Updated description' }, adminId);
      expect(result.success).toBe(true);
      expect(result.data?.shortDescription).toBe('Updated description');
    });

    it('should regenerate slug when title changes', async () => {
      repository.findById.mockResolvedValue(mockEvent);
      repository.slugExists.mockResolvedValue(false);
      repository.update.mockResolvedValue({ ...mockEvent, title: 'New Title', slug: 'new-title' });

      await service.updateEvent(mockEvent.id, { title: 'New Title' }, adminId);
      expect(repository.update).toHaveBeenCalledWith(
        mockEvent.id,
        expect.objectContaining({ title: 'New Title', slug: 'new-title' }),
      );
    });

    it('should throw EntityNotFoundException for non-existent event', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateEvent('nonexistent', { title: 'X' }, adminId))
        .rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('deactivateEvent / activateEvent', () => {
    it('should deactivate an active event', async () => {
      repository.findById.mockResolvedValue(mockEvent);
      repository.update.mockResolvedValue({ ...mockEvent, isActive: false });

      const result = await service.deactivateEvent(mockEvent.id, adminId);
      expect(result.data?.isActive).toBe(false);
    });

    it('should throw if event is already inactive', async () => {
      repository.findById.mockResolvedValue({ ...mockEvent, isActive: false });
      await expect(service.deactivateEvent(mockEvent.id, adminId)).rejects.toThrow(BusinessException);
    });

    it('should activate an inactive event', async () => {
      repository.findById.mockResolvedValue({ ...mockEvent, isActive: false });
      repository.update.mockResolvedValue({ ...mockEvent, isActive: true });

      const result = await service.activateEvent(mockEvent.id, adminId);
      expect(result.data?.isActive).toBe(true);
    });

    it('should throw if event is already active', async () => {
      repository.findById.mockResolvedValue(mockEvent);
      await expect(service.activateEvent(mockEvent.id, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('deleteEvent', () => {
    it('should soft-delete an event', async () => {
      repository.findById.mockResolvedValue(mockEvent);
      repository.update.mockResolvedValue({ ...mockEvent, deletedAt: new Date() });

      const result = await service.deleteEvent(mockEvent.id, adminId);
      expect(result.success).toBe(true);
      expect(repository.update).toHaveBeenCalledWith(
        mockEvent.id,
        expect.objectContaining({ deletedBy: adminId }),
      );
    });

    it('should throw for non-existent event', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteEvent('nonexistent', adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getAdminEvents', () => {
    it('should return paginated admin event list', async () => {
      repository.findMany.mockResolvedValue({ data: [mockEvent], total: 1 });

      const result = await service.getAdminEvents({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
      expect(result.meta?.totalItems).toBe(1);
    });
  });

  describe('getPublicEvents', () => {
    it('should return paginated public event list', async () => {
      repository.findActivePublic.mockResolvedValue({ data: [mockEvent], total: 1 });

      const result = await service.getPublicEvents({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'sortOrder', sortOrder: 'asc' } as any);
      expect(result.success).toBe(true);
    });
  });

  describe('getEventBySlug', () => {
    it('should return event by slug', async () => {
      repository.findActiveBySlug.mockResolvedValue(mockEvent);

      const result = await service.getEventBySlug('ruchi-prativa-sanman');
      expect(result.data?.slug).toBe('ruchi-prativa-sanman');
    });

    it('should throw for non-existent slug', async () => {
      repository.findActiveBySlug.mockResolvedValue(null);
      await expect(service.getEventBySlug('nonexistent')).rejects.toThrow(EntityNotFoundException);
    });
  });
});
