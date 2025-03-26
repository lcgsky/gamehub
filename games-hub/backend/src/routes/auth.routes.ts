import { Router } from 'express';
import {
  register,
  login,
  getCurrentUser,
  updateCurrentUser
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth';

const router = Router();

// 公开路由
router.post('/register', register);
router.post('/login', login);

// 受保护的路由
router.use(protect); // 应用认证中间件到以下所有路由
router.get('/me', getCurrentUser);
router.patch('/me', updateCurrentUser);

export default router; 