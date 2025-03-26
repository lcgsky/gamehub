import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { AppError } from '../middleware/errorHandler';
import { generateToken } from '../utils/jwt';

// 注册新用户
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(new AppError('User already exists', 400));
    }

    // 创建新用户
    const user = await User.create({
      username,
      email,
      password,
      role: 'user'
    });

    // 生成 token
    const token = generateToken(user);

    // 发送响应
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// 用户登录
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // 检查是否提供了邮箱和密码
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // 查找用户并包含密码字段
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 更新最后登录时间
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    // 生成 token
    const token = generateToken(user);

    // 发送响应
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// 获取当前用户信息
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          favorites: user.favorites
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// 更新用户信息
export const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, avatar } = req.body;

    // 不允许通过此路由更新密码
    if (req.body.password) {
      return next(new AppError('This route is not for password updates', 400));
    }

    // 更新用户
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, avatar },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    next(error);
  }
}; 