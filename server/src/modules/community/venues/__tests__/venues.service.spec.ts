import { Test, TestingModule } from '@nestjs/testing';
import { Venue, VenueStatus, VenueType } from '@prisma/client';
import { BusinessException, EntityConflictException, EntityNotFoundException } from '../../../../common/exceptions';
import { VenuesService } from '../venues.service';
import { VenuesRepository } from '../venues.repository';

describe('VenuesService', () => {
  let service: VenuesService;
  let repository: jest.Mocked<VenuesRepository>;

  const adminId = 'admin-uuid-001';

  const mockVenue: Venue = {
    id: 'v1-uuid',
    venueCode: 'RPF-VEN-000001',
    name: 'Bhubaneswar Convention Centre',
    description: 'Main convention hall',
    address: 'Janpath, Bhubaneswar',
    district: 'Khordha',
    state: 'Odisha',
    country: 'India',
    latitude: 20.2961,
    longitude: 85.8245,
    googleMapsUrl: null,
    capacity: 500,
    venueType: VenueType.INDOOR,
    accessibilityDetails: null,
    parkingInfo: null,
    emergencyContact: null,
    venueStatus: VenueStatus.ACTIVE,
    version: 1,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
    deletedAt: null,
    createdBy: adminId,
    updatedBy: adminId,
    deletedBy: null,
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      countAll: jest.fn(),
      update: jest.fn(),
      hasLinkedEditions: jest.fn(),
      findMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VenuesService,
        { provide: VenuesRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get(VenuesService);
    repository = module.get(VenuesRepository);
  });

  describe('createVenue', () => {
    it('should create a venue with generated code', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.countAll.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockVenue);

      const result = await service.createVenue({
        name: 'Bhubaneswar Convention Centre',
        address: 'Janpath, Bhubaneswar',
        state: 'Odisha',
        venueType: VenueType.INDOOR,
      }, adminId);

      expect(result.success).toBe(true);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ venueCode: 'RPF-VEN-000001' }),
      );
    });

    it('should reject duplicate name', async () => {
      repository.findByName.mockResolvedValue(mockVenue);
      await expect(
        service.createVenue({ name: 'Bhubaneswar Convention Centre', address: 'x', state: 'Odisha', venueType: VenueType.INDOOR }, adminId),
      ).rejects.toThrow(EntityConflictException);
    });

    it('should reject latitude without longitude', async () => {
      repository.findByName.mockResolvedValue(null);
      await expect(
        service.createVenue({ name: 'Test', address: 'x', state: 'Odisha', venueType: VenueType.INDOOR, latitude: 20.0 }, adminId),
      ).rejects.toThrow(BusinessException);
    });
  });

  describe('updateVenue', () => {
    it('should update venue fields', async () => {
      repository.findById.mockResolvedValue(mockVenue);
      repository.update.mockResolvedValue({ ...mockVenue, name: 'Updated Hall' });

      const result = await service.updateVenue('v1-uuid', { name: 'Updated Hall' }, adminId);
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.updateVenue('bad-id', { name: 'X' }, adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should reject duplicate name on update', async () => {
      repository.findById.mockResolvedValue(mockVenue);
      repository.findByName.mockResolvedValue({ ...mockVenue, id: 'other-id' });
      await expect(service.updateVenue('v1-uuid', { name: 'Duplicate' }, adminId)).rejects.toThrow(EntityConflictException);
    });
  });

  describe('deleteVenue', () => {
    it('should soft delete venue', async () => {
      repository.findById.mockResolvedValue(mockVenue);
      repository.hasLinkedEditions.mockResolvedValue(false);
      repository.update.mockResolvedValue({ ...mockVenue, deletedAt: new Date() });

      const result = await service.deleteVenue('v1-uuid', adminId);
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.deleteVenue('bad-id', adminId)).rejects.toThrow(EntityNotFoundException);
    });

    it('should prevent deletion when linked to editions', async () => {
      repository.findById.mockResolvedValue(mockVenue);
      repository.hasLinkedEditions.mockResolvedValue(true);
      await expect(service.deleteVenue('v1-uuid', adminId)).rejects.toThrow(BusinessException);
    });
  });

  describe('getVenues', () => {
    it('should return paginated venues', async () => {
      repository.findMany.mockResolvedValue({ data: [mockVenue], total: 1 });
      const result = await service.getVenues({ page: 1, pageSize: 10, skip: 0, take: 10, sortBy: 'createdAt', sortOrder: 'desc' } as any);
      expect(result.success).toBe(true);
    });
  });

  describe('getVenueById', () => {
    it('should return venue', async () => {
      repository.findById.mockResolvedValue(mockVenue);
      const result = await service.getVenueById('v1-uuid');
      expect(result.success).toBe(true);
    });

    it('should throw not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.getVenueById('bad-id')).rejects.toThrow(EntityNotFoundException);
    });
  });
});
