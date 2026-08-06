import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators';
import { OpportunityQueryDto } from './dto/opportunity-query.dto';
import { CsrOpportunitiesService } from './csr-opportunities.service';

@ApiTags('CSR Opportunities')
@Controller('opportunities')
@Public()
export class CsrOpportunitiesPublicController {
  constructor(private readonly service: CsrOpportunitiesService) {}

  @Get()
  @ApiOperation({ summary: 'List published CSR opportunities' })
  findAll(@Query() query: OpportunityQueryDto) {
    return this.service.getPublicOpportunities(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get CSR opportunity by slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.service.getPublicOpportunityBySlug(slug);
  }
}
