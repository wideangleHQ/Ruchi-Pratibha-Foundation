import { Test, TestingModule } from '@nestjs/testing';
import { MediaVisibility } from '@prisma/client';
import { FoldersRepository } from '../folders.repository';
import { FoldersService } from '../folders.service';

describe('FoldersService', () => {
  let service: FoldersService;
  let repository: jest.Mocked<FoldersRepository>;

  const mockFolder = {
    id: 'folder-1',
    folderCode: 'RPF-FLD-000001',
    name: 'Events',
    slug: 'events',
    parentId: null as string | null,
    path: '/events',
    depth: 0,
    description: 'Event photos' as string | null,
    visibility: MediaVisibility.PUBLIC,
    sortOrder: 0,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null as Date | null,
    createdBy: 'admin-1' as string | null,
    updatedBy: 'admin-1' as string | null,
  };

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCode: jest.fn(),
      findByParentAndSlug: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      findChildren: jest.fn(),
      findTree: jest.fn(),
      findDescendants: jest.fn(),
      hasChildren: jest.fn(),
      hasAssets: jest.fn(),
      getStatistics: jest.fn(),
      findManyForAdmin: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoldersService,
        { provide: FoldersRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get(FoldersService);
    repository = module.get(FoldersRepository);
  });

  describe('create', () => {
    it('should create a root folder', async () => {
      repository.findByParentAndSlug.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockFolder);

      const result = await service.create({ name: 'Events' }, 'admin-1');
      expect(result.data).toBeDefined();
      expect(repository.create).toHaveBeenCalled();
    });

    it('should throw conflict if slug already exists under parent', async () => {
      repository.findByParentAndSlug.mockResolvedValue(mockFolder);

      await expect(service.create({ name: 'Events' }, 'admin-1')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a folder', async () => {
      repository.findByCode.mockResolvedValue(mockFolder);
      repository.update.mockResolvedValue({ ...mockFolder, name: 'Updated' });

      const result = await service.update('RPF-FLD-000001', { name: 'Updated' }, 'admin-1');
      expect(result.data).toBeDefined();
    });

    it('should throw not found for non-existent folder', async () => {
      repository.findByCode.mockResolvedValue(null);

      await expect(service.update('RPF-FLD-999999', { name: 'X' }, 'admin-1')).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should soft-delete a folder with no children or assets', async () => {
      repository.findByCode.mockResolvedValue(mockFolder);
      repository.hasChildren.mockResolvedValue(false);
      repository.hasAssets.mockResolvedValue(false);
      repository.update.mockResolvedValue({ ...mockFolder, deletedAt: new Date() });

      const result = await service.remove('RPF-FLD-000001', 'admin-1');
      expect(result.data).toBeNull();
    });

    it('should throw when folder has children', async () => {
      repository.findByCode.mockResolvedValue(mockFolder);
      repository.hasChildren.mockResolvedValue(true);

      await expect(service.remove('RPF-FLD-000001', 'admin-1')).rejects.toThrow();
    });

    it('should throw when folder has assets', async () => {
      repository.findByCode.mockResolvedValue(mockFolder);
      repository.hasChildren.mockResolvedValue(false);
      repository.hasAssets.mockResolvedValue(true);

      await expect(service.remove('RPF-FLD-000001', 'admin-1')).rejects.toThrow();
    });
  });

  describe('findByCode', () => {
    it('should return folder', async () => {
      repository.findByCode.mockResolvedValue(mockFolder);
      const result = await service.findByCode('RPF-FLD-000001');
      expect(result.data).toBeDefined();
    });

    it('should throw not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.findByCode('RPF-FLD-999999')).rejects.toThrow();
    });
  });

  describe('getTree', () => {
    it('should return folder tree', async () => {
      repository.findTree.mockResolvedValue([mockFolder]);
      const result = await service.getTree();
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getStatistics', () => {
    it('should return stats', async () => {
      repository.findByCode.mockResolvedValue(mockFolder);
      repository.getStatistics.mockResolvedValue({ childCount: 2, assetCount: 5 });
      const result = await service.getStatistics('RPF-FLD-000001');
      expect(result.data).toBeDefined();
    });
  });
});
