import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const cacheSchema = z.object({
  host: z.string().min(1),
  port: z.coerce.number().int().min(1).max(65535),
  password: z.string().optional().default(''),
  db: z.coerce.number().int().min(0).max(15),
  keyPrefix: z.string().min(1),
});

export type CacheConfig = z.infer<typeof cacheSchema>;

export default registerAs('cache', (): CacheConfig => {
  return cacheSchema.parse({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    db: process.env.REDIS_DB,
    keyPrefix: process.env.REDIS_KEY_PREFIX,
  });
});
