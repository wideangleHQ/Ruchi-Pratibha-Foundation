import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import {
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

  @Post('from-application/:applicationId')
  @ApiOperation({ summary: 'Create participation from an approved application' })
  createFromApplication(
    @Param('applicationId') applicationId: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.createFromApplication(applicationId, adminId);
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

  @Patch(':code/start')
  @ApiOperation({ summary: 'Start participation' })
  start(
    @Param('code') code: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.startParticipation(code, adminId);
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

  @Patch(':code/cancel')
  @ApiOperation({ summary: 'Cancel participation' })
  cancel(
    @Param('code') code: string,
    @Body() dto: CoordinatorRemarksDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.cancelParticipation(code, dto, adminId);
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

  @Patch(':code/certificate-eligibility')
  @ApiOperation({ summary: 'Set certificate eligibility' })
  certificateEligibility(
    @Param('code') code: string,
    @Body('eligible') eligible: boolean,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.setCertificateEligibility(code, eligible, adminId);
  }

  @Post('bulk-complete')
  @ApiOperation({ summary: 'Bulk complete participations' })
  bulkComplete(
    @Body() dto: BulkParticipationDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.bulkComplete(dto, adminId);
  }
}
