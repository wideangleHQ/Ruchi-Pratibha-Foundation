import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentsAdminController } from '../assignments-admin.controller';
import { AssignmentsVolunteerController } from '../assignments-volunteer.controller';
import { VolunteerAssignmentsService } from '../volunteer-assignments.service';

describe('AssignmentsAdminController', () => {
  let controller: AssignmentsAdminController;
  let service: jest.Mocked<VolunteerAssignmentsService>;

  beforeEach(async () => {
    const mockService = {
      createAssignment: jest.fn().mockResolvedValue({ success: true }),
      getAdminAssignments: jest.fn().mockResolvedValue({ success: true }),
      getAdminAssignmentByCode: jest.fn().mockResolvedValue({ success: true }),
      updateAssignment: jest.fn().mockResolvedValue({ success: true }),
      reassign: jest.fn().mockResolvedValue({ success: true }),
      cancelAssignment: jest.fn().mockResolvedValue({ success: true }),
      bulkAssign: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentsAdminController],
      providers: [{ provide: VolunteerAssignmentsService, useValue: mockService }],
    }).compile();

    controller = module.get(AssignmentsAdminController);
    service = module.get(VolunteerAssignmentsService);
  });

  it('should delegate create to service', async () => {
    await controller.create({} as any, 'admin-id');
    expect(service.createAssignment).toHaveBeenCalledWith(expect.anything(), 'admin-id');
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any);
    expect(service.getAdminAssignments).toHaveBeenCalled();
  });

  it('should delegate findByCode to service', async () => {
    await controller.findByCode('RPF-ASN-000001');
    expect(service.getAdminAssignmentByCode).toHaveBeenCalledWith('RPF-ASN-000001');
  });

  it('should delegate update to service', async () => {
    await controller.update('RPF-ASN-000001', {} as any, 'admin-id');
    expect(service.updateAssignment).toHaveBeenCalledWith('RPF-ASN-000001', expect.anything(), 'admin-id');
  });

  it('should delegate reassign to service', async () => {
    await controller.reassign('RPF-ASN-000001', {} as any, 'admin-id');
    expect(service.reassign).toHaveBeenCalledWith('RPF-ASN-000001', expect.anything(), 'admin-id');
  });

  it('should delegate cancel to service', async () => {
    await controller.cancel('RPF-ASN-000001', 'admin-id');
    expect(service.cancelAssignment).toHaveBeenCalledWith('RPF-ASN-000001', 'admin-id');
  });

  it('should delegate bulkAssign to service', async () => {
    const dto = { selectionIds: ['id-1'], departmentId: 'd', roleId: 'r', shiftId: 's', venueId: 'v' };
    await controller.bulkAssign(dto as any, 'admin-id');
    expect(service.bulkAssign).toHaveBeenCalledWith(dto, 'admin-id');
  });
});

describe('AssignmentsVolunteerController', () => {
  let controller: AssignmentsVolunteerController;
  let service: jest.Mocked<VolunteerAssignmentsService>;

  beforeEach(async () => {
    const mockService = {
      getVolunteerAssignments: jest.fn().mockResolvedValue({ success: true }),
      getVolunteerAssignmentByCode: jest.fn().mockResolvedValue({ success: true }),
      acceptAssignment: jest.fn().mockResolvedValue({ success: true }),
      declineAssignment: jest.fn().mockResolvedValue({ success: true }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentsVolunteerController],
      providers: [{ provide: VolunteerAssignmentsService, useValue: mockService }],
    }).compile();

    controller = module.get(AssignmentsVolunteerController);
    service = module.get(VolunteerAssignmentsService);
  });

  it('should delegate findAll to service', async () => {
    await controller.findAll({} as any, 'vol-id');
    expect(service.getVolunteerAssignments).toHaveBeenCalledWith('vol-id', expect.anything());
  });

  it('should delegate findByCode to service', async () => {
    await controller.findByCode('RPF-ASN-000001', 'vol-id');
    expect(service.getVolunteerAssignmentByCode).toHaveBeenCalledWith('vol-id', 'RPF-ASN-000001');
  });

  it('should delegate accept to service', async () => {
    await controller.accept('RPF-ASN-000001', 'vol-id');
    expect(service.acceptAssignment).toHaveBeenCalledWith('vol-id', 'RPF-ASN-000001');
  });

  it('should delegate decline to service', async () => {
    await controller.decline('RPF-ASN-000001', 'vol-id');
    expect(service.declineAssignment).toHaveBeenCalledWith('vol-id', 'RPF-ASN-000001');
  });
});
