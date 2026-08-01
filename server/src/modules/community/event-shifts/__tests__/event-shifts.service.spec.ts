import { Test, TestingModule } from '@nestjs/testing';
import { EventShift, ShiftStatus } from '@prisma/client';
import { BusinessException, EntityNotFoundException } from '../../../../common/exceptions';
import { EventShiftsService } from '../event-shifts.service';
import { EventShiftsRepository } from '../event-shifts.repository';

describe('EventShiftsService', () => {
  let service: EventShiftsService;
  let repository: jest.Mocked<EventShiftsRepository>;

  const adminId = 'admin-uuid-001';
  const editionId = 'edition-uuid-001';

  const mockShift: EventShift = {
    id: 's1-uuid',
    shiftCode: 'RPF-SHF-000001',
    editionId,
    name: 'Morning Shift',
    description: '6 AM to 12 PM shift',
    startTime: new Date('2026-10-01T06:00:00Z'),
    endTime: new Date('2026-10-01T12:00:00Z'),
    status: ShiftStatus.ACTIVE,
    version: 1,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    deletedAt: null,
    createdBy: adminId,
    updatedBy: adminId,
    deletedBy: null,
  };

  const overlappingShift: EventShift = {
    ...mockShift,
    id: 's2-uuid',
    shiftCode: 'RPF-SHF-000002',
    name: 'Overlap Shift',
    startTime: new Date('2026-10-01T10:00:00Z'),
    endTime: new Date('2026-10-01T14:00:00Z'),
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      editionExists: jest.fn(),
      findOverlapping: jest.fn(),
      findMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventShiftsService,
        { provide: EventShiftsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(EventShiftsService);
    repository = module.get(EventShiftsRepository);
  });

  describe('createShift', () => {
    it('should create a shift with generated code', async () => {
      repository.editionExists.mockResolvedValue(true);
      repository.findOverlapping.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockShift);

      const result = await service.createShift(editionId, {
        name: 'Morning Shift',
        startTime: '2026-10-01T06:00:00Z',
        endTime: '2026-10-01T12:00:00Z',
      }, adminId);

      expect(result.success).toBe(true);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ shiftCode: 'RPF-SHF-000001' }),
      );
    });

    it('should reject if edition not found', async () => {
      repository.editionExists.mockResolvedValue(false);
      await expect(
        service.createShift('bad-edition', { name: 'X', startTime: '2026-10-01T06:00:00Z', endTime: '2026-10-01T12:00:00Z' }, adminId),
      ).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject if endTime is before startTime', async () => {
      repository.editionExists.mockResolvedValue(true);
      await expect(
        service.createShift(editionId, { name: 'Bad', startTime: '2026-10-01T12:00:00Z', endTime: '2026-10-01T06:00:00Z' }, adminId),
      ).rejects.toThrow(BusinessException);
    });

    it('should reject if endTime equals startTime', async () => {
      repository.editionExists.mockResolvedValue(true);
      await expect(
        service.createShift(editionId, { name: 'Zero', startTime: '2026-10-01T06:00:00Z', endTime: '2026-10-01T06:00:00Z' }, adminId),
      ).rejects.toThrow(BusinessException);
    });

    it('should reject overlapping shifts within same edition', async () => {
      repository.editionExists.mockResolvedValue(true);
      repository.findOverlapping.mockResolvedValue(overlappingShift);

      await expect(
        service.createShift(editionId, { name: 'Clash', startTime: '2026-10-01T10:00:00Z', endTime: '2026-10-01T14:00:00Z' }, adminId),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('updateShift', () => {
    it('should update shift fields', async () => {
      repository.findById.mockResolvedValue(mockShift);
      repository.update.mockResolvedValue({ ...mockShift, name: 'Updated Shift' });

      const result = await service.updateShift('s1-uuid', { name: 'Updated Shift' }, adminId);
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateShift('bad-id', { name: 'X' }, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject overlapping times on update', async () => {
      repository.findById.mockResolvedValue(mockShift);
      repository.findOverlapping.mockResolvedValue(overlappingShift);

      await expect(
        service.updateShift('s1-uuid', { startTime: '2026-10-01T10:00:00Z', endTime: '2026-10-01T14:00:00Z' }, adminId),
      ).rejects.toThrow(BusinessException);
    });

    it('should reject endTime before startTime on update', async () => {
      repository.findById.mockResolvedValue(mockShift);

      await expect(
        service.updateShift('s1-uuid', { startTime: '2026-10-01T14:00:00Z', endTime: '2026-10-01T06:00:00Z' }, adminId),
      ).rejects.toThrow(BusinessException);
    });

    it('should update status', async () => {
      repository.findById.mockResolvedValue(mockShift);
      repository.update.mockResolvedValue({ ...mockShift, status: ShiftStatus.INACTIVE });

      const result = await service.updateShift('s1-uuid', { status: ShiftStatus.INACTIVE }, adminId);
      expect(result.success).toBe(true);
    });
  });

  describe('deleteShift', () => {
    it('should soft delete shift', async () => {
      repository.findById.mockResolvedValue(mockShift);
      repository.update.mockResolvedValue({ ...mockShift, deletedAt: new Date() });

      const result = await service.deleteShift('s1-uuid', adminId);
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteShift('bad-id', adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getShiftsByEdition', () => {
    it('should return paginated shifts', async () => {
      repository.editionExists.mockResolvedValue(true);
      repository.findMany.mockResolvedValue({ data: [mockShift], total: 1 });

      const result = await service.getShiftsByEdition(editionId, { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'startTime', sortOrder: 'asc' } as any);
      expect(result.success).toBe(true);
    });

    it('should throw if edition not found', async () => {
      repository.editionExists.mockResolvedValue(false);
      await expect(
        service.getShiftsByEdition('bad-edition', { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'startTime', sortOrder: 'asc' } as any),
      ).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getShiftById', () => {
    it('should return shift', async () => {
      repository.findById.mockResolvedValue(mockShift);
      const result = await service.getShiftById('s1-uuid');
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.getShiftById('bad-id')).rejects.toThrow(EntityNotFoundException);
    });
  });
});
