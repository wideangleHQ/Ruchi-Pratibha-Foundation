import { Module } from '@nestjs/common';
import { VolunteerRolesController } from './volunteer-roles.controller';
import { VolunteerRolesRepository } from './volunteer-roles.repository';
import { VolunteerRolesService } from './volunteer-roles.service';

@Module({
  controllers: [VolunteerRolesController],
  providers: [VolunteerRolesService, VolunteerRolesRepository],
  exports: [VolunteerRolesService],
})
export class VolunteerRolesModule {}
