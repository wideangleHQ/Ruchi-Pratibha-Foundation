import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const storageSchema = z.object({
  accountId: z.string().optional().default(''),
  accessKeyId: z.string().optional().default(''),
  secretAccessKey: z.string().optional().default(''),
  bucketName: z.string().optional().default(''),
  publicUrl: z.string().optional().default(''),
  endpoint: z.string().optional().default(''),
});

export type StorageConfig = z.infer<typeof storageSchema>;

export default registerAs('storage', (): StorageConfig => {
  return storageSchema.parse({
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME,
    publicUrl: process.env.R2_PUBLIC_URL,
    endpoint: process.env.R2_ENDPOINT,
  });
});
