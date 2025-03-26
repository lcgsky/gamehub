import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import gameRoutes from './game.routes';
import commentRoutes from './comment.routes';
import statsRoutes from './stats.routes';

const router = Router();

// 健康检查路由
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 注册路由
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/stats', statsRoutes);

// 评论路由作为游戏路由的子路由
router.use('/games/:gameId/comments', commentRoutes);
// 独立的评论路由用于管理员功能
router.use('/comments', commentRoutes);

// TODO: 添加其他路由模块
// router.use('/games', gamesRoutes);
// router.use('/users', usersRoutes);
// router.use('/comments', commentsRoutes);

export default router; 