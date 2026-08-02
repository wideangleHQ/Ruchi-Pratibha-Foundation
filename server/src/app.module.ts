import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { configurations } from './config';
import { DatabaseModule } from './database';
import { RedisCacheModule } from './cache';
import { StorageModule } from './storage';
import { SupabaseStorageModule } from './supabase-storage';
import { HealthModule } from './modules/health/health.module';
import { CommunityModule } from './modules/community/community.module';
import { MediaModule } from './modules/media/media.module';
import { CorrelationIdMiddleware } from './common/middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configurations,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      expandVariables: true,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10) * 1000,
        limit: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
      },
    ]),

    DatabaseModule,
    RedisCacheModule,
    StorageModule,
    SupabaseStorageModule,

    HealthModule,
    CommunityModule,
    MediaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
