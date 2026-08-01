import { Injectable, Logger } from '@nestjs/common';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateEventDto } from './dto/create-event.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { EventListItemDto, EventResponseDto } from './dto/event-response.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(private readonly repository: EventsRepository) {}

  async createEvent(dto: CreateEventDto, adminId: string) {
    const slug = await this.generateUniqueSlug(dto.title);
    const eventCode = await this.generateEventCode();

    const event = await this.repository.create({
      eventCode,
      slug,
      title: dto.title,
      shortDescription: dto.shortDescription,
      detailedDescription: dto.detailedDescription ?? null,
      eventType: dto.eventType,
      primaryColor: dto.primaryColor ?? null,
      secondaryColor: dto.secondaryColor ?? null,
      isRecurring: dto.isRecurring ?? true,
      sortOrder: dto.sortOrder ?? 0,
      seoTitle: dto.seoTitle ?? null,
      seoDescription: dto.seoDescription ?? null,
      seoKeywords: dto.seoKeywords ?? [],
      createdByUser: { connect: { id: adminId } },
      updatedBy: adminId,
    });

    this.logger.log(`Event program created: ${event.eventCode} by admin ${adminId}`);
    return ApiResponseDto.success(EventResponseDto.fromEntity(event), 'Event created successfully');
  }

  async updateEvent(id: string, dto: UpdateEventDto, adminId: string) {
    const event = await this.repository.findById(id);
    if (!event) {
      throw new EntityNotFoundException('Event', id);
    }

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };

    if (dto.title !== undefined) {
      data.title = dto.title;
      if (dto.title !== event.title) {
        data.slug = await this.generateUniqueSlug(dto.title, id);
      }
    }
    if (dto.shortDescription !== undefined) data.shortDescription = dto.shortDescription;
    if (dto.detailedDescription !== undefined) data.detailedDescription = dto.detailedDescription;
    if (dto.eventType !== undefined) data.eventType = dto.eventType;
    if (dto.primaryColor !== undefined) data.primaryColor = dto.primaryColor;
    if (dto.secondaryColor !== undefined) data.secondaryColor = dto.secondaryColor;
    if (dto.isRecurring !== undefined) data.isRecurring = dto.isRecurring;
    if (dto.sortOrder !== undefined) data.sortOrder = dto.sortOrder;
    if (dto.seoTitle !== undefined) data.seoTitle = dto.seoTitle;
    if (dto.seoDescription !== undefined) data.seoDescription = dto.seoDescription;
    if (dto.seoKeywords !== undefined) data.seoKeywords = dto.seoKeywords;

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(EventResponseDto.fromEntity(updated), 'Event updated successfully');
  }

  async deactivateEvent(id: string, adminId: string) {
    const event = await this.repository.findById(id);
    if (!event) throw new EntityNotFoundException('Event', id);
    if (!event.isActive) throw new BusinessException('Event is already inactive');

    const updated = await this.repository.update(id, {
      isActive: false,
      updatedBy: adminId,
      version: { increment: 1 },
    });
    return ApiResponseDto.success(EventResponseDto.fromEntity(updated), 'Event deactivated');
  }

  async activateEvent(id: string, adminId: string) {
    const event = await this.repository.findById(id);
    if (!event) throw new EntityNotFoundException('Event', id);
    if (event.isActive) throw new BusinessException('Event is already active');

    const updated = await this.repository.update(id, {
      isActive: true,
      updatedBy: adminId,
      version: { increment: 1 },
    });
    return ApiResponseDto.success(EventResponseDto.fromEntity(updated), 'Event activated');
  }

  async deleteEvent(id: string, adminId: string) {
    const event = await this.repository.findById(id);
    if (!event) throw new EntityNotFoundException('Event', id);

    await this.repository.update(id, {
      deletedAt: new Date(),
      deletedBy: adminId,
    });
    this.logger.log(`Event ${event.eventCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Event deleted successfully');
  }

  async getAdminEvents(query: EventQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      eventType: query.eventType,
    });

    const items = data.map((e) => EventListItemDto.fromEntity(e));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Events retrieved');
  }

  async getAdminEventById(id: string) {
    const event = await this.repository.findById(id);
    if (!event) throw new EntityNotFoundException('Event', id);
    return ApiResponseDto.success(EventResponseDto.fromEntity(event), 'Event retrieved');
  }

  async getPublicEvents(query: EventQueryDto) {
    const { data, total } = await this.repository.findActivePublic({
      skip: query.skip,
      take: query.take,
      search: query.search,
      eventType: query.eventType,
    });

    const items = data.map((e) => EventListItemDto.fromEntity(e));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Programs retrieved');
  }

  async getEventBySlug(slug: string) {
    const event = await this.repository.findActiveBySlug(slug);
    if (!event) throw new EntityNotFoundException('Event', slug);
    return ApiResponseDto.success(EventResponseDto.fromEntity(event), 'Event retrieved');
  }

  private async generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 100);

    if (!(await this.repository.slugExists(slug, excludeId))) return slug;

    let counter = 1;
    while (await this.repository.slugExists(`${slug}-${counter}`, excludeId)) counter++;
    return `${slug}-${counter}`;
  }

  private async generateEventCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-EVT-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
