import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  port: z.number().default(3000),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  apiKey: z.string().min(1),
  jwtSecret: z.string().min(32),
  dbPath: z.string().default('./data/database.sqlite'),
});

type Config = z.infer<typeof configSchema>;

const validateEnv = (): Config => {
  const parsed = configSchema.safeParse({
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    dbPath: process.env.DB_PATH,
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.toString());
    process.exit(1);
  }

  return parsed.data;
};

export const config = validateEnv();
