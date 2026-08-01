import { Injectable, Logger } from '@nestjs/common';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateShiftDto, ShiftQueryDto, ShiftResponseDto, UpdateShiftDto } from './dto';
import { EventShiftsRepository } from './event-shifts.repository';

@Injectable()
export class EventShiftsService {
  private readonly logger = new Logger(EventShiftsService.name);

  constructor(private readonly repository: EventShiftsRepository) {}

  async createShift(editionId: string, dto: CreateShiftDto, adminId: string) {
    const editionExists = await this.repository.editionExists(editionId);
    if (!editionExists) throw new EntityNotFoundException('EventEdition', editionId);

    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);
    this.validateTimes(startTime, endTime);

    const overlap = await this.repository.findOverlapping(editionId, startTime, endTime);
    if (overlap) {
      throw new BusinessException(
        `Shift overlaps with existing shift "${overlap.name}" (${overlap.shiftCode})`,
      );
    }

    const shiftCode = await this.generateShiftCode();

    const shift = await this.repository.create({
      shiftCode,
      editionId,
      name: dto.name,
      description: dto.description ?? null,
      startTime,
      endTime,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Shift created: ${shift.shiftCode} for edition ${editionId} by admin ${adminId}`);
    return ApiResponseDto.success(ShiftResponseDto.fromEntity(shift), 'Shift created successfully');
  }

  async updateShift(id: string, dto: UpdateShiftDto, adminId: string) {
    const shift = await this.repository.findById(id);
    if (!shift) throw new EntityNotFoundException('EventShift', id);

    const startTime = dto.startTime ? new Date(dto.startTime) : shift.startTime;
    const endTime = dto.endTime ? new Date(dto.endTime) : shift.endTime;

    if (dto.startTime || dto.endTime) {
      this.validateTimes(startTime, endTime);

      const overlap = await this.repository.findOverlapping(
        shift.editionId,
        startTime,
        endTime,
        id,
      );
      if (overlap) {
        throw new BusinessException(
          `Shift overlaps with existing shift "${overlap.name}" (${overlap.shiftCode})`,
        );
      }
    }

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.startTime) data.startTime = startTime;
    if (dto.endTime) data.endTime = endTime;
    if (dto.status !== undefined) data.status = dto.status;

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(ShiftResponseDto.fromEntity(updated), 'Shift updated successfully');
  }

  async deleteShift(id: string, adminId: string) {
    const shift = await this.repository.findById(id);
    if (!shift) throw new EntityNotFoundException('EventShift', id);

    await this.repository.update(id, { deletedAt: new Date(), deletedBy: adminId });
    this.logger.log(`Shift ${shift.shiftCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Shift deleted successfully');
  }

  async getShiftsByEdition(editionId: string, query: ShiftQueryDto) {
    const editionExists = await this.repository.editionExists(editionId);
    if (!editionExists) throw new EntityNotFoundException('EventEdition', editionId);

    const { data, total } = await this.repository.findMany({
      editionId,
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
    });
    const items = data.map((s) => ShiftResponseDto.fromEntity(s));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Shifts retrieved');
  }

  async getShiftById(id: string) {
    const shift = await this.repository.findById(id);
    if (!shift) throw new EntityNotFoundException('EventShift', id);
    return ApiResponseDto.success(ShiftResponseDto.fromEntity(shift), 'Shift retrieved');
  }

  private validateTimes(startTime: Date, endTime: Date): void {
    if (endTime <= startTime) {
      throw new BusinessException('Shift end time must be after start time');
    }
  }

  private async generateShiftCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-SHF-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
