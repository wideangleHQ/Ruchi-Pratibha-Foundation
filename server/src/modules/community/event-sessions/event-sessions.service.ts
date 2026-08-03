import { Injectable, Logger } from '@nestjs/common';
import { SessionStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateSessionDto, SessionQueryDto, SessionResponseDto, UpdateSessionDto } from './dto';
import { EventSessionsRepository } from './event-sessions.repository';

const VALID_STATUS_TRANSITIONS: Record<SessionStatus, SessionStatus[]> = {
  [SessionStatus.DRAFT]: [SessionStatus.CONFIRMED, SessionStatus.CANCELLED],
  [SessionStatus.CONFIRMED]: [SessionStatus.COMPLETED, SessionStatus.CANCELLED],
  [SessionStatus.COMPLETED]: [],
  [SessionStatus.CANCELLED]: [SessionStatus.DRAFT],
};

@Injectable()
export class EventSessionsService {
  private readonly logger = new Logger(EventSessionsService.name);

  constructor(private readonly repository: EventSessionsRepository) {}

  async createSession(dto: CreateSessionDto, adminId: string) {
    const slug = await this.generateUniqueSlug(dto.editionId, dto.title);
    const sessionCode = await this.generateSessionCode();

    const session = await this.repository.create({
      sessionCode,
      editionId: dto.editionId,
      title: dto.title,
      slug,
      description: dto.description ?? null,
      sessionType: dto.sessionType ?? null,
      speakerId: dto.speakerId ?? null,
      venueId: dto.venueId ?? null,
      startTime: dto.startTime ? new Date(dto.startTime) : null,
      endTime: dto.endTime ? new Date(dto.endTime) : null,
      capacity: dto.capacity ?? null,
      sortOrder: dto.sortOrder ?? 0,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Session created: ${session.sessionCode} by admin ${adminId}`);
    return ApiResponseDto.success(SessionResponseDto.fromEntity(session), 'Session created successfully');
  }

  async updateSession(id: string, dto: UpdateSessionDto, adminId: string) {
    const session = await this.repository.findById(id);
    if (!session) throw new EntityNotFoundException('EventSession', id);

    if (dto.sessionStatus && dto.sessionStatus !== session.sessionStatus) {
      const allowed = VALID_STATUS_TRANSITIONS[session.sessionStatus];
      if (!allowed.includes(dto.sessionStatus)) {
        throw new BusinessException(
          `Cannot transition session from ${session.sessionStatus} to ${dto.sessionStatus}`,
        );
      }
    }

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };

    if (dto.title !== undefined) {
      data.title = dto.title;
      if (dto.title !== session.title) {
        data.slug = await this.generateUniqueSlug(session.editionId, dto.title, id);
      }
    }
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.sessionType !== undefined) data.sessionType = dto.sessionType;
    if (dto.speakerId !== undefined) data.speakerId = dto.speakerId;
    if (dto.venueId !== undefined) data.venueId = dto.venueId;
    if (dto.startTime !== undefined) data.startTime = new Date(dto.startTime);
    if (dto.endTime !== undefined) data.endTime = new Date(dto.endTime);
    if (dto.capacity !== undefined) data.capacity = dto.capacity;
    if (dto.sessionStatus !== undefined) data.sessionStatus = dto.sessionStatus;
    if (dto.sortOrder !== undefined) data.sortOrder = dto.sortOrder;

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(SessionResponseDto.fromEntity(updated), 'Session updated successfully');
  }

  async deleteSession(id: string, adminId: string) {
    const session = await this.repository.findById(id);
    if (!session) throw new EntityNotFoundException('EventSession', id);

    await this.repository.update(id, { deletedAt: new Date(), updatedBy: adminId });
    this.logger.log(`Session ${session.sessionCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Session deleted successfully');
  }

  async getAdminSessions(query: SessionQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      editionId: query.editionId,
      status: query.status,
    });

    const items = data.map((s) => SessionResponseDto.fromEntity(s));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Sessions retrieved');
  }

  async getAdminSessionById(id: string) {
    const session = await this.repository.findById(id);
    if (!session) throw new EntityNotFoundException('EventSession', id);
    return ApiResponseDto.success(SessionResponseDto.fromEntity(session), 'Session retrieved');
  }

  async getPublicSessionsByEdition(editionId: string, query: SessionQueryDto) {
    const { data, total } = await this.repository.findByEditionPublic({
      editionId,
      skip: query.skip,
      take: query.take,
    });

    const items = data.map((s) => SessionResponseDto.fromEntity(s));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Sessions retrieved');
  }

  private async generateUniqueSlug(editionId: string, title: string, excludeId?: string): Promise<string> {
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 100);

    if (!(await this.repository.slugExists(editionId, slug, excludeId))) return slug;

    let counter = 1;
    while (await this.repository.slugExists(editionId, `${slug}-${counter}`, excludeId)) counter++;
    return `${slug}-${counter}`;
  }

  private async generateSessionCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-SES-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
