import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseSchema = z.object({
  url: z.string().min(1),
});

export type DatabaseConfig = z.infer<typeof databaseSchema>;

export default registerAs('database', (): DatabaseConfig => {
  return databaseSchema.parse({
    url: process.env.DATABASE_URL,
  });
});
