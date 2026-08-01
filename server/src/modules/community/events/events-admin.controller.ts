import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { CreateEventDto } from './dto/create-event.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@ApiTags('Admin - Events (Programs)')
@Controller('admin/events')
@Roles('SUPER_ADMIN', 'ADMIN')
export class EventsAdminController {
  constructor(private readonly service: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event program' })
  create(@Body() dto: CreateEventDto, @CurrentUser('sub') adminId: string) {
    return this.service.createEvent(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all event programs (admin)' })
  findAll(@Query() query: EventQueryDto) {
    return this.service.getAdminEvents(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event program detail (admin)' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getAdminEventById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event program' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateEventDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateEvent(id, dto, adminId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an event program' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteEvent(id, adminId);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate an event program' })
  deactivate(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deactivateEvent(id, adminId);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate an event program' })
  activate(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.activateEvent(id, adminId);
  }
}
