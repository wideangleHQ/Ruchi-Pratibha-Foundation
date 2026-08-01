import { Test, TestingModule } from '@nestjs/testing';
import { VenuesController } from '../venues.controller';
import { VenuesService } from '../venues.service';

describe('VenuesController', () => {
  let controller: VenuesController;
  let service: jest.Mocked<VenuesService>;

  beforeEach(async () => {
    const mockService = {
      createVenue: jest.fn().mockResolvedValue({ success: true }),
      getVenues: jest.fn().mockResolvedValue({ success: true }),
      getVenueById: jest.fn().mockResolvedValue({ success: true }),
      updateVenue: jest.fn().mockResolvedValue({ success: true }),
      deleteVenue: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenuesController],
      providers: [{ provide: VenuesService, useValue: mockService }],
    }).compile();

    controller = module.get(VenuesController);
    service = module.get(VenuesService);
  });

  it('should delegate create to service', async () => {
    await controller.create({} as any, 'admin-id');
    expect(service.createVenue).toHaveBeenCalled();
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any);
    expect(service.getVenues).toHaveBeenCalled();
  });

  it('should delegate findOne to service', async () => {
    await controller.findOne('v-uuid');
    expect(service.getVenueById).toHaveBeenCalledWith('v-uuid');
  });

  it('should delegate update to service', async () => {
    await controller.update('v-uuid', {} as any, 'admin-id');
    expect(service.updateVenue).toHaveBeenCalledWith('v-uuid', expect.anything(), 'admin-id');
  });

  it('should delegate remove to service', async () => {
    await controller.remove('v-uuid', 'admin-id');
    expect(service.deleteVenue).toHaveBeenCalledWith('v-uuid', 'admin-id');
  });
});
