import { Module } from '@nestjs/common';
import { EventsAdminController } from './events-admin.controller';
import { EventsPublicController } from './events-public.controller';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

@Module({
  controllers: [EventsAdminController, EventsPublicController],
  providers: [EventsService, EventsRepository],
  exports: [EventsService],
})
export class EventsModule {}
