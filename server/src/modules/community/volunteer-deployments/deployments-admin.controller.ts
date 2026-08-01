import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { CreateDeploymentDto, DeploymentQueryDto } from './dto';
import { VolunteerDeploymentsService } from './volunteer-deployments.service';

@ApiTags('Admin - Deployments')
@Controller('admin/deployments')
@Roles('SUPER_ADMIN', 'ADMIN')
export class DeploymentsAdminController {
  constructor(private readonly service: VolunteerDeploymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a volunteer deployment' })
  create(
    @Body() dto: CreateDeploymentDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.createDeployment(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all deployments' })
  findAll(@Query() query: DeploymentQueryDto) {
    return this.service.getAdminDeployments(query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get deployment by code' })
  findByCode(@Param('code') code: string) {
    return this.service.getAdminDeploymentByCode(code);
  }

  @Patch(':code/confirm')
  @ApiOperation({ summary: 'Confirm a deployment' })
  confirm(
    @Param('code') code: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.confirmDeployment(code, adminId);
  }

  @Patch(':code/cancel')
  @ApiOperation({ summary: 'Cancel a deployment' })
  cancel(
    @Param('code') code: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.cancelDeployment(code, adminId);
  }

  @Patch(':code/no-show')
  @ApiOperation({ summary: 'Mark deployment as no-show' })
  noShow(
    @Param('code') code: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.markNoShow(code, adminId);
  }
}
