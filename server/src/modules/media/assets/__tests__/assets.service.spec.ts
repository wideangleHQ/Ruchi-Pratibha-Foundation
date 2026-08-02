import { Test, TestingModule } from '@nestjs/testing';
import { AssetStatus, MediaType, MediaVisibility } from '@prisma/client';
import { SupabaseStorageService } from '../../../../supabase-storage/supabase-storage.service';
import { AssetsRepository } from '../assets.repository';
import { AssetsService } from '../assets.service';

describe('AssetsService', () => {
  let service: AssetsService;
  let repository: jest.Mocked<AssetsRepository>;
  let storageService: jest.Mocked<SupabaseStorageService>;

  const mockAsset = {
    id: 'asset-1',
    mediaCode: 'RPF-AST-000001',
    originalFilename: 'photo.jpg',
    storedFilename: '1234-photo.jpg',
    bucketName: 'foundation-images',
    objectPath: 'foundation-images/1234-photo.jpg',
    publicUrl: 'https://storage.example.com/photo.jpg',
    contentType: 'image/jpeg',
    extension: 'jpg',
    fileSize: 102400,
    mediaType: MediaType.IMAGE,
    checksum: 'sha256hash',
    width: 1920,
    height: 1080,
    duration: null as number | null,
    folderId: null as string | null,
    description: null as string | null,
    altText: null as string | null,
    tags: [] as string[],
    visibility: MediaVisibility.PUBLIC,
    assetStatus: AssetStatus.ACTIVE,
    uploadedBy: 'admin-1',
    sortOrder: 0,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null as Date | null,
    createdBy: 'admin-1',
    updatedBy: 'admin-1',
  } as any;

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      createMany: jest.fn(),
      findById: jest.fn(),
      findByCode: jest.fn(),
      findByChecksum: jest.fn(),
      findByIds: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      softDeleteMany: jest.fn(),
      findMany: jest.fn(),
    };

    const mockStorage = {
      upload: jest.fn(),
      delete: jest.fn(),
      move: jest.fn(),
      copy: jest.fn(),
      getPublicUrl: jest.fn(),
      validateFile: jest.fn(),
      resolveMediaType: jest.fn(),
      resolveBucket: jest.fn(),
      generateStoredFilename: jest.fn(),
      sanitizeFilename: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        { provide: AssetsRepository, useValue: mockRepo },
        { provide: SupabaseStorageService, useValue: mockStorage },
      ],
    }).compile();

    service = module.get(AssetsService);
    repository = module.get(AssetsRepository);
    storageService = module.get(SupabaseStorageService);
  });

  describe('update', () => {
    it('should update an asset', async () => {
      repository.findById.mockResolvedValue(mockAsset);
      repository.update.mockResolvedValue({ ...mockAsset, description: 'Updated' });

      const result = await service.update('asset-1', { description: 'Updated' }, 'admin-1');
      expect(result.data).toBeDefined();
      expect(repository.update).toHaveBeenCalled();
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.update('bad-id', {}, 'admin-1')).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should delete an asset from storage and soft-delete record', async () => {
      repository.findById.mockResolvedValue(mockAsset);
      storageService.delete.mockResolvedValue(undefined as any);
      repository.update.mockResolvedValue({ ...mockAsset, deletedAt: new Date() });

      const result = await service.remove('asset-1');
      expect(result.data).toBeNull();
      expect(storageService.delete).toHaveBeenCalledWith(mockAsset.objectPath, mockAsset.bucketName);
    });
  });

  describe('bulkDelete', () => {
    it('should bulk delete assets', async () => {
      repository.findByIds.mockResolvedValue([mockAsset]);
      storageService.delete.mockResolvedValue(undefined as any);
      repository.softDeleteMany.mockResolvedValue(1);

      const result = await service.bulkDelete({ ids: ['asset-1'] });
      expect(result.data).toEqual({ count: 1 });
    });

    it('should throw if some assets not found', async () => {
      repository.findByIds.mockResolvedValue([]);
      await expect(service.bulkDelete({ ids: ['bad-id'] })).rejects.toThrow();
    });
  });

  describe('moveAsset', () => {
    it('should move an asset to a folder', async () => {
      repository.findById.mockResolvedValue(mockAsset);
      repository.update.mockResolvedValue({ ...mockAsset, folderId: 'folder-1' });

      const result = await service.moveAsset('asset-1', { folderId: 'folder-1' });
      expect(result.data).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return paginated assets', async () => {
      repository.findMany.mockResolvedValue({ data: [mockAsset], total: 1 });

      const result = await service.findAll({
        page: 1, pageSize: 10, sortBy: 'createdAt', sortOrder: 'desc' as any,
        skip: 0, take: 10,
      } as any);
      expect(result.data).toHaveLength(1);
    });
  });
});
