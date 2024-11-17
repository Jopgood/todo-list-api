import { db } from './index';
import { logger } from '@/utils/logger';

try {
  db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

  logger.info('Migrations completed successfully.');
  process.exit(0);
} catch (error) {
  logger.error(`Error running migrations: `, error);
  process.exit(1);
}
