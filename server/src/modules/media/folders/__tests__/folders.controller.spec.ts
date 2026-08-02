import { Test, TestingModule } from '@nestjs/testing';
import { FoldersController } from '../folders.controller';
import { FoldersService } from '../folders.service';

describe('FoldersController', () => {
  let controller: FoldersController;
  let service: jest.Mocked<FoldersService>;

  const mockResponse = { success: true, data: {}, message: 'ok' };

  beforeEach(async () => {
    const mockService = {
      create: jest.fn().mockResolvedValue(mockResponse),
      update: jest.fn().mockResolvedValue(mockResponse),
      remove: jest.fn().mockResolvedValue(mockResponse),
      findByCode: jest.fn().mockResolvedValue(mockResponse),
      getChildren: jest.fn().mockResolvedValue(mockResponse),
      getTree: jest.fn().mockResolvedValue(mockResponse),
      getStatistics: jest.fn().mockResolvedValue(mockResponse),
      getBreadcrumb: jest.fn().mockResolvedValue(mockResponse),
      move: jest.fn().mockResolvedValue(mockResponse),
      list: jest.fn().mockResolvedValue(mockResponse),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoldersController],
      providers: [{ provide: FoldersService, useValue: mockService }],
    }).compile();

    controller = module.get(FoldersController);
    service = module.get(FoldersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create folder', async () => {
    const result = await controller.create({ name: 'Test' }, 'user-1');
    expect(service.create).toHaveBeenCalledWith({ name: 'Test' }, 'user-1');
    expect(result).toEqual(mockResponse);
  });

  it('should get tree', async () => {
    await controller.getTree();
    expect(service.getTree).toHaveBeenCalled();
  });

  it('should get folder by code', async () => {
    await controller.findByCode('RPF-FLD-000001');
    expect(service.findByCode).toHaveBeenCalledWith('RPF-FLD-000001');
  });

  it('should update folder', async () => {
    await controller.update('RPF-FLD-000001', { name: 'Updated' }, 'user-1');
    expect(service.update).toHaveBeenCalledWith('RPF-FLD-000001', { name: 'Updated' }, 'user-1');
  });

  it('should delete folder', async () => {
    await controller.remove('RPF-FLD-000001', 'user-1');
    expect(service.remove).toHaveBeenCalledWith('RPF-FLD-000001', 'user-1');
  });

  it('should get statistics', async () => {
    await controller.getStats('RPF-FLD-000001');
    expect(service.getStatistics).toHaveBeenCalledWith('RPF-FLD-000001');
  });

  it('should get breadcrumb', async () => {
    await controller.getBreadcrumb('RPF-FLD-000001');
    expect(service.getBreadcrumb).toHaveBeenCalledWith('RPF-FLD-000001');
  });

  it('should move folder', async () => {
    await controller.move('RPF-FLD-000001', { parentId: 'folder-2' }, 'user-1');
    expect(service.move).toHaveBeenCalledWith('RPF-FLD-000001', { parentId: 'folder-2' }, 'user-1');
  });
});
