import { Module } from '@nestjs/common';
import { EventDepartmentsController } from './event-departments.controller';
import { EventDepartmentsRepository } from './event-departments.repository';
import { EventDepartmentsService } from './event-departments.service';

@Module({
  controllers: [EventDepartmentsController],
  providers: [EventDepartmentsService, EventDepartmentsRepository],
  exports: [EventDepartmentsService],
})
export class EventDepartmentsModule {}
