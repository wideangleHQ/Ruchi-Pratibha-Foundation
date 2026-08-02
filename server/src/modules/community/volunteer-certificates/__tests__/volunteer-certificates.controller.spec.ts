import { Test, TestingModule } from '@nestjs/testing';
import { CertificatesAdminController } from '../certificates-admin.controller';
import { CertificatesVolunteerController } from '../certificates-volunteer.controller';
import { VolunteerCertificatesService } from '../volunteer-certificates.service';

describe('CertificatesAdminController', () => {
  let controller: CertificatesAdminController;
  let service: jest.Mocked<VolunteerCertificatesService>;

  beforeEach(async () => {
    const mockService = {
      generate: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      regenerate: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      getAdminCertificates: jest.fn().mockResolvedValue({ data: [], message: 'ok' }),
      getAdminCertificateByNumber: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      verify: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
      revoke: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificatesAdminController],
      providers: [{ provide: VolunteerCertificatesService, useValue: mockService }],
    }).compile();

    controller = module.get(CertificatesAdminController);
    service = module.get(VolunteerCertificatesService);
  });

  it('should generate certificate', async () => {
    await controller.generate({ participationId: 'prt-1' }, 'admin-1');
    expect(service.generate).toHaveBeenCalledWith({ participationId: 'prt-1' }, 'admin-1');
  });

  it('should regenerate certificate', async () => {
    await controller.regenerate('RPF-CERT-2026-000001', 'admin-1');
    expect(service.regenerate).toHaveBeenCalledWith('RPF-CERT-2026-000001', 'admin-1');
  });

  it('should list certificates', async () => {
    await controller.findAll({} as any);
    expect(service.getAdminCertificates).toHaveBeenCalled();
  });

  it('should verify certificate', async () => {
    await controller.verify('RPF-CERT-2026-000001');
    expect(service.verify).toHaveBeenCalledWith('RPF-CERT-2026-000001');
  });

  it('should get certificate by number', async () => {
    await controller.findByNumber('RPF-CERT-2026-000001');
    expect(service.getAdminCertificateByNumber).toHaveBeenCalledWith('RPF-CERT-2026-000001');
  });

  it('should revoke certificate', async () => {
    await controller.revoke('RPF-CERT-2026-000001', 'admin-1');
    expect(service.revoke).toHaveBeenCalledWith('RPF-CERT-2026-000001', 'admin-1');
  });
});

describe('CertificatesVolunteerController', () => {
  let controller: CertificatesVolunteerController;
  let service: jest.Mocked<VolunteerCertificatesService>;

  beforeEach(async () => {
    const mockService = {
      getVolunteerCertificates: jest.fn().mockResolvedValue({ data: [], message: 'ok' }),
      getVolunteerCertificateByNumber: jest.fn().mockResolvedValue({ data: {}, message: 'ok' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificatesVolunteerController],
      providers: [{ provide: VolunteerCertificatesService, useValue: mockService }],
    }).compile();

    controller = module.get(CertificatesVolunteerController);
    service = module.get(VolunteerCertificatesService);
  });

  it('should list volunteer certificates', async () => {
    await controller.findAll({} as any, 'vol-1');
    expect(service.getVolunteerCertificates).toHaveBeenCalledWith('vol-1', {});
  });

  it('should get volunteer certificate by number', async () => {
    await controller.findByNumber('RPF-CERT-2026-000001', 'vol-1');
    expect(service.getVolunteerCertificateByNumber).toHaveBeenCalledWith('vol-1', 'RPF-CERT-2026-000001');
  });
});
