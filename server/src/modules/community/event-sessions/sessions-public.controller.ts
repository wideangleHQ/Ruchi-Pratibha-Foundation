import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { SessionQueryDto } from './dto';
import { EventSessionsService } from './event-sessions.service';

@ApiTags('Event Sessions')
@Controller('event-sessions')
@Public()
export class SessionsPublicController {
  constructor(private readonly service: EventSessionsService) {}

  @Get('edition/:editionId')
  @ApiOperation({ summary: 'List sessions for an edition' })
  findByEdition(
    @Param('editionId', StrictParseUUIDPipe) editionId: string,
    @Query() query: SessionQueryDto,
  ) {
    return this.service.getPublicSessionsByEdition(editionId, query);
  }
}
