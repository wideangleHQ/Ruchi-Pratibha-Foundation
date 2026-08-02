import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from '../documents.controller';
import { DocumentsService } from '../documents.service';

describe('DocumentsController', () => {
  let controller: DocumentsController;
  let service: jest.Mocked<DocumentsService>;

  const mockResponse = { success: true, data: {}, message: 'ok' };

  beforeEach(async () => {
    const mockService = {
      create: jest.fn().mockResolvedValue(mockResponse),
      update: jest.fn().mockResolvedValue(mockResponse),
      remove: jest.fn().mockResolvedValue(mockResponse),
      findByCode: jest.fn().mockResolvedValue(mockResponse),
      findBySlug: jest.fn().mockResolvedValue(mockResponse),
      trackDownload: jest.fn().mockResolvedValue(mockResponse),
      list: jest.fn().mockResolvedValue(mockResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [{ provide: DocumentsService, useValue: mockService }],
    }).compile();

    controller = module.get(DocumentsController);
    service = module.get(DocumentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create document', async () => {
    await controller.create({ title: 'Test Doc', assetId: 'asset-1' }, 'user-1');
    expect(service.create).toHaveBeenCalled();
  });

  it('should list documents', async () => {
    await controller.list({} as any);
    expect(service.list).toHaveBeenCalled();
  });

  it('should find by code', async () => {
    await controller.findByCode('RPF-DOC-000001');
    expect(service.findByCode).toHaveBeenCalledWith('RPF-DOC-000001');
  });

  it('should find by slug', async () => {
    await controller.findBySlug('annual-report');
    expect(service.findBySlug).toHaveBeenCalledWith('annual-report');
  });

  it('should update document', async () => {
    await controller.update('RPF-DOC-000001', { summary: 'Updated' }, 'user-1');
    expect(service.update).toHaveBeenCalledWith('RPF-DOC-000001', { summary: 'Updated' }, 'user-1');
  });

  it('should delete document', async () => {
    await controller.remove('RPF-DOC-000001', 'user-1');
    expect(service.remove).toHaveBeenCalledWith('RPF-DOC-000001', 'user-1');
  });

  it('should track download', async () => {
    await controller.trackDownload('RPF-DOC-000001');
    expect(service.trackDownload).toHaveBeenCalledWith('RPF-DOC-000001');
  });
});
