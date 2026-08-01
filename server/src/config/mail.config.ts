import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const mailSchema = z.object({
  host: z.string().optional().default(''),
  port: z.coerce.number().int().min(1).max(65535).optional().default(587),
  user: z.string().optional().default(''),
  password: z.string().optional().default(''),
  from: z.string().optional().default(''),
});

export type MailConfig = z.infer<typeof mailSchema>;

export default registerAs('mail', (): MailConfig => {
  return mailSchema.parse({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
  });
});
