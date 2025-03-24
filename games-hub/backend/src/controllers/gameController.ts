import { Request, Response } from 'express';
import Game, { IGame } from '../models/Game';

// 获取游戏列表
export const getGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      page = 1, 
      pageSize = 20, 
      category, 
      tags, 
      sort = 'newest', 
      search,
      status = 'active'
    } = req.query;

    // 构建查询条件
    const query: any = { status };
    
    if (category) {
      query.category = category;
    }
    
    if (tags) {
      query.tags = Array.isArray(tags) 
        ? { $in: tags } 
        : { $in: [tags] };
    }
    
    if (search) {
      query.$text = { $search: search as string };
    }

    // 构建排序条件
    let sortOption: any = {};
    switch (sort) {
      case 'popular':
        sortOption = { playCount: -1 };
        break;
      case 'rating':
        sortOption = { averageRating: -1 };
        break;
      case 'newest':
      default:
        sortOption = { createdAt: -1 };
    }

    // 分页
    const skip = (Number(page) - 1) * Number(pageSize);
    const limit = Number(pageSize);

    // 执行查询
    const games = await Game
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    // 获取总数
    const total = await Game.countDocuments(query);

    // 获取可用的分类和标签（用于筛选条件）
    const categories = await Game.distinct('category');
    const allTags = await Game.distinct('tags');

    res.json({
      total,
      pages: Math.ceil(total / Number(pageSize)),
      currentPage: Number(page),
      data: games,
      filters: {
        categories,
        tags: allTags
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

// 获取游戏详情
export const getGameById = async (req: Request, res: Response): Promise<void> => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      res.status(404).json({ error: 'Game not found' });
      return;
    }

    // TODO: 在实际项目中，这里应该获取真实的统计数据
    const mockStatistics = {
      playCount: Math.floor(Math.random() * 1000),
      favoriteCount: Math.floor(Math.random() * 100),
      averageRating: (3 + Math.random() * 2).toFixed(1)
    };

    // TODO: 获取相关游戏推荐
    const relatedGames = await Game
      .find({ 
        category: game.category, 
        _id: { $ne: game._id },
        status: 'active'
      })
      .limit(4);

    // TODO: 获取最新评论
    const mockComments = {
      total: Math.floor(Math.random() * 50),
      items: []
    };

    res.json({
      ...game.toObject(),
      statistics: mockStatistics,
      relatedGames,
      comments: mockComments
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

// 创建新游戏
export const createGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    
    res.status(201).json({
      id: savedGame._id,
      success: true
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ 
        success: false,
        message: error.message 
      });
    } else {
      res.status(400).json({ 
        success: false,
        message: 'Failed to create game' 
      });
    }
  }
};

// 更新游戏
export const updateGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedGame) {
      res.status(404).json({ 
        success: false,
        message: 'Game not found' 
      });
      return;
    }
    
    res.json({
      success: true,
      data: updatedGame
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ 
        success: false,
        message: error.message 
      });
    } else {
      res.status(400).json({ 
        success: false,
        message: 'Failed to update game' 
      });
    }
  }
};

// 删除游戏
export const deleteGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    
    if (!deletedGame) {
      res.status(404).json({ 
        success: false,
        message: 'Game not found' 
      });
      return;
    }
    
    res.json({
      success: true,
      message: 'Game deleted successfully'
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    } else {
      res.status(500).json({ 
        success: false,
        message: 'Failed to delete game' 
      });
    }
  }
};

// 获取游戏分类
export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Game.distinct('category');
    res.json(categories);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

// 获取游戏标签
export const getTags = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tags = await Game.distinct('tags');
    res.json(tags);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}; 