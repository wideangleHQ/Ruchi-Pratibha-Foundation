import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VolunteerCertificate } from '@prisma/client';

export class CertificateResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() certificateNumber!: string;
  @ApiProperty() volunteerId!: string;
  @ApiProperty() participationId!: string;
  @ApiProperty() editionId!: string;
  @ApiProperty() certificateType!: string;
  @ApiProperty() certificateStatus!: string;
  @ApiPropertyOptional() issueDate?: Date | null;
  @ApiPropertyOptional() issuedBy?: string | null;
  @ApiProperty() verificationToken!: string;
  @ApiPropertyOptional() publicUrl?: string | null;
  @ApiPropertyOptional() fileSize?: number | null;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(entity: VolunteerCertificate): CertificateResponseDto {
    const dto = new CertificateResponseDto();
    dto.id = entity.id;
    dto.certificateNumber = entity.certificateNumber;
    dto.volunteerId = entity.volunteerId;
    dto.participationId = entity.participationId;
    dto.editionId = entity.editionId;
    dto.certificateType = entity.certificateType;
    dto.certificateStatus = entity.certificateStatus;
    dto.issueDate = entity.issueDate;
    dto.issuedBy = entity.issuedBy;
    dto.verificationToken = entity.verificationToken;
    dto.publicUrl = entity.publicUrl;
    dto.fileSize = entity.fileSize;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
