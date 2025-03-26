import { z } from 'zod';

// 游戏ID参数验证模式
export const gameIdSchema = z.object({
  params: z.object({
    gameId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid game ID')
  })
});

// 收藏列表查询参数验证模式
export const favoriteQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page must be a number').optional(),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional(),
    sort: z.string().optional()
  })
}); 