import { PaginationMeta, PaginatedResult } from '../interfaces';
import { PaginationQueryDto } from '../dto';

export function buildPaginationMeta(
  query: PaginationQueryDto,
  totalItems: number,
): PaginationMeta {
  const totalPages = Math.ceil(totalItems / query.pageSize);
  return {
    page: query.page,
    pageSize: query.pageSize,
    totalItems,
    totalPages,
    hasNextPage: query.page < totalPages,
    hasPreviousPage: query.page > 1,
  };
}

export function buildPaginatedResult<T>(
  data: T[],
  query: PaginationQueryDto,
  totalItems: number,
): PaginatedResult<T> {
  return {
    data,
    meta: buildPaginationMeta(query, totalItems),
  };
}
