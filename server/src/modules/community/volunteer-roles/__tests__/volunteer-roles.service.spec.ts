import { Test, TestingModule } from '@nestjs/testing';
import { EntityStatus, VolunteerRole } from '@prisma/client';
import { BusinessException, EntityConflictException, EntityNotFoundException } from '../../../../common/exceptions';
import { VolunteerRolesService } from '../volunteer-roles.service';
import { VolunteerRolesRepository } from '../volunteer-roles.repository';

describe('VolunteerRolesService', () => {
  let service: VolunteerRolesService;
  let repository: jest.Mocked<VolunteerRolesRepository>;

  const adminId = 'admin-uuid-001';
  const deptId = 'dept-uuid-001';

  const mockRole: VolunteerRole = {
    id: 'r1-uuid',
    roleCode: 'RPF-ROL-000001',
    departmentId: deptId,
    title: 'Registration Desk',
    description: 'Manages attendee registration',
    requiredSkills: ['communication', 'computer literacy'],
    minVolunteers: 2,
    maxVolunteers: 5,
    priority: 1,
    color: '#4CAF50',
    iconAssetKey: null,
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
      departmentExists: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteerRolesService,
        { provide: VolunteerRolesRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(VolunteerRolesService);
    repository = module.get(VolunteerRolesRepository);
  });

  describe('createRole', () => {
    it('should create a role with generated code', async () => {
      repository.departmentExists.mockResolvedValue(true);
      repository.findByTitle.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockRole);

      const result = await service.createRole({
        title: 'Registration Desk',
        departmentId: deptId,
      }, adminId);

      expect(result.success).toBe(true);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ roleCode: 'RPF-ROL-000001' }),
      );
    });

    it('should reject if department not found', async () => {
      repository.departmentExists.mockResolvedValue(false);
      await expect(
        service.createRole({ title: 'X', departmentId: 'bad-dept' }, adminId),
      ).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject duplicate title', async () => {
      repository.departmentExists.mockResolvedValue(true);
      repository.findByTitle.mockResolvedValue(mockRole);
      await expect(
        service.createRole({ title: 'Registration Desk', departmentId: deptId }, adminId),
      ).rejects.toThrow(EntityConflictException);
    });

    it('should reject minVolunteers > maxVolunteers', async () => {
      repository.departmentExists.mockResolvedValue(true);
      repository.findByTitle.mockResolvedValue(null);
      await expect(
        service.createRole({ title: 'Test', departmentId: deptId, minVolunteers: 10, maxVolunteers: 2 }, adminId),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('updateRole', () => {
    it('should update role fields', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.update.mockResolvedValue({ ...mockRole, title: 'Updated' });

      const result = await service.updateRole('r1-uuid', { title: 'Updated' }, adminId);
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateRole('bad-id', { title: 'X' }, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject duplicate title on update', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.findByTitle.mockResolvedValue({ ...mockRole, id: 'other-id' });
      await expect(service.updateRole('r1-uuid', { title: 'Duplicate' }, adminId)).rejects.toThrow(EntityConflictException);
    });

    it('should reject if new department not found', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.departmentExists.mockResolvedValue(false);
      await expect(
        service.updateRole('r1-uuid', { departmentId: 'bad-dept' }, adminId),
      ).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject minVolunteers > maxVolunteers on update', async () => {
      repository.findById.mockResolvedValue(mockRole);
      await expect(
        service.updateRole('r1-uuid', { minVolunteers: 20 }, adminId),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('deleteRole', () => {
    it('should soft delete role', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.update.mockResolvedValue({ ...mockRole, deletedAt: new Date() });

      const result = await service.deleteRole('r1-uuid', adminId);
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteRole('bad-id', adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getRoles', () => {
    it('should return paginated roles', async () => {
      repository.findMany.mockResolvedValue({ data: [mockRole], total: 1 });
      const result = await service.getRoles({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });
  });

  describe('getRoleById', () => {
    it('should return role', async () => {
      repository.findById.mockResolvedValue(mockRole);
      const result = await service.getRoleById('r1-uuid');
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.getRoleById('bad-id')).rejects.toThrow(EntityNotFoundException);
    });
  });
});
