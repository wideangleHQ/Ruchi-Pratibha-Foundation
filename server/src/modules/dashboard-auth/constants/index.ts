export const DASHBOARD_AUTH_CONSTANTS = {
  TOKEN_TYPE: 'dashboard-access',
  MAX_ACCESS_CODE_LENGTH: 128,
  RATE_LIMIT_TTL: 15 * 60 * 1000,
  RATE_LIMIT_MAX: 5,
} as const;
