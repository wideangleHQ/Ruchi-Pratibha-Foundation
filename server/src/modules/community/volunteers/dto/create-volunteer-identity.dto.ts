import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IdentityDocumentType } from '@prisma/client';

export class CreateVolunteerIdentityDto {
  @ApiProperty({ enum: IdentityDocumentType, example: IdentityDocumentType.AADHAAR })
  @IsNotEmpty()
  @IsEnum(IdentityDocumentType)
  documentType!: IdentityDocumentType;

  @ApiProperty({ example: '1234-5678-9012', description: 'Document number (will be validated per type)' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  documentNumber!: string;
}
