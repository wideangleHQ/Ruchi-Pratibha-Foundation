import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { DeploymentQueryDto } from './dto';
import { VolunteerDeploymentsService } from './volunteer-deployments.service';

@ApiTags('Volunteer - Deployments')
@Controller('volunteer/deployments')
@Roles('MEMBER', 'ADMIN', 'SUPER_ADMIN')
export class DeploymentsVolunteerController {
  constructor(private readonly service: VolunteerDeploymentsService) {}

  @Get()
  @ApiOperation({ summary: 'List my deployments' })
  findAll(
    @Query() query: DeploymentQueryDto,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.getVolunteerDeployments(volunteerId, query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get my deployment by code' })
  findByCode(
    @Param('code') code: string,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.getVolunteerDeploymentByCode(volunteerId, code);
  }
}
