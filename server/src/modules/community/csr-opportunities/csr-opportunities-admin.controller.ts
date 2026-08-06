import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { DashboardAccessGuard } from '../../dashboard-auth/dashboard-auth.guard';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { OpportunityQueryDto } from './dto/opportunity-query.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { CsrOpportunitiesService } from './csr-opportunities.service';

@ApiTags('Admin - CSR Opportunities')
@Controller('admin/csr-opportunities')
@UseGuards(DashboardAccessGuard)
@Roles('SUPER_ADMIN', 'ADMIN')
export class CsrOpportunitiesAdminController {
  constructor(private readonly service: CsrOpportunitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new CSR opportunity' })
  create(@Body() dto: CreateOpportunityDto, @CurrentUser('sub') adminId: string) {
    return this.service.createOpportunity(dto, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all CSR opportunities (admin)' })
  findAll(@Query() query: OpportunityQueryDto) {
    return this.service.getAdminOpportunities(query);
  }

  @Get('archived')
  @ApiOperation({ summary: 'List archived CSR opportunities' })
  findArchived(@Query() query: OpportunityQueryDto) {
    return this.service.getArchivedOpportunities(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get CSR opportunity detail (admin)' })
  findOne(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getAdminOpportunityById(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get CSR opportunity application stats' })
  getStats(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.service.getStats(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a CSR opportunity' })
  update(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: UpdateOpportunityDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.updateOpportunity(id, dto, adminId);
  }

  @Patch(':id/publish')
  @ApiOperation({ summary: 'Publish a CSR opportunity' })
  publish(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.publishOpportunity(id, adminId);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive a CSR opportunity' })
  archive(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.archiveOpportunity(id, adminId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a CSR opportunity' })
  remove(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.deleteOpportunity(id, adminId);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a CSR opportunity' })
  duplicate(@Param('id', StrictParseUUIDPipe) id: string, @CurrentUser('sub') adminId: string) {
    return this.service.duplicateOpportunity(id, adminId);
  }

  @Post('bulk/publish')
  @ApiOperation({ summary: 'Bulk publish CSR opportunities' })
  bulkPublish(@Body() body: { ids: string[] }, @CurrentUser('sub') adminId: string) {
    return this.service.bulkPublish(body.ids, adminId);
  }

  @Post('bulk/archive')
  @ApiOperation({ summary: 'Bulk archive CSR opportunities' })
  bulkArchive(@Body() body: { ids: string[] }, @CurrentUser('sub') adminId: string) {
    return this.service.bulkArchive(body.ids, adminId);
  }

  @Post('bulk/delete')
  @ApiOperation({ summary: 'Bulk delete CSR opportunities' })
  bulkDelete(@Body() body: { ids: string[] }, @CurrentUser('sub') adminId: string) {
    return this.service.bulkDelete(body.ids, adminId);
  }
}
