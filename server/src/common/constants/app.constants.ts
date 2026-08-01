export const APP_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
  DEFAULT_PAGE: 1,
  CORRELATION_ID_HEADER: 'x-correlation-id',
  REQUEST_ID_HEADER: 'x-request-id',
  API_VERSION_HEADER: 'x-api-version',
} as const;

export const CACHE_CONSTANTS = {
  DEFAULT_TTL: 300,
  SHORT_TTL: 60,
  MEDIUM_TTL: 600,
  LONG_TTL: 3600,
  VERY_LONG_TTL: 86400,
} as const;

export const FILE_CONSTANTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const,
  ALLOWED_DOCUMENT_TYPES: ['application/pdf'] as const,
  SIGNED_URL_EXPIRATION: 3600,
} as const;
