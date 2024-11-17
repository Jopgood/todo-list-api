import Database from 'better-sqlite3';
import { config } from '@/config';
import { logger } from '@/utils/logger';

const db = new Database(config.dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

logger.info(`Database connected at ${config.dbPath}`);

export { db };
