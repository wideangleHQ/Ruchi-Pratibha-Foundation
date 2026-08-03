import { Module } from '@nestjs/common';
import { EventSessionsRepository } from './event-sessions.repository';
import { EventSessionsService } from './event-sessions.service';
import { SessionsAdminController } from './sessions-admin.controller';
import { SessionsPublicController } from './sessions-public.controller';

@Module({
  controllers: [SessionsAdminController, SessionsPublicController],
  providers: [EventSessionsService, EventSessionsRepository],
  exports: [EventSessionsService],
})
export class EventSessionsModule {}
