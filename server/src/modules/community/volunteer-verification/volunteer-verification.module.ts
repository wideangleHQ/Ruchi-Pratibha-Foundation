import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database';
import { VolunteerVerificationController } from './volunteer-verification.controller';
import { VolunteerVerificationRepository } from './volunteer-verification.repository';
import { VolunteerVerificationService } from './volunteer-verification.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VolunteerVerificationController],
  providers: [VolunteerVerificationService, VolunteerVerificationRepository],
  exports: [VolunteerVerificationService],
})
export class VolunteerVerificationModule {}
