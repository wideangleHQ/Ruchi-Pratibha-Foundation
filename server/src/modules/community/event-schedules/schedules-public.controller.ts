import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { ScheduleQueryDto } from './dto';
import { EventSchedulesService } from './event-schedules.service';

@ApiTags('Event Schedules')
@Controller('event-schedules')
@Public()
export class SchedulesPublicController {
  constructor(private readonly service: EventSchedulesService) {}

  @Get('edition/:editionId')
  @ApiOperation({ summary: 'List published schedule for an edition' })
  findByEdition(
    @Param('editionId', StrictParseUUIDPipe) editionId: string,
    @Query() query: ScheduleQueryDto,
  ) {
    return this.service.getPublicSchedulesByEdition(editionId, query);
  }
}
