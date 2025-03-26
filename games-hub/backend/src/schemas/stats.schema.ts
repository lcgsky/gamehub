import { z } from 'zod';

// 游戏ID参数验证模式
export const gameIdSchema = z.object({
  params: z.object({
    gameId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid game ID')
  })
});

// 热门游戏查询参数验证模式
export const popularGamesQuerySchema = z.object({
  query: z.object({
    type: z.enum(['plays', 'favorites', 'rating']).optional(),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional()
  })
}); 