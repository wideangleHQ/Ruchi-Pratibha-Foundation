import { Test, TestingModule } from '@nestjs/testing';
import { EventSpeaker, SpeakerStatus } from '@prisma/client';
import { EntityNotFoundException, BusinessException } from '../../../../common/exceptions';
import { EventSpeakersService } from '../event-speakers.service';
import { EventSpeakersRepository } from '../event-speakers.repository';

describe('EventSpeakersService', () => {
  let service: EventSpeakersService;
  let repository: jest.Mocked<EventSpeakersRepository>;

  const mockSpeaker: EventSpeaker = {
    id: 'spk-uuid-001',
    speakerCode: 'RPF-SPK-000001',
    name: 'Dr. Ramesh Panda',
    slug: 'dr-ramesh-panda',
    designation: 'Chief Guest',
    organization: 'Odisha State Government',
    biography: 'Distinguished leader.',
    shortBio: 'Leader in governance.',
    photoAssetId: null,
    email: 'ramesh@example.com',
    phone: '+919876543210',
    website: null,
    linkedinUrl: null,
    twitterUrl: null,
    speakerStatus: SpeakerStatus.ACTIVE,
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
      findActivePublic: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventSpeakersService,
        { provide: EventSpeakersRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(EventSpeakersService);
    repository = module.get(EventSpeakersRepository);
  });

  describe('createSpeaker', () => {
    it('should create a speaker with generated slug and code', async () => {
      repository.slugExists.mockResolvedValue(false);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockSpeaker);

      const result = await service.createSpeaker({
        name: 'Dr. Ramesh Panda',
        designation: 'Chief Guest',
        organization: 'Odisha State Government',
      }, adminId);

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('Dr. Ramesh Panda');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          speakerCode: 'RPF-SPK-000001',
          slug: 'dr-ramesh-panda',
        }),
      );
    });

    it('should append counter when slug exists', async () => {
      repository.slugExists.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
      repository.countAll.mockResolvedValue(5);
      repository.create.mockResolvedValue({ ...mockSpeaker, slug: 'dr-ramesh-panda-1' });

      await service.createSpeaker({ name: 'Dr. Ramesh Panda' }, adminId);

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'dr-ramesh-panda-1', speakerCode: 'RPF-SPK-000006' }),
      );
    });
  });

  describe('updateSpeaker', () => {
    it('should update speaker fields', async () => {
      const updated = { ...mockSpeaker, designation: 'Keynote Speaker' };
      repository.findById.mockResolvedValue(mockSpeaker);
      repository.update.mockResolvedValue(updated);

      const result = await service.updateSpeaker(mockSpeaker.id, { designation: 'Keynote Speaker' }, adminId);
      expect(result.success).toBe(true);
      expect(result.data?.designation).toBe('Keynote Speaker');
    });

    it('should regenerate slug when name changes', async () => {
      repository.findById.mockResolvedValue(mockSpeaker);
      repository.slugExists.mockResolvedValue(false);
      repository.update.mockResolvedValue({ ...mockSpeaker, name: 'New Name', slug: 'new-name' });

      await service.updateSpeaker(mockSpeaker.id, { name: 'New Name' }, adminId);
      expect(repository.update).toHaveBeenCalledWith(
        mockSpeaker.id,
        expect.objectContaining({ name: 'New Name', slug: 'new-name' }),
      );
    });

    it('should allow valid status transition from ACTIVE to INACTIVE', async () => {
      repository.findById.mockResolvedValue(mockSpeaker);
      repository.update.mockResolvedValue({ ...mockSpeaker, speakerStatus: SpeakerStatus.INACTIVE });

      const result = await service.updateSpeaker(mockSpeaker.id, { speakerStatus: SpeakerStatus.INACTIVE }, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject invalid status transition from ARCHIVED to INACTIVE', async () => {
      repository.findById.mockResolvedValue({ ...mockSpeaker, speakerStatus: SpeakerStatus.ARCHIVED });
      await expect(
        service.updateSpeaker(mockSpeaker.id, { speakerStatus: SpeakerStatus.INACTIVE }, adminId),
      ).rejects.toThrow(BusinessException);
    });

    it('should throw EntityNotFoundException for non-existent speaker', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateSpeaker('nonexistent', { name: 'X' }, adminId))
        .rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('deleteSpeaker', () => {
    it('should soft-delete a speaker', async () => {
      repository.findById.mockResolvedValue(mockSpeaker);
      repository.update.mockResolvedValue({ ...mockSpeaker, deletedAt: new Date() });

      const result = await service.deleteSpeaker(mockSpeaker.id, adminId);
      expect(result.success).toBe(true);
      expect(repository.update).toHaveBeenCalledWith(
        mockSpeaker.id,
        expect.objectContaining({ updatedBy: adminId }),
      );
    });

    it('should throw for non-existent speaker', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteSpeaker('nonexistent', adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getAdminSpeakers', () => {
    it('should return paginated admin speaker list', async () => {
      repository.findMany.mockResolvedValue({ data: [mockSpeaker], total: 1 });

      const result = await service.getAdminSpeakers({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
      expect(result.meta?.totalItems).toBe(1);
    });
  });

  describe('getPublicSpeakers', () => {
    it('should return paginated public speaker list', async () => {
      repository.findActivePublic.mockResolvedValue({ data: [mockSpeaker], total: 1 });

      const result = await service.getPublicSpeakers({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'sortOrder', sortOrder: 'asc' } as any);
      expect(result.success).toBe(true);
    });
  });

  describe('getPublicSpeakerBySlug', () => {
    it('should return speaker by slug', async () => {
      repository.findBySlug.mockResolvedValue(mockSpeaker);

      const result = await service.getPublicSpeakerBySlug('dr-ramesh-panda');
      expect(result.data?.slug).toBe('dr-ramesh-panda');
    });

    it('should throw for non-existent slug', async () => {
      repository.findBySlug.mockResolvedValue(null);
      await expect(service.getPublicSpeakerBySlug('nonexistent')).rejects.toThrow(EntityNotFoundException);
    });

    it('should throw for inactive speaker', async () => {
      repository.findBySlug.mockResolvedValue({ ...mockSpeaker, speakerStatus: SpeakerStatus.INACTIVE });
      await expect(service.getPublicSpeakerBySlug('dr-ramesh-panda')).rejects.toThrow(EntityNotFoundException);
    });
  });
});
