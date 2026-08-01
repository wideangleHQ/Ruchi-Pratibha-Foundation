import { Module } from '@nestjs/common';
import { ParticipationAdminController } from './participation-admin.controller';
import { ParticipationVolunteerController } from './participation-volunteer.controller';
import { VolunteerParticipationRepository } from './volunteer-participation.repository';
import { VolunteerParticipationService } from './volunteer-participation.service';

@Module({
  controllers: [ParticipationAdminController, ParticipationVolunteerController],
  providers: [VolunteerParticipationService, VolunteerParticipationRepository],
  exports: [VolunteerParticipationService],
})
export class VolunteerParticipationModule {}
