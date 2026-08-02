import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { CertificateQueryDto } from './dto';
import { VolunteerCertificatesService } from './volunteer-certificates.service';

@ApiTags('Volunteer - Certificates')
@Controller('volunteer/certificates')
@Roles('MEMBER', 'ADMIN', 'SUPER_ADMIN')
export class CertificatesVolunteerController {
  constructor(private readonly service: VolunteerCertificatesService) {}

  @Get()
  @ApiOperation({ summary: 'List my certificates' })
  findAll(
    @Query() query: CertificateQueryDto,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.getVolunteerCertificates(volunteerId, query);
  }

  @Get(':certNumber')
  @ApiOperation({ summary: 'Get my certificate by number' })
  findByNumber(
    @Param('certNumber') certNumber: string,
    @CurrentUser('sub') volunteerId: string,
  ) {
    return this.service.getVolunteerCertificateByNumber(volunteerId, certNumber);
  }
}
