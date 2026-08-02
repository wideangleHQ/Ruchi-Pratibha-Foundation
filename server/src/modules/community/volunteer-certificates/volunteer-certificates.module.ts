import { Module } from '@nestjs/common';
import { CertificatesAdminController } from './certificates-admin.controller';
import { CertificatesVolunteerController } from './certificates-volunteer.controller';
import { CertificatePdfService } from './certificate-pdf.service';
import { VolunteerCertificatesRepository } from './volunteer-certificates.repository';
import { VolunteerCertificatesService } from './volunteer-certificates.service';

@Module({
  controllers: [CertificatesAdminController, CertificatesVolunteerController],
  providers: [VolunteerCertificatesService, VolunteerCertificatesRepository, CertificatePdfService],
  exports: [VolunteerCertificatesService],
})
export class VolunteerCertificatesModule {}
