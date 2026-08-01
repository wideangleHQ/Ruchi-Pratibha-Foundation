import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventDepartment } from '@prisma/client';

export class DepartmentResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() departmentCode!: string;
  @ApiProperty() title!: string;
  @ApiPropertyOptional() description?: string | null;
  @ApiPropertyOptional() color?: string | null;
  @ApiProperty() status!: string;
  @ApiProperty() createdAt!: Date;
  @ApiProperty() updatedAt!: Date;

  static fromEntity(d: EventDepartment): DepartmentResponseDto {
    const dto = new DepartmentResponseDto();
    dto.id = d.id;
    dto.departmentCode = d.departmentCode;
    dto.title = d.title;
    dto.description = d.description;
    dto.color = d.color;
    dto.status = d.status;
    dto.createdAt = d.createdAt;
    dto.updatedAt = d.updatedAt;
    return dto;
  }
}
