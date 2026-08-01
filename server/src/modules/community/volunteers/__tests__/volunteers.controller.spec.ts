import { Test, TestingModule } from '@nestjs/testing';
import { EntityStatus, Gender, BloodGroup } from '@prisma/client';
import { VolunteersController } from '../volunteers.controller';
import { VolunteersService } from '../volunteers.service';
import { RegisterVolunteerDto } from '../dto/register-volunteer.dto';

describe('VolunteersController', () => {
  let controller: VolunteersController;
  let service: jest.Mocked<VolunteersService>;

  const mockVolunteerResponse = {
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
    profilePhotoUrl: null,
    emergencyName: null,
    emergencyPhone: null,
    motivation: 'Help rural education',
    skills: ['Teaching'],
    languages: ['Hindi', 'English'],
    availableDays: ['Saturday'],
    status: EntityStatus.PENDING,
    createdAt: new Date(),
    identities: [],
  };

  beforeEach(async () => {
    const mockService = {
      register: jest.fn(),
      findById: jest.fn(),
      findByCode: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteersController],
      providers: [{ provide: VolunteersService, useValue: mockService }],
    }).compile();

    controller = module.get<VolunteersController>(VolunteersController);
    service = module.get(VolunteersService);
  });

  describe('register', () => {
    it('should call service.register and return result', async () => {
      const dto: RegisterVolunteerDto = {
        firstName: 'Rahul',
        lastName: 'Sharma',
        email: 'rahul@example.com',
        phone: '+919876543210',
        dateOfBirth: '1995-06-15',
        gender: Gender.MALE,
        addressLine1: '42, MG Road',
        city: 'Bhubaneswar',
        state: 'Odisha',
        pincode: '751001',
      };

      const expectedResult = { success: true, message: 'Volunteer registered successfully', data: mockVolunteerResponse };
      service.register.mockResolvedValue(expectedResult);

      const result = await controller.register(dto);

      expect(result).toEqual(expectedResult);
      expect(service.register).toHaveBeenCalledWith(dto, undefined, undefined, undefined);
    });
  });

  describe('findById', () => {
    it('should call service.findById with UUID', async () => {
      const expectedResult = { success: true, message: 'Success', data: mockVolunteerResponse };
      service.findById.mockResolvedValue(expectedResult);

      const result = await controller.findById('a1b2c3d4-e5f6-7890-abcd-ef1234567890');

      expect(result).toEqual(expectedResult);
      expect(service.findById).toHaveBeenCalledWith('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    });
  });

  describe('findByCode', () => {
    it('should call service.findByCode', async () => {
      const expectedResult = { success: true, message: 'Success', data: mockVolunteerResponse };
      service.findByCode.mockResolvedValue(expectedResult);

      const result = await controller.findByCode('RPF-VOL-2026-00001');

      expect(result).toEqual(expectedResult);
      expect(service.findByCode).toHaveBeenCalledWith('RPF-VOL-2026-00001');
    });
  });
});
