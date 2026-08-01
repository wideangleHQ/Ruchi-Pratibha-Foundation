import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationMeta } from '../interfaces';

export class ApiResponseDto<T> {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  message!: string;

  @ApiProperty()
  data!: T;

  @ApiPropertyOptional()
  meta?: Record<string, unknown>;

  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  path!: string;

  @ApiPropertyOptional()
  correlationId?: string;

  static success<T>(data: T, message = 'Success'): Omit<ApiResponseDto<T>, 'timestamp' | 'path'> {
    return { success: true, message, data };
  }

  static paginated<T>(
    data: T[],
    meta: PaginationMeta,
    message = 'Success',
  ): Omit<ApiResponseDto<T[]>, 'timestamp' | 'path'> {
    return { success: true, message, data, meta: meta as unknown as Record<string, unknown> };
  }

  static error(message: string): Omit<ApiResponseDto<null>, 'timestamp' | 'path'> {
    return { success: false, message, data: null };
  }
}
