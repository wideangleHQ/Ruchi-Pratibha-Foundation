import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const authSchema = z.object({
  jwtAccessSecret: z.string().min(32),
  jwtAccessExpiration: z.string().min(1),
  jwtRefreshSecret: z.string().min(32),
  jwtRefreshExpiration: z.string().min(1),
  jwtIssuer: z.string().min(1),
  bcryptRounds: z.coerce.number().int().min(10).max(15),
});

export type AuthConfig = z.infer<typeof authSchema>;

export default registerAs('auth', (): AuthConfig => {
  return authSchema.parse({
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    jwtIssuer: process.env.JWT_ISSUER,
    bcryptRounds: process.env.BCRYPT_ROUNDS,
  });
});
