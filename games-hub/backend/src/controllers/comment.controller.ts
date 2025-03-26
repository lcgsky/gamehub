import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/comment.model';
import { Game } from '../models/game.model';
import { AppError } from '../middleware/errorHandler';

// 创建评论
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 检查游戏是否存在
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return next(new AppError('Game not found', 404));
    }

    // 创建评论
    const comment = await Comment.create({
      ...req.body,
      gameId: req.params.gameId,
      userId: req.user.id,
      status: 'pending' // 默认状态为待审核
    });

    res.status(201).json({
      status: 'success',
      data: { comment }
    });
  } catch (error) {
    next(error);
  }
};

// 获取游戏的所有评论
export const getGameComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({
      gameId: req.params.gameId,
      status: 'approved' // 只返回已审核的评论
    })
      .populate('userId', 'username avatar')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Comment.countDocuments({
      gameId: req.params.gameId,
      status: 'approved'
    });

    res.status(200).json({
      status: 'success',
      results: comments.length,
      total,
      data: { comments }
    });
  } catch (error) {
    next(error);
  }
};

// 获取单个评论
export const getComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('userId', 'username avatar');

    if (!comment) {
      return next(new AppError('Comment not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { comment }
    });
  } catch (error) {
    next(error);
  }
};

// 更新评论
export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new AppError('Comment not found', 404));
    }

    // 检查是否是评论作者或管理员
    if (comment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You can only update your own comments', 403));
    }

    // 普通用户只能更新内容和评分
    const allowedUpdates = req.user.role === 'admin'
      ? req.body
      : {
          content: req.body.content,
          rating: req.body.rating
        };

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: { comment: updatedComment }
    });
  } catch (error) {
    next(error);
  }
};

// 删除评论
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new AppError('Comment not found', 404));
    }

    // 检查是否是评论作者或管理员
    if (comment.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new AppError('You can only delete your own comments', 403));
    }

    await comment.deleteOne();

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// 管理员审核评论
export const moderateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!comment) {
      return next(new AppError('Comment not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { comment }
    });
  } catch (error) {
    next(error);
  }
};

// 获取待审核的评论（管理员）
export const getPendingComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ status: 'pending' })
      .populate('userId', 'username avatar')
      .populate('gameId', 'name')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Comment.countDocuments({ status: 'pending' });

    res.status(200).json({
      status: 'success',
      results: comments.length,
      total,
      data: { comments }
    });
  } catch (error) {
    next(error);
  }
}; 