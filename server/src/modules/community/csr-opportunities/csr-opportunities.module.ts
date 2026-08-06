import { Module } from '@nestjs/common';
import { DashboardAuthModule } from '../../dashboard-auth/dashboard-auth.module';
import { CsrOpportunitiesAdminController } from './csr-opportunities-admin.controller';
import { CsrOpportunitiesPublicController } from './csr-opportunities-public.controller';
import { CsrOpportunitiesRepository } from './csr-opportunities.repository';
import { CsrOpportunitiesService } from './csr-opportunities.service';

@Module({
  imports: [DashboardAuthModule],
  controllers: [CsrOpportunitiesAdminController, CsrOpportunitiesPublicController],
  providers: [CsrOpportunitiesService, CsrOpportunitiesRepository],
  exports: [CsrOpportunitiesService],
})
export class CsrOpportunitiesModule {}
