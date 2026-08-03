import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { DashboardAuthService } from './dashboard-auth.service';

@Injectable()
export class DashboardAccessGuard implements CanActivate {
  constructor(private readonly dashboardAuthService: DashboardAuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const cookieName = this.dashboardAuthService.getCookieName();
    const token = request.cookies?.[cookieName] as string | undefined;

    if (!token) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = this.dashboardAuthService.verifyToken(token);
    (request as unknown as Record<string, unknown>)['dashboardSession'] = payload;

    return true;
  }
}
