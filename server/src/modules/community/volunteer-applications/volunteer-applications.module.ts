import { Module } from '@nestjs/common';
import { ApplicationsAdminController } from './applications-admin.controller';
import { ApplicationsVolunteerController } from './applications-volunteer.controller';
import { VolunteerApplicationsRepository } from './volunteer-applications.repository';
import { VolunteerApplicationsService } from './volunteer-applications.service';

@Module({
  controllers: [ApplicationsVolunteerController, ApplicationsAdminController],
  providers: [VolunteerApplicationsService, VolunteerApplicationsRepository],
  exports: [VolunteerApplicationsService],
})
export class VolunteerApplicationsModule {}
