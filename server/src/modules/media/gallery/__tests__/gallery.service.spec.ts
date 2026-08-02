import { Test, TestingModule } from '@nestjs/testing';
import { MediaVisibility } from '@prisma/client';
import { GalleryRepository } from '../gallery.repository';
import { GalleryService } from '../gallery.service';

describe('GalleryService', () => {
  let service: GalleryService;
  let repository: jest.Mocked<GalleryRepository>;

  const mockAlbum = {
    id: 'album-1',
    albumCode: 'RPF-ALB-000001',
    title: 'Spring Event 2026',
    slug: 'spring-event-2026',
    description: 'Photos from event' as string | null,
    coverImageId: null as string | null,
    category: 'EVENT' as string | null,
    tags: ['spring', 'event'] as string[],
    visibility: MediaVisibility.PUBLIC,
    isFeatured: false,
    sortOrder: 0,
    eventEditionId: null as string | null,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null as Date | null,
    createdBy: 'admin-1' as string | null,
    updatedBy: 'admin-1' as string | null,
  };

  const mockImage = {
    id: 'img-1',
    albumId: 'album-1',
    assetId: 'asset-1',
    caption: 'Main photo' as string | null,
    sortOrder: 0,
    isFeatured: false,
    visibility: MediaVisibility.PUBLIC,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null as Date | null,
    createdBy: 'admin-1' as string | null,
  };

  beforeEach(async () => {
    const mockRepo = {
      createAlbum: jest.fn(),
      findAlbumById: jest.fn(),
      findAlbumByCode: jest.fn(),
      findAlbumBySlug: jest.fn(),
      countAllAlbums: jest.fn(),
      updateAlbum: jest.fn(),
      findManyAlbums: jest.fn(),
      createImage: jest.fn(),
      findImageById: jest.fn(),
      findImageByAlbumAndAsset: jest.fn(),
      updateImage: jest.fn(),
      findImagesByAlbum: jest.fn(),
      countImagesByAlbum: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GalleryService,
        { provide: GalleryRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get(GalleryService);
    repository = module.get(GalleryRepository);
  });

  describe('createAlbum', () => {
    it('should create an album', async () => {
      repository.findAlbumBySlug.mockResolvedValue(null);
      repository.countAllAlbums.mockResolvedValue(0);
      repository.createAlbum.mockResolvedValue(mockAlbum);

      const result = await service.createAlbum({ title: 'Spring Event 2026' }, 'admin-1');
      expect(result.data).toBeDefined();
      expect(repository.createAlbum).toHaveBeenCalled();
    });

    it('should throw conflict on duplicate slug', async () => {
      repository.findAlbumBySlug.mockResolvedValue(mockAlbum);
      await expect(service.createAlbum({ title: 'Spring Event 2026' }, 'admin-1')).rejects.toThrow();
    });
  });

  describe('updateAlbum', () => {
    it('should update an album', async () => {
      repository.findAlbumByCode.mockResolvedValue(mockAlbum);
      repository.updateAlbum.mockResolvedValue({ ...mockAlbum, description: 'Updated' });

      const result = await service.updateAlbum('RPF-ALB-000001', { description: 'Updated' }, 'admin-1');
      expect(result.data).toBeDefined();
    });

    it('should throw not found', async () => {
      repository.findAlbumByCode.mockResolvedValue(null);
      await expect(service.updateAlbum('RPF-ALB-999', {}, 'admin-1')).rejects.toThrow();
    });
  });

  describe('deleteAlbum', () => {
    it('should soft-delete album', async () => {
      repository.findAlbumByCode.mockResolvedValue(mockAlbum);
      repository.updateAlbum.mockResolvedValue({ ...mockAlbum, deletedAt: new Date() });

      const result = await service.deleteAlbum('RPF-ALB-000001', 'admin-1');
      expect(result.data).toBeNull();
    });
  });

  describe('findAlbumByCode', () => {
    it('should return album', async () => {
      repository.findAlbumByCode.mockResolvedValue(mockAlbum);
      const result = await service.findAlbumByCode('RPF-ALB-000001');
      expect(result.data).toBeDefined();
    });

    it('should throw not found', async () => {
      repository.findAlbumByCode.mockResolvedValue(null);
      await expect(service.findAlbumByCode('RPF-ALB-999')).rejects.toThrow();
    });
  });

  describe('addImage', () => {
    it('should add image to album', async () => {
      repository.findAlbumByCode.mockResolvedValue(mockAlbum);
      repository.findImageByAlbumAndAsset.mockResolvedValue(null);
      repository.createImage.mockResolvedValue(mockImage);

      const result = await service.addImage('RPF-ALB-000001', { assetId: 'asset-1' }, 'admin-1');
      expect(result.data).toBeDefined();
    });

    it('should throw conflict on duplicate image', async () => {
      repository.findAlbumByCode.mockResolvedValue(mockAlbum);
      repository.findImageByAlbumAndAsset.mockResolvedValue(mockImage);

      await expect(
        service.addImage('RPF-ALB-000001', { assetId: 'asset-1' }, 'admin-1'),
      ).rejects.toThrow();
    });
  });

  describe('updateImage', () => {
    it('should update gallery image', async () => {
      repository.findImageById.mockResolvedValue(mockImage);
      repository.updateImage.mockResolvedValue({ ...mockImage, caption: 'Updated' });

      const result = await service.updateImage('img-1', { caption: 'Updated' });
      expect(result.data).toBeDefined();
    });
  });

  describe('removeImage', () => {
    it('should soft-delete gallery image', async () => {
      repository.findImageById.mockResolvedValue(mockImage);
      repository.updateImage.mockResolvedValue({ ...mockImage, deletedAt: new Date() });

      const result = await service.removeImage('img-1');
      expect(result.data).toBeNull();
    });
  });

  describe('listAlbums', () => {
    it('should return paginated albums', async () => {
      repository.findManyAlbums.mockResolvedValue({ data: [mockAlbum], total: 1 });

      const result = await service.listAlbums({
        page: 1, pageSize: 10, sortBy: 'createdAt', sortOrder: 'desc' as any,
        skip: 0, take: 10,
      } as any);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getAlbumImages', () => {
    it('should return album images', async () => {
      repository.findAlbumByCode.mockResolvedValue(mockAlbum);
      repository.findImagesByAlbum.mockResolvedValue([mockImage]);

      const result = await service.getAlbumImages('RPF-ALB-000001');
      expect(result.data).toHaveLength(1);
    });
  });
});
