import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VolunteersService } from './volunteers.service';
import { RegisterVolunteerDto } from './dto/register-volunteer.dto';
import { CreateVolunteerIdentityDto } from './dto/create-volunteer-identity.dto';
import { VolunteerQueryDto } from './dto/volunteer-query.dto';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { CurrentUser, Roles } from '../../../common/decorators';

@ApiTags('Volunteers')
@Controller('volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePhoto', maxCount: 1 },
      { name: 'identityDocument', maxCount: 1 },
    ]),
  )
  @ApiOperation({ summary: 'Register a new volunteer' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', example: 'Rahul' },
        lastName: { type: 'string', example: 'Sharma' },
        email: { type: 'string', example: 'rahul@example.com' },
        phone: { type: 'string', example: '+919876543210' },
        dateOfBirth: { type: 'string', example: '1995-06-15' },
        gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'] },
        bloodGroup: { type: 'string', enum: ['A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'UNKNOWN'] },
        occupation: { type: 'string' },
        organization: { type: 'string' },
        addressLine1: { type: 'string', example: '42, MG Road' },
        addressLine2: { type: 'string' },
        city: { type: 'string', example: 'Bhubaneswar' },
        state: { type: 'string', example: 'Odisha' },
        pincode: { type: 'string', example: '751001' },
        country: { type: 'string', example: 'India' },
        emergencyName: { type: 'string' },
        emergencyPhone: { type: 'string' },
        motivation: { type: 'string' },
        skills: { type: 'string', description: 'JSON array of skills' },
        languages: { type: 'string', description: 'JSON array of languages' },
        availableDays: { type: 'string', description: 'JSON array of available days' },
        identityDocumentType: { type: 'string', enum: ['AADHAAR', 'PAN', 'VOTER_ID', 'DRIVING_LICENSE', 'PASSPORT'] },
        identityDocumentNumber: { type: 'string' },
        profilePhoto: { type: 'string', format: 'binary' },
        identityDocument: { type: 'string', format: 'binary' },
      },
      required: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender', 'addressLine1', 'city', 'state', 'pincode'],
    },
  })
  @ApiResponse({ status: 201, description: 'Volunteer registered successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 409, description: 'Duplicate email or phone' })
  async register(
    @Body() dto: RegisterVolunteerDto,
    @Body('identityDocumentType') identityDocumentType?: string,
    @Body('identityDocumentNumber') identityDocumentNumber?: string,
    @UploadedFiles()
    files?: {
      profilePhoto?: Express.Multer.File[];
      identityDocument?: Express.Multer.File[];
    },
  ) {
    if (dto.skills && typeof dto.skills === 'string') {
      dto.skills = JSON.parse(dto.skills as unknown as string);
    }
    if (dto.languages && typeof dto.languages === 'string') {
      dto.languages = JSON.parse(dto.languages as unknown as string);
    }
    if (dto.availableDays && typeof dto.availableDays === 'string') {
      dto.availableDays = JSON.parse(dto.availableDays as unknown as string);
    }

    let identityDto: CreateVolunteerIdentityDto | undefined;
    if (identityDocumentType && identityDocumentNumber) {
      identityDto = new CreateVolunteerIdentityDto();
      identityDto.documentType = identityDocumentType as CreateVolunteerIdentityDto['documentType'];
      identityDto.documentNumber = identityDocumentNumber;
    }

    return this.volunteersService.register(
      dto,
      identityDto,
      files?.profilePhoto?.[0],
      files?.identityDocument?.[0],
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get volunteer by ID' })
  @ApiParam({ name: 'id', description: 'Volunteer UUID', type: String })
  @ApiResponse({ status: 200, description: 'Volunteer found' })
  @ApiResponse({ status: 404, description: 'Volunteer not found' })
  async findById(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.volunteersService.findById(id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get volunteer by volunteer code' })
  @ApiParam({ name: 'code', description: 'Volunteer code (e.g. RPF-VOL-2026-00001)', type: String })
  @ApiResponse({ status: 200, description: 'Volunteer found' })
  @ApiResponse({ status: 404, description: 'Volunteer not found' })
  async findByCode(@Param('code') code: string) {
    return this.volunteersService.findByCode(code);
  }
}

@ApiTags('Admin - Volunteers')
@Controller('admin/volunteers')
@Roles('SUPER_ADMIN', 'ADMIN')
export class VolunteersAdminController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard volunteer and application stats' })
  getStats() {
    return this.volunteersService.getDashboardStats();
  }

  @Get()
  @ApiOperation({ summary: 'List all volunteers with filters' })
  findAll(@Query() query: VolunteerQueryDto) {
    return this.volunteersService.getAdminVolunteers(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get volunteer detail by ID' })
  findById(@Param('id', StrictParseUUIDPipe) id: string) {
    return this.volunteersService.getAdminVolunteerById(id);
  }

  @Patch(':id/verify')
  @ApiOperation({ summary: 'Verify a volunteer' })
  verify(
    @Param('id', StrictParseUUIDPipe) id: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.volunteersService.verifyVolunteer(id, adminId);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a volunteer' })
  reject(
    @Param('id', StrictParseUUIDPipe) id: string,
    @CurrentUser('sub') adminId: string,
  ) {
    return this.volunteersService.rejectVolunteer(id, adminId);
  }
}
