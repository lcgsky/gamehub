# GameHub 后端 API

GameHub 后端 API 服务为游戏聚合平台提供数据和业务逻辑支持。本服务基于 Express.js 和 MongoDB 构建，提供 RESTful API 端点。

## 🚀 功能概述

- **游戏管理 API**：CRUD 操作处理游戏数据
- **用户认证**：JWT 基础的用户认证与授权
- **内容管理**：评论、评分、分类和标签管理
- **数据聚合**：统计数据和报表生成

## 📊 数据模型

### 游戏模型 (Game)
```typescript
interface IGame {
  name: string;                        // 游戏名称
  description: string;                 // 游戏描述
  type: 'iframe' | 'api' | 'custom';   // 游戏类型
  url: string;                         // 游戏URL
  tags: string[];                      // 游戏标签
  category: string;                    // 游戏分类
  status: 'active' | 'inactive';       // 游戏状态
  config: {                            // 游戏配置
    width: number;                     // 宽度
    height: number;                    // 高度
    allowFullscreen: boolean;          // 是否允许全屏
    customParams?: Record<string, any>;// 自定义参数
  };
  thumbnail?: string;                  // 缩略图
  instructions?: string;               // 操作指南
  createdAt: Date;                     // 创建时间
  updatedAt: Date;                     // 更新时间
}
```

### 用户模型 (User)
```typescript
interface IUser {
  username: string;                    // 用户名
  email: string;                       // 邮箱
  password: string;                    // 密码(加密存储)
  avatar?: string;                     // 头像
  role: 'user' | 'admin';              // 用户角色
  favorites?: string[];                // 收藏游戏ID
  createdAt: Date;                     // 创建时间
  lastLogin?: Date;                    // 最后登录时间
  status: 'active' | 'inactive' | 'banned'; // 用户状态
}
```

### 评论模型 (Comment)
```typescript
interface IComment {
  userId: string;                      // 用户ID
  gameId: string;                      // 游戏ID
  content: string;                     // 评论内容
  rating?: number;                     // 评分(1-5)
  status: 'approved' | 'pending' | 'rejected'; // 评论状态
  createdAt: Date;                     // 创建时间
  updatedAt: Date;                     // 更新时间
}
```

## 🔌 API 端点

### 游戏 API
- `GET /api/games` - 获取游戏列表
- `GET /api/games/:id` - 获取游戏详情
- `POST /api/games` - 创建新游戏
- `PUT /api/games/:id` - 更新游戏
- `DELETE /api/games/:id` - 删除游戏
- `GET /api/games/categories` - 获取游戏分类
- `GET /api/games/tags` - 获取游戏标签

### 用户 API
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息
- `PUT /api/users/:id` - 更新用户信息
- `GET /api/users/:id/favorites` - 获取用户收藏
- `POST /api/users/:id/favorites` - 添加收藏
- `DELETE /api/users/:id/favorites/:gameId` - 删除收藏

### 评论 API
- `GET /api/games/:id/comments` - 获取游戏评论
- `POST /api/games/:id/comments` - 添加评论
- `PUT /api/comments/:id` - 更新评论
- `DELETE /api/comments/:id` - 删除评论

### 管理 API
- `GET /api/admin/dashboard` - 获取仪表盘数据
- `GET /api/admin/users` - 获取用户列表
- `PUT /api/admin/users/:id/status` - 更新用户状态
- `GET /api/admin/comments` - 获取评论列表
- `PUT /api/admin/comments/:id/status` - 更新评论状态

## 🛠️ 开发设置

### 环境要求
- Node.js 18.x 或更高版本
- MongoDB 5.x 或更高版本

### 环境变量
创建一个 `.env` 文件在项目根目录，并添加以下配置：

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/games-hub
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
npm run dev
```

### 生产模式构建
```bash
npm run build
npm start
```

## 📈 API 文档

启动服务器后，API 文档可在以下地址访问：
- 开发环境: http://localhost:4000/api-docs

API 文档使用 Swagger/OpenAPI 生成，提供了端点、请求参数和响应格式的详细说明。

## 🔧 工具和库

- **express**: Web 服务器框架
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT 认证
- **cors**: 跨域资源共享
- **helmet**: 安全中间件
- **dotenv**: 环境变量管理
- **swagger-ui-express**: API 文档

## 🧪 测试

```bash
# 运行单元测试
npm test

# 运行测试覆盖率报告
npm run test:coverage
```

## 🤝 贡献

请参考项目根目录的 [贡献指南](../CONTRIBUTING.md) 了解如何参与贡献。

## 📝 待办事项

- [ ] 完成所有 API 端点实现
- [ ] 添加单元测试和集成测试
- [ ] 实现数据验证和错误处理
- [ ] 添加日志系统
- [ ] 实现缓存策略
- [ ] 部署和 CI/CD 配置

---

© 2023-2024 GameHub. All rights reserved. 