import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { AdminReviewDto, ApplicationQueryDto } from './dto';
import { VolunteerApplicationsService } from './volunteer-applications.service';

@ApiTags('Admin - Applications')
@Controller('admin/applications')
@Roles('SUPER_ADMIN', 'ADMIN')
export class ApplicationsAdminController {
  constructor(private readonly service: VolunteerApplicationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all volunteer applications' })
  findAll(@Query() query: ApplicationQueryDto) {
    return this.service.getAdminApplications(query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get application detail by code' })
  findByCode(@Param('code') code: string) {
    return this.service.getAdminApplicationByCode(code);
  }

  @Patch(':code/review')
  @ApiOperation({ summary: 'Move application to Under Review' })
  review(
    @Param('code') code: string,
    @Body() dto: AdminReviewDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.moveToReview(code, dto, adminId);
  }

  @Patch(':code/approve')
  @ApiOperation({ summary: 'Approve an application' })
  approve(
    @Param('code') code: string,
    @Body() dto: AdminReviewDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.approveApplication(code, dto, adminId);
  }

  @Patch(':code/reject')
  @ApiOperation({ summary: 'Reject an application' })
  reject(
    @Param('code') code: string,
    @Body() dto: AdminReviewDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.rejectApplication(code, dto, adminId);
  }
}
