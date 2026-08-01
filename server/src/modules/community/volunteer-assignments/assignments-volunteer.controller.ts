import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { AssignmentQueryDto } from './dto';
import { VolunteerAssignmentsService } from './volunteer-assignments.service';

@ApiTags('Volunteer - Assignments')
@Controller('volunteer/assignments')
@Roles('MEMBER', 'ADMIN', 'SUPER_ADMIN')
export class AssignmentsVolunteerController {
  constructor(private readonly service: VolunteerAssignmentsService) {}

  @Get()
  @ApiOperation({ summary: 'List my assignments' })
  findAll(
    @Query() query: AssignmentQueryDto,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.getVolunteerAssignments(volunteerId, query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get my assignment by code' })
  findByCode(
    @Param('code') code: string,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.getVolunteerAssignmentByCode(volunteerId, code);
  }

  @Patch(':code/accept')
  @ApiOperation({ summary: 'Accept an assignment' })
  accept(
    @Param('code') code: string,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.acceptAssignment(volunteerId, code);
  }

  @Patch(':code/decline')
  @ApiOperation({ summary: 'Decline an assignment' })
  decline(
    @Param('code') code: string,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.declineAssignment(volunteerId, code);
  }
}
