import { Injectable, Logger } from '@nestjs/common';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityConflictException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { CreateVenueDto, UpdateVenueDto, VenueQueryDto, VenueResponseDto } from './dto';
import { VenuesRepository } from './venues.repository';

@Injectable()
export class VenuesService {
  private readonly logger = new Logger(VenuesService.name);

  constructor(private readonly repository: VenuesRepository) {}

  async createVenue(dto: CreateVenueDto, adminId: string) {
    const existing = await this.repository.findByName(dto.name);
    if (existing) throw new EntityConflictException('Venue', 'name');

    this.validateCoordinates(dto.latitude, dto.longitude);
    const venueCode = await this.generateVenueCode();

    const venue = await this.repository.create({
      venueCode,
      name: dto.name,
      description: dto.description ?? null,
      address: dto.address,
      district: dto.district ?? null,
      state: dto.state,
      country: dto.country ?? 'India',
      latitude: dto.latitude ?? null,
      longitude: dto.longitude ?? null,
      googleMapsUrl: dto.googleMapsUrl ?? null,
      capacity: dto.capacity ?? 0,
      venueType: dto.venueType,
      accessibilityDetails: dto.accessibilityDetails ?? null,
      parkingInfo: dto.parkingInfo ?? null,
      emergencyContact: dto.emergencyContact ?? null,
      createdBy: adminId,
      updatedBy: adminId,
    });

    this.logger.log(`Venue created: ${venue.venueCode} by admin ${adminId}`);
    return ApiResponseDto.success(VenueResponseDto.fromEntity(venue), 'Venue created successfully');
  }

  async updateVenue(id: string, dto: UpdateVenueDto, adminId: string) {
    const venue = await this.repository.findById(id);
    if (!venue) throw new EntityNotFoundException('Venue', id);

    if (dto.name !== undefined && dto.name !== venue.name) {
      const dup = await this.repository.findByName(dto.name, id);
      if (dup) throw new EntityConflictException('Venue', 'name');
    }

    if (dto.latitude !== undefined || dto.longitude !== undefined) {
      this.validateCoordinates(
        dto.latitude ?? venue.latitude ?? undefined,
        dto.longitude ?? venue.longitude ?? undefined,
      );
    }

    const data: Record<string, unknown> = { updatedBy: adminId, version: { increment: 1 } };
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.address !== undefined) data.address = dto.address;
    if (dto.district !== undefined) data.district = dto.district;
    if (dto.state !== undefined) data.state = dto.state;
    if (dto.country !== undefined) data.country = dto.country;
    if (dto.latitude !== undefined) data.latitude = dto.latitude;
    if (dto.longitude !== undefined) data.longitude = dto.longitude;
    if (dto.googleMapsUrl !== undefined) data.googleMapsUrl = dto.googleMapsUrl;
    if (dto.capacity !== undefined) data.capacity = dto.capacity;
    if (dto.venueType !== undefined) data.venueType = dto.venueType;
    if (dto.accessibilityDetails !== undefined) data.accessibilityDetails = dto.accessibilityDetails;
    if (dto.parkingInfo !== undefined) data.parkingInfo = dto.parkingInfo;
    if (dto.emergencyContact !== undefined) data.emergencyContact = dto.emergencyContact;
    if (dto.venueStatus !== undefined) data.venueStatus = dto.venueStatus;

    const updated = await this.repository.update(id, data);
    return ApiResponseDto.success(VenueResponseDto.fromEntity(updated), 'Venue updated successfully');
  }

  async deleteVenue(id: string, adminId: string) {
    const venue = await this.repository.findById(id);
    if (!venue) throw new EntityNotFoundException('Venue', id);

    const hasLinks = await this.repository.hasLinkedEditions(id);
    if (hasLinks) throw new BusinessException('Cannot delete venue while linked to event editions');

    await this.repository.update(id, { deletedAt: new Date(), deletedBy: adminId });
    this.logger.log(`Venue ${venue.venueCode} soft-deleted by admin ${adminId}`);
    return ApiResponseDto.success(null, 'Venue deleted successfully');
  }

  async getVenues(query: VenueQueryDto) {
    const { data, total } = await this.repository.findMany({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      venueStatus: query.venueStatus,
      venueType: query.venueType,
    });
    const items = data.map((v) => VenueResponseDto.fromEntity(v));
    return ApiResponseDto.paginated(items, this.buildMeta(query.page, query.pageSize, total), 'Venues retrieved');
  }

  async getVenueById(id: string) {
    const venue = await this.repository.findById(id);
    if (!venue) throw new EntityNotFoundException('Venue', id);
    return ApiResponseDto.success(VenueResponseDto.fromEntity(venue), 'Venue retrieved');
  }

  private validateCoordinates(lat?: number, lng?: number): void {
    if ((lat !== undefined && lng === undefined) || (lat === undefined && lng !== undefined)) {
      throw new BusinessException('Both latitude and longitude must be provided together');
    }
  }

  private async generateVenueCode(): Promise<string> {
    const total = await this.repository.countAll();
    return `RPF-VEN-${(total + 1).toString().padStart(6, '0')}`;
  }

  private buildMeta(page: number, pageSize: number, totalItems: number): PaginationMeta {
    const totalPages = Math.ceil(totalItems / pageSize);
    return { page, pageSize, totalItems, totalPages, hasNextPage: page < totalPages, hasPreviousPage: page > 1 };
  }
}
