import { app } from './app';
import { logger } from './utils/logger';
import { config } from './config';

const startServer = (): void => {
  try {
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Error starting server', error);
    process.exit(1);
  }
};

startServer();
