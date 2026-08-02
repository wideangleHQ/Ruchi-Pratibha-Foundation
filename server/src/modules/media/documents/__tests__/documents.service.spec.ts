import { Test, TestingModule } from '@nestjs/testing';
import { DocumentCategory, MediaVisibility } from '@prisma/client';
import { DocumentsRepository } from '../documents.repository';
import { DocumentsService } from '../documents.service';

describe('DocumentsService', () => {
  let service: DocumentsService;
  let repository: jest.Mocked<DocumentsRepository>;

  const mockDoc = {
    id: 'doc-1',
    documentCode: 'RPF-DOC-000001',
    title: 'Annual Report 2025',
    slug: 'annual-report-2025',
    assetId: 'asset-1',
    category: DocumentCategory.ANNUAL_REPORT,
    summary: 'Yearly summary' as string | null,
    author: 'Foundation Team' as string | null,
    publishDate: new Date() as Date | null,
    tags: ['annual', 'report'] as string[],
    visibility: MediaVisibility.PUBLIC,
    isFeatured: true,
    downloadCount: 42,
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
      findBySlug: jest.fn(),
      findByAssetId: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      incrementDownloadCount: jest.fn(),
      findMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        { provide: DocumentsRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get(DocumentsService);
    repository = module.get(DocumentsRepository);
  });

  describe('create', () => {
    it('should create a document', async () => {
      repository.findByAssetId.mockResolvedValue(null);
      repository.findBySlug.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockDoc);

      const result = await service.create({
        title: 'Annual Report 2025',
        assetId: 'asset-1',
        category: DocumentCategory.ANNUAL_REPORT,
      }, 'admin-1');
      expect(result.data).toBeDefined();
      expect(repository.create).toHaveBeenCalled();
    });

    it('should throw conflict on duplicate assetId', async () => {
      repository.findByAssetId.mockResolvedValue(mockDoc);

      await expect(service.create({
        title: 'Duplicate',
        assetId: 'asset-1',
      }, 'admin-1')).rejects.toThrow();
    });

    it('should throw conflict on duplicate slug', async () => {
      repository.findByAssetId.mockResolvedValue(null);
      repository.findBySlug.mockResolvedValue(mockDoc);

      await expect(service.create({
        title: 'Annual Report 2025',
        assetId: 'asset-2',
      }, 'admin-1')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a document', async () => {
      repository.findByCode.mockResolvedValue(mockDoc);
      repository.update.mockResolvedValue({ ...mockDoc, summary: 'Updated summary' });

      const result = await service.update('RPF-DOC-000001', { summary: 'Updated summary' }, 'admin-1');
      expect(result.data).toBeDefined();
    });

    it('should throw not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.update('RPF-DOC-999', {}, 'admin-1')).rejects.toThrow();
    });

    it('should check slug uniqueness on title change', async () => {
      const otherDoc = { ...mockDoc, id: 'doc-2' };
      repository.findByCode.mockResolvedValue(mockDoc);
      repository.findBySlug.mockResolvedValue(otherDoc);

      await expect(
        service.update('RPF-DOC-000001', { title: 'Annual Report 2025' }, 'admin-1'),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should soft-delete document', async () => {
      repository.findByCode.mockResolvedValue(mockDoc);
      repository.update.mockResolvedValue({ ...mockDoc, deletedAt: new Date() });

      const result = await service.remove('RPF-DOC-000001', 'admin-1');
      expect(result.data).toBeNull();
    });
  });

  describe('findByCode', () => {
    it('should return document', async () => {
      repository.findByCode.mockResolvedValue(mockDoc);
      const result = await service.findByCode('RPF-DOC-000001');
      expect(result.data).toBeDefined();
    });

    it('should throw not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.findByCode('RPF-DOC-999')).rejects.toThrow();
    });
  });

  describe('findBySlug', () => {
    it('should return document', async () => {
      repository.findBySlug.mockResolvedValue(mockDoc);
      const result = await service.findBySlug('annual-report-2025');
      expect(result.data).toBeDefined();
    });
  });

  describe('trackDownload', () => {
    it('should increment download count', async () => {
      repository.findByCode.mockResolvedValue(mockDoc);
      repository.incrementDownloadCount.mockResolvedValue({ ...mockDoc, downloadCount: 43 });

      const result = await service.trackDownload('RPF-DOC-000001');
      expect(result.data.downloadCount).toBe(43);
    });
  });

  describe('list', () => {
    it('should return paginated documents', async () => {
      repository.findMany.mockResolvedValue({ data: [mockDoc], total: 1 });

      const result = await service.list({
        page: 1, pageSize: 10, sortBy: 'createdAt', sortOrder: 'desc' as any,
        skip: 0, take: 10,
      } as any);
      expect(result.data).toHaveLength(1);
    });
  });
});
