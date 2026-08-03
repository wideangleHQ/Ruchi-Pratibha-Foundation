import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const dashboardAuthSchema = z.object({
  accessCode: z.string().min(1),
  cookieName: z.string().min(1),
  secret: z.string().min(32),
  expires: z.string().min(1),
  enabled: z
    .string()
    .transform((val) => val === 'true')
    .pipe(z.boolean()),
});

export type DashboardAuthConfig = z.infer<typeof dashboardAuthSchema>;

export default registerAs('dashboardAuth', (): DashboardAuthConfig => {
  return dashboardAuthSchema.parse({
    accessCode: process.env.DASHBOARD_ACCESS_CODE,
    cookieName: process.env.DASHBOARD_ACCESS_COOKIE_NAME,
    secret: process.env.DASHBOARD_ACCESS_SECRET,
    expires: process.env.DASHBOARD_ACCESS_EXPIRES,
    enabled: process.env.DASHBOARD_ACCESS_ENABLED,
  });
});
