import { Injectable, Logger } from '@nestjs/common';
import { SpeakerStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateSpeakerDto, SpeakerQueryDto, SpeakerResponseDto, UpdateSpeakerDto } from './dto';
import { EventSpeakersRepository } from './event-speakers.repository';

const VALID_STATUS_TRANSITIONS: Record<SpeakerStatus, SpeakerStatus[]> = {
  [SpeakerStatus.ACTIVE]: [SpeakerStatus.INACTIVE, SpeakerStatus.ARCHIVED],
  [SpeakerStatus.INACTIVE]: [SpeakerStatus.ACTIVE, SpeakerStatus.ARCHIVED],
  [SpeakerStatus.ARCHIVED]: [SpeakerStatus.ACTIVE],
};

@Injectable()
export class EventSpeakersService {
  private readonly logger = new Logger(EventSpeakersService.name);

  constructor(private readonly repository: EventSpeakersRepository) {}

  async createSpeaker(dto: CreateSpeakerDto, adminId: string) {
    const slug = await this.generateUniqueSlug(dto.name);
    const speakerCode = await this.generateSpeakerCode();

    const speaker = await this.repository.create({
      speakerCode,
      slug,
      name: dto.name,
      designation: dto.designation ?? null,
      organization: dto.organization ?? null,
      biography: dto.biography ?? null,
      shortBio: dto.shortBio ?? null,
      photoAssetId: dto.photoAssetId ?? null,
      email: dto.email ?? null,
      phone: dto.phone ?? null,
      website: dto.website ?? null,
      linkedinUrl: dto.linkedinUrl ?? null,
      twitterUrl: dto.twitterUrl ?? null,
      sortOrder: dto.sortOrder ?? 0,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Speaker created: ${speaker.speakerCode} by admin ${adminId}`);
    return ApiResponseDto.success(SpeakerResponseDto.fromEntity(speaker), 'Speaker created successfully');
  }

  async updateSpeaker(id: string, dto: UpdateSpeakerDto, adminId: string) {
    const speaker = await this.repository.findById(id);
    if (!speaker) throw new EntityNotFoundException('EventSpeaker', id);

    if (dto.speakerStatus && dto.speakerStatus !== speaker.speakerStatus) {
      const allowed = VALID_STATUS_TRANSITIONS[speaker.speakerStatus];
      if (!allowed.includes(dto.speakerStatus)) {
        throw new BusinessException(
          `Cannot transition speaker from ${speaker.speakerStatus} to ${dto.speakerStatus}`,
        );
      }
    }

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };

    if (dto.name !== undefined) {
      data.name = dto.name;
      if (dto.name !== speaker.name) {
        data.slug = await this.generateUniqueSlug(dto.name, id);
      }
    }
    if (dto.designation !== undefined) data.designation = dto.designation;
    if (dto.organization !== undefined) data.organization = dto.organization;
    if (dto.biography !== undefined) data.biography = dto.biography;
    if (dto.shortBio !== undefined) data.shortBio = dto.shortBio;
    if (dto.photoAssetId !== undefined) data.photoAssetId = dto.photoAssetId;
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.phone !== undefined) data.phone = dto.phone;
    if (dto.website !== undefined) data.website = dto.website;
    if (dto.linkedinUrl !== undefined) data.linkedinUrl = dto.linkedinUrl;
    if (dto.twitterUrl !== undefined) data.twitterUrl = dto.twitterUrl;
    if (dto.speakerStatus !== undefined) data.speakerStatus = dto.speakerStatus;
    if (dto.sortOrder !== undefined) data.sortOrder = dto.sortOrder;

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(SpeakerResponseDto.fromEntity(updated), 'Speaker updated successfully');
  }

  async deleteSpeaker(id: string, adminId: string) {
    const speaker = await this.repository.findById(id);
    if (!speaker) throw new EntityNotFoundException('EventSpeaker', id);

    await this.repository.update(id, { deletedAt: new Date(), updatedBy: adminId });
    this.logger.log(`Speaker ${speaker.speakerCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Speaker deleted successfully');
  }

  async getAdminSpeakers(query: SpeakerQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      status: query.status,
    });

    const items = data.map((s) => SpeakerResponseDto.fromEntity(s));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Speakers retrieved');
  }

  async getAdminSpeakerById(id: string) {
    const speaker = await this.repository.findById(id);
    if (!speaker) throw new EntityNotFoundException('EventSpeaker', id);
    return ApiResponseDto.success(SpeakerResponseDto.fromEntity(speaker), 'Speaker retrieved');
  }

  async getPublicSpeakers(query: SpeakerQueryDto) {
    const { data, total } = await this.repository.findActivePublic({
      skip: query.skip,
      take: query.take,
      search: query.search,
    });

    const items = data.map((s) => SpeakerResponseDto.fromEntity(s));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Speakers retrieved');
  }

  async getPublicSpeakerBySlug(slug: string) {
    const speaker = await this.repository.findBySlug(slug);
    if (!speaker || speaker.speakerStatus !== SpeakerStatus.ACTIVE) {
      throw new EntityNotFoundException('EventSpeaker', slug);
    }
    return ApiResponseDto.success(SpeakerResponseDto.fromEntity(speaker), 'Speaker retrieved');
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

  private async generateSpeakerCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-SPK-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
