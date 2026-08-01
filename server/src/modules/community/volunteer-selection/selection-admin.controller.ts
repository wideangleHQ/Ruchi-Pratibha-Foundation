import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { BulkSelectionDto, SelectionQueryDto, SelectionReviewDto } from './dto';
import { VolunteerSelectionService } from './volunteer-selection.service';

@ApiTags('Admin - Selections')
@Controller('admin/selections')
@Roles('SUPER_ADMIN', 'ADMIN')
export class SelectionAdminController {
  constructor(private readonly service: VolunteerSelectionService) {}

  @Post()
  @ApiOperation({ summary: 'Create selection from approved application' })
  create(
    @Body('applicationId') applicationId: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.createSelectionFromApplication(applicationId, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all selections' })
  findAll(@Query() query: SelectionQueryDto) {
    return this.service.getSelections(query);
  }

  @Get(':code')
  @ApiOperation({ summary: 'Get selection by code' })
  findByCode(@Param('code') code: string) {
    return this.service.getSelectionByCode(code);
  }

  @Patch(':code/shortlist')
  @ApiOperation({ summary: 'Shortlist a selection' })
  shortlist(
    @Param('code') code: string,
    @Body() dto: SelectionReviewDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.shortlist(code, dto, adminId);
  }

  @Patch(':code/select')
  @ApiOperation({ summary: 'Select a volunteer' })
  select(
    @Param('code') code: string,
    @Body() dto: SelectionReviewDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.select(code, dto, adminId);
  }

  @Patch(':code/reject')
  @ApiOperation({ summary: 'Reject a selection' })
  reject(
    @Param('code') code: string,
    @Body() dto: SelectionReviewDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.reject(code, dto, adminId);
  }

  @Patch(':code/waitlist')
  @ApiOperation({ summary: 'Waitlist a selection' })
  waitlist(
    @Param('code') code: string,
    @Body() dto: SelectionReviewDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.waitlist(code, dto, adminId);
  }

  @Post('bulk-select')
  @ApiOperation({ summary: 'Bulk select volunteers' })
  bulkSelect(
    @Body() dto: BulkSelectionDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.bulkSelect(dto, adminId);
  }

  @Post('bulk-reject')
  @ApiOperation({ summary: 'Bulk reject selections' })
  bulkReject(
    @Body() dto: BulkSelectionDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.bulkReject(dto, adminId);
  }
}
