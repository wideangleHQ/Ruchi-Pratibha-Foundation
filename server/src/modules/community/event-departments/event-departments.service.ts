import { Injectable, Logger } from '@nestjs/common';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateDepartmentDto, DepartmentQueryDto, DepartmentResponseDto, UpdateDepartmentDto } from './dto';
import { EventDepartmentsRepository } from './event-departments.repository';

@Injectable()
export class EventDepartmentsService {
  private readonly logger = new Logger(EventDepartmentsService.name);

  constructor(private readonly repository: EventDepartmentsRepository) {}

  async createDepartment(dto: CreateDepartmentDto, adminId: string) {
    const existing = await this.repository.findByTitle(dto.title);
    if (existing) throw new EntityConflictException('EventDepartment', 'title');

    const departmentCode = await this.generateCode();

    const dept = await this.repository.create({
      departmentCode,
      title: dto.title,
      description: dto.description ?? null,
      color: dto.color ?? null,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Department created: ${dept.departmentCode} by admin ${adminId}`);
    return ApiResponseDto.success(DepartmentResponseDto.fromEntity(dept), 'Department created successfully');
  }

  async updateDepartment(id: string, dto: UpdateDepartmentDto, adminId: string) {
    const dept = await this.repository.findById(id);
    if (!dept) throw new EntityNotFoundException('EventDepartment', id);

    if (dto.title !== undefined && dto.title !== dept.title) {
      const dup = await this.repository.findByTitle(dto.title, id);
      if (dup) throw new EntityConflictException('EventDepartment', 'title');
    }

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.color !== undefined) data.color = dto.color;
    if (dto.status !== undefined) data.status = dto.status;

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(DepartmentResponseDto.fromEntity(updated), 'Department updated successfully');
  }

  async deleteDepartment(id: string, adminId: string) {
    const dept = await this.repository.findById(id);
    if (!dept) throw new EntityNotFoundException('EventDepartment', id);

    const hasRoles = await this.repository.hasRoles(id);
    if (hasRoles) throw new BusinessException('Cannot delete department while roles exist under it');

    await this.repository.update(id, { deletedAt: new Date(), deletedBy: adminId });
    this.logger.log(`Department ${dept.departmentCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Department deleted successfully');
  }

  async getDepartments(query: DepartmentQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
    });
    const items = data.map((d) => DepartmentResponseDto.fromEntity(d));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Departments retrieved');
  }

  async getDepartmentById(id: string) {
    const dept = await this.repository.findById(id);
    if (!dept) throw new EntityNotFoundException('EventDepartment', id);
    return ApiResponseDto.success(DepartmentResponseDto.fromEntity(dept), 'Department retrieved');
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-DEP-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
