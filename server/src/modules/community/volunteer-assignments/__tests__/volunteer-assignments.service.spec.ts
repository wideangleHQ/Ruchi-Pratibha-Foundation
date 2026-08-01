import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentStatus, SelectionStatus, VolunteerAssignment } from '@prisma/client';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
  ForbiddenResourceException,
} from '../../../../common/exceptions';
import { VolunteerAssignmentsService } from '../volunteer-assignments.service';
import { VolunteerAssignmentsRepository } from '../volunteer-assignments.repository';

describe('VolunteerAssignmentsService', () => {
  let service: VolunteerAssignmentsService;
  let repository: jest.Mocked<VolunteerAssignmentsRepository>;

  const adminId = 'admin-uuid-001';
  const volunteerId = 'vol-uuid-001';
  const selectionId = 'sel-uuid-001';
  const editionId = 'ed-uuid-001';

  const mockAssignment: VolunteerAssignment = {
    id: 'asn-uuid-001',
    assignmentCode: 'RPF-ASN-000001',
    selectionId,
    volunteerId,
    editionId,
    departmentId: 'dept-uuid-001',
    roleId: 'role-uuid-001',
    shiftId: 'shift-uuid-001',
    venueId: 'venue-uuid-001',
    reportingManager: 'John Doe',
    reportingInstructions: 'Report at gate 3',
    reportingTime: new Date('2026-10-01T08:00:00Z'),
    assignmentStatus: AssignmentStatus.ASSIGNED,
    version: 1,
    createdAt: new Date('2026-09-15'),
    updatedAt: new Date('2026-09-15'),
    createdBy: adminId,
    updatedBy: adminId,
  };

  const validDto = {
    selectionId,
    departmentId: 'dept-uuid-001',
    roleId: 'role-uuid-001',
    shiftId: 'shift-uuid-001',
    venueId: 'venue-uuid-001',
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCode: jest.fn(),
      findBySelectionId: jest.fn(),
      findActiveByVolunteerAndEdition: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      selectionExists: jest.fn(),
      departmentExists: jest.fn(),
      roleExists: jest.fn(),
      shiftExists: jest.fn(),
      venueExists: jest.fn(),
      findManyForAdmin: jest.fn(),
      findManyByVolunteer: jest.fn(),
      findSelectedSelections: jest.fn(),
      findExistingAssignmentsForSelections: jest.fn(),
      createMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerAssignmentsService,
        { provide: VolunteerAssignmentsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(VolunteerAssignmentsService);
    repository = module.get(VolunteerAssignmentsRepository);
  });

  describe('createAssignment', () => {
    it('should create assignment for selected volunteer', async () => {
      repository.selectionExists.mockResolvedValue({
        exists: true, selectionStatus: SelectionStatus.SELECTED, volunteerId, editionId,
      });
      repository.findBySelectionId.mockResolvedValue(null);
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(null);
      repository.departmentExists.mockResolvedValue(true);
      repository.roleExists.mockResolvedValue(true);
      repository.shiftExists.mockResolvedValue(true);
      repository.venueExists.mockResolvedValue(true);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockAssignment);

      const result = await service.createAssignment(validDto, adminId);
      expect(result.success).toBe(true);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ assignmentCode: 'RPF-ASN-000001', assignmentStatus: AssignmentStatus.ASSIGNED }),
      );
    });

    it('should reject if selection not found', async () => {
      repository.selectionExists.mockResolvedValue({ exists: false });
      await expect(service.createAssignment(validDto, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject if selection is not SELECTED', async () => {
      repository.selectionExists.mockResolvedValue({
        exists: true, selectionStatus: SelectionStatus.SHORTLISTED, volunteerId, editionId,
      });
      await expect(service.createAssignment(validDto, adminId)).rejects.toThrow(BusinessException);
    });

    it('should reject duplicate assignment for same selection', async () => {
      repository.selectionExists.mockResolvedValue({
        exists: true, selectionStatus: SelectionStatus.SELECTED, volunteerId, editionId,
      });
      repository.findBySelectionId.mockResolvedValue(mockAssignment);
      await expect(service.createAssignment(validDto, adminId)).rejects.toThrow(EntityConflictException);
    });

    it('should reject if volunteer already has active assignment for edition', async () => {
      repository.selectionExists.mockResolvedValue({
        exists: true, selectionStatus: SelectionStatus.SELECTED, volunteerId, editionId,
      });
      repository.findBySelectionId.mockResolvedValue(null);
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(mockAssignment);
      await expect(service.createAssignment(validDto, adminId)).rejects.toThrow(EntityConflictException);
    });

    it('should reject if department not found', async () => {
      repository.selectionExists.mockResolvedValue({
        exists: true, selectionStatus: SelectionStatus.SELECTED, volunteerId, editionId,
      });
      repository.findBySelectionId.mockResolvedValue(null);
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(null);
      repository.departmentExists.mockResolvedValue(false);
      repository.roleExists.mockResolvedValue(true);
      repository.shiftExists.mockResolvedValue(true);
      repository.venueExists.mockResolvedValue(true);
      await expect(service.createAssignment(validDto, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject if role not found', async () => {
      repository.selectionExists.mockResolvedValue({
        exists: true, selectionStatus: SelectionStatus.SELECTED, volunteerId, editionId,
      });
      repository.findBySelectionId.mockResolvedValue(null);
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(null);
      repository.departmentExists.mockResolvedValue(true);
      repository.roleExists.mockResolvedValue(false);
      repository.shiftExists.mockResolvedValue(true);
      repository.venueExists.mockResolvedValue(true);
      await expect(service.createAssignment(validDto, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject if shift not found', async () => {
      repository.selectionExists.mockResolvedValue({
        exists: true, selectionStatus: SelectionStatus.SELECTED, volunteerId, editionId,
      });
      repository.findBySelectionId.mockResolvedValue(null);
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(null);
      repository.departmentExists.mockResolvedValue(true);
      repository.roleExists.mockResolvedValue(true);
      repository.shiftExists.mockResolvedValue(false);
      repository.venueExists.mockResolvedValue(true);
      await expect(service.createAssignment(validDto, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject if venue not found', async () => {
      repository.selectionExists.mockResolvedValue({
        exists: true, selectionStatus: SelectionStatus.SELECTED, volunteerId, editionId,
      });
      repository.findBySelectionId.mockResolvedValue(null);
      repository.findActiveByVolunteerAndEdition.mockResolvedValue(null);
      repository.departmentExists.mockResolvedValue(true);
      repository.roleExists.mockResolvedValue(true);
      repository.shiftExists.mockResolvedValue(true);
      repository.venueExists.mockResolvedValue(false);
      await expect(service.createAssignment(validDto, adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('updateAssignment', () => {
    it('should update assignment details', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      repository.update.mockResolvedValue({ ...mockAssignment, reportingManager: 'Jane Doe' });

      const result = await service.updateAssignment('RPF-ASN-000001', { reportingManager: 'Jane Doe' }, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject updating cancelled assignment', async () => {
      repository.findByCode.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.CANCELLED });
      await expect(service.updateAssignment('RPF-ASN-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });

    it('should reject updating declined assignment', async () => {
      repository.findByCode.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.DECLINED });
      await expect(service.updateAssignment('RPF-ASN-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('reassign', () => {
    it('should reassign an assigned volunteer', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      repository.departmentExists.mockResolvedValue(true);
      repository.update.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.REASSIGNED });

      const result = await service.reassign('RPF-ASN-000001', { departmentId: 'dept-002' }, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject reassigning a cancelled assignment', async () => {
      repository.findByCode.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.CANCELLED });
      await expect(service.reassign('RPF-ASN-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });

    it('should reject reassigning a declined assignment', async () => {
      repository.findByCode.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.DECLINED });
      await expect(service.reassign('RPF-ASN-000001', {}, adminId)).rejects.toThrow(BusinessException);
    });

    it('should reject if new department not found', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      repository.departmentExists.mockResolvedValue(false);
      await expect(service.reassign('RPF-ASN-000001', { departmentId: 'bad-dept' }, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should throw not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.reassign('BAD', {}, adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('cancelAssignment', () => {
    it('should cancel an assigned assignment', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      repository.update.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.CANCELLED });

      const result = await service.cancelAssignment('RPF-ASN-000001', adminId);
      expect(result.success).toBe(true);
    });

    it('should reject cancelling a declined assignment', async () => {
      repository.findByCode.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.DECLINED });
      await expect(service.cancelAssignment('RPF-ASN-000001', adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('acceptAssignment', () => {
    it('should accept assignment by volunteer', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      repository.update.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.CONFIRMED });

      const result = await service.acceptAssignment(volunteerId, 'RPF-ASN-000001');
      expect(result.success).toBe(true);
    });

    it('should reject access by different volunteer (IDOR)', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      await expect(service.acceptAssignment('other-vol', 'RPF-ASN-000001')).rejects.toThrow(ForbiddenResourceException);
    });

    it('should reject accepting a cancelled assignment', async () => {
      repository.findByCode.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.CANCELLED });
      await expect(service.acceptAssignment(volunteerId, 'RPF-ASN-000001')).rejects.toThrow(BusinessException);
    });

    it('should reject accepting already confirmed', async () => {
      repository.findByCode.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.CONFIRMED });
      await expect(service.acceptAssignment(volunteerId, 'RPF-ASN-000001')).rejects.toThrow(BusinessException);
    });
  });

  describe('declineAssignment', () => {
    it('should decline assignment by volunteer', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      repository.update.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.DECLINED });

      const result = await service.declineAssignment(volunteerId, 'RPF-ASN-000001');
      expect(result.success).toBe(true);
    });

    it('should reject access by different volunteer (IDOR)', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      await expect(service.declineAssignment('other-vol', 'RPF-ASN-000001')).rejects.toThrow(ForbiddenResourceException);
    });

    it('should reject declining a cancelled assignment', async () => {
      repository.findByCode.mockResolvedValue({ ...mockAssignment, assignmentStatus: AssignmentStatus.CANCELLED });
      await expect(service.declineAssignment(volunteerId, 'RPF-ASN-000001')).rejects.toThrow(BusinessException);
    });
  });

  describe('bulkAssign', () => {
    it('should bulk assign selected volunteers', async () => {
      repository.departmentExists.mockResolvedValue(true);
      repository.roleExists.mockResolvedValue(true);
      repository.shiftExists.mockResolvedValue(true);
      repository.venueExists.mockResolvedValue(true);
      repository.findSelectedSelections.mockResolvedValue([
        { id: 'sel-1', selectionStatus: SelectionStatus.SELECTED, volunteerId: 'vol-1', editionId: 'ed-1' },
        { id: 'sel-2', selectionStatus: SelectionStatus.SELECTED, volunteerId: 'vol-2', editionId: 'ed-1' },
      ]);
      repository.findExistingAssignmentsForSelections.mockResolvedValue([]);
      repository.countAll.mockResolvedValue(0);
      repository.createMany.mockResolvedValue(2);

      const result = await service.bulkAssign({
        selectionIds: ['sel-1', 'sel-2'],
        departmentId: 'dept-001',
        roleId: 'role-001',
        shiftId: 'shift-001',
        venueId: 'venue-001',
      }, adminId);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ created: 2 });
    });

    it('should reject if some selections are not SELECTED', async () => {
      repository.departmentExists.mockResolvedValue(true);
      repository.roleExists.mockResolvedValue(true);
      repository.shiftExists.mockResolvedValue(true);
      repository.venueExists.mockResolvedValue(true);
      repository.findSelectedSelections.mockResolvedValue([
        { id: 'sel-1', selectionStatus: SelectionStatus.SHORTLISTED, volunteerId: 'vol-1', editionId: 'ed-1' },
      ]);

      await expect(service.bulkAssign({
        selectionIds: ['sel-1'],
        departmentId: 'dept-001',
        roleId: 'role-001',
        shiftId: 'shift-001',
        venueId: 'venue-001',
      }, adminId)).rejects.toThrow(BusinessException);
    });

    it('should reject if some selections already have assignments', async () => {
      repository.departmentExists.mockResolvedValue(true);
      repository.roleExists.mockResolvedValue(true);
      repository.shiftExists.mockResolvedValue(true);
      repository.venueExists.mockResolvedValue(true);
      repository.findSelectedSelections.mockResolvedValue([
        { id: 'sel-1', selectionStatus: SelectionStatus.SELECTED, volunteerId: 'vol-1', editionId: 'ed-1' },
      ]);
      repository.findExistingAssignmentsForSelections.mockResolvedValue(['sel-1']);

      await expect(service.bulkAssign({
        selectionIds: ['sel-1'],
        departmentId: 'dept-001',
        roleId: 'role-001',
        shiftId: 'shift-001',
        venueId: 'venue-001',
      }, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('getAdminAssignments', () => {
    it('should return paginated assignments', async () => {
      repository.findManyForAdmin.mockResolvedValue({ data: [mockAssignment], total: 1 });
      const result = await service.getAdminAssignments({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });
  });

  describe('getVolunteerAssignments', () => {
    it('should return volunteer own assignments', async () => {
      repository.findManyByVolunteer.mockResolvedValue({ data: [mockAssignment], total: 1 });
      const result = await service.getVolunteerAssignments(volunteerId, { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });
  });

  describe('getVolunteerAssignmentByCode', () => {
    it('should return assignment owned by volunteer', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      const result = await service.getVolunteerAssignmentByCode(volunteerId, 'RPF-ASN-000001');
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findByCode.mockResolvedValue(null);
      await expect(service.getVolunteerAssignmentByCode(volunteerId, 'BAD')).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject access by different volunteer (IDOR)', async () => {
      repository.findByCode.mockResolvedValue(mockAssignment);
      await expect(service.getVolunteerAssignmentByCode('other-vol', 'RPF-ASN-000001')).rejects.toThrow(ForbiddenResourceException);
    });
  });
});
