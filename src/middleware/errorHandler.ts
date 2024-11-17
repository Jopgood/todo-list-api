import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/utils/ApiError';
import { logger } from '@/utils/logger';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(err);

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.code,
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
