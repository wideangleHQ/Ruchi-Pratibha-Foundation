import { Module } from '@nestjs/common';
import { EventDepartmentsModule } from './event-departments/event-departments.module';
import { EventEditionsModule } from './event-editions/event-editions.module';
import { EventSchedulesModule } from './event-schedules/event-schedules.module';
import { EventSessionsModule } from './event-sessions/event-sessions.module';
import { EventShiftsModule } from './event-shifts/event-shifts.module';
import { EventSpeakersModule } from './event-speakers/event-speakers.module';
import { EventsModule } from './events/events.module';
import { VenuesModule } from './venues/venues.module';
import { VolunteerApplicationsModule } from './volunteer-applications/volunteer-applications.module';
import { VolunteerCertificatesModule } from './volunteer-certificates/volunteer-certificates.module';
import { VolunteerParticipationModule } from './volunteer-participation/volunteer-participation.module';
import { VolunteerRolesModule } from './volunteer-roles/volunteer-roles.module';
import { VolunteerVerificationModule } from './volunteer-verification/volunteer-verification.module';
import { VolunteersModule } from './volunteers/volunteers.module';

@Module({
  imports: [
    VolunteersModule,
    VolunteerVerificationModule,
    EventsModule,
    EventEditionsModule,
    VenuesModule,
    EventDepartmentsModule,
    VolunteerRolesModule,
    EventShiftsModule,
    EventSpeakersModule,
    EventSessionsModule,
    EventSchedulesModule,
    VolunteerApplicationsModule,
    VolunteerParticipationModule,
    VolunteerCertificatesModule,
  ],
})
export class CommunityModule {}
