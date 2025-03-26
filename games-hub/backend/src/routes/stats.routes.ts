import { Router } from 'express';
import {
  recordGamePlay,
  getGameStats,
  getPopularGames,
  getOverallStats,
  getCategoryStats
} from '../controllers/stats.controller';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  gameIdSchema,
  popularGamesQuerySchema
} from '../schemas/stats.schema';

const router = Router();

// 公开路由
router.get('/games/popular', validate(popularGamesQuerySchema), getPopularGames);
router.get('/games/:gameId', validate(gameIdSchema), getGameStats);
router.get('/overall', getOverallStats);
router.get('/categories', getCategoryStats);

// 需要登录的路由
router.use(protect);
router.post('/games/:gameId/play', validate(gameIdSchema), recordGamePlay);

export default router; 