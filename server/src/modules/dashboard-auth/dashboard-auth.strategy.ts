/**
 * Future-ready strategy placeholder.
 *
 * When the platform migrates to full JWT user authentication,
 * this file will implement a Passport strategy that validates
 * dashboard sessions against user roles and permissions.
 *
 * The controller endpoints (POST /access, GET /verify, POST /logout)
 * will remain unchanged — only the internal validation logic
 * will be swapped from access-code to JWT user auth.
 */
export const DASHBOARD_AUTH_STRATEGY = 'dashboard-access' as const;
