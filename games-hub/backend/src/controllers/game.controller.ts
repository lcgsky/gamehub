import { Request, Response, NextFunction } from 'express';
import { Game } from '../models/game.model';
import { AppError } from '../middleware/errorHandler';

// 创建游戏
export const createGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const game = await Game.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: { game }
    });
  } catch (error) {
    next(error);
  }
};

// 获取所有游戏
export const getAllGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete query[field]);

    // 1) 构建查询
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    
    let dbQuery = Game.find(JSON.parse(queryStr));

    // 2) 排序
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ');
      dbQuery = dbQuery.sort(sortBy);
    } else {
      dbQuery = dbQuery.sort('-createdAt');
    }

    // 3) 字段限制
    if (req.query.fields) {
      const fields = (req.query.fields as string).split(',').join(' ');
      dbQuery = dbQuery.select(fields);
    }

    // 4) 分页
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    dbQuery = dbQuery.skip(skip).limit(limit);

    // 执行查询
    const [games, total] = await Promise.all([
      dbQuery,
      Game.countDocuments(JSON.parse(queryStr))
    ]);

    res.status(200).json({
      status: 'success',
      results: games.length,
      total,
      data: { games }
    });
  } catch (error) {
    next(error);
  }
};

// 获取单个游戏
export const getGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return next(new AppError('Game not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { game }
    });
  } catch (error) {
    next(error);
  }
};

// 更新游戏
export const updateGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const game = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!game) {
      return next(new AppError('Game not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { game }
    });
  } catch (error) {
    next(error);
  }
};

// 删除游戏
export const deleteGame = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);

    if (!game) {
      return next(new AppError('Game not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// 搜索游戏
export const searchGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req.query;
    
    const games = await Game.find(
      { $text: { $search: query as string } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(10);

    res.status(200).json({
      status: 'success',
      results: games.length,
      data: { games }
    });
  } catch (error) {
    next(error);
  }
};

// 获取游戏分类
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Game.distinct('category');
    
    res.status(200).json({
      status: 'success',
      data: { categories }
    });
  } catch (error) {
    next(error);
  }
};

// 获取游戏标签
export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await Game.distinct('tags');
    
    res.status(200).json({
      status: 'success',
      data: { tags }
    });
  } catch (error) {
    next(error);
  }
}; 