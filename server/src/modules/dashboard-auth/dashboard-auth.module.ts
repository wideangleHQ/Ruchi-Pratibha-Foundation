import { Module } from '@nestjs/common';
import { DashboardAuthController } from './dashboard-auth.controller';
import { DashboardAuthService } from './dashboard-auth.service';
import { DashboardAccessGuard } from './dashboard-auth.guard';

@Module({
  controllers: [DashboardAuthController],
  providers: [DashboardAuthService, DashboardAccessGuard],
  exports: [DashboardAuthService, DashboardAccessGuard],
})
export class DashboardAuthModule {}
