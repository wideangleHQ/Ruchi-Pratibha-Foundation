import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { DashboardAccessGuard } from '../dashboard-auth.guard';
import { DashboardAuthService } from '../dashboard-auth.service';
import { DashboardTokenPayload } from '../interfaces';

describe('DashboardAccessGuard', () => {
  let guard: DashboardAccessGuard;
  let service: jest.Mocked<DashboardAuthService>;

  const mockPayload: DashboardTokenPayload = {
    sessionId: 'test-session-id',
    issuedAt: Math.floor(Date.now() / 1000),
    expiresAt: Math.floor(Date.now() / 1000) + 86400,
    type: 'dashboard-access',
  };

  beforeEach(() => {
    service = {
      getCookieName: jest.fn().mockReturnValue('rpf_dashboard_access'),
      verifyToken: jest.fn(),
    } as unknown as jest.Mocked<DashboardAuthService>;

    guard = new DashboardAccessGuard(service);
  });

  function createMockContext(cookies: Record<string, string> = {}): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ cookies }),
      }),
    } as unknown as ExecutionContext;
  }

  it('should allow request with valid cookie', () => {
    service.verifyToken.mockReturnValue(mockPayload);
    const context = createMockContext({ rpf_dashboard_access: 'valid-token' });

    expect(guard.canActivate(context)).toBe(true);
    expect(service.verifyToken).toHaveBeenCalledWith('valid-token');
  });

  it('should throw when no cookie is present', () => {
    const context = createMockContext({});

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw when cookie is empty', () => {
    const context = createMockContext({ rpf_dashboard_access: '' });

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw when token verification fails', () => {
    service.verifyToken.mockImplementation(() => {
      throw new UnauthorizedException('Invalid credentials.');
    });
    const context = createMockContext({ rpf_dashboard_access: 'bad-token' });

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should attach payload to request on success', () => {
    service.verifyToken.mockReturnValue(mockPayload);
    const request: Record<string, unknown> = { cookies: { rpf_dashboard_access: 'valid-token' } };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;

    guard.canActivate(context);

    expect(request['dashboardSession']).toEqual(mockPayload);
  });
});
