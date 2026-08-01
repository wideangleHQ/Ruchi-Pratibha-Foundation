import { Injectable, Logger } from '@nestjs/common';
import { VolunteerStatus } from '@prisma/client';
import { ApiResponseDto } from '../../../common/dto';
import {
  BusinessException,
  EntityNotFoundException,
} from '../../../common/exceptions';
import { PaginationMeta } from '../../../common/interfaces';
import { ApproveVolunteerDto } from './dto/approve-volunteer.dto';
import { PendingVolunteersQueryDto } from './dto/pending-volunteers-query.dto';
import { RejectVolunteerDto } from './dto/reject-volunteer.dto';
import {
  AdminIdentityDto,
  AdminVolunteerDetailDto,
  PendingVolunteerSummaryDto,
  VerificationHistoryItemDto,
} from './dto/verification-response.dto';
import { VolunteerVerificationRepository } from './volunteer-verification.repository';

@Injectable()
export class VolunteerVerificationService {
  private readonly logger = new Logger(VolunteerVerificationService.name);

  constructor(
    private readonly repository: VolunteerVerificationRepository,
  ) {}

  async getPendingVolunteers(query: PendingVolunteersQueryDto) {
    const { data, total } = await this.repository.findPending({
      skip: query.skip,
      take: query.take,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      city: query.city,
      state: query.state,
    });

    const items: PendingVolunteerSummaryDto[] = data.map((v) => {
      const dto = new PendingVolunteerSummaryDto();
      dto.id = v.id;
      dto.volunteerCode = v.volunteerCode;
      dto.firstName = v.firstName;
      dto.lastName = v.lastName;
      dto.email = v.email;
      dto.phone = v.phone;
      dto.city = v.city;
      dto.state = v.state;
      dto.volunteerStatus = v.volunteerStatus;
      dto.hasIdentityDocument = v.identities.length > 0;
      dto.createdAt = v.createdAt;
      return dto;
    });

    const meta: PaginationMeta = {
      page: query.page,
      pageSize: query.pageSize,
      totalItems: total,
      totalPages: Math.ceil(total / query.pageSize),
      hasNextPage: query.page < Math.ceil(total / query.pageSize),
      hasPreviousPage: query.page > 1,
    };

    return ApiResponseDto.paginated(items, meta, 'Pending volunteers retrieved');
  }

  async getVolunteerDetail(volunteerId: string) {
    const volunteer = await this.repository.findVolunteerForAdmin(volunteerId);
    if (!volunteer) {
      throw new EntityNotFoundException('Volunteer', volunteerId);
    }

    const dto = new AdminVolunteerDetailDto();
    dto.id = volunteer.id;
    dto.volunteerCode = volunteer.volunteerCode;
    dto.firstName = volunteer.firstName;
    dto.lastName = volunteer.lastName;
    dto.email = volunteer.email;
    dto.phone = volunteer.phone;
    dto.dateOfBirth = volunteer.dateOfBirth;
    dto.gender = volunteer.gender;
    dto.bloodGroup = volunteer.bloodGroup;
    dto.occupation = volunteer.occupation;
    dto.organization = volunteer.organization;
    dto.addressLine1 = volunteer.addressLine1;
    dto.addressLine2 = volunteer.addressLine2;
    dto.city = volunteer.city;
    dto.state = volunteer.state;
    dto.pincode = volunteer.pincode;
    dto.country = volunteer.country;
    dto.profilePhotoUrl = volunteer.profilePhotoKey;
    dto.motivation = volunteer.motivation;
    dto.skills = volunteer.skills;
    dto.languages = volunteer.languages;
    dto.volunteerStatus = volunteer.volunteerStatus;
    dto.createdAt = volunteer.createdAt;

    dto.identities = volunteer.identities.map((identity) => {
      const idDto = new AdminIdentityDto();
      idDto.id = identity.id;
      idDto.documentType = identity.documentType;
      idDto.documentNumber = this.maskDocumentNumber(identity.documentNumber);
      idDto.documentFileUrl = identity.documentFileKey;
      idDto.verificationStatus = identity.verificationStatus;
      idDto.createdAt = identity.createdAt;
      return idDto;
    });

    dto.verificationHistory = volunteer.verifications.map((v) =>
      VerificationHistoryItemDto.fromEntity(v),
    );

    return ApiResponseDto.success(dto, 'Volunteer detail retrieved');
  }

  async approveVolunteer(
    volunteerId: string,
    adminId: string,
    body: ApproveVolunteerDto,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const currentStatus = await this.repository.getVolunteerStatus(volunteerId);
    if (currentStatus === null) {
      throw new EntityNotFoundException('Volunteer', volunteerId);
    }

    if (currentStatus === VolunteerStatus.VERIFIED) {
      throw new BusinessException('Volunteer is already verified');
    }

    if (
      currentStatus !== VolunteerStatus.PENDING_VERIFICATION &&
      currentStatus !== VolunteerStatus.REJECTED
    ) {
      throw new BusinessException(
        `Cannot approve volunteer with status '${currentStatus}'`,
      );
    }

    const hasDocuments = await this.repository.hasIdentityDocuments(volunteerId);
    if (!hasDocuments) {
      throw new BusinessException(
        'Cannot approve volunteer without identity documents',
      );
    }

    const verification = await this.repository.approveVolunteer(
      volunteerId,
      adminId,
      currentStatus,
      body.remarks,
      ipAddress,
      userAgent,
    );

    this.logger.log(
      `Volunteer ${volunteerId} approved by admin ${adminId} (verification: ${verification.id})`,
    );

    return ApiResponseDto.success(
      { verificationId: verification.id },
      'Volunteer approved successfully',
    );
  }

  async rejectVolunteer(
    volunteerId: string,
    adminId: string,
    body: RejectVolunteerDto,
    ipAddress?: string,
    userAgent?: string,
  ) {
    const currentStatus = await this.repository.getVolunteerStatus(volunteerId);
    if (currentStatus === null) {
      throw new EntityNotFoundException('Volunteer', volunteerId);
    }

    if (currentStatus === VolunteerStatus.REJECTED) {
      throw new BusinessException('Volunteer is already rejected');
    }

    if (
      currentStatus !== VolunteerStatus.PENDING_VERIFICATION &&
      currentStatus !== VolunteerStatus.VERIFIED
    ) {
      throw new BusinessException(
        `Cannot reject volunteer with status '${currentStatus}'`,
      );
    }

    const verification = await this.repository.rejectVolunteer(
      volunteerId,
      adminId,
      currentStatus,
      body.reason,
      body.remarks,
      ipAddress,
      userAgent,
    );

    this.logger.log(
      `Volunteer ${volunteerId} rejected by admin ${adminId} (verification: ${verification.id})`,
    );

    return ApiResponseDto.success(
      { verificationId: verification.id },
      'Volunteer rejected successfully',
    );
  }

  async getVerificationHistory(volunteerId: string) {
    const exists = await this.repository.volunteerExists(volunteerId);
    if (!exists) {
      throw new EntityNotFoundException('Volunteer', volunteerId);
    }

    const records = await this.repository.findVerificationHistory(volunteerId);
    const items = records.map((r) => VerificationHistoryItemDto.fromEntity(r));

    return ApiResponseDto.success(items, 'Verification history retrieved');
  }

  private maskDocumentNumber(docNumber: string): string {
    if (docNumber.length <= 4) return '****';
    return '*'.repeat(docNumber.length - 4) + docNumber.slice(-4);
  }
}
