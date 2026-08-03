import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { DashboardAuthController } from '../dashboard-auth.controller';
import { DashboardAuthService } from '../dashboard-auth.service';

describe('DashboardAuthController', () => {
  let controller: DashboardAuthController;
  let service: jest.Mocked<DashboardAuthService>;

  const mockResponse = {
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardAuthController],
      providers: [
        {
          provide: DashboardAuthService,
          useValue: {
            validateAccessCode: jest.fn(),
            issueToken: jest.fn(),
            setCookie: jest.fn(),
            clearCookie: jest.fn(),
            verifyToken: jest.fn(),
            getCookieName: jest.fn().mockReturnValue('rpf_dashboard_access'),
          },
        },
      ],
    }).compile();

    controller = module.get<DashboardAuthController>(DashboardAuthController);
    service = module.get(DashboardAuthService);
  });

  describe('POST /dashboard/access', () => {
    it('should return success and set cookie for valid code', () => {
      service.validateAccessCode.mockReturnValue(true);
      service.issueToken.mockReturnValue('signed-token');

      const result = controller.access(
        { accessCode: 'ValidCode' },
        mockResponse as never,
      );

      expect(result.success).toBe(true);
      expect(result.authenticated).toBe(true);
      expect(service.setCookie).toHaveBeenCalledWith(mockResponse, 'signed-token');
    });

    it('should throw UnauthorizedException for invalid code', () => {
      service.validateAccessCode.mockReturnValue(false);

      expect(() =>
        controller.access({ accessCode: 'WrongCode' }, mockResponse as never),
      ).toThrow(UnauthorizedException);
    });
  });

  describe('GET /dashboard/verify', () => {
    it('should return authenticated true', () => {
      const result = controller.verify();
      expect(result.success).toBe(true);
      expect(result.authenticated).toBe(true);
    });
  });

  describe('POST /dashboard/logout', () => {
    it('should clear cookie and return success', () => {
      const result = controller.logout(mockResponse as never);

      expect(result.success).toBe(true);
      expect(service.clearCookie).toHaveBeenCalledWith(mockResponse);
    });
  });
});
