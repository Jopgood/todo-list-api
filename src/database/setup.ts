import fs from 'fs';
import path from 'path';
import { config } from '@/config';
import { logger } from '@/utils/logger';

const setup = (): void => {
  try {
    // Create data directory if it doesn't exist
    const dbDir = path.dirname(config.dbPath);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
      logger.info(`Created database directory: ${dbDir}`);
    }

    // Run migrations
    require('./migrate');

    logger.info('Database setup completed successfully');
  } catch (error) {
    logger.error('Error setting up database:', error);
    process.exit(1);
  }
};

setup();
