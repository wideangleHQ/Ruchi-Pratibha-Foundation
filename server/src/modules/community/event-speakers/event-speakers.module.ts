import { Module } from '@nestjs/common';
import { EventSpeakersRepository } from './event-speakers.repository';
import { EventSpeakersService } from './event-speakers.service';
import { SpeakersAdminController } from './speakers-admin.controller';
import { SpeakersPublicController } from './speakers-public.controller';

@Module({
  controllers: [SpeakersAdminController, SpeakersPublicController],
  providers: [EventSpeakersService, EventSpeakersRepository],
  exports: [EventSpeakersService],
})
export class EventSpeakersModule {}
