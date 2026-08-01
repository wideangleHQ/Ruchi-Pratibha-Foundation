import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CurrentUser, Roles } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { ApproveVolunteerDto } from './dto/approve-volunteer.dto';
import { PendingVolunteersQueryDto } from './dto/pending-volunteers-query.dto';
import { RejectVolunteerDto } from './dto/reject-volunteer.dto';
import { VolunteerVerificationService } from './volunteer-verification.service';

@ApiTags('Admin - Volunteer Verification')
@Controller('admin/volunteers')
@Roles('SUPER_ADMIN', 'ADMIN')
export class VolunteerVerificationController {
  constructor(private readonly service: VolunteerVerificationService) {}

  @Get('pending')
  @ApiOperation({ summary: 'List pending volunteers for verification' })
  getPendingVolunteers(@Query() query: PendingVolunteersQueryDto) {
    return this.service.getPendingVolunteers(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get volunteer detail for admin review' })
  getVolunteerDetail(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getVolunteerDetail(id);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a volunteer' })
  approveVolunteer(
    @Param('id', StrictParseUUIDPipe) id: string,
    @CurrentUser('sub') adminId: string,
    @Body() body: ApproveVolunteerDto,
    @Req() req: Request,
  ) {
    return this.service.approveVolunteer(
      id,
      adminId,
      body,
      req.ip,
      req.headers['user-agent'],
    );
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a volunteer' })
  rejectVolunteer(
    @Param('id', StrictParseUUIDPipe) id: string,
    @CurrentUser('sub') adminId: string,
    @Body() body: RejectVolunteerDto,
    @Req() req: Request,
  ) {
    return this.service.rejectVolunteer(
      id,
      adminId,
      body,
      req.ip,
      req.headers['user-agent'],
    );
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Get verification history for a volunteer' })
  getVerificationHistory(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getVerificationHistory(id);
  }
}
