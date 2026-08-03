import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators';
import { SpeakerQueryDto } from './dto';
import { EventSpeakersService } from './event-speakers.service';

@ApiTags('Event Speakers')
@Controller('event-speakers')
@Public()
export class SpeakersPublicController {
  constructor(private readonly service: EventSpeakersService) {}

  @Get()
  @ApiOperation({ summary: 'List active speakers' })
  findAll(@Query() query: SpeakerQueryDto) {
    return this.service.getPublicSpeakers(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get speaker by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.getPublicSpeakerBySlug(slug);
  }
}
