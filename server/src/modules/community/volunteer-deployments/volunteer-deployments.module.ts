import { Module } from '@nestjs/common';
import { DeploymentsAdminController } from './deployments-admin.controller';
import { DeploymentsVolunteerController } from './deployments-volunteer.controller';
import { VolunteerDeploymentsRepository } from './volunteer-deployments.repository';
import { VolunteerDeploymentsService } from './volunteer-deployments.service';

@Module({
  controllers: [DeploymentsAdminController, DeploymentsVolunteerController],
  providers: [VolunteerDeploymentsService, VolunteerDeploymentsRepository],
  exports: [VolunteerDeploymentsService],
})
export class VolunteerDeploymentsModule {}
