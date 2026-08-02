import { Test, TestingModule } from '@nestjs/testing';
import { AssetsController } from '../assets.controller';
import { AssetsService } from '../assets.service';

describe('AssetsController', () => {
  let controller: AssetsController;
  let service: jest.Mocked<AssetsService>;

  const mockResponse = { success: true, data: {}, message: 'ok' };

  beforeEach(async () => {
    const mockService = {
      upload: jest.fn().mockResolvedValue(mockResponse),
      uploadMultiple: jest.fn().mockResolvedValue(mockResponse),
      update: jest.fn().mockResolvedValue(mockResponse),
      remove: jest.fn().mockResolvedValue(mockResponse),
      bulkDelete: jest.fn().mockResolvedValue(mockResponse),
      moveAsset: jest.fn().mockResolvedValue(mockResponse),
      copyAsset: jest.fn().mockResolvedValue(mockResponse),
      findById: jest.fn().mockResolvedValue(mockResponse),
      findAll: jest.fn().mockResolvedValue(mockResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [{ provide: AssetsService, useValue: mockService }],
    }).compile();

    controller = module.get(AssetsController);
    service = module.get(AssetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload an asset', async () => {
    const file = { originalname: 'test.jpg', size: 1024 } as Express.Multer.File;
    await controller.upload(file, {} as any, 'user-1');
    expect(service.upload).toHaveBeenCalled();
  });

  it('should get asset by id', async () => {
    await controller.findById('asset-1');
    expect(service.findById).toHaveBeenCalledWith('asset-1');
  });

  it('should update asset', async () => {
    await controller.update('asset-1', { description: 'Updated' }, 'user-1');
    expect(service.update).toHaveBeenCalledWith('asset-1', { description: 'Updated' }, 'user-1');
  });

  it('should delete asset', async () => {
    await controller.remove('asset-1');
    expect(service.remove).toHaveBeenCalledWith('asset-1');
  });

  it('should bulk delete', async () => {
    await controller.bulkDelete({ ids: ['asset-1'] });
    expect(service.bulkDelete).toHaveBeenCalled();
  });

  it('should move asset', async () => {
    await controller.move({ id: 'asset-1', folderId: 'folder-1' } as any);
    expect(service.moveAsset).toHaveBeenCalled();
  });

  it('should copy asset', async () => {
    await controller.copy({ id: 'asset-1', folderId: 'folder-2' } as any, 'user-1');
    expect(service.copyAsset).toHaveBeenCalled();
  });
});
