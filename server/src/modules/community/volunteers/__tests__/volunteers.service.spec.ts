import { Test, TestingModule } from '@nestjs/testing';
import { BloodGroup, EntityStatus, Gender, IdentityDocumentType, VolunteerStatus } from '@prisma/client';
import { VolunteersService } from '../volunteers.service';
import { VolunteersRepository, VolunteerWithIdentities } from '../volunteers.repository';
import { StorageService } from '../../../../storage';
import { EntityConflictException, EntityNotFoundException, BusinessException } from '../../../../common/exceptions';
import { RegisterVolunteerDto } from '../dto/register-volunteer.dto';
import { CreateVolunteerIdentityDto } from '../dto/create-volunteer-identity.dto';

describe('VolunteersService', () => {
  let service: VolunteersService;
  let repository: jest.Mocked<VolunteersRepository>;
  let storageService: jest.Mocked<StorageService>;

  const mockVolunteer: VolunteerWithIdentities = {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    volunteerCode: 'RPF-VOL-2026-00001',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul@example.com',
    phone: '+919876543210',
    dateOfBirth: new Date('1995-06-15'),
    gender: Gender.MALE,
    bloodGroup: BloodGroup.O_POSITIVE,
    occupation: 'Software Engineer',
    organization: 'TCS',
    addressLine1: '42, MG Road',
    addressLine2: null,
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751001',
    country: 'India',
    profilePhotoKey: null,
    emergencyName: null,
    emergencyPhone: null,
    motivation: 'Help rural education',
    skills: ['Teaching'],
    languages: ['Hindi', 'English'],
    availableDays: ['Saturday'],
    volunteerStatus: VolunteerStatus.PENDING_VERIFICATION,
    status: EntityStatus.PENDING,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    createdBy: null,
    updatedBy: null,
    deletedBy: null,
    identities: [],
  };

  const mockRegisterDto: RegisterVolunteerDto = {
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul@example.com',
    phone: '+919876543210',
    dateOfBirth: '1995-06-15',
    gender: Gender.MALE,
    bloodGroup: BloodGroup.O_POSITIVE,
    occupation: 'Software Engineer',
    organization: 'TCS',
    addressLine1: '42, MG Road',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751001',
    motivation: 'Help rural education',
    skills: ['Teaching'],
    languages: ['Hindi', 'English'],
    availableDays: ['Saturday'],
  };

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      findById: jest.fn(),
      findByCode: jest.fn(),
      findByEmail: jest.fn(),
      findByPhone: jest.fn(),
      countByYear: jest.fn(),
      createIdentity: jest.fn(),
      findIdentityByVolunteerAndType: jest.fn(),
    };

    const mockStorage = {
      uploadFile: jest.fn(),
      deleteFile: jest.fn(),
      getSignedUrl: jest.fn(),
      fileExists: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VolunteersService,
        { provide: VolunteersRepository, useValue: mockRepo },
        { provide: StorageService, useValue: mockStorage },
      ],
    }).compile();

    service = module.get<VolunteersService>(VolunteersService);
    repository = module.get(VolunteersRepository);
    storageService = module.get(StorageService);
  });

  describe('register', () => {
    it('should register a volunteer with a generated code', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.findByPhone.mockResolvedValue(null);
      repository.countByYear.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockVolunteer);
      repository.findById.mockResolvedValue(mockVolunteer);

      const result = await service.register(mockRegisterDto);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Volunteer registered successfully');
      expect(result.data.volunteerCode).toBe('RPF-VOL-2026-00001');
      expect(result.data.firstName).toBe('Rahul');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          volunteerCode: 'RPF-VOL-2026-00001',
          email: 'rahul@example.com',
        }),
      );
    });

    it('should throw EntityConflictException if email already exists', async () => {
      repository.findByEmail.mockResolvedValue(mockVolunteer);

      await expect(service.register(mockRegisterDto)).rejects.toThrow(EntityConflictException);
    });

    it('should throw EntityConflictException if phone already exists', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.findByPhone.mockResolvedValue(mockVolunteer);

      await expect(service.register(mockRegisterDto)).rejects.toThrow(EntityConflictException);
    });

    it('should upload profile photo if provided', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.findByPhone.mockResolvedValue(null);
      repository.countByYear.mockResolvedValue(5);
      repository.create.mockResolvedValue({ ...mockVolunteer, profilePhotoKey: 'volunteers/photos/test.jpg' });
      repository.findById.mockResolvedValue({ ...mockVolunteer, profilePhotoKey: 'volunteers/photos/test.jpg' });
      storageService.uploadFile.mockResolvedValue({
        key: 'volunteers/photos/test.jpg',
        url: 'https://r2.example.com/volunteers/photos/test.jpg',
        size: 1024,
        mimeType: 'image/jpeg',
      });
      storageService.getSignedUrl.mockResolvedValue('https://signed.url/photo.jpg');

      const mockFile = {
        buffer: Buffer.from('test'),
        mimetype: 'image/jpeg',
        originalname: 'photo.jpg',
        size: 1024,
      } as Express.Multer.File;

      const result = await service.register(mockRegisterDto, undefined, mockFile);

      expect(storageService.uploadFile).toHaveBeenCalledWith(
        expect.objectContaining({ mimetype: 'image/jpeg' }),
        'volunteers/photos',
      );
      expect(result.data.profilePhotoUrl).toBe('https://signed.url/photo.jpg');
    });

    it('should register with identity document', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.findByPhone.mockResolvedValue(null);
      repository.countByYear.mockResolvedValue(0);
      repository.create.mockResolvedValue(mockVolunteer);
      repository.findById.mockResolvedValue({
        ...mockVolunteer,
        identities: [{
          id: 'id-1',
          volunteerId: mockVolunteer.id,
          documentType: IdentityDocumentType.AADHAAR,
          documentNumber: '123456789012',
          documentFileKey: null,
          verificationStatus: 'PENDING' as const,
          verifiedAt: null,
          verifiedBy: null,
          rejectionReason: null,
          version: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }],
      });
      repository.createIdentity.mockResolvedValue({} as never);

      const identityDto = new CreateVolunteerIdentityDto();
      identityDto.documentType = IdentityDocumentType.AADHAAR;
      identityDto.documentNumber = '123456789012';

      const result = await service.register(mockRegisterDto, identityDto);

      expect(result.success).toBe(true);
      expect(repository.createIdentity).toHaveBeenCalledWith(
        expect.objectContaining({
          documentType: IdentityDocumentType.AADHAAR,
          documentNumber: '123456789012',
        }),
      );
      expect(result.data.identities).toHaveLength(1);
      expect(result.data.identities![0].documentNumber).toBe('********9012');
    });

    it('should reject invalid Aadhaar number', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.findByPhone.mockResolvedValue(null);

      const identityDto = new CreateVolunteerIdentityDto();
      identityDto.documentType = IdentityDocumentType.AADHAAR;
      identityDto.documentNumber = '1234';

      await expect(service.register(mockRegisterDto, identityDto)).rejects.toThrow(BusinessException);
    });

    it('should reject invalid PAN number', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.findByPhone.mockResolvedValue(null);

      const identityDto = new CreateVolunteerIdentityDto();
      identityDto.documentType = IdentityDocumentType.PAN;
      identityDto.documentNumber = 'INVALID';

      await expect(service.register(mockRegisterDto, identityDto)).rejects.toThrow(BusinessException);
    });
  });

  describe('generateVolunteerCode', () => {
    it('should generate sequential code for current year', async () => {
      repository.countByYear.mockResolvedValue(42);

      const code = await service.generateVolunteerCode();
      const year = new Date().getFullYear();

      expect(code).toBe(`RPF-VOL-${year}-00043`);
    });

    it('should generate first code of the year', async () => {
      repository.countByYear.mockResolvedValue(0);

      const code = await service.generateVolunteerCode();
      const year = new Date().getFullYear();

      expect(code).toBe(`RPF-VOL-${year}-00001`);
    });
  });

  describe('findById', () => {
    it('should return volunteer when found', async () => {
      repository.findById.mockResolvedValue(mockVolunteer);

      const result = await service.findById(mockVolunteer.id);

      expect(result.success).toBe(true);
      expect(result.data.id).toBe(mockVolunteer.id);
      expect(result.data.email).toBe('rahul@example.com');
    });

    it('should throw EntityNotFoundException when not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('nonexistent-id')).rejects.toThrow(EntityNotFoundException);
    });
  });

  describe('findByCode', () => {
    it('should return volunteer when found by code', async () => {
      repository.findByCode.mockResolvedValue(mockVolunteer);

      const result = await service.findByCode('RPF-VOL-2026-00001');

      expect(result.success).toBe(true);
      expect(result.data.volunteerCode).toBe('RPF-VOL-2026-00001');
    });

    it('should throw EntityNotFoundException when code not found', async () => {
      repository.findByCode.mockResolvedValue(null);

      await expect(service.findByCode('RPF-VOL-9999-99999')).rejects.toThrow(EntityNotFoundException);
    });
  });
});
