import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.provider';
import { CACHE_CONSTANTS } from '../common/constants';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      this.logger.error(`Cache get error for key ${key}`, (error as Error).message);
      return null;
    }
  }

  async set(key: string, value: unknown, ttl: number = CACHE_CONSTANTS.DEFAULT_TTL): Promise<void> {
    try {
      await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
    } catch (error) {
      this.logger.error(`Cache set error for key ${key}`, (error as Error).message);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      this.logger.error(`Cache del error for key ${key}`, (error as Error).message);
    }
  }

  async delByPattern(pattern: string): Promise<void> {
    try {
      const stream = this.redis.scanStream({ match: pattern, count: 100 });
      const pipeline = this.redis.pipeline();
      let count = 0;

      for await (const keys of stream) {
        for (const key of keys as string[]) {
          pipeline.del(key);
          count++;
        }
      }

      if (count > 0) {
        await pipeline.exec();
      }
    } catch (error) {
      this.logger.error(`Cache delByPattern error for pattern ${pattern}`, (error as Error).message);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      this.logger.error(`Cache exists error for key ${key}`, (error as Error).message);
      return false;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const result = await this.redis.ping();
      return result === 'PONG';
    } catch {
      return false;
    }
  }
}
