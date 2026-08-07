import {
  Body,
  Controller,
  Param,
  Post,
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
import { Public } from '../../../common/decorators';
import { StrictParseUUIDPipe } from '../../../common/pipes';
import { PublicRegisterDto } from './dto/public-register.dto';
import { PublicRegistrationService } from './public-registration.service';

@ApiTags('Public Volunteer Registration')
@Controller('opportunities')
@Public()
export class PublicRegistrationController {
  constructor(private readonly service: PublicRegistrationService) {}

  @Post(':id/register')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'profilePhoto', maxCount: 1 },
      { name: 'identityDocument', maxCount: 1 },
    ]),
  )
  @ApiOperation({
    summary: 'Register as volunteer for a CSR opportunity',
    description: 'Public endpoint. Creates volunteer, identity, profile and application in one transaction.',
  })
  @ApiParam({ name: 'id', description: 'CSR Opportunity UUID', type: String })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string', example: 'Rahul Sharma' },
        dateOfBirth: { type: 'string', example: '1995-06-15' },
        gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'] },
        mobile: { type: 'string', example: '+919876543210' },
        whatsapp: { type: 'string', example: '+919876543210' },
        email: { type: 'string', example: 'rahul@example.com' },
        address: { type: 'string', example: '42, MG Road' },
        district: { type: 'string', example: 'Khordha' },
        state: { type: 'string', example: 'Odisha' },
        pincode: { type: 'string', example: '751001' },
        identityDocumentType: { type: 'string', enum: ['AADHAAR', 'PAN', 'VOTER_ID', 'DRIVING_LICENSE', 'PASSPORT'] },
        identityDocumentNumber: { type: 'string', example: '123456789012' },
        emergencyContactName: { type: 'string', example: 'Priya Sharma' },
        emergencyContactRelationship: { type: 'string', example: 'Mother' },
        emergencyContactMobile: { type: 'string', example: '+919876543211' },
        qualification: { type: 'string', example: 'B.Tech' },
        occupation: { type: 'string', example: 'Software Engineer' },
        organizationOrCollege: { type: 'string', example: 'IIT Bhubaneswar' },
        skills: { type: 'string', example: 'Teaching, Photography' },
        availability: { type: 'string', description: 'JSON array: ["Weekdays","Morning"]' },
        whyVolunteer: { type: 'string' },
        previousExperience: { type: 'string' },
        additionalNotes: { type: 'string' },
        profilePhoto: { type: 'string', format: 'binary' },
        identityDocument: { type: 'string', format: 'binary' },
      },
      required: [
        'fullName', 'dateOfBirth', 'gender', 'mobile', 'email',
        'address', 'district', 'state', 'pincode',
        'identityDocumentType', 'identityDocumentNumber',
        'emergencyContactName', 'emergencyContactRelationship', 'emergencyContactMobile',
        'identityDocument',
      ],
    },
  })
  @ApiResponse({ status: 201, description: 'Volunteer registered and application submitted' })
  @ApiResponse({ status: 400, description: 'Validation error / Registration closed / Opportunity full' })
  @ApiResponse({ status: 404, description: 'Opportunity not found' })
  @ApiResponse({ status: 409, description: 'Duplicate email or phone / Already applied' })
  async register(
    @Param('id', StrictParseUUIDPipe) id: string,
    @Body() dto: PublicRegisterDto,
    @UploadedFiles()
    files?: {
      profilePhoto?: Express.Multer.File[];
      identityDocument?: Express.Multer.File[];
    },
  ) {
    if (dto.availability && typeof dto.availability === 'string') {
      dto.availability = JSON.parse(dto.availability as unknown as string);
    }

    return this.service.registerForOpportunity(
      id,
      dto,
      files?.profilePhoto?.[0],
      files?.identityDocument?.[0],
    );
  }
}
