import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { CreateShiftDto, ShiftQueryDto, UpdateShiftDto } from './dto';
import { EventShiftsService } from './event-shifts.service';

@ApiTags('Admin - Event Shifts')
@Controller('admin')
@Roles('SUPER_ADMIN', 'ADMIN')
export class EventShiftsController {
  constructor(private readonly service: EventShiftsService) {}

  @Post('editions/:editionId/shifts')
  @ApiOperation({ summary: 'Create a shift for an event edition' })
  create(
    @Param('editionId', StrictParseUUIDPipe) editionId: string,
    @Body() dto: CreateShiftDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.createShift(editionId, dto, adminId);
  }

  @Get('editions/:editionId/shifts')
  @ApiOperation({ summary: 'List shifts for an event edition' })
  findByEdition(
    @Param('editionId', StrictParseUUIDPipe) editionId: string,
    @Query() query: ShiftQueryDto,
  ) {
    return this.service.getShiftsByEdition(editionId, query);
  }

  @Get('shifts/:id')
  @ApiOperation({ summary: 'Get shift detail' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getShiftById(id);
  }

  @Patch('shifts/:id')
  @ApiOperation({ summary: 'Update a shift' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateShiftDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateShift(id, dto, adminId);
  }

  @Delete('shifts/:id')
  @ApiOperation({ summary: 'Soft delete a shift' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteShift(id, adminId);
  }
}
