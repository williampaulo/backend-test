import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

const ErrorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ statusCode: err.statusCode, message: err.message });
  }

  console.log('err', err);

  return res
    .status(500)
    .json({ statusCode: 500, message: 'Internal server error' });
};

export default ErrorHandlingMiddleware;
