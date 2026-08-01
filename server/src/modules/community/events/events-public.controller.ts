import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators';
import { EventQueryDto } from './dto/event-query.dto';
import { EventsService } from './events.service';

@ApiTags('Events (Programs)')
@Controller('events')
@Public()
export class EventsPublicController {
  constructor(private readonly service: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'List active event programs' })
  findAll(@Query() query: EventQueryDto) {
    return this.service.getPublicEvents(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get event program by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.getEventBySlug(slug);
  }
}
