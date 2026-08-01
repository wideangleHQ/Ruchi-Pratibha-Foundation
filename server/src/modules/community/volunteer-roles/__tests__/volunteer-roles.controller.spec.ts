import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerRolesController } from '../volunteer-roles.controller';
import { VolunteerRolesService } from '../volunteer-roles.service';

describe('VolunteerRolesController', () => {
  let controller: VolunteerRolesController;
  let service: jest.Mocked<VolunteerRolesService>;

  beforeEach(async () => {
    const mockService = {
      createRole: jest.fn().mockResolvedValue({ success: true }),
      getRoles: jest.fn().mockResolvedValue({ success: true }),
      getRoleById: jest.fn().mockResolvedValue({ success: true }),
      updateRole: jest.fn().mockResolvedValue({ success: true }),
      deleteRole: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteerRolesController],
      providers: [{ provide: VolunteerRolesService, useValue: mockService }],
    }).compile();

    controller = module.get(VolunteerRolesController);
    service = module.get(VolunteerRolesService);
  });

  it('should delegate create to service', async () => {
    await controller.create({} as any, 'admin-id');
    expect(service.createRole).toHaveBeenCalled();
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any);
    expect(service.getRoles).toHaveBeenCalled();
  });

  it('should delegate findOne to service', async () => {
    await controller.findOne('r-uuid');
    expect(service.getRoleById).toHaveBeenCalledWith('r-uuid');
  });

  it('should delegate update to service', async () => {
    await controller.update('r-uuid', {} as any, 'admin-id');
    expect(service.updateRole).toHaveBeenCalledWith('r-uuid', expect.anything(), 'admin-id');
  });

  it('should delegate remove to service', async () => {
    await controller.remove('r-uuid', 'admin-id');
    expect(service.deleteRole).toHaveBeenCalledWith('r-uuid', 'admin-id');
  });
});
