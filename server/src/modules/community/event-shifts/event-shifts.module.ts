import { Module } from '@nestjs/common';
import { EventShiftsController } from './event-shifts.controller';
import { EventShiftsRepository } from './event-shifts.repository';
import { EventShiftsService } from './event-shifts.service';

@Module({
  controllers: [EventShiftsController],
  providers: [EventShiftsService, EventShiftsRepository],
  exports: [EventShiftsService],
})
export class EventShiftsModule {}
