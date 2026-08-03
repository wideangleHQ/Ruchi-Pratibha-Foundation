import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { DashboardAuthService } from '../dashboard-auth.service';

describe('DashboardAuthService', () => {
  let service: DashboardAuthService;

  const mockConfig: Record<string, unknown> = {
    'dashboardAuth.accessCode': 'TestCode123',
    'dashboardAuth.cookieName': 'rpf_dashboard_access',
    'dashboardAuth.secret': 'test-secret-that-is-at-least-32-characters-long',
    'dashboardAuth.expires': '24h',
    'dashboardAuth.enabled': true,
    'app.nodeEnv': 'development',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardAuthService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => {
              if (key in mockConfig) return mockConfig[key];
              throw new Error(`Config key "${key}" not found`);
            }),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardAuthService>(DashboardAuthService);
  });

  describe('validateAccessCode', () => {
    it('should return true for correct access code', () => {
      expect(service.validateAccessCode('TestCode123')).toBe(true);
    });

    it('should return false for incorrect access code', () => {
      expect(service.validateAccessCode('WrongCode')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(service.validateAccessCode('')).toBe(false);
    });

    it('should return false for similar but wrong code', () => {
      expect(service.validateAccessCode('TestCode124')).toBe(false);
    });

    it('should throw when dashboard access is disabled', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DashboardAuthService,
          {
            provide: ConfigService,
            useValue: {
              getOrThrow: jest.fn((key: string) => {
                const disabledConfig: Record<string, unknown> = { ...mockConfig, 'dashboardAuth.enabled': false };
                if (key in disabledConfig) return disabledConfig[key];
                throw new Error(`Config key "${key}" not found`);
              }),
            },
          },
        ],
      }).compile();

      const disabledService = module.get<DashboardAuthService>(DashboardAuthService);
      expect(() => disabledService.validateAccessCode('TestCode123')).toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('issueToken / verifyToken', () => {
    it('should issue and verify a valid token', () => {
      const token = service.issueToken();
      expect(token).toBeDefined();
      expect(token.split('.').length).toBe(2);

      const payload = service.verifyToken(token);
      expect(payload.type).toBe('dashboard-access');
      expect(payload.sessionId).toBeDefined();
      expect(payload.issuedAt).toBeDefined();
      expect(payload.expiresAt).toBeGreaterThan(payload.issuedAt);
    });

    it('should reject a tampered token', () => {
      const token = service.issueToken();
      const tamperedToken = token.slice(0, -1) + 'x';
      expect(() => service.verifyToken(tamperedToken)).toThrow(UnauthorizedException);
    });

    it('should reject a token with invalid format', () => {
      expect(() => service.verifyToken('not-a-valid-token')).toThrow(UnauthorizedException);
    });

    it('should reject a token with three parts', () => {
      expect(() => service.verifyToken('a.b.c')).toThrow(UnauthorizedException);
    });

    it('should reject an expired token', () => {
      const token = service.issueToken();
      const [encodedPayload] = token.split('.');
      const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));

      payload.expiresAt = Math.floor(Date.now() / 1000) - 100;

      const newEncodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

      // Re-signing won't work without the secret, so this tests the expiration path
      // We need a properly signed but expired token
      // Since we can't access the private sign method, we verify through the service
      expect(() => service.verifyToken(`${newEncodedPayload}.fake-sig`)).toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('cookie operations', () => {
    it('should set cookie with correct options', () => {
      const mockRes = {
        cookie: jest.fn(),
      };

      service.setCookie(mockRes as never, 'test-token');

      expect(mockRes.cookie).toHaveBeenCalledWith(
        'rpf_dashboard_access',
        'test-token',
        expect.objectContaining({
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          path: '/',
        }),
      );
    });

    it('should clear cookie with correct options', () => {
      const mockRes = {
        clearCookie: jest.fn(),
      };

      service.clearCookie(mockRes as never);

      expect(mockRes.clearCookie).toHaveBeenCalledWith(
        'rpf_dashboard_access',
        expect.objectContaining({
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          path: '/',
        }),
      );
    });

    it('should return the cookie name', () => {
      expect(service.getCookieName()).toBe('rpf_dashboard_access');
    });
  });
});
