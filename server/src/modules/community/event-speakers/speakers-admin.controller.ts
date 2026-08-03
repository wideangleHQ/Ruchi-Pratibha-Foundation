import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { CreateSpeakerDto, SpeakerQueryDto, UpdateSpeakerDto } from './dto';
import { EventSpeakersService } from './event-speakers.service';

@ApiTags('Admin - Event Speakers')
@Controller('admin/event-speakers')
@Roles('SUPER_ADMIN', 'ADMIN')
export class SpeakersAdminController {
  constructor(private readonly service: EventSpeakersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event speaker' })
  create(@Body() dto: CreateSpeakerDto, @CurrentUser('sub') adminId: string) {
    return this.service.createSpeaker(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all speakers (admin)' })
  findAll(@Query() query: SpeakerQueryDto) {
    return this.service.getAdminSpeakers(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get speaker detail (admin)' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getAdminSpeakerById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a speaker' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateSpeakerDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateSpeaker(id, dto, adminId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a speaker' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteSpeaker(id, adminId);
  }
}
