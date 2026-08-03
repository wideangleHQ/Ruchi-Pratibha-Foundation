import { Test, TestingModule } from '@nestjs/testing';
import { EventSchedule, ScheduleStatus } from '@prisma/client';
import { EntityNotFoundException, BusinessException } from '../../../../common/exceptions';
import { EventSchedulesService } from '../event-schedules.service';
import { EventSchedulesRepository } from '../event-schedules.repository';

describe('EventSchedulesService', () => {
  let service: EventSchedulesService;
  let repository: jest.Mocked<EventSchedulesRepository>;

  const mockSchedule: EventSchedule = {
    id: 'sch-uuid-001',
    scheduleCode: 'RPF-SCH-000001',
    editionId: 'edition-uuid-001',
    sessionId: 'ses-uuid-001',
    speakerId: 'spk-uuid-001',
    venueId: 'venue-uuid-001',
    title: 'Registration & Welcome',
    description: 'Guest registration and welcome address.',
    startTime: new Date('2026-03-15T08:00:00Z'),
    endTime: new Date('2026-03-15T09:00:00Z'),
    displayOrder: 0,
    scheduleStatus: ScheduleStatus.DRAFT,
    version: 1,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    deletedAt: null,
    createdBy: 'admin-uuid-001',
    updatedBy: 'admin-uuid-001',
  };

  const adminId = 'admin-uuid-001';

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findByEditionPublic: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventSchedulesService,
        { provide: EventSchedulesRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(EventSchedulesService);
    repository = module.get(EventSchedulesRepository);
  });

  describe('createSchedule', () => {
    it('should create a schedule with generated code', async () => {
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockSchedule);

      const result = await service.createSchedule({
        editionId: 'edition-uuid-001',
        title: 'Registration & Welcome',
        startTime: '2026-03-15T08:00:00Z',
        endTime: '2026-03-15T09:00:00Z',
        sessionId: 'ses-uuid-001',
        speakerId: 'spk-uuid-001',
        venueId: 'venue-uuid-001',
      }, adminId);

      expect(result.success).toBe(true);
      expect(result.data?.title).toBe('Registration & Welcome');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          scheduleCode: 'RPF-SCH-000001',
          editionId: 'edition-uuid-001',
        }),
      );
    });

    it('should reject when endTime is before startTime', async () => {
      await expect(service.createSchedule({
        editionId: 'edition-uuid-001',
        title: 'Bad Schedule',
        startTime: '2026-03-15T10:00:00Z',
        endTime: '2026-03-15T08:00:00Z',
      }, adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('updateSchedule', () => {
    it('should update schedule fields', async () => {
      const updated = { ...mockSchedule, title: 'Updated Title' };
      repository.findById.mockResolvedValue(mockSchedule);
      repository.update.mockResolvedValue(updated);

      const result = await service.updateSchedule(mockSchedule.id, { title: 'Updated Title' }, adminId);
      expect(result.success).toBe(true);
      expect(result.data?.title).toBe('Updated Title');
    });

    it('should validate status transitions', async () => {
      repository.findById.mockResolvedValue(mockSchedule);
      repository.update.mockResolvedValue({ ...mockSchedule, scheduleStatus: ScheduleStatus.PUBLISHED });

      const result = await service.updateSchedule(mockSchedule.id, { scheduleStatus: ScheduleStatus.PUBLISHED }, adminId);
      expect(result.success).toBe(true);
    });

    it('should reject invalid status transition from PUBLISHED to DRAFT', async () => {
      repository.findById.mockResolvedValue({ ...mockSchedule, scheduleStatus: ScheduleStatus.PUBLISHED });
      await expect(
        service.updateSchedule(mockSchedule.id, { scheduleStatus: ScheduleStatus.DRAFT }, adminId),
      ).rejects.toThrow(BusinessException);
    });

    it('should throw EntityNotFoundException for non-existent schedule', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateSchedule('nonexistent', { title: 'X' }, adminId))
        .rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('deleteSchedule', () => {
    it('should soft-delete a schedule', async () => {
      repository.findById.mockResolvedValue(mockSchedule);
      repository.update.mockResolvedValue({ ...mockSchedule, deletedAt: new Date() });

      const result = await service.deleteSchedule(mockSchedule.id, adminId);
      expect(result.success).toBe(true);
    });

    it('should throw for non-existent schedule', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteSchedule('nonexistent', adminId)).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('getAdminSchedules', () => {
    it('should return paginated admin schedule list', async () => {
      repository.findMany.mockResolvedValue({ data: [mockSchedule], total: 1 });

      const result = await service.getAdminSchedules({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
      expect(result.meta?.totalItems).toBe(1);
    });
  });

  describe('getPublicSchedulesByEdition', () => {
    it('should return paginated public schedules for edition', async () => {
      repository.findByEditionPublic.mockResolvedValue({ data: [{ ...mockSchedule, scheduleStatus: ScheduleStatus.PUBLISHED }], total: 1 });

      const result = await service.getPublicSchedulesByEdition('edition-uuid-001', { page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'displayOrder', sortOrder: 'asc' } as any);
      expect(result.success).toBe(true);
    });
  });
});
