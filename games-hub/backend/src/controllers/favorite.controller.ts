import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';
import { AppError } from '../middleware/errorHandler';

// 获取用户的收藏游戏列表
export const getFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user.id)
      .populate({
        path: 'favorites',
        select: 'name description thumbnail category tags status',
        match: { status: 'active' }
      })
      .select('favorites');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // 手动处理分页，因为 populate 后的数组不支持 skip/limit
    const favorites = user.favorites.slice(skip, skip + limit);
    const total = user.favorites.length;

    res.status(200).json({
      status: 'success',
      results: favorites.length,
      total,
      data: { favorites }
    });
  } catch (error) {
    next(error);
  }
};

// 添加游戏到收藏
export const addToFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = new mongoose.Types.ObjectId(req.params.gameId);

    // 检查游戏是否存在且状态为 active
    const game = await Game.findOne({ _id: gameId, status: 'active' });
    if (!game) {
      return next(new AppError('Game not found or not available', 404));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // 添加到收藏
    await user.addToFavorites(game._id);

    res.status(200).json({
      status: 'success',
      message: 'Game added to favorites'
    });
  } catch (error) {
    next(error);
  }
};

// 从收藏中移除游戏
export const removeFromFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = new mongoose.Types.ObjectId(req.params.gameId);

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // 从收藏中移除
    await user.removeFromFavorites(gameId);

    res.status(200).json({
      status: 'success',
      message: 'Game removed from favorites'
    });
  } catch (error) {
    next(error);
  }
};

// 检查游戏是否已收藏
export const checkFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gameId = new mongoose.Types.ObjectId(req.params.gameId);

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    const isFavorite = user.isFavorite(gameId);

    res.status(200).json({
      status: 'success',
      data: { isFavorite }
    });
  } catch (error) {
    next(error);
  }
}; 