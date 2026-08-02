import { Test, TestingModule } from '@nestjs/testing';
import { GalleryController } from '../gallery.controller';
import { GalleryService } from '../gallery.service';

describe('GalleryController', () => {
  let controller: GalleryController;
  let service: jest.Mocked<GalleryService>;

  const mockResponse = { success: true, data: {}, message: 'ok' };

  beforeEach(async () => {
    const mockService = {
      createAlbum: jest.fn().mockResolvedValue(mockResponse),
      updateAlbum: jest.fn().mockResolvedValue(mockResponse),
      deleteAlbum: jest.fn().mockResolvedValue(mockResponse),
      findAlbumByCode: jest.fn().mockResolvedValue(mockResponse),
      findAlbumBySlug: jest.fn().mockResolvedValue(mockResponse),
      listAlbums: jest.fn().mockResolvedValue(mockResponse),
      addImage: jest.fn().mockResolvedValue(mockResponse),
      updateImage: jest.fn().mockResolvedValue(mockResponse),
      removeImage: jest.fn().mockResolvedValue(mockResponse),
      getAlbumImages: jest.fn().mockResolvedValue(mockResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GalleryController],
      providers: [{ provide: GalleryService, useValue: mockService }],
    }).compile();

    controller = module.get(GalleryController);
    service = module.get(GalleryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create album', async () => {
    await controller.createAlbum({ title: 'Test Album' }, 'user-1');
    expect(service.createAlbum).toHaveBeenCalledWith({ title: 'Test Album' }, 'user-1');
  });

  it('should list albums', async () => {
    await controller.listAlbums({} as any);
    expect(service.listAlbums).toHaveBeenCalled();
  });

  it('should find album by code', async () => {
    await controller.findAlbumByCode('RPF-ALB-000001');
    expect(service.findAlbumByCode).toHaveBeenCalledWith('RPF-ALB-000001');
  });

  it('should find album by slug', async () => {
    await controller.findAlbumBySlug('spring-event');
    expect(service.findAlbumBySlug).toHaveBeenCalledWith('spring-event');
  });

  it('should update album', async () => {
    await controller.updateAlbum('RPF-ALB-000001', { description: 'Updated' }, 'user-1');
    expect(service.updateAlbum).toHaveBeenCalledWith('RPF-ALB-000001', { description: 'Updated' }, 'user-1');
  });

  it('should delete album', async () => {
    await controller.deleteAlbum('RPF-ALB-000001', 'user-1');
    expect(service.deleteAlbum).toHaveBeenCalledWith('RPF-ALB-000001', 'user-1');
  });

  it('should get album images', async () => {
    await controller.getAlbumImages('RPF-ALB-000001');
    expect(service.getAlbumImages).toHaveBeenCalledWith('RPF-ALB-000001');
  });

  it('should add image to album', async () => {
    await controller.addImage('RPF-ALB-000001', { assetId: 'asset-1' }, 'user-1');
    expect(service.addImage).toHaveBeenCalledWith('RPF-ALB-000001', { assetId: 'asset-1' }, 'user-1');
  });

  it('should update image', async () => {
    await controller.updateImage('img-1', { caption: 'Updated' });
    expect(service.updateImage).toHaveBeenCalledWith('img-1', { caption: 'Updated' });
  });

  it('should remove image', async () => {
    await controller.removeImage('img-1');
    expect(service.removeImage).toHaveBeenCalledWith('img-1');
  });
});
