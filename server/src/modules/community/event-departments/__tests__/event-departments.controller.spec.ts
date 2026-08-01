import { Test, TestingModule } from '@nestjs/testing';
import { EventDepartmentsController } from '../event-departments.controller';
import { EventDepartmentsService } from '../event-departments.service';

describe('EventDepartmentsController', () => {
  let controller: EventDepartmentsController;
  let service: jest.Mocked<EventDepartmentsService>;

  beforeEach(async () => {
    const mockService = {
      createDepartment: jest.fn().mockResolvedValue({ success: true }),
      getDepartments: jest.fn().mockResolvedValue({ success: true }),
      getDepartmentById: jest.fn().mockResolvedValue({ success: true }),
      updateDepartment: jest.fn().mockResolvedValue({ success: true }),
      deleteDepartment: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventDepartmentsController],
      providers: [{ provide: EventDepartmentsService, useValue: mockService }],
    }).compile();

    controller = module.get(EventDepartmentsController);
    service = module.get(EventDepartmentsService);
  });

  it('should delegate create to service', async () => {
    await controller.create({} as any, 'admin-id');
    expect(service.createDepartment).toHaveBeenCalled();
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any);
    expect(service.getDepartments).toHaveBeenCalled();
  });

  it('should delegate findOne to service', async () => {
    await controller.findOne('d-uuid');
    expect(service.getDepartmentById).toHaveBeenCalledWith('d-uuid');
  });

  it('should delegate update to service', async () => {
    await controller.update('d-uuid', {} as any, 'admin-id');
    expect(service.updateDepartment).toHaveBeenCalledWith('d-uuid', expect.anything(), 'admin-id');
  });

  it('should delegate remove to service', async () => {
    await controller.remove('d-uuid', 'admin-id');
    expect(service.deleteDepartment).toHaveBeenCalledWith('d-uuid', 'admin-id');
  });
});
