import { z } from 'zod';

// 游戏配置验证模式
const gameConfigSchema = z.object({
  width: z.number().min(0, 'Width must be positive'),
  height: z.number().min(0, 'Height must be positive'),
  allowFullscreen: z.boolean().default(true),
  customParams: z.record(z.any()).optional()
});

// 创建游戏验证模式
export const createGameSchema = z.object({
  body: z.object({
    name: z.string()
      .min(1, 'Game name is required')
      .max(100, 'Game name cannot be more than 100 characters'),
    description: z.string()
      .min(1, 'Description is required')
      .max(1000, 'Description cannot be more than 1000 characters'),
    type: z.enum(['iframe', 'api', 'custom']),
    url: z.string().url('Invalid game URL'),
    tags: z.array(z.string()).optional(),
    category: z.string().min(1, 'Category is required'),
    config: gameConfigSchema,
    thumbnail: z.string().url('Invalid thumbnail URL').optional(),
    instructions: z.string().max(2000, 'Instructions cannot be more than 2000 characters').optional()
  })
});

// 更新游戏验证模式
export const updateGameSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid game ID')
  }),
  body: createGameSchema.shape.body.partial()
});

// 游戏ID参数验证模式
export const gameIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid game ID')
  })
});

// 游戏查询参数验证模式
export const gameQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page must be a number').optional(),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').optional(),
    sort: z.string().optional(),
    fields: z.string().optional(),
    category: z.string().optional(),
    type: z.enum(['iframe', 'api', 'custom']).optional(),
    tags: z.string().optional(),
    search: z.string().optional()
  })
}); 