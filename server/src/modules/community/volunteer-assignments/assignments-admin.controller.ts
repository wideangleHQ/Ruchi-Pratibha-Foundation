import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { AssignmentQueryDto, BulkAssignDto, CreateAssignmentDto, ReassignDto, UpdateAssignmentDto } from './dto';
import { VolunteerAssignmentsService } from './volunteer-assignments.service';

@ApiTags('Admin - Assignments')
@Controller('admin/assignments')
@Roles('SUPER_ADMIN', 'ADMIN')
export class AssignmentsAdminController {
  constructor(private readonly service: VolunteerAssignmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a volunteer assignment' })
  create(
    @Body() dto: CreateAssignmentDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.createAssignment(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all assignments' })
  findAll(@Query() query: AssignmentQueryDto) {
    return this.service.getAdminAssignments(query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get assignment by code' })
  findByCode(@Param('code') code: string) {
    return this.service.getAdminAssignmentByCode(code);
  }

  @Patch(':code')
  @ApiOperation({ summary: 'Update assignment details' })
  update(
    @Param('code') code: string,
    @Body() dto: UpdateAssignmentDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateAssignment(code, dto, adminId);
  }

  @Patch(':code/reassign')
  @ApiOperation({ summary: 'Reassign a volunteer' })
  reassign(
    @Param('code') code: string,
    @Body() dto: ReassignDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.reassign(code, dto, adminId);
  }

  @Patch(':code/cancel')
  @ApiOperation({ summary: 'Cancel an assignment' })
  cancel(
    @Param('code') code: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.cancelAssignment(code, adminId);
  }

  @Post('bulk-assign')
  @ApiOperation({ summary: 'Bulk assign volunteers' })
  bulkAssign(
    @Body() dto: BulkAssignDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.bulkAssign(dto, adminId);
  }
}
