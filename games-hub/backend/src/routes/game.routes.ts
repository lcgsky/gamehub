import { Router } from 'express';
import {
  createGame,
  getAllGames,
  getGame,
  updateGame,
  deleteGame,
  searchGames,
  getCategories,
  getTags
} from '../controllers/game.controller';
import { protect, restrictTo } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createGameSchema,
  updateGameSchema,
  gameIdSchema,
  gameQuerySchema
} from '../schemas/game.schema';

const router = Router();

// 公开路由
router.get('/', validate(gameQuerySchema), getAllGames);
router.get('/search', validate(gameQuerySchema), searchGames);
router.get('/categories', getCategories);
router.get('/tags', getTags);
router.get('/:id', validate(gameIdSchema), getGame);

// 受保护的路由 - 需要管理员权限
router.use(protect);
router.use(restrictTo('admin'));

router.post('/', validate(createGameSchema), createGame);
router.patch('/:id', validate(updateGameSchema), updateGame);
router.delete('/:id', validate(gameIdSchema), deleteGame);

export default router; 