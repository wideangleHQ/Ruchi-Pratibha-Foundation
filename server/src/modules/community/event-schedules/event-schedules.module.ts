import { Module } from '@nestjs/common';
import { EventSchedulesRepository } from './event-schedules.repository';
import { EventSchedulesService } from './event-schedules.service';
import { SchedulesAdminController } from './schedules-admin.controller';
import { SchedulesPublicController } from './schedules-public.controller';

@Module({
  controllers: [SchedulesAdminController, SchedulesPublicController],
  providers: [EventSchedulesService, EventSchedulesRepository],
  exports: [EventSchedulesService],
})
export class EventSchedulesModule {}
