import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const supabaseSchema = z.object({
  url: z.string().url(),
  serviceRoleKey: z.string().min(1),
  storageBucket: z.string().min(1),
});

export type SupabaseConfig = z.infer<typeof supabaseSchema>;

export default registerAs('supabase', (): SupabaseConfig => {
  return supabaseSchema.parse({
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    storageBucket: process.env.SUPABASE_STORAGE_BUCKET,
  });
});
