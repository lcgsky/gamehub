import express from 'express';
import * as gameController from '../controllers/gameController';

const router = express.Router();

// 游戏相关的路由
router.get('/', gameController.getGames);
router.get('/categories', gameController.getCategories);
router.get('/tags', gameController.getTags);
router.get('/:id', gameController.getGameById);
router.post('/', gameController.createGame);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

export default router; 