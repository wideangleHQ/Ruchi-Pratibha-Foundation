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
import { CreateEditionDto, EditionQueryDto, UpdateEditionDto } from './dto';
import { EventEditionsService } from './event-editions.service';

@ApiTags('Admin - Event Editions')
@Controller('admin')
@Roles('SUPER_ADMIN', 'ADMIN')
export class EditionsAdminController {
  constructor(private readonly service: EventEditionsService) {}

  @Post('events/:eventId/editions')
  @ApiOperation({ summary: 'Create a new edition for an event program' })
  create(
    @Param('eventId', StrictParseUUIDPipe) eventId: string,
    @Body() dto: CreateEditionDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.createEdition(eventId, dto, adminId);
  }

  @Get('events/:eventId/editions')
  @ApiOperation({ summary: 'List editions for an event program (admin)' })
  findAllByEvent(
    @Param('eventId', StrictParseUUIDPipe) eventId: string,
    @Query() query: EditionQueryDto,
  ) {
    return this.service.getAdminEditions(eventId, query);
  }

  @Get('editions/:id')
  @ApiOperation({ summary: 'Get edition detail (admin)' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getAdminEditionById(id);
  }

  @Patch('editions/:id')
  @ApiOperation({ summary: 'Update an edition' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateEditionDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateEdition(id, dto, adminId);
  }

  @Delete('editions/:id')
  @ApiOperation({ summary: 'Soft delete an edition' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteEdition(id, adminId);
  }

  @Patch('editions/:id/publish')
  @ApiOperation({ summary: 'Publish an edition' })
  publish(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.publishEdition(id, adminId);
  }

  @Patch('editions/:id/archive')
  @ApiOperation({ summary: 'Archive an edition' })
  archive(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.archiveEdition(id, adminId);
  }

  @Patch('editions/:id/cancel')
  @ApiOperation({ summary: 'Cancel an edition' })
  cancel(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.cancelEdition(id, adminId);
  }

  @Patch('editions/:id/feature')
  @ApiOperation({ summary: 'Toggle featured status of an edition' })
  feature(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.toggleFeatured(id, adminId);
  }
}
