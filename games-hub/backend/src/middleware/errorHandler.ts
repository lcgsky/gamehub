import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

// 自定义错误类
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  errors?: any[];

  constructor(message: string, statusCode: number, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 错误处理中间件
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
      ...(config.env === 'development' && { stack: err.stack })
    });
  }

  // 处理未知错误
  console.error('Error 💥:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    ...(config.env === 'development' && { error: err, stack: err.stack })
  });
}; 