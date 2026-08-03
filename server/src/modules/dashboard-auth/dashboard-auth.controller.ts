import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { DashboardAuthService } from './dashboard-auth.service';
import { DashboardAccessGuard } from './dashboard-auth.guard';
import { DashboardAccessDto } from './dto';
import {
  DashboardAccessResponseDto,
  DashboardVerifyResponseDto,
  DashboardLogoutResponseDto,
} from './dto';
import { DASHBOARD_AUTH_CONSTANTS } from './constants';

@ApiTags('Dashboard Auth')
@Controller('dashboard')
export class DashboardAuthController {
  constructor(private readonly dashboardAuthService: DashboardAuthService) {}

  @Post('access')
  @HttpCode(HttpStatus.OK)
  @Throttle({
    default: {
      ttl: DASHBOARD_AUTH_CONSTANTS.RATE_LIMIT_TTL,
      limit: DASHBOARD_AUTH_CONSTANTS.RATE_LIMIT_MAX,
    },
  })
  @ApiOperation({ summary: 'Authenticate with dashboard access code' })
  @ApiBody({ type: DashboardAccessDto })
  @ApiResponse({
    status: 200,
    description: 'Access granted',
    type: DashboardAccessResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 429, description: 'Too many attempts' })
  access(
    @Body() dto: DashboardAccessDto,
    @Res({ passthrough: true }) res: Response,
  ): DashboardAccessResponseDto {
    const isValid = this.dashboardAuthService.validateAccessCode(dto.accessCode);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = this.dashboardAuthService.issueToken();
    this.dashboardAuthService.setCookie(res, token);

    return {
      success: true,
      authenticated: true,
      message: 'Access granted.',
    };
  }

  @Get('verify')
  @UseGuards(DashboardAccessGuard)
  @ApiOperation({ summary: 'Verify dashboard access token' })
  @ApiCookieAuth()
  @ApiResponse({
    status: 200,
    description: 'Token valid',
    type: DashboardVerifyResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired token' })
  verify(): DashboardVerifyResponseDto {
    return {
      success: true,
      authenticated: true,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout from dashboard' })
  @ApiResponse({
    status: 200,
    description: 'Logged out',
    type: DashboardLogoutResponseDto,
  })
  logout(
    @Res({ passthrough: true }) res: Response,
  ): DashboardLogoutResponseDto {
    this.dashboardAuthService.clearCookie(res);

    return {
      success: true,
      message: 'Logged out successfully.',
    };
  }
}
