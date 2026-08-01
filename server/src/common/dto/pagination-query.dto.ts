import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { SortOrder } from '../enums';
import { APP_CONSTANTS } from '../constants';

export class PaginationQueryDto {
  @ApiPropertyOptional({ default: APP_CONSTANTS.DEFAULT_PAGE, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = APP_CONSTANTS.DEFAULT_PAGE;

  @ApiPropertyOptional({
    default: APP_CONSTANTS.DEFAULT_PAGE_SIZE,
    minimum: APP_CONSTANTS.MIN_PAGE_SIZE,
    maximum: APP_CONSTANTS.MAX_PAGE_SIZE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(APP_CONSTANTS.MIN_PAGE_SIZE)
  @Max(APP_CONSTANTS.MAX_PAGE_SIZE)
  pageSize: number = APP_CONSTANTS.DEFAULT_PAGE_SIZE;

  @ApiPropertyOptional({ default: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy: string = 'createdAt';

  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }

  get take(): number {
    return this.pageSize;
  }
}
