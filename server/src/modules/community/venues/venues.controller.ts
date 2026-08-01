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
import { CreateVenueDto, UpdateVenueDto, VenueQueryDto } from './dto';
import { VenuesService } from './venues.service';

@ApiTags('Admin - Venues')
@Controller('admin/venues')
@Roles('SUPER_ADMIN', 'ADMIN')
export class VenuesController {
  constructor(private readonly service: VenuesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new venue' })
  create(@Body() dto: CreateVenueDto, @CurrentUser('sub') adminId: string) {
    return this.service.createVenue(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all venues' })
  findAll(@Query() query: VenueQueryDto) {
    return this.service.getVenues(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get venue detail' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getVenueById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a venue' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateVenueDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateVenue(id, dto, adminId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a venue' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteVenue(id, adminId);
  }
}
