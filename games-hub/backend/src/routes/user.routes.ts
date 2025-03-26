import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  checkFavorite
} from '../controllers/favorite.controller';
import {
  gameIdSchema,
  favoriteQuerySchema
} from '../schemas/favorite.schema';

const router = Router();

// 受保护的路由
router.use(protect);

// 用户路由
router.get('/me', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  });
});

// 收藏路由
router.get('/favorites', validate(favoriteQuerySchema), getFavorites);
router.post('/favorites/:gameId', validate(gameIdSchema), addToFavorites);
router.delete('/favorites/:gameId', validate(gameIdSchema), removeFromFavorites);
router.get('/favorites/:gameId/check', validate(gameIdSchema), checkFavorite);

// 管理员路由
router.use(restrictTo('admin'));

// TODO: 添加管理员用户管理路由

export default router; 