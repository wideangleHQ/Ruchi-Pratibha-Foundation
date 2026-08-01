import { Injectable, Logger } from '@nestjs/common';
import { EditionStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateEditionDto, EditionListItemDto, EditionQueryDto, EditionResponseDto, UpdateEditionDto } from './dto';
import { EventEditionsRepository } from './event-editions.repository';

const VALID_TRANSITIONS: Record<EditionStatus, EditionStatus[]> = {
  [EditionStatus.DRAFT]: [EditionStatus.PUBLISHED, EditionStatus.CANCELLED],
  [EditionStatus.PUBLISHED]: [EditionStatus.REGISTRATION_OPEN, EditionStatus.CANCELLED, EditionStatus.ARCHIVED],
  [EditionStatus.REGISTRATION_OPEN]: [EditionStatus.REGISTRATION_CLOSED, EditionStatus.CANCELLED],
  [EditionStatus.REGISTRATION_CLOSED]: [EditionStatus.ONGOING, EditionStatus.CANCELLED],
  [EditionStatus.ONGOING]: [EditionStatus.COMPLETED, EditionStatus.CANCELLED],
  [EditionStatus.COMPLETED]: [EditionStatus.ARCHIVED],
  [EditionStatus.ARCHIVED]: [],
  [EditionStatus.CANCELLED]: [EditionStatus.DRAFT],
};

@Injectable()
export class EventEditionsService {
  private readonly logger = new Logger(EventEditionsService.name);

  constructor(private readonly repository: EventEditionsRepository) {}

