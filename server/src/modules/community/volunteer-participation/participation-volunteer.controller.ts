import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { ParticipationQueryDto } from './dto';
import { VolunteerParticipationService } from './volunteer-participation.service';

@ApiTags('Volunteer - Participation')
@Controller('volunteer/participation')
@Roles('MEMBER', 'ADMIN', 'SUPER_ADMIN')
export class ParticipationVolunteerController {
  constructor(private readonly service: VolunteerParticipationService) {}

  @Get()
  @ApiOperation({ summary: 'List my participations' })
  findAll(
    @Query() query: ParticipationQueryDto,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.getVolunteerParticipations(volunteerId, query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get my participation by code' })
  findByCode(
    @Param('code') code: string,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.getVolunteerParticipationByCode(volunteerId, code);
  }
}
