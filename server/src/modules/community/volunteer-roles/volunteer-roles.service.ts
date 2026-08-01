import { Injectable, Logger } from '@nestjs/common';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateRoleDto, RoleQueryDto, RoleResponseDto, UpdateRoleDto } from './dto';
import { VolunteerRolesRepository } from './volunteer-roles.repository';

@Injectable()
export class VolunteerRolesService {
  private readonly logger = new Logger(VolunteerRolesService.name);

  constructor(private readonly repository: VolunteerRolesRepository) {}

  async createRole(dto: CreateRoleDto, adminId: string) {
    const deptExists = await this.repository.departmentExists(dto.departmentId);
    if (!deptExists) throw new EntityNotFoundException('EventDepartment', dto.departmentId);

    const existing = await this.repository.findByTitle(dto.title);
    if (existing) throw new EntityConflictException('VolunteerRole', 'title');

    if (dto.minVolunteers !== undefined && dto.maxVolunteers !== undefined && dto.minVolunteers > dto.maxVolunteers) {
      throw new BusinessException('minVolunteers cannot exceed maxVolunteers');
    }

    const roleCode = await this.generateCode();

    const role = await this.repository.create({
      roleCode,
      departmentId: dto.departmentId,
      title: dto.title,
      description: dto.description ?? null,
      requiredSkills: dto.requiredSkills ?? [],
      minVolunteers: dto.minVolunteers ?? 1,
      maxVolunteers: dto.maxVolunteers ?? 10,
      priority: dto.priority ?? 0,
      color: dto.color ?? null,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Role created: ${role.roleCode} by admin ${adminId}`);
    return ApiResponseDto.success(RoleResponseDto.fromEntity(role), 'Role created successfully');
  }

  async updateRole(id: string, dto: UpdateRoleDto, adminId: string) {
    const role = await this.repository.findById(id);
    if (!role) throw new EntityNotFoundException('VolunteerRole', id);

    if (dto.departmentId !== undefined) {
      const deptExists = await this.repository.departmentExists(dto.departmentId);
      if (!deptExists) throw new EntityNotFoundException('EventDepartment', dto.departmentId);
    }

    if (dto.title !== undefined && dto.title !== role.title) {
      const dup = await this.repository.findByTitle(dto.title, id);
      if (dup) throw new EntityConflictException('VolunteerRole', 'title');
    }

    const minVol = dto.minVolunteers ?? role.minVolunteers;
    const maxVol = dto.maxVolunteers ?? role.maxVolunteers;
    if (minVol > maxVol) throw new BusinessException('minVolunteers cannot exceed maxVolunteers');

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };
    if (dto.title !== undefined) data.title = dto.title;
    if (dto.departmentId !== undefined) data.departmentId = dto.departmentId;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.requiredSkills !== undefined) data.requiredSkills = dto.requiredSkills;
    if (dto.minVolunteers !== undefined) data.minVolunteers = dto.minVolunteers;
    if (dto.maxVolunteers !== undefined) data.maxVolunteers = dto.maxVolunteers;
    if (dto.priority !== undefined) data.priority = dto.priority;
    if (dto.color !== undefined) data.color = dto.color;
    if (dto.status !== undefined) data.status = dto.status;

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(RoleResponseDto.fromEntity(updated), 'Role updated successfully');
  }

  async deleteRole(id: string, adminId: string) {
    const role = await this.repository.findById(id);
    if (!role) throw new EntityNotFoundException('VolunteerRole', id);

    await this.repository.update(id, { deletedAt: new Date(), deletedBy: adminId });
    this.logger.log(`Role ${role.roleCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Role deleted successfully');
  }

  async getRoles(query: RoleQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
      departmentId: query.departmentId,
    });
    const items = data.map((r) => RoleResponseDto.fromEntity(r));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Roles retrieved');
  }

  async getRoleById(id: string) {
    const role = await this.repository.findById(id);
    if (!role) throw new EntityNotFoundException('VolunteerRole', id);
    return ApiResponseDto.success(RoleResponseDto.fromEntity(role), 'Role retrieved');
  }

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-ROL-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
