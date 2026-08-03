import { Injectable, Logger } from '@nestjs/common';
import { ScheduleStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateScheduleDto, ScheduleQueryDto, ScheduleResponseDto, UpdateScheduleDto } from './dto';
import { EventSchedulesRepository } from './event-schedules.repository';

const VALID_STATUS_TRANSITIONS: Record<ScheduleStatus, ScheduleStatus[]> = {
  [ScheduleStatus.DRAFT]: [ScheduleStatus.PUBLISHED, ScheduleStatus.CANCELLED],
  [ScheduleStatus.PUBLISHED]: [ScheduleStatus.CANCELLED],
  [ScheduleStatus.CANCELLED]: [ScheduleStatus.DRAFT],
};

@Injectable()
export class EventSchedulesService {
  private readonly logger = new Logger(EventSchedulesService.name);

  constructor(private readonly repository: EventSchedulesRepository) {}

  async createSchedule(dto: CreateScheduleDto, adminId: string) {
    const scheduleCode = await this.generateScheduleCode();

    if (new Date(dto.endTime) <= new Date(dto.startTime)) {
      throw new BusinessException('End time must be after start time');
    }

    const schedule = await this.repository.create({
      scheduleCode,
      editionId: dto.editionId,
      title: dto.title,
      description: dto.description ?? null,
      sessionId: dto.sessionId ?? null,
      speakerId: dto.speakerId ?? null,
      venueId: dto.venueId ?? null,
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      displayOrder: dto.displayOrder ?? 0,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Schedule created: ${schedule.scheduleCode} by admin ${adminId}`);
    return ApiResponseDto.success(ScheduleResponseDto.fromEntity(schedule), 'Schedule created successfully');
  }

  async updateSchedule(id: string, dto: UpdateScheduleDto, adminId: string) {
    const schedule = await this.repository.findById(id);
    if (!schedule) throw new EntityNotFoundException('EventSchedule', id);

    if (dto.scheduleStatus && dto.scheduleStatus !== schedule.scheduleStatus) {
      const allowed = VALID_STATUS_TRANSITIONS[schedule.scheduleStatus];
      if (!allowed.includes(dto.scheduleStatus)) {
        throw new BusinessException(
          `Cannot transition schedule from ${schedule.scheduleStatus} to ${dto.scheduleStatus}`,
        );
      }
    }

    if (dto.startTime && dto.endTime) {
      if (new Date(dto.endTime) <= new Date(dto.startTime)) {
        throw new BusinessException('End time must be after start time');
      }
    }

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };

    if (dto.title !== undefined) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.sessionId !== undefined) data.sessionId = dto.sessionId;
    if (dto.speakerId !== undefined) data.speakerId = dto.speakerId;
    if (dto.venueId !== undefined) data.venueId = dto.venueId;
    if (dto.startTime !== undefined) data.startTime = new Date(dto.startTime);
    if (dto.endTime !== undefined) data.endTime = new Date(dto.endTime);
    if (dto.displayOrder !== undefined) data.displayOrder = dto.displayOrder;
    if (dto.scheduleStatus !== undefined) data.scheduleStatus = dto.scheduleStatus;

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(ScheduleResponseDto.fromEntity(updated), 'Schedule updated successfully');
  }

  async deleteSchedule(id: string, adminId: string) {
    const schedule = await this.repository.findById(id);
    if (!schedule) throw new EntityNotFoundException('EventSchedule', id);

    await this.repository.update(id, { deletedAt: new Date(), updatedBy: adminId });
    this.logger.log(`Schedule ${schedule.scheduleCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Schedule deleted successfully');
  }

  async getAdminSchedules(query: ScheduleQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      editionId: query.editionId,
      status: query.status,
    });

    const items = data.map((s) => ScheduleResponseDto.fromEntity(s));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Schedules retrieved');
  }

  async getAdminScheduleById(id: string) {
    const schedule = await this.repository.findById(id);
    if (!schedule) throw new EntityNotFoundException('EventSchedule', id);
    return ApiResponseDto.success(ScheduleResponseDto.fromEntity(schedule), 'Schedule retrieved');
  }

  async getPublicSchedulesByEdition(editionId: string, query: ScheduleQueryDto) {
    const { data, total } = await this.repository.findByEditionPublic({
      editionId,
      skip: query.skip,
      take: query.take,
    });

    const items = data.map((s) => ScheduleResponseDto.fromEntity(s));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Schedules retrieved');
  }

  private async generateScheduleCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-SCH-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
