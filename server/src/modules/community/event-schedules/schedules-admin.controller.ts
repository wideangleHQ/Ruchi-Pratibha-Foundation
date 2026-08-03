import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { CreateScheduleDto, ScheduleQueryDto, UpdateScheduleDto } from './dto';
import { EventSchedulesService } from './event-schedules.service';

@ApiTags('Admin - Event Schedules')
@Controller('admin/event-schedules')
@Roles('SUPER_ADMIN', 'ADMIN')
export class SchedulesAdminController {
  constructor(private readonly service: EventSchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new schedule entry' })
  create(@Body() dto: CreateScheduleDto, @CurrentUser('sub') adminId: string) {
    return this.service.createSchedule(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all schedules (admin)' })
  findAll(@Query() query: ScheduleQueryDto) {
    return this.service.getAdminSchedules(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get schedule detail (admin)' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getAdminScheduleById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a schedule entry' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateScheduleDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateSchedule(id, dto, adminId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a schedule entry' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteSchedule(id, adminId);
  }
}
