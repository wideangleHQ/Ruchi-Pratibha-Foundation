import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators';
import { EditionQueryDto } from './dto';
import { EventEditionsService } from './event-editions.service';

@ApiTags('Event Editions')
@Controller()
@Public()
export class EditionsPublicController {
  constructor(private readonly service: EventEditionsService) {}

  @Get('events/:slug/editions')
  @ApiOperation({ summary: 'List editions for an event program (public)' })
  findByEventSlug(@Param('slug') slug: string, @Query() query: EditionQueryDto) {
    return this.service.getPublicEditionsByEventSlug(slug, query);
  }

  @Get('editions/upcoming')
  @ApiOperation({ summary: 'List upcoming editions' })
  findUpcoming(@Query() query: EditionQueryDto) {
    return this.service.getUpcomingEditions(query);
  }

  @Get('editions/featured')
  @ApiOperation({ summary: 'List featured editions' })
  findFeatured(@Query() query: EditionQueryDto) {
    return this.service.getFeaturedEditions(query);
  }

  @Get('editions/:slug')
  @ApiOperation({ summary: 'Get edition by slug (public)' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.getEditionBySlug(slug);
  }
}
