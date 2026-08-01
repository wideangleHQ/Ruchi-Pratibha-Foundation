import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerVerificationController } from '../volunteer-verification.controller';
import { VolunteerVerificationService } from '../volunteer-verification.service';

describe('VolunteerVerificationController', () => {
  let controller: VolunteerVerificationController;
  let service: jest.Mocked<VolunteerVerificationService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteerVerificationController],
      providers: [
        {
          provide: VolunteerVerificationService,
          useValue: {
            getPendingVolunteers: jest.fn().mockResolvedValue({ success: true, data: [] }),
            getVolunteerDetail: jest.fn().mockResolvedValue({ success: true, data: {} }),
            approveVolunteer: jest.fn().mockResolvedValue({ success: true, data: { verificationId: 'v1' } }),
            rejectVolunteer: jest.fn().mockResolvedValue({ success: true, data: { verificationId: 'v1' } }),
            getVerificationHistory: jest.fn().mockResolvedValue({ success: true, data: [] }),
          },
        },
      ],
    }).compile();

    controller = module.get(VolunteerVerificationController);
    service = module.get(VolunteerVerificationService);
  });

  it('should delegate getPendingVolunteers to service', async () => {
    const query = { page: 1, pageSize: 10 } as never;
    await controller.getPendingVolunteers(query);
    expect(service.getPendingVolunteers).toHaveBeenCalledWith(query);
  });

  it('should delegate getVolunteerDetail to service', async () => {
    await controller.getVolunteerDetail('vol-001');
    expect(service.getVolunteerDetail).toHaveBeenCalledWith('vol-001');
  });

  it('should delegate approveVolunteer to service with IP and user agent', async () => {
    const req = { ip: '127.0.0.1', headers: { 'user-agent': 'test' } } as never;
    await controller.approveVolunteer('vol-001', 'admin-001', { remarks: 'ok' }, req);
    expect(service.approveVolunteer).toHaveBeenCalledWith(
      'vol-001', 'admin-001', { remarks: 'ok' }, '127.0.0.1', 'test',
    );
  });

  it('should delegate rejectVolunteer to service', async () => {
    const req = { ip: '127.0.0.1', headers: { 'user-agent': 'test' } } as never;
    await controller.rejectVolunteer('vol-001', 'admin-001', { reason: 'Invalid doc', remarks: undefined }, req);
    expect(service.rejectVolunteer).toHaveBeenCalledWith(
      'vol-001', 'admin-001', { reason: 'Invalid doc', remarks: undefined }, '127.0.0.1', 'test',
    );
  });

  it('should delegate getVerificationHistory to service', async () => {
    await controller.getVerificationHistory('vol-001');
    expect(service.getVerificationHistory).toHaveBeenCalledWith('vol-001');
  });
});
