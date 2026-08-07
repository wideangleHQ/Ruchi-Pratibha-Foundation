import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegistrationResponseDto {
  @ApiProperty() applicationCode!: string;
  @ApiProperty() volunteerCode!: string;
  @ApiProperty() applicationStatus!: string;
  @ApiProperty() opportunityTitle!: string;
  @ApiPropertyOptional() opportunitySlug?: string;
  @ApiProperty() submittedAt!: Date;

  static create(data: {
    applicationCode: string;
    volunteerCode: string;
    applicationStatus: string;
    opportunityTitle: string;
    opportunitySlug?: string;
    submittedAt: Date;
  }): RegistrationResponseDto {
    const dto = new RegistrationResponseDto();
    dto.applicationCode = data.applicationCode;
    dto.volunteerCode = data.volunteerCode;
    dto.applicationStatus = data.applicationStatus;
    dto.opportunityTitle = data.opportunityTitle;
    dto.opportunitySlug = data.opportunitySlug;
    dto.submittedAt = data.submittedAt;
    return dto;
  }
}
