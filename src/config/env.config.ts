import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const EnvModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
  validate: (env) => {
    const parsed = envSchema.safeParse(env);

    if (!parsed.success) {
      console.error(z.prettifyError(parsed.error));
      throw new Error('Invalid environment variables');
    }

    return parsed.data;
  },
});
