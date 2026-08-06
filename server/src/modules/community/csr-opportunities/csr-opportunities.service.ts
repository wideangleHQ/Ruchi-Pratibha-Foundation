import { Injectable, Logger } from '@nestjs/common';
import { CsrOpportunity, EditionStatus, OpportunityStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { PrismaService } from '../../../database';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { OpportunityQueryDto } from './dto/opportunity-query.dto';
import {
  OpportunityListItemDto,
  OpportunityResponseDto,
} from './dto/opportunity-response.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { CsrOpportunitiesRepository } from './csr-opportunities.repository';

@Injectable()
export class CsrOpportunitiesService {
  private readonly logger = new Logger(CsrOpportunitiesService.name);

  constructor(
    private readonly repository: CsrOpportunitiesRepository,
    private readonly prisma: PrismaService,
  ) {}

  async createOpportunity(dto: CreateOpportunityDto, adminId: string) {
    const slug = await this.generateUniqueSlug(dto.title);
    const opportunityCode = await this.generateCode();

    const opportunity = await this.repository.create({
      opportunityCode,
      slug,
      title: dto.title,
      opportunityType: dto.opportunityType,
      opportunityStatus: dto.opportunityStatus ?? OpportunityStatus.DRAFT,
      shortDescription: dto.shortDescription,
      detailedDescription: dto.detailedDescription ?? null,
      featuredImageKey: dto.featuredImageKey ?? null,
      bannerImageKey: dto.bannerImageKey ?? null,
      mode: dto.mode,
      registrationOpens: dto.registrationOpens ? new Date(dto.registrationOpens) : null,
      registrationCloses: dto.registrationCloses ? new Date(dto.registrationCloses) : null,
      eventStartDate: dto.eventStartDate ? new Date(dto.eventStartDate) : null,
      eventEndDate: dto.eventEndDate ? new Date(dto.eventEndDate) : null,
      reportingTime: dto.reportingTime ?? null,
      closingTime: dto.closingTime ?? null,
      timeZone: dto.timeZone ?? 'Asia/Kolkata',
      venue: dto.venue ?? null,
      address: dto.address ?? null,
      landmark: dto.landmark ?? null,
      district: dto.district ?? null,
      state: dto.state ?? null,
      pincode: dto.pincode ?? null,
      googleMapsUrl: dto.googleMapsUrl ?? null,
      meetingLink: dto.meetingLink ?? null,
      platform: dto.platform ?? null,
      volunteersRequired: dto.volunteersRequired ?? 0,
      maxApplications: dto.maxApplications ?? 0,
      minAge: dto.minAge ?? null,
      maxAge: dto.maxAge ?? null,
      genderRestriction: dto.genderRestriction ?? 'ANY',
      experienceRequired: dto.experienceRequired ?? false,
      requiredSkills: dto.requiredSkills ?? [],
      physicalRequirements: dto.physicalRequirements ?? null,
      coordinatorName: dto.coordinatorName ?? null,
      coordinatorDesignation: dto.coordinatorDesignation ?? null,
      coordinatorEmail: dto.coordinatorEmail ?? null,
      coordinatorMobile: dto.coordinatorMobile ?? null,
      coordinatorAltMobile: dto.coordinatorAltMobile ?? null,
      formConfig: dto.formConfig ?? undefined,
      requiredDocuments: dto.requiredDocuments ?? [],
      galleryImageKeys: dto.galleryImageKeys ?? [],
      brochureKey: dto.brochureKey ?? null,
      supportingDocKeys: dto.supportingDocKeys ?? [],
      showOnHomepage: dto.showOnHomepage ?? false,
      showOnCsrPage: dto.showOnCsrPage ?? true,
      isFeatured: dto.isFeatured ?? false,
      acceptRegistrations: dto.acceptRegistrations ?? false,
      showCountdown: dto.showCountdown ?? false,
      metaTitle: dto.metaTitle ?? null,
      metaDescription: dto.metaDescription ?? null,
      ogImageKey: dto.ogImageKey ?? null,
      workflowType: dto.workflowType ?? 'MANUAL',
      notifyRegistration: dto.notifyRegistration ?? true,
      notifyApproval: dto.notifyApproval ?? true,
      notifyRejection: dto.notifyRejection ?? true,
      notifyReminder: dto.notifyReminder ?? false,
      adminNotes: dto.adminNotes ?? null,
      updatedBy: adminId,
      ...(dto.eventId ? { event: { connect: { id: dto.eventId } } } : {}),
    });

    this.logger.log(`CSR Opportunity created: ${opportunity.opportunityCode} by admin ${adminId}`);
    return ApiResponseDto.success(OpportunityResponseDto.fromEntity(opportunity), 'Opportunity created successfully');
  }

  async updateOpportunity(id: string, dto: UpdateOpportunityDto, adminId: string) {
    const opportunity = await this.repository.findById(id);
    if (!opportunity) throw new EntityNotFoundException('CsrOpportunity', id);

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };

    if (dto.title !== undefined) {
      data.title = dto.title;
      if (dto.title !== opportunity.title) {
        data.slug = await this.generateUniqueSlug(dto.title, id);
      }
    }
    if (dto.opportunityType !== undefined) data.opportunityType = dto.opportunityType;
    if (dto.opportunityStatus !== undefined) data.opportunityStatus = dto.opportunityStatus;
    if (dto.shortDescription !== undefined) data.shortDescription = dto.shortDescription;
    if (dto.detailedDescription !== undefined) data.detailedDescription = dto.detailedDescription;
    if (dto.featuredImageKey !== undefined) data.featuredImageKey = dto.featuredImageKey;
    if (dto.bannerImageKey !== undefined) data.bannerImageKey = dto.bannerImageKey;
    if (dto.mode !== undefined) data.mode = dto.mode;
    if (dto.registrationOpens !== undefined) data.registrationOpens = dto.registrationOpens ? new Date(dto.registrationOpens) : null;
    if (dto.registrationCloses !== undefined) data.registrationCloses = dto.registrationCloses ? new Date(dto.registrationCloses) : null;
    if (dto.eventStartDate !== undefined) data.eventStartDate = dto.eventStartDate ? new Date(dto.eventStartDate) : null;
    if (dto.eventEndDate !== undefined) data.eventEndDate = dto.eventEndDate ? new Date(dto.eventEndDate) : null;
    if (dto.reportingTime !== undefined) data.reportingTime = dto.reportingTime;
    if (dto.closingTime !== undefined) data.closingTime = dto.closingTime;
    if (dto.timeZone !== undefined) data.timeZone = dto.timeZone;
    if (dto.venue !== undefined) data.venue = dto.venue;
    if (dto.address !== undefined) data.address = dto.address;
    if (dto.landmark !== undefined) data.landmark = dto.landmark;
    if (dto.district !== undefined) data.district = dto.district;
    if (dto.state !== undefined) data.state = dto.state;
    if (dto.pincode !== undefined) data.pincode = dto.pincode;
    if (dto.googleMapsUrl !== undefined) data.googleMapsUrl = dto.googleMapsUrl;
    if (dto.meetingLink !== undefined) data.meetingLink = dto.meetingLink;
    if (dto.platform !== undefined) data.platform = dto.platform;
    if (dto.volunteersRequired !== undefined) data.volunteersRequired = dto.volunteersRequired;
    if (dto.maxApplications !== undefined) data.maxApplications = dto.maxApplications;
    if (dto.minAge !== undefined) data.minAge = dto.minAge;
    if (dto.maxAge !== undefined) data.maxAge = dto.maxAge;
    if (dto.genderRestriction !== undefined) data.genderRestriction = dto.genderRestriction;
    if (dto.experienceRequired !== undefined) data.experienceRequired = dto.experienceRequired;
    if (dto.requiredSkills !== undefined) data.requiredSkills = dto.requiredSkills;
    if (dto.physicalRequirements !== undefined) data.physicalRequirements = dto.physicalRequirements;
    if (dto.coordinatorName !== undefined) data.coordinatorName = dto.coordinatorName;
    if (dto.coordinatorDesignation !== undefined) data.coordinatorDesignation = dto.coordinatorDesignation;
    if (dto.coordinatorEmail !== undefined) data.coordinatorEmail = dto.coordinatorEmail;
    if (dto.coordinatorMobile !== undefined) data.coordinatorMobile = dto.coordinatorMobile;
    if (dto.coordinatorAltMobile !== undefined) data.coordinatorAltMobile = dto.coordinatorAltMobile;
    if (dto.formConfig !== undefined) data.formConfig = dto.formConfig;
    if (dto.requiredDocuments !== undefined) data.requiredDocuments = dto.requiredDocuments;
    if (dto.galleryImageKeys !== undefined) data.galleryImageKeys = dto.galleryImageKeys;
    if (dto.brochureKey !== undefined) data.brochureKey = dto.brochureKey;
    if (dto.supportingDocKeys !== undefined) data.supportingDocKeys = dto.supportingDocKeys;
    if (dto.showOnHomepage !== undefined) data.showOnHomepage = dto.showOnHomepage;
    if (dto.showOnCsrPage !== undefined) data.showOnCsrPage = dto.showOnCsrPage;
    if (dto.isFeatured !== undefined) data.isFeatured = dto.isFeatured;
    if (dto.acceptRegistrations !== undefined) data.acceptRegistrations = dto.acceptRegistrations;
    if (dto.showCountdown !== undefined) data.showCountdown = dto.showCountdown;
    if (dto.metaTitle !== undefined) data.metaTitle = dto.metaTitle;
    if (dto.metaDescription !== undefined) data.metaDescription = dto.metaDescription;
    if (dto.ogImageKey !== undefined) data.ogImageKey = dto.ogImageKey;
    if (dto.workflowType !== undefined) data.workflowType = dto.workflowType;
    if (dto.notifyRegistration !== undefined) data.notifyRegistration = dto.notifyRegistration;
    if (dto.notifyApproval !== undefined) data.notifyApproval = dto.notifyApproval;
    if (dto.notifyRejection !== undefined) data.notifyRejection = dto.notifyRejection;
    if (dto.notifyReminder !== undefined) data.notifyReminder = dto.notifyReminder;
    if (dto.adminNotes !== undefined) data.adminNotes = dto.adminNotes;
    if (dto.eventId !== undefined) {
      data.event = dto.eventId ? { connect: { id: dto.eventId } } : { disconnect: true };
    }

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(OpportunityResponseDto.fromEntity(updated), 'Opportunity updated successfully');
  }

  async publishOpportunity(id: string, adminId: string) {
    const opportunity = await this.repository.findById(id);
    if (!opportunity) throw new EntityNotFoundException('CsrOpportunity', id);

    if (!opportunity.title || !opportunity.shortDescription || !opportunity.mode) {
      throw new BusinessException('Required fields (title, shortDescription, mode) must be filled before publishing');
    }

    const updated = await this.repository.update(id, {
      opportunityStatus: OpportunityStatus.PUBLISHED,
      updatedBy: adminId,
      version: { increment: 1 },
    });

    await this.ensureEdition(updated, adminId);

    this.logger.log(`CSR Opportunity ${opportunity.opportunityCode} published by admin ${adminId}`);
    return ApiResponseDto.success(OpportunityResponseDto.fromEntity(updated), 'Opportunity published successfully');
  }

  async archiveOpportunity(id: string, adminId: string) {
    const opportunity = await this.repository.findById(id);
    if (!opportunity) throw new EntityNotFoundException('CsrOpportunity', id);

    const updated = await this.repository.update(id, {
      opportunityStatus: OpportunityStatus.ARCHIVED,
      updatedBy: adminId,
      version: { increment: 1 },
    });
    return ApiResponseDto.success(OpportunityResponseDto.fromEntity(updated), 'Opportunity archived successfully');
  }

  async deleteOpportunity(id: string, adminId: string) {
    const opportunity = await this.repository.findById(id);
    if (!opportunity) throw new EntityNotFoundException('CsrOpportunity', id);

    await this.repository.update(id, {
      deletedAt: new Date(),
      deletedBy: adminId,
    });
    this.logger.log(`CSR Opportunity ${opportunity.opportunityCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Opportunity deleted successfully');
  }

  async duplicateOpportunity(id: string, adminId: string) {
    const opportunity = await this.repository.findById(id);
    if (!opportunity) throw new EntityNotFoundException('CsrOpportunity', id);

    const slug = await this.generateUniqueSlug(opportunity.title);
    const opportunityCode = await this.generateCode();

    const duplicate = await this.repository.create({
      opportunityCode,
      slug,
      title: opportunity.title,
      opportunityType: opportunity.opportunityType,
      shortDescription: opportunity.shortDescription,
      detailedDescription: opportunity.detailedDescription,
      featuredImageKey: opportunity.featuredImageKey,
      bannerImageKey: opportunity.bannerImageKey,
      mode: opportunity.mode,
      registrationOpens: opportunity.registrationOpens,
      registrationCloses: opportunity.registrationCloses,
      eventStartDate: opportunity.eventStartDate,
      eventEndDate: opportunity.eventEndDate,
      reportingTime: opportunity.reportingTime,
      closingTime: opportunity.closingTime,
      timeZone: opportunity.timeZone,
      venue: opportunity.venue,
      address: opportunity.address,
      landmark: opportunity.landmark,
      district: opportunity.district,
      state: opportunity.state,
      pincode: opportunity.pincode,
      googleMapsUrl: opportunity.googleMapsUrl,
      meetingLink: opportunity.meetingLink,
      platform: opportunity.platform,
      volunteersRequired: opportunity.volunteersRequired,
      maxApplications: opportunity.maxApplications,
      minAge: opportunity.minAge,
      maxAge: opportunity.maxAge,
      genderRestriction: opportunity.genderRestriction,
      experienceRequired: opportunity.experienceRequired,
      requiredSkills: opportunity.requiredSkills,
      physicalRequirements: opportunity.physicalRequirements,
      coordinatorName: opportunity.coordinatorName,
      coordinatorDesignation: opportunity.coordinatorDesignation,
      coordinatorEmail: opportunity.coordinatorEmail,
      coordinatorMobile: opportunity.coordinatorMobile,
      coordinatorAltMobile: opportunity.coordinatorAltMobile,
      formConfig: opportunity.formConfig ?? undefined,
      requiredDocuments: opportunity.requiredDocuments,
      galleryImageKeys: opportunity.galleryImageKeys,
      brochureKey: opportunity.brochureKey,
      supportingDocKeys: opportunity.supportingDocKeys,
      showOnHomepage: opportunity.showOnHomepage,
      showOnCsrPage: opportunity.showOnCsrPage,
      isFeatured: false,
      acceptRegistrations: false,
      showCountdown: opportunity.showCountdown,
      metaTitle: opportunity.metaTitle,
      metaDescription: opportunity.metaDescription,
      ogImageKey: opportunity.ogImageKey,
      workflowType: opportunity.workflowType,
      notifyRegistration: opportunity.notifyRegistration,
      notifyApproval: opportunity.notifyApproval,
      notifyRejection: opportunity.notifyRejection,
      notifyReminder: opportunity.notifyReminder,
      adminNotes: opportunity.adminNotes,
      updatedBy: adminId,
      ...(opportunity.eventId ? { event: { connect: { id: opportunity.eventId } } } : {}),
    });

    this.logger.log(`CSR Opportunity ${opportunity.opportunityCode} duplicated as ${duplicate.opportunityCode} by admin ${adminId}`);
    return ApiResponseDto.success(OpportunityResponseDto.fromEntity(duplicate), 'Opportunity duplicated successfully');
  }

  async getAdminOpportunities(query: OpportunityQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      opportunityStatus: query.opportunityStatus,
      opportunityType: query.opportunityType,
      mode: query.mode,
      district: query.district,
      state: query.state,
    });

    const items = data.map((o) => OpportunityListItemDto.fromEntity(o));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Opportunities retrieved');
  }

  async getAdminOpportunityById(id: string) {
    const opportunity = await this.repository.findById(id);
    if (!opportunity) throw new EntityNotFoundException('CsrOpportunity', id);
    return ApiResponseDto.success(OpportunityResponseDto.fromEntity(opportunity), 'Opportunity retrieved');
  }

  async getArchivedOpportunities(query: OpportunityQueryDto) {
    const { data, total } = await this.repository.findArchived({
      skip: query.skip,
      take: query.take,
      search: query.search,
    });

    const items = data.map((o) => OpportunityListItemDto.fromEntity(o));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Archived opportunities retrieved');
  }

  async getPublicOpportunities(query: OpportunityQueryDto) {
    const { data, total } = await this.repository.findPublished({
      skip: query.skip,
      take: query.take,
      search: query.search,
      opportunityType: query.opportunityType,
      mode: query.mode,
      district: query.district,
      state: query.state,
    });

    const items = data.map((o) => OpportunityListItemDto.fromEntity(o));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Opportunities retrieved');
  }

  async getPublicOpportunityBySlug(slug: string) {
    const opportunity = await this.repository.findBySlugPublished(slug);
    if (!opportunity) throw new EntityNotFoundException('CsrOpportunity', slug);
    return ApiResponseDto.success(OpportunityResponseDto.fromEntity(opportunity), 'Opportunity retrieved');
  }

  async getStats(id: string) {
    const opportunity = await this.repository.findById(id);
    if (!opportunity) throw new EntityNotFoundException('CsrOpportunity', id);

    const stats = await this.repository.getStats(id);
    return ApiResponseDto.success(stats, 'Opportunity stats retrieved');
  }

  async bulkPublish(ids: string[], adminId: string) {
    for (const id of ids) {
      await this.publishOpportunity(id, adminId);
    }
    return ApiResponseDto.success(null, `${ids.length} opportunities published successfully`);
  }

  async bulkArchive(ids: string[], adminId: string) {
    for (const id of ids) {
      await this.archiveOpportunity(id, adminId);
    }
    return ApiResponseDto.success(null, `${ids.length} opportunities archived successfully`);
  }

  async bulkDelete(ids: string[], adminId: string) {
    for (const id of ids) {
      await this.deleteOpportunity(id, adminId);
    }
    return ApiResponseDto.success(null, `${ids.length} opportunities deleted successfully`);
  }

  private async ensureEdition(opportunity: CsrOpportunity, adminId: string): Promise<void> {
    if (opportunity.editionId) return;

    if (!opportunity.eventId) return;

    const editionSlug = `${opportunity.slug}-edition`;
    const editionCode = `${opportunity.opportunityCode}-ED`;
    const year = new Date().getFullYear();

    const statusMap: Record<OpportunityStatus, EditionStatus> = {
      [OpportunityStatus.PUBLISHED]: EditionStatus.PUBLISHED,
      [OpportunityStatus.UPCOMING]: EditionStatus.PUBLISHED,
      [OpportunityStatus.REGISTRATION_OPEN]: EditionStatus.REGISTRATION_OPEN,
      [OpportunityStatus.REGISTRATION_CLOSED]: EditionStatus.REGISTRATION_CLOSED,
      [OpportunityStatus.ONGOING]: EditionStatus.ONGOING,
      [OpportunityStatus.COMPLETED]: EditionStatus.COMPLETED,
      [OpportunityStatus.CANCELLED]: EditionStatus.CANCELLED,
      [OpportunityStatus.ARCHIVED]: EditionStatus.ARCHIVED,
      [OpportunityStatus.DRAFT]: EditionStatus.DRAFT,
    };

    const editionStatus = statusMap[opportunity.opportunityStatus] ?? EditionStatus.DRAFT;

    const edition = await this.prisma.eventEdition.create({
      data: {
        eventId: opportunity.eventId,
        editionCode,
        editionName: opportunity.title,
        year,
        slug: editionSlug,
        shortDescription: opportunity.shortDescription,
        venue: opportunity.venue ?? 'TBD',
        venueAddress: opportunity.address ?? null,
        googleMapsUrl: opportunity.googleMapsUrl ?? null,
        eventStarts: opportunity.eventStartDate ?? new Date(),
        eventEnds: opportunity.eventEndDate ?? new Date(),
        registrationOpens: opportunity.registrationOpens,
        registrationCloses: opportunity.registrationCloses,
        volunteerCapacity: opportunity.volunteersRequired ?? 0,
        maxRegistrations: opportunity.maxApplications ?? 0,
        registrationEnabled: opportunity.acceptRegistrations ?? false,
        editionStatus,
        createdById: adminId,
        updatedBy: adminId,
      },
    });

    await this.repository.update(opportunity.id, {
      edition: { connect: { id: edition.id } },
    });
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

  private async generateCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-CSR-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
