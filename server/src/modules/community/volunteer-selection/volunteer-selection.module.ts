import { Module } from '@nestjs/common';
import { SelectionAdminController } from './selection-admin.controller';
import { VolunteerSelectionRepository } from './volunteer-selection.repository';
import { VolunteerSelectionService } from './volunteer-selection.service';

@Module({
  controllers: [SelectionAdminController],
  providers: [VolunteerSelectionService, VolunteerSelectionRepository],
  exports: [VolunteerSelectionService],
})
export class VolunteerSelectionModule {}
