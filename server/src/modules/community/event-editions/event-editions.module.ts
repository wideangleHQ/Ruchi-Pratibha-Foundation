import { Module } from '@nestjs/common';
import { EditionsAdminController } from './editions-admin.controller';
import { EditionsPublicController } from './editions-public.controller';
import { EventEditionsRepository } from './event-editions.repository';
import { EventEditionsService } from './event-editions.service';

@Module({
  controllers: [EditionsAdminController, EditionsPublicController],
  providers: [EventEditionsService, EventEditionsRepository],
  exports: [EventEditionsService],
})
export class EventEditionsModule {}
