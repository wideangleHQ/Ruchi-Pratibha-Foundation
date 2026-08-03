import { ApiProperty } from '@nestjs/swagger';

export class DashboardAccessResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: true })
  authenticated!: boolean;

  @ApiProperty({ example: 'Access granted.' })
  message!: string;
}

export class DashboardVerifyResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: true })
  authenticated!: boolean;
}

export class DashboardLogoutResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Logged out successfully.' })
  message!: string;
}
