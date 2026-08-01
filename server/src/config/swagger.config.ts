import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const swaggerSchema = z.object({
  enabled: z
    .string()
    .transform((val) => val === 'true')
    .pipe(z.boolean()),
  title: z.string().min(1),
  description: z.string().min(1),
  path: z.string().min(1),
});

export type SwaggerConfig = z.infer<typeof swaggerSchema>;

export default registerAs('swagger', (): SwaggerConfig => {
  return swaggerSchema.parse({
    enabled: process.env.SWAGGER_ENABLED,
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    path: process.env.SWAGGER_PATH,
  });
});
