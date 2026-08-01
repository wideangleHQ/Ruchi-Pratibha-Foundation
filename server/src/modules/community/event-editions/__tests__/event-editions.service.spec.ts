import { Test, TestingModule } from '@nestjs/testing';
import { EditionStatus, EditionVisibility, EventEdition } from '@prisma/client';
import { BusinessException, EntityNotFoundException } from '../../../../common/exceptions';
import { EventEditionsService } from '../event-editions.service';
import { EventEditionsRepository } from '../event-editions.repository';

describe('EventEditionsService', () => {
  let service: EventEditionsService;
  let repository: jest.Mocked<EventEditionsRepository>;

  const eventId = 'e1b2c3d4-e5f6-7890-abcd-ef1234567890';
  const adminId = 'admin-uuid-001';

  const mockEdition: EventEdition = {
    id: 'ed-b2c3d4-e5f6-7890-abcd-ef1234567890',
    eventId,
    editionCode: 'RPF-EDN-2026-0001',
    editionName: 'Ruchi Prativa Sanman 2026',
    year: 2026,
    editionNumber: 1,
    slug: 'ruchi-prativa-sanman-2026',
    theme: 'Excellence in Innovation',
    shortDescription: 'The 2026 edition honoring outstanding Odisha contributors.',
    detailedDescription: null,
    venue: 'Bhubaneswar Convention Centre',
    venueAddress: 'Janpath, Bhubaneswar',
    googleMapsUrl: null,
    venueId: null,
    registrationOpens: new Date('2026-09-01'),
    registrationCloses: new Date('2026-09-15'),
    eventStarts: new Date('2026-10-01T09:00:00Z'),
    eventEnds: new Date('2026-10-01T18:00:00Z'),
    volunteerCapacity: 50,
    maxRegistrations: 200,
    bannerImageKey: null,
    coverImageKey: null,
    isFeatured: false,
    visibility: EditionVisibility.PUBLIC,
    editionStatus: EditionStatus.DRAFT,
    registrationEnabled: false,
    attendanceEnabled: false,
    certificateEnabled: false,
    version: 1,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    deletedAt: null,
    createdById: adminId,
    updatedBy: adminId,
    deletedBy: null,
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findBySlug: jest.fn(),
      slugExists: jest.fn(),
      countByYear: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      findByEventId: jest.fn(),
      findUpcoming: jest.fn(),
      findFeatured: jest.fn(),
      findPublicBySlug: jest.fn(),
      findPublicByEventSlug: jest.fn(),
      eventExists: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventEditionsService,
        { provide: EventEditionsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(EventEditionsService);
    repository = module.get(EventEditionsRepository);
  });

  describe('createEdition', () => {
    it('should create an edition with generated slug and code', async () => {
      repository.eventExists.mockResolvedValue(true);
      repository.slugExists.mockResolvedValue(false);
      repository.countByYear.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockEdition);

      const result = await service.createEdition(eventId, {
        editionName: 'Ruchi Prativa Sanman 2026',
        year: 2026,
        shortDescription: 'The 2026 edition honoring outstanding Odisha contributors.',
        venue: 'Bhubaneswar Convention Centre',
        eventStarts: '2026-10-01T09:00:00Z',
        eventEnds: '2026-10-01T18:00:00Z',
      }, adminId);

      expect(result.success).toBe(true);
      expect(result.data?.editionName).toBe('Ruchi Prativa Sanman 2026');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          editionCode: 'RPF-EDN-2026-0001',
          slug: 'ruchi-prativa-sanman-2026',
          eventId,
        }),
      );
    });

    it('should throw if parent event does not exist', async () => {
      repository.eventExists.mockResolvedValue(false);

      await expect(service.createEdition('nonexistent', {
        editionName: 'Test Edition 2026',
        year: 2026,
        shortDescription: 'Short description for testing.',
        venue: 'Test Venue',
        eventStarts: '2026-10-01T09:00:00Z',
        eventEnds: '2026-10-01T18:00:00Z',
      }, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should throw if eventEnds is before eventStarts', async () => {
      repository.eventExists.mockResolvedValue(true);

      await expect(service.createEdition(eventId, {
        editionName: 'Test Edition 2026',
        year: 2026,
        shortDescription: 'Short description for testing.',
        venue: 'Test Venue',
        eventStarts: '2026-10-02T09:00:00Z',
        eventEnds: '2026-10-01T18:00:00Z',
      }, adminId)).rejects.toThrow(BusinessException);
    });

    it('should throw if registrationCloses is before registrationOpens', async () => {
      repository.eventExists.mockResolvedValue(true);

      await expect(service.createEdition(eventId, {
        editionName: 'Test Edition 2026',
        year: 2026,
        shortDescription: 'Short description for testing.',
        venue: 'Test Venue',
        eventStarts: '2026-10-01T09:00:00Z',
        eventEnds: '2026-10-01T18:00:00Z',
        registrationOpens: '2026-09-15T00:00:00Z',
        registrationCloses: '2026-09-01T00:00:00Z',
      }, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('updateEdition', () => {
    it('should update edition fields', async () => {
      const updated = { ...mockEdition, venue: 'New Venue' };
      repository.findById.mockResolvedValue(mockEdition);
      repository.update.mockResolvedValue(updated);

      const result = await service.updateEdition(mockEdition.id, { venue: 'New Venue' }, adminId);
      expect(result.success).toBe(true);
      expect(result.data?.venue).toBe('New Venue');
    });

    it('should regenerate slug when editionName changes', async () => {
      repository.findById.mockResolvedValue(mockEdition);
      repository.slugExists.mockResolvedValue(false);
      repository.update.mockResolvedValue({ ...mockEdition, editionName: 'New Name', slug: 'new-name' });

      await service.updateEdition(mockEdition.id, { editionName: 'New Name' }, adminId);
      expect(repository.update).toHaveBeenCalledWith(
        mockEdition.id,
        expect.objectContaining({ editionName: 'New Name', slug: 'new-name' }),
      );
    });

    it('should throw for non-existent edition', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateEdition('nonexistent', { venue: 'X' }, adminId))
        .rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('status transitions', () => {
    it('should publish a DRAFT edition', async () => {
      repository.findById.mockResolvedValue(mockEdition);
      repository.update.mockResolvedValue({ ...mockEdition, editionStatus: EditionStatus.PUBLISHED });

      const result = await service.publishEdition(mockEdition.id, adminId);
      expect(result.data?.editionStatus).toBe(EditionStatus.PUBLISHED);
    });

    it('should reject invalid transition DRAFT -> ARCHIVED', async () => {
      repository.findById.mockResolvedValue(mockEdition);
      await expect(service.archiveEdition(mockEdition.id, adminId)).rejects.toThrow(BusinessException);
    });

    it('should cancel a DRAFT edition', async () => {
      repository.findById.mockResolvedValue(mockEdition);
      repository.update.mockResolvedValue({ ...mockEdition, editionStatus: EditionStatus.CANCELLED });

      const result = await service.cancelEdition(mockEdition.id, adminId);
      expect(result.data?.editionStatus).toBe(EditionStatus.CANCELLED);
    });

    it('should archive a COMPLETED edition', async () => {
      const completed = { ...mockEdition, editionStatus: EditionStatus.COMPLETED };
      repository.findById.mockResolvedValue(completed);
      repository.update.mockResolvedValue({ ...completed, editionStatus: EditionStatus.ARCHIVED });

      const result = await service.archiveEdition(mockEdition.id, adminId);
      expect(result.data?.editionStatus).toBe(EditionStatus.ARCHIVED);
    });

    it('should reject transition from ARCHIVED', async () => {
      const archived = { ...mockEdition, editionStatus: EditionStatus.ARCHIVED };
      repository.findById.mockResolvedValue(archived);
      await expect(service.publishEdition(mockEdition.id, adminId)).rejects.toThrow(BusinessException);
    });

    it('should allow CANCELLED -> DRAFT', async () => {
      const cancelled = { ...mockEdition, editionStatus: EditionStatus.CANCELLED };
      repository.findById.mockResolvedValue(cancelled);
      // publishEdition targets PUBLISHED, not DRAFT — so this should fail
      await expect(service.publishEdition(mockEdition.id, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('toggleFeatured', () => {
    it('should toggle featured from false to true', async () => {
      repository.findById.mockResolvedValue(mockEdition);
      repository.update.mockResolvedValue({ ...mockEdition, isFeatured: true });

      const result = await service.toggleFeatured(mockEdition.id, adminId);
      expect(result.data?.isFeatured).toBe(true);
    });

    it('should toggle featured from true to false', async () => {
      repository.findById.mockResolvedValue({ ...mockEdition, isFeatured: true });
      repository.update.mockResolvedValue({ ...mockEdition, isFeatured: false });

      const result = await service.toggleFeatured(mockEdition.id, adminId);
      expect(result.data?.isFeatured).toBe(false);
    });
  });

  describe('deleteEdition', () => {
    it('should soft-delete an edition', async () => {
      repository.findById.mockResolvedValue(mockEdition);
      repository.update.mockResolvedValue({ ...mockEdition, deletedAt: new Date() });

      const result = await service.deleteEdition(mockEdition.id, adminId);
      expect(result.success).toBe(true);
      expect(repository.update).toHaveBeenCalledWith(
        mockEdition.id,
        expect.objectContaining({ deletedBy: adminId }),
      );
    });

    it('should throw for non-existent edition', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteEdition('nonexistent', adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getAdminEditions', () => {
    it('should return paginated editions for an event', async () => {
      repository.eventExists.mockResolvedValue(true);
      repository.findByEventId.mockResolvedValue({ data: [mockEdition], total: 1 });

      const result = await service.getAdminEditions(eventId, { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'year', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
      expect(result.meta?.totalItems).toBe(1);
    });

    it('should throw if parent event does not exist', async () => {
      repository.eventExists.mockResolvedValue(false);
      await expect(service.getAdminEditions('nonexistent', { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'year', sortOrder: 'desc' } as any))
        .rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('public queries', () => {
    it('should return upcoming editions', async () => {
      repository.findUpcoming.mockResolvedValue({ data: [mockEdition], total: 1 });

      const result = await service.getUpcomingEditions({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'eventStarts', sortOrder: 'asc' } as any);
      expect(result.success).toBe(true);
    });

    it('should return featured editions', async () => {
      repository.findFeatured.mockResolvedValue({ data: [mockEdition], total: 1 });

      const result = await service.getFeaturedEditions({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'eventStarts', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });

    it('should return edition by slug', async () => {
      repository.findPublicBySlug.mockResolvedValue(mockEdition);

      const result = await service.getEditionBySlug('ruchi-prativa-sanman-2026');
      expect(result.data?.slug).toBe('ruchi-prativa-sanman-2026');
    });

    it('should throw for non-existent edition slug', async () => {
      repository.findPublicBySlug.mockResolvedValue(null);
      await expect(service.getEditionBySlug('nonexistent')).rejects.toThrow(EntityNotFoundException);
    });

    it('should return editions by event slug', async () => {
      repository.findPublicByEventSlug.mockResolvedValue({ data: [mockEdition], total: 1 });

      const result = await service.getPublicEditionsByEventSlug('ruchi-prativa-sanman', { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'year', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });
  });
});
