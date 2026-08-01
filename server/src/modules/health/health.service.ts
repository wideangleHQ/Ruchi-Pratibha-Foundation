import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database';
import { CacheService } from '../../cache';

export interface HealthCheckResult {
  status: 'ok' | 'degraded' | 'unhealthy';
  uptime: number;
  timestamp: string;
  checks: Record<string, { status: 'up' | 'down'; responseTime?: number }>;
}

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) {}

  async check(): Promise<HealthCheckResult> {
    const checks: HealthCheckResult['checks'] = {};

    const dbCheck = await this.checkDatabase();
    checks['database'] = dbCheck;

    const redisCheck = await this.checkRedis();
    checks['redis'] = redisCheck;

    const allUp = Object.values(checks).every((c) => c.status === 'up');
    const allDown = Object.values(checks).every((c) => c.status === 'down');

    return {
      status: allUp ? 'ok' : allDown ? 'unhealthy' : 'degraded',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks,
    };
  }

  async checkReadiness(): Promise<HealthCheckResult> {
    return this.check();
  }

  checkLiveness(): { status: 'ok'; uptime: number; timestamp: string } {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }

  private async checkDatabase(): Promise<{ status: 'up' | 'down'; responseTime?: number }> {
    const start = Date.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'up', responseTime: Date.now() - start };
    } catch (error) {
      this.logger.error('Database health check failed', (error as Error).message);
      return { status: 'down' };
    }
  }

  private async checkRedis(): Promise<{ status: 'up' | 'down'; responseTime?: number }> {
    const start = Date.now();
    try {
      const healthy = await this.cacheService.isHealthy();
      return { status: healthy ? 'up' : 'down', responseTime: Date.now() - start };
    } catch (error) {
      this.logger.error('Redis health check failed', (error as Error).message);
      return { status: 'down' };
    }
  }
}
