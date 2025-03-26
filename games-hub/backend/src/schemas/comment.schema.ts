import { z } from 'zod';

// 创建评论验证模式
export const createCommentSchema = z.object({
  params: z.object({
    gameId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid game ID')
  }),
  body: z.object({
    content: z.string()
      .min(1, 'Comment content is required')
      .max(1000, 'Comment cannot be more than 1000 characters'),
    rating: z.number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot be more than 5')
      .optional()
  })
});

// 更新评论验证模式
export const updateCommentSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid comment ID')
  }),
  body: z.object({
    content: z.string()
      .min(1, 'Comment content is required')
      .max(1000, 'Comment cannot be more than 1000 characters')
      .optional(),
    rating: z.number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot be more than 5')
      .optional()
  })
});

// 评论ID参数验证模式
export const commentIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid comment ID')
  })
});

// 评论审核验证模式
export const moderateCommentSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid comment ID')
  }),
  body: z.object({
    status: z.enum(['approved', 'rejected'])
  })
});

// 评论查询参数验证模式
export const commentQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page must be a number').optional(),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional(),
    sort: z.string().optional()
  })
}); 