  async createEdition(eventId: string, dto: CreateEditionDto, adminId: string) {
    const eventExists = await this.repository.eventExists(eventId);
    if (!eventExists) throw new EntityNotFoundException('Event', eventId);

    this.validateDates(dto.eventStarts, dto.eventEnds, dto.registrationOpens, dto.registrationCloses);

    const slug = await this.generateUniqueSlug(dto.editionName);
    const editionCode = await this.generateEditionCode(dto.year);

    const edition = await this.repository.create({
      eventId,
      editionCode,
      slug,
      editionName: dto.editionName,
      year: dto.year,
      editionNumber: dto.editionNumber ?? 1,
      theme: dto.theme ?? null,
      shortDescription: dto.shortDescription,
      detailedDescription: dto.detailedDescription ?? null,
      venue: dto.venue,
      venueAddress: dto.venueAddress ?? null,
      googleMapsUrl: dto.googleMapsUrl ?? null,
      registrationOpens: dto.registrationOpens ? new Date(dto.registrationOpens) : null,
      registrationCloses: dto.registrationCloses ? new Date(dto.registrationCloses) : null,
      eventStarts: new Date(dto.eventStarts),
      eventEnds: new Date(dto.eventEnds),
      volunteerCapacity: dto.volunteerCapacity ?? 0,
      maxRegistrations: dto.maxRegistrations ?? 0,
      visibility: dto.visibility,
      isFeatured: dto.isFeatured ?? false,
      registrationEnabled: dto.registrationEnabled ?? false,
      attendanceEnabled: dto.attendanceEnabled ?? false,
      certificateEnabled: dto.certificateEnabled ?? false,
      createdById: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Edition created: ${edition.editionCode} for event ${eventId} by admin ${adminId}`);
    return ApiResponseDto.success(EditionResponseDto.fromEntity(edition), 'Edition created successfully');
  }

  async updateEdition(id: string, dto: UpdateEditionDto, adminId: string) {
    const edition = await this.repository.findById(id);
    if (!edition) throw new EntityNotFoundException('EventEdition', id);

    if (dto.eventStarts || dto.eventEnds || dto.registrationOpens || dto.registrationCloses) {
      this.validateDates(
        dto.eventStarts ?? edition.eventStarts.toISOString(),
        dto.eventEnds ?? edition.eventEnds.toISOString(),
        dto.registrationOpens ?? (edition.registrationOpens?.toISOString() ?? undefined),
        dto.registrationCloses ?? (edition.registrationCloses?.toISOString() ?? undefined),
      );
    }

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };

    if (dto.editionName !== undefined) {
      data.editionName = dto.editionName;
      if (dto.editionName !== edition.editionName) {
        data.slug = await this.generateUniqueSlug(dto.editionName, id);
      }
    }
    if (dto.theme !== undefined) data.theme = dto.theme;
    if (dto.shortDescription !== undefined) data.shortDescription = dto.shortDescription;
    if (dto.detailedDescription !== undefined) data.detailedDescription = dto.detailedDescription;
    if (dto.venue !== undefined) data.venue = dto.venue;
    if (dto.venueAddress !== undefined) data.venueAddress = dto.venueAddress;
    if (dto.googleMapsUrl !== undefined) data.googleMapsUrl = dto.googleMapsUrl;
    if (dto.registrationOpens !== undefined) data.registrationOpens = new Date(dto.registrationOpens);
    if (dto.registrationCloses !== undefined) data.registrationCloses = new Date(dto.registrationCloses);
    if (dto.eventStarts !== undefined) data.eventStarts = new Date(dto.eventStarts);
    if (dto.eventEnds !== undefined) data.eventEnds = new Date(dto.eventEnds);
    if (dto.volunteerCapacity !== undefined) data.volunteerCapacity = dto.volunteerCapacity;
    if (dto.maxRegistrations !== undefined) data.maxRegistrations = dto.maxRegistrations;
    if (dto.visibility !== undefined) data.visibility = dto.visibility;
    if (dto.isFeatured !== undefined) data.isFeatured = dto.isFeatured;
    if (dto.registrationEnabled !== undefined) data.registrationEnabled = dto.registrationEnabled;
    if (dto.attendanceEnabled !== undefined) data.attendanceEnabled = dto.attendanceEnabled;
    if (dto.certificateEnabled !== undefined) data.certificateEnabled = dto.certificateEnabled;

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(EditionResponseDto.fromEntity(updated), 'Edition updated successfully');
  }

  async publishEdition(id: string, adminId: string) {
    return this.transitionStatus(id, EditionStatus.PUBLISHED, adminId, 'Edition published');
  }

  async archiveEdition(id: string, adminId: string) {
    return this.transitionStatus(id, EditionStatus.ARCHIVED, adminId, 'Edition archived');
  }

  async cancelEdition(id: string, adminId: string) {
    return this.transitionStatus(id, EditionStatus.CANCELLED, adminId, 'Edition cancelled');
  }

  async toggleFeatured(id: string, adminId: string) {
    const edition = await this.repository.findById(id);
    if (!edition) throw new EntityNotFoundException('EventEdition', id);

    const updated = await this.repository.update(id, {
      isFeatured: !edition.isFeatured,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    const msg = updated.isFeatured ? 'Edition marked as featured' : 'Edition unmarked as featured';
    return ApiResponseDto.success(EditionResponseDto.fromEntity(updated), msg);
  }

  async deleteEdition(id: string, adminId: string) {
    const edition = await this.repository.findById(id);
    if (!edition) throw new EntityNotFoundException('EventEdition', id);

    await this.repository.update(id, { deletedAt: new Date(), deletedBy: adminId });
    this.logger.log(`Edition ${edition.editionCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Edition deleted successfully');
  }

  async getAdminEditions(eventId: string, query: EditionQueryDto) {
    const eventExists = await this.repository.eventExists(eventId);
    if (!eventExists) throw new EntityNotFoundException('Event', eventId);

    const { data, total } = await this.repository.findByEventId(eventId, {
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      editionStatus: query.editionStatus,
      visibility: query.visibility,
      year: query.year,
    });

    const items = data.map((e) => EditionListItemDto.fromEntity(e));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Editions retrieved');
  }

  async getAdminEditionById(id: string) {
    const edition = await this.repository.findById(id);
    if (!edition) throw new EntityNotFoundException('EventEdition', id);
    return ApiResponseDto.success(EditionResponseDto.fromEntity(edition), 'Edition retrieved');
  }

  async getPublicEditionsByEventSlug(eventSlug: string, query: EditionQueryDto) {
    const { data, total } = await this.repository.findPublicByEventSlug(eventSlug, {
      skip: query.skip,
      take: query.take,
    });

    const items = data.map((e) => EditionListItemDto.fromEntity(e));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Editions retrieved');
  }

  async getUpcomingEditions(query: EditionQueryDto) {
    const { data, total } = await this.repository.findUpcoming({
      skip: query.skip,
      take: query.take,
    });

    const items = data.map((e) => EditionListItemDto.fromEntity(e));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Upcoming editions retrieved');
  }

  async getFeaturedEditions(query: EditionQueryDto) {
    const { data, total } = await this.repository.findFeatured({
      skip: query.skip,
      take: query.take,
    });

    const items = data.map((e) => EditionListItemDto.fromEntity(e));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Featured editions retrieved');
  }

  async getEditionBySlug(slug: string) {
    const edition = await this.repository.findPublicBySlug(slug);
    if (!edition) throw new EntityNotFoundException('EventEdition', slug);
    return ApiResponseDto.success(EditionResponseDto.fromEntity(edition), 'Edition retrieved');
  }

  private async transitionStatus(id: string, target: EditionStatus, adminId: string, message: string) {
    const edition = await this.repository.findById(id);
    if (!edition) throw new EntityNotFoundException('EventEdition', id);

    const allowed = VALID_TRANSITIONS[edition.editionStatus];
    if (!allowed.includes(target)) {
      throw new BusinessException(
        `Cannot transition from ${edition.editionStatus} to ${target}`,
      );
    }

    const updated = await this.repository.update(id, {
      editionStatus: target,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    this.logger.log(`Edition ${edition.editionCode} transitioned to ${target} by admin ${adminId}`);
    return ApiResponseDto.success(EditionResponseDto.fromEntity(updated), message);
  }

  private validateDates(
    eventStarts: string,
    eventEnds: string,
    registrationOpens?: string,
    registrationCloses?: string,
  ): void {
    const starts = new Date(eventStarts);
    const ends = new Date(eventEnds);

    if (ends <= starts) {
      throw new BusinessException('eventEnds must be after eventStarts');
    }

    if (registrationOpens && registrationCloses) {
      const regOpens = new Date(registrationOpens);
      const regCloses = new Date(registrationCloses);
      if (regCloses <= regOpens) {
        throw new BusinessException('registrationCloses must be after registrationOpens');
      }
    }
  }

  private async generateUniqueSlug(name: string, excludeId?: string): Promise<string> {
    let slug = name
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

  private async generateEditionCode(year: number): Promise<string> {
    const count = await this.repository.countByYear(year);
    return `RPF-EDN-${year}-${(count + 1).toString().padStart(4, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
