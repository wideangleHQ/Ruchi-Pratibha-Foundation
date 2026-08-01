import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const appSchema = z.object({
  nodeEnv: z.enum(['development', 'staging', 'production', 'test']),
  name: z.string().min(1),
  url: z.string().url(),
  port: z.coerce.number().int().min(1).max(65535),
  apiPrefix: z.string().min(1),
  apiVersion: z.string().min(1),
  corsOrigins: z.string().transform((val) => val.split(',')),
});

export type AppConfig = z.infer<typeof appSchema>;

export default registerAs('app', (): AppConfig => {
  const config = appSchema.parse({
    nodeEnv: process.env.NODE_ENV,
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    port: process.env.PORT,
    apiPrefix: process.env.API_PREFIX,
    apiVersion: process.env.API_VERSION,
    corsOrigins: process.env.CORS_ORIGINS,
  });
  return config;
});
