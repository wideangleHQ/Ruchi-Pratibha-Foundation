import { Provider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const redisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: (configService: ConfigService): Redis => {
    const logger = new Logger('RedisProvider');

    const host = configService.getOrThrow<string>('cache.host');
    const port = configService.getOrThrow<number>('cache.port');
    const password = configService.get<string>('cache.password');
    const db = configService.getOrThrow<number>('cache.db');
    const keyPrefix = configService.getOrThrow<string>('cache.keyPrefix');

    const redis = new Redis({
      host,
      port,
      password: password || undefined,
      db,
      keyPrefix,
      retryStrategy: (times: number) => {
        if (times > 3) {
          logger.error('Redis connection failed after 3 retries');
          return null;
        }
        return Math.min(times * 200, 2000);
      },
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    redis.on('connect', () => logger.log('Redis connected'));
    redis.on('error', (err) => logger.error('Redis error', err.message));
    redis.on('close', () => logger.warn('Redis connection closed'));

    return redis;
  },
  inject: [ConfigService],
};
