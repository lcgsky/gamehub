import { Request, Response, NextFunction } from 'express';
import { Game } from '../models/game.model';
import { AppError } from '../middleware/errorHandler';

// 记录游戏游玩
export const recordGamePlay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return next(new AppError('Game not found', 404));
    }

    await game.incrementPlays();

    res.status(200).json({
      status: 'success',
      data: { stats: game.stats }
    });
  } catch (error) {
    next(error);
  }
};

// 获取游戏统计信息
export const getGameStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const game = await Game.findById(req.params.gameId)
      .select('stats name');

    if (!game) {
      return next(new AppError('Game not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { stats: game.stats }
    });
  } catch (error) {
    next(error);
  }
};

// 获取热门游戏
export const getPopularGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const type = req.query.type as string;
    const limit = parseInt(req.query.limit as string) || 10;

    let sortField = '';
    switch (type) {
      case 'plays':
        sortField = 'stats.plays';
        break;
      case 'favorites':
        sortField = 'stats.favorites';
        break;
      case 'rating':
        sortField = 'stats.averageRating';
        break;
      default:
        sortField = 'stats.plays';
    }

    const games = await Game.find({ status: 'active' })
      .sort({ [sortField]: -1 })
      .limit(limit)
      .select('name description thumbnail category tags stats');

    res.status(200).json({
      status: 'success',
      results: games.length,
      data: { games }
    });
  } catch (error) {
    next(error);
  }
};

// 获取总体统计信息
export const getOverallStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await Game.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $group: {
          _id: null,
          totalGames: { $sum: 1 },
          totalPlays: { $sum: '$stats.plays' },
          totalFavorites: { $sum: '$stats.favorites' },
          totalRatings: { $sum: '$stats.totalRatings' },
          averageRating: { $avg: '$stats.averageRating' },
          categories: { $addToSet: '$category' },
          tags: { $addToSet: '$tags' }
        }
      },
      {
        $project: {
          _id: 0,
          totalGames: 1,
          totalPlays: 1,
          totalFavorites: 1,
          totalRatings: 1,
          averageRating: { $round: ['$averageRating', 2] },
          categoryCount: { $size: '$categories' },
          tagCount: { 
            $size: { 
              $reduce: {
                input: '$tags',
                initialValue: [],
                in: { $setUnion: ['$$value', '$$this'] }
              }
            }
          }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: { stats: stats[0] || {} }
    });
  } catch (error) {
    next(error);
  }
};

// 获取分类统计信息
export const getCategoryStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await Game.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalPlays: { $sum: '$stats.plays' },
          totalFavorites: { $sum: '$stats.favorites' },
          averageRating: { $avg: '$stats.averageRating' }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1,
          totalPlays: 1,
          totalFavorites: 1,
          averageRating: { $round: ['$averageRating', 2] }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      results: stats.length,
      data: { stats }
    });
  } catch (error) {
    next(error);
  }
}; 