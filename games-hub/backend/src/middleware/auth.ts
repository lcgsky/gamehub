import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from './errorHandler';
import { User } from '../models/user.model';

// 扩展 Express Request 类型
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// 验证 JWT token
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) 获取 token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Please log in to access this resource', 401));
    }

    // 2) 验证 token
    const decoded = await verifyToken(token);

    // 3) 检查用户是否仍然存在
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('The user no longer exists', 401));
    }

    // 4) 将用户信息添加到请求对象
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Invalid token', 401));
  }
};

// 限制特定角色访问
export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
}; 