import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  port: z.number().default(3000),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  apiKey: z.string().min(1),
});

const validateConfig = (config: Record<string, unknown>): z.infer<typeof configSchema> => {
  try {
    return configSchema.parse({
      port: parseInt(config.PORT || '3000', 10),
      nodeEnv: config.NODE_ENV,
      apiKey: config.API_KEY,
    });
  } catch (error) {
    throw new Error(
      `Config validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
};

export const config = validateConfig(process.env);
