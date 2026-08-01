import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { ApplicationQueryDto, CreateApplicationDto } from './dto';
import { VolunteerApplicationsService } from './volunteer-applications.service';

@ApiTags('Volunteer - Applications')
@Controller('volunteer/applications')
@Roles('MEMBER', 'ADMIN', 'SUPER_ADMIN')
export class ApplicationsVolunteerController {
  constructor(private readonly service: VolunteerApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a volunteer application for an event edition' })
  submit(@Body() dto: CreateApplicationDto, @CurrentUser('sub') volunteerId: string) {
    return this.service.submitApplication(volunteerId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List my applications' })
  findAll(@Query() query: ApplicationQueryDto, @CurrentUser('sub') volunteerId: string) {
    return this.service.getVolunteerApplications(volunteerId, query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get my application by code' })
  findByCode(@Param('code') code: string, @CurrentUser('sub') volunteerId: string) {
    return this.service.getVolunteerApplicationByCode(volunteerId, code);
  }

  @Patch(':code/withdraw')
  @ApiOperation({ summary: 'Withdraw my application' })
  withdraw(@Param('code') code: string, @CurrentUser('sub') volunteerId: string) {
    return this.service.withdrawApplication(volunteerId, code);
  }
}
