import { Module } from '@nestjs/common';
import { EventDepartmentsModule } from './event-departments/event-departments.module';
import { EventEditionsModule } from './event-editions/event-editions.module';
import { EventShiftsModule } from './event-shifts/event-shifts.module';
import { EventsModule } from './events/events.module';
import { VenuesModule } from './venues/venues.module';
import { VolunteerApplicationsModule } from './volunteer-applications/volunteer-applications.module';
import { VolunteerAssignmentsModule } from './volunteer-assignments/volunteer-assignments.module';
import { VolunteerDeploymentsModule } from './volunteer-deployments/volunteer-deployments.module';
import { VolunteerParticipationModule } from './volunteer-participation/volunteer-participation.module';
import { VolunteerRolesModule } from './volunteer-roles/volunteer-roles.module';
import { VolunteerSelectionModule } from './volunteer-selection/volunteer-selection.module';
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
    VolunteerApplicationsModule,
    VolunteerSelectionModule,
    VolunteerAssignmentsModule,
    VolunteerDeploymentsModule,
    VolunteerParticipationModule,
  ],
})
export class CommunityModule {}
