import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VolunteerRole } from '@prisma/client';

export class RoleResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() roleCode!: string;
  @ApiProperty() departmentId!: string;
  @ApiProperty() title!: string;
  @ApiPropertyOptional() description?: string | null;
  @ApiProperty() requiredSkills!: string[];
  @ApiProperty() minVolunteers!: number;
  @ApiProperty() maxVolunteers!: number;
  @ApiProperty() priority!: number;
  @ApiPropertyOptional() color?: string | null;
  @ApiPropertyOptional() iconAssetKey?: string | null;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(r: VolunteerRole): RoleResponseDto {
    const dto = new RoleResponseDto();
    dto.id = r.id;
    dto.roleCode = r.roleCode;
    dto.departmentId = r.departmentId;
    dto.title = r.title;
    dto.description = r.description;
    dto.requiredSkills = r.requiredSkills;
    dto.minVolunteers = r.minVolunteers;
    dto.maxVolunteers = r.maxVolunteers;
    dto.priority = r.priority;
    dto.color = r.color;
    dto.iconAssetKey = r.iconAssetKey;
    dto.status = r.status;
    dto.createdAt = r.createdAt;
    dto.updatedAt = r.updatedAt;
    return dto;
  }
}
