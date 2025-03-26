import { Router } from 'express';
import {
  createComment,
  getGameComments,
  getComment,
  updateComment,
  deleteComment,
  moderateComment,
  getPendingComments
} from '../controllers/comment.controller';
import { protect, restrictTo } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createCommentSchema,
  updateCommentSchema,
  commentIdSchema,
  moderateCommentSchema,
  commentQuerySchema
} from '../schemas/comment.schema';

const router = Router({ mergeParams: true }); // 合并参数以访问父路由的参数

// 公开路由
router.get('/', validate(commentQuerySchema), getGameComments);
router.get('/:id', validate(commentIdSchema), getComment);

// 需要登录的路由
router.use(protect);

router.post('/', validate(createCommentSchema), createComment);
router.patch('/:id', validate(updateCommentSchema), updateComment);
router.delete('/:id', validate(commentIdSchema), deleteComment);

// 管理员路由
router.use(restrictTo('admin'));

router.get('/admin/pending', validate(commentQuerySchema), getPendingComments);
router.patch('/:id/moderate', validate(moderateCommentSchema), moderateComment);

export default router; 