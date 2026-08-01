import { Test, TestingModule } from '@nestjs/testing';
import { EntityStatus, EventDepartment } from '@prisma/client';
import { BusinessException, EntityConflictException, EntityNotFoundException } from '../../../../common/exceptions';
import { EventDepartmentsService } from '../event-departments.service';
import { EventDepartmentsRepository } from '../event-departments.repository';

describe('EventDepartmentsService', () => {
  let service: EventDepartmentsService;
  let repository: jest.Mocked<EventDepartmentsRepository>;

  const adminId = 'admin-uuid-001';

  const mockDept: EventDepartment = {
    id: 'd1-uuid',
    departmentCode: 'RPF-DEP-000001',
    title: 'Operations',
    description: 'Handles event operations',
    color: '#FF5722',
    status: EntityStatus.ACTIVE,
    version: 1,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    deletedAt: null,
    createdBy: adminId,
    updatedBy: adminId,
    deletedBy: null,
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByTitle: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      hasRoles: jest.fn(),
      findMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventDepartmentsService,
        { provide: EventDepartmentsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(EventDepartmentsService);
    repository = module.get(EventDepartmentsRepository);
  });

  describe('createDepartment', () => {
    it('should create a department with generated code', async () => {
      repository.findByTitle.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockDept);

      const result = await service.createDepartment({ title: 'Operations' }, adminId);
      expect(result.success).toBe(true);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ departmentCode: 'RPF-DEP-000001' }),
      );
    });

    it('should reject duplicate title', async () => {
      repository.findByTitle.mockResolvedValue(mockDept);
      await expect(service.createDepartment({ title: 'Operations' }, adminId)).rejects.toThrow(EntityConflictException);
    });
  });

  describe('updateDepartment', () => {
    it('should update department fields', async () => {
      repository.findById.mockResolvedValue(mockDept);
      repository.update.mockResolvedValue({ ...mockDept, title: 'Updated Ops' });

      const result = await service.updateDepartment('d1-uuid', { title: 'Updated Ops' }, adminId);
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateDepartment('bad-id', { title: 'X' }, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject duplicate title on update', async () => {
      repository.findById.mockResolvedValue(mockDept);
      repository.findByTitle.mockResolvedValue({ ...mockDept, id: 'other-id' });
      await expect(service.updateDepartment('d1-uuid', { title: 'Duplicate' }, adminId)).rejects.toThrow(EntityConflictException);
    });
  });

  describe('deleteDepartment', () => {
    it('should soft delete department', async () => {
      repository.findById.mockResolvedValue(mockDept);
      repository.hasRoles.mockResolvedValue(false);
      repository.update.mockResolvedValue({ ...mockDept, deletedAt: new Date() });

      const result = await service.deleteDepartment('d1-uuid', adminId);
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteDepartment('bad-id', adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should prevent deletion when roles exist', async () => {
      repository.findById.mockResolvedValue(mockDept);
      repository.hasRoles.mockResolvedValue(true);
      await expect(service.deleteDepartment('d1-uuid', adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('getDepartments', () => {
    it('should return paginated departments', async () => {
      repository.findMany.mockResolvedValue({ data: [mockDept], total: 1 });
      const result = await service.getDepartments({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });
  });

  describe('getDepartmentById', () => {
    it('should return department', async () => {
      repository.findById.mockResolvedValue(mockDept);
      const result = await service.getDepartmentById('d1-uuid');
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.getDepartmentById('bad-id')).rejects.toThrow(EntityNotFoundException);
    });
  });
});
