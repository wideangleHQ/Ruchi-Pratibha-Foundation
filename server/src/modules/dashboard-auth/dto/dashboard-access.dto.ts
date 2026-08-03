import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { DASHBOARD_AUTH_CONSTANTS } from '../constants';

export class DashboardAccessDto {
  @ApiProperty({
    description: 'Dashboard access code',
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(DASHBOARD_AUTH_CONSTANTS.MAX_ACCESS_CODE_LENGTH)
  @Transform(({ value }: { value: string }) => value?.trim())
  accessCode!: string;
}
