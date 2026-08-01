import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const securitySchema = z.object({
  rateLimitTtl: z.coerce.number().int().min(1),
  rateLimitMax: z.coerce.number().int().min(1),
});

export type SecurityConfig = z.infer<typeof securitySchema>;

export default registerAs('security', (): SecurityConfig => {
  return securitySchema.parse({
    rateLimitTtl: process.env.RATE_LIMIT_TTL,
    rateLimitMax: process.env.RATE_LIMIT_MAX,
  });
});
