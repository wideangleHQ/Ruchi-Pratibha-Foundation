import { Module } from '@nestjs/common';
import { AssignmentsAdminController } from './assignments-admin.controller';
import { AssignmentsVolunteerController } from './assignments-volunteer.controller';
import { VolunteerAssignmentsRepository } from './volunteer-assignments.repository';
import { VolunteerAssignmentsService } from './volunteer-assignments.service';

@Module({
  controllers: [AssignmentsAdminController, AssignmentsVolunteerController],
  providers: [VolunteerAssignmentsService, VolunteerAssignmentsRepository],
  exports: [VolunteerAssignmentsService],
})
export class VolunteerAssignmentsModule {}
