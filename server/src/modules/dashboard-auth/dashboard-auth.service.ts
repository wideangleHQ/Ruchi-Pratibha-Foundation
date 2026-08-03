import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac, randomUUID, timingSafeEqual } from 'crypto';
import { Response } from 'express';
import { DASHBOARD_AUTH_CONSTANTS } from './constants';
import { DashboardTokenPayload } from './interfaces';

@Injectable()
export class DashboardAuthService {
  private readonly logger = new Logger(DashboardAuthService.name);
  private readonly accessCode: string;
  private readonly cookieName: string;
  private readonly secret: string;
  private readonly expiresIn: string;
  private readonly enabled: boolean;
  private readonly isProduction: boolean;

  constructor(private readonly configService: ConfigService) {
    this.accessCode = this.configService.getOrThrow<string>('dashboardAuth.accessCode');
    this.cookieName = this.configService.getOrThrow<string>('dashboardAuth.cookieName');
    this.secret = this.configService.getOrThrow<string>('dashboardAuth.secret');
    this.expiresIn = this.configService.getOrThrow<string>('dashboardAuth.expires');
    this.enabled = this.configService.getOrThrow<boolean>('dashboardAuth.enabled');
    this.isProduction = this.configService.getOrThrow<string>('app.nodeEnv') === 'production';
  }

  validateAccessCode(code: string): boolean {
    if (!this.enabled) {
      throw new UnauthorizedException('Dashboard access is disabled.');
    }

    const codeBuffer = Buffer.from(code);
    const storedBuffer = Buffer.from(this.accessCode);

    if (codeBuffer.length !== storedBuffer.length) {
      return false;
    }

    return timingSafeEqual(codeBuffer, storedBuffer);
  }

  issueToken(): string {
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + this.parseExpiration(this.expiresIn);

    const payload: DashboardTokenPayload = {
      sessionId: randomUUID(),
      issuedAt: now,
      expiresAt,
      type: DASHBOARD_AUTH_CONSTANTS.TOKEN_TYPE,
    };

    return this.sign(payload);
  }

  verifyToken(token: string): DashboardTokenPayload {
    const parts = token.split('.');
    if (parts.length !== 2) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const [encodedPayload, signature] = parts;
    const expectedSignature = this.createSignature(encodedPayload);

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf-8'),
    ) as DashboardTokenPayload;

    if (payload.type !== DASHBOARD_AUTH_CONSTANTS.TOKEN_TYPE) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const now = Math.floor(Date.now() / 1000);
    if (payload.expiresAt <= now) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return payload;
  }

  setCookie(res: Response, token: string): void {
    const maxAge = this.parseExpiration(this.expiresIn) * 1000;

    res.cookie(this.cookieName, token, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge,
      signed: false,
    });
  }

  clearCookie(res: Response): void {
    res.clearCookie(this.cookieName, {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: 'lax',
      path: '/',
    });
  }

  getCookieName(): string {
    return this.cookieName;
  }

  private sign(payload: DashboardTokenPayload): string {
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = this.createSignature(encodedPayload);
    return `${encodedPayload}.${signature}`;
  }

  private createSignature(data: string): string {
    return createHmac('sha256', this.secret).update(data).digest('base64url');
  }

  private parseExpiration(value: string): number {
    const match = value.match(/^(\d+)(s|m|h|d)$/);
    if (!match) {
      this.logger.error('Invalid expiration format, defaulting to 24h');
      return 86400;
    }

    const amount = parseInt(match[1], 10);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      s: 1,
      m: 60,
      h: 3600,
      d: 86400,
    };

    return amount * multipliers[unit];
  }
}
