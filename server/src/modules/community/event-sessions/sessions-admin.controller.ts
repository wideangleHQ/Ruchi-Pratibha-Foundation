import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { CreateSessionDto, SessionQueryDto, UpdateSessionDto } from './dto';
import { EventSessionsService } from './event-sessions.service';

@ApiTags('Admin - Event Sessions')
@Controller('admin/event-sessions')
@Roles('SUPER_ADMIN', 'ADMIN')
export class SessionsAdminController {
  constructor(private readonly service: EventSessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event session' })
  create(@Body() dto: CreateSessionDto, @CurrentUser('sub') adminId: string) {
    return this.service.createSession(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all sessions (admin)' })
  findAll(@Query() query: SessionQueryDto) {
    return this.service.getAdminSessions(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get session detail (admin)' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getAdminSessionById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a session' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateSessionDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateSession(id, dto, adminId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a session' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteSession(id, adminId);
  }
}
