import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import {
  BulkDeploymentActionDto,
  BulkParticipationDto,
  CoordinatorRemarksDto,
  ParticipationQueryDto,
} from './dto';
import { VolunteerParticipationService } from './volunteer-participation.service';

@ApiTags('Admin - Participation')
@Controller('admin/participation')
@Roles('SUPER_ADMIN', 'ADMIN')
export class ParticipationAdminController {
  constructor(private readonly service: VolunteerParticipationService) {}

  @Post(':deploymentCode/report')
  @ApiOperation({ summary: 'Report participation for a deployment' })
  report(
    @Param('deploymentCode') deploymentCode: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.reportParticipation(deploymentCode, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all participations' })
  findAll(@Query() query: ParticipationQueryDto) {
    return this.service.getAdminParticipations(query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get participation by code' })
  findByCode(@Param('code') code: string) {
    return this.service.getAdminParticipationByCode(code);
  }

  @Patch(':code/complete')
  @ApiOperation({ summary: 'Mark participation as completed' })
  complete(
    @Param('code') code: string,
    @Body() dto: CoordinatorRemarksDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.markCompleted(code, dto, adminId);
  }

  @Patch(':code/not-complete')
  @ApiOperation({ summary: 'Mark participation as not completed' })
  notComplete(
    @Param('code') code: string,
    @Body() dto: CoordinatorRemarksDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.markNotCompleted(code, dto, adminId);
  }

  @Patch(':code/no-show')
  @ApiOperation({ summary: 'Mark participation as no-show' })
  noShow(
    @Param('code') code: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.markNoShow(code, adminId);
  }

  @Patch(':code/cancel')
  @ApiOperation({ summary: 'Cancel participation' })
  cancel(
    @Param('code') code: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.cancelParticipation(code, adminId);
  }

  @Patch(':code/verify')
  @ApiOperation({ summary: 'Verify a completed participation' })
  verify(
    @Param('code') code: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.verifyParticipation(code, adminId);
  }

  @Patch(':code/remarks')
  @ApiOperation({ summary: 'Update coordinator remarks' })
  remarks(
    @Param('code') code: string,
    @Body() dto: CoordinatorRemarksDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateCoordinatorRemarks(code, dto, adminId);
  }

  @Post('bulk-report')
  @ApiOperation({ summary: 'Bulk report participations from deployments' })
  bulkReport(
    @Body() dto: BulkDeploymentActionDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.bulkReport(dto, adminId);
  }

  @Post('bulk-complete')
  @ApiOperation({ summary: 'Bulk complete participations' })
  bulkComplete(
    @Body() dto: BulkParticipationDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.bulkComplete(dto, adminId);
  }

  @Post('bulk-no-show')
  @ApiOperation({ summary: 'Bulk mark participations as no-show' })
  bulkNoShow(
    @Body() dto: BulkParticipationDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.bulkMarkNoShow(dto, adminId);
  }
}
