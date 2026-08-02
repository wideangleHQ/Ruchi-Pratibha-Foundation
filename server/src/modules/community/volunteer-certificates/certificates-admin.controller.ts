import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Roles } from '../../../common/decorators';
import { CertificateQueryDto, GenerateCertificateDto } from './dto';
import { VolunteerCertificatesService } from './volunteer-certificates.service';

@ApiTags('Admin - Certificates')
@Controller('admin/certificates')
@Roles('SUPER_ADMIN', 'ADMIN')
export class CertificatesAdminController {
  constructor(private readonly service: VolunteerCertificatesService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate a certificate for a volunteer' })
  generate(
    @Body() dto: GenerateCertificateDto,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.generate(dto, adminId);
  }

  @Post(':certNumber/regenerate')
  @ApiOperation({ summary: 'Regenerate certificate PDF' })
  regenerate(
    @Param('certNumber') certNumber: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.regenerate(certNumber, adminId);
  }

  @Get()
  @ApiOperation({ summary: 'List all certificates' })
  findAll(@Query() query: CertificateQueryDto) {
    return this.service.getAdminCertificates(query);
  }

  @Get('verify/:certNumber')
  @ApiOperation({ summary: 'Verify a certificate' })
  verify(@Param('certNumber') certNumber: string) {
    return this.service.verify(certNumber);
  }

  @Get(':certNumber')
  @ApiOperation({ summary: 'Get certificate by number' })
  findByNumber(@Param('certNumber') certNumber: string) {
    return this.service.getAdminCertificateByNumber(certNumber);
  }

  @Delete(':certNumber')
  @ApiOperation({ summary: 'Revoke a certificate' })
  revoke(
    @Param('certNumber') certNumber: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.service.revoke(certNumber, adminId);
  }
}
