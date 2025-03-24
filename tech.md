# 游戏聚合网站技术文档

## 1. 系统架构

### 1.1 整体架构
```
├── 前端层（Next.js + React）
│   ├── 页面路由
│   ├── 状态管理
│   └── UI 组件
├── 后端层（Node.js + Express/Nest.js）
│   ├── RESTful API
│   ├── 游戏插件系统
│   └── 数据处理
└── 数据层（MongoDB）
    ├── 游戏数据
    ├── 用户数据
    └── 统计数据
```

### 1.2 技术栈选型

#### 1.2.1 前端技术栈
- **框架**: Next.js 13+ (React 18+)
- **类型系统**: TypeScript
- **UI框架**: Material-UI/Tailwind CSS
- **状态管理**: React Query + Zustand
- **构建工具**: Webpack/Vite
- **测试框架**: Jest + React Testing Library

#### 1.2.2 后端技术栈
- **运行时**: Node.js 16+
- **框架**: Express.js/Nest.js
- **数据库**: MongoDB
- **认证**: JWT + OAuth2.0
- **API文档**: Swagger/OpenAPI
- **测试**: Jest + Supertest

#### 1.2.3 部署和运维
- **容器化**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **监控**: Prometheus + Grafana
- **日志**: ELK Stack
- **反向代理**: Nginx
- **SSL**: Let's Encrypt

## 2. 详细设计

### 2.1 前端架构

#### 2.1.1 目录结构
```
src/
├── components/         # 可复用组件
│   ├── common/        # 通用组件
│   ├── games/         # 游戏相关组件
│   └── layout/        # 布局组件
├── pages/             # 页面组件
├── hooks/             # 自定义 Hooks
├── services/          # API 服务
├── utils/             # 工具函数
├── types/             # TypeScript 类型定义
└── styles/            # 样式文件
```

#### 2.1.2 核心组件设计

##### GameContainer 组件
```typescript
interface GameContainerProps {
  game: GamePlugin;
  onMount?: () => void;
  onUnmount?: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  game,
  onMount,
  onUnmount
}) => {
  // 实现游戏容器逻辑
};
```

##### 响应式布局实现
```typescript
// hooks/useResponsive.ts
const useResponsive = () => {
  const breakpoints = {
    mobile: 640,
    tablet: 1024,
    desktop: 1280
  };
  // 实现响应式逻辑
};
```

### 2.2 后端架构

#### 2.2.1 目录结构
```
src/
├── controllers/       # 控制器
├── services/         # 业务逻辑
├── models/           # 数据模型
├── middleware/       # 中间件
├── plugins/          # 插件系统
├── utils/           # 工具函数
└── config/          # 配置文件
```

#### 2.2.2 数据模型设计

##### 游戏模型
```typescript
interface Game {
  id: string;
  name: string;
  description: string;
  type: 'iframe' | 'api' | 'custom';
  url: string;
  tags: string[];
  category: string;
  status: 'active' | 'inactive';
  config: GameConfig;
  createdAt: Date;
  updatedAt: Date;
}

interface GameConfig {
  width: number;
  height: number;
  allowFullscreen: boolean;
  customParams?: Record<string, any>;
}
```

##### 用户模型
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  authProvider: 'google' | 'facebook' | 'email';
  createdAt: Date;
}
```

### 2.2.3 数据库索引设计

#### Games 集合索引
```javascript
// 游戏集合索引设计
db.games.createIndex({ "name": 1 });  // 游戏名称索引，用于搜索
db.games.createIndex({ "tags": 1 });  // 标签索引，用于分类筛选
db.games.createIndex({ "category": 1 });  // 分类索引
db.games.createIndex({ "status": 1 });  // 状态索引
db.games.createIndex({ "createdAt": -1 });  // 创建时间倒序索引，用于最新游戏
db.games.createIndex({ "type": 1 });  // 游戏类型索引
db.games.createIndex({ 
  "name": "text", 
  "description": "text" 
}, {
  weights: {
    name: 10,
    description: 5
  }
});  // 全文搜索索引

// 复合索引
db.games.createIndex({ "category": 1, "status": 1 });  // 分类+状态复合索引
db.games.createIndex({ "tags": 1, "createdAt": -1 });  // 标签+时间复合索引
```

#### Users 集合索引
```javascript
// 用户集合索引设计
db.users.createIndex({ "email": 1 }, { unique: true });  // 唯一邮箱索引
db.users.createIndex({ "authProvider": 1 });  // 认证提供商索引
db.users.createIndex({ "role": 1 });  // 角色索引
```

#### Comments 集合索引
```javascript
// 评论集合索引设计
db.comments.createIndex({ "gameId": 1 });  // 游戏ID索引
db.comments.createIndex({ "userId": 1 });  // 用户ID索引
db.comments.createIndex({ "createdAt": -1 });  // 创建时间倒序索引
db.comments.createIndex({ "gameId": 1, "createdAt": -1 });  // 游戏评论时间复合索引
```

### 2.3 API 设计

#### 2.3.1 RESTful API 端点

##### 游戏相关 API
```
GET    /api/games              # 获取游戏列表
GET    /api/games/:id          # 获取游戏详情
POST   /api/games              # 创建新游戏
PUT    /api/games/:id          # 更新游戏信息
DELETE /api/games/:id          # 删除游戏
GET    /api/games/categories   # 获取游戏分类
GET    /api/games/tags         # 获取游戏标签
```

##### 用户相关 API
```
POST   /api/auth/login         # 用户登录
POST   /api/auth/register      # 用户注册
GET    /api/auth/profile       # 获取用户信息
PUT    /api/auth/profile       # 更新用户信息
POST   /api/auth/oauth/:provider # OAuth登录
```

### 2.3.2 API 详细参数说明

#### 游戏相关 API

##### 获取游戏列表
```typescript
GET /api/games

// 请求参数（Query Parameters）
interface GameListParams {
  page?: number;         // 页码，默认 1
  pageSize?: number;     // 每页数量，默认 20
  category?: string;     // 分类筛选
  tags?: string[];       // 标签筛选
  sort?: 'newest' | 'popular' | 'rating';  // 排序方式
  search?: string;       // 搜索关键词
  status?: 'active' | 'inactive';  // 游戏状态
}

// 响应数据
interface GameListResponse {
  total: number;         // 总数
  pages: number;         // 总页数
  currentPage: number;   // 当前页
  data: Game[];          // 游戏列表
  filters: {             // 可用筛选条件
    categories: string[];
    tags: string[];
  };
}
```

##### 获取游戏详情
```typescript
GET /api/games/:id

// 路径参数
id: string;  // 游戏ID

// 响应数据
interface GameDetailResponse extends Game {
  statistics: {
    playCount: number;     // 游玩次数
    favoriteCount: number; // 收藏数
    averageRating: number; // 平均评分
  };
  relatedGames: Game[];    // 相关游戏推荐
  comments: {              // 最新评论
    total: number;
    items: Comment[];
  };
}
```

##### 创建新游戏
```typescript
POST /api/games

// 请求体
interface CreateGameRequest {
  name: string;          // 游戏名称（必填）
  description: string;   // 游戏描述（必填）
  type: 'iframe' | 'api' | 'custom';  // 游戏类型（必填）
  url: string;          // 游戏URL（必填）
  tags: string[];       // 标签（可选）
  category: string;     // 分类（必填）
  config: GameConfig;   // 游戏配置（必填）
  thumbnail?: string;   // 缩略图URL（可选）
  instructions?: string; // 操作说明（可选）
}

// 响应数据
interface CreateGameResponse {
  id: string;           // 创建的游戏ID
  success: boolean;     // 创建结果
  message?: string;     // 错误信息（如果有）
}
```

#### 用户相关 API

##### 用户登录
```typescript
POST /api/auth/login

// 请求体
interface LoginRequest {
  email: string;        // 邮箱（必填）
  password: string;     // 密码（必填）
  remember?: boolean;   // 记住登录（可选）
}

// 响应数据
interface LoginResponse {
  token: string;        // JWT token
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  expiresIn: number;    // token过期时间（秒）
}
```

##### OAuth登录
```typescript
POST /api/auth/oauth/:provider

// 路径参数
provider: 'google' | 'facebook';  // OAuth提供商

// 请求体
interface OAuthRequest {
  accessToken: string;  // OAuth访问令牌（必填）
  userData?: any;       // 用户数据（可选）
}

// 响应数据
interface OAuthResponse {
  token: string;        // JWT token
  user: User;          // 用户信息
  isNewUser: boolean;  // 是否新用户
}
```

#### 评论相关 API

##### 获取游戏评论
```typescript
GET /api/games/:gameId/comments

// 请求参数
interface CommentListParams {
  page?: number;        // 页码，默认 1
  pageSize?: number;    // 每页数量，默认 20
  sort?: 'newest' | 'rating';  // 排序方式
}

// 响应数据
interface CommentListResponse {
  total: number;        // 总评论数
  pages: number;        // 总页数
  currentPage: number;  // 当前页
  data: Comment[];      // 评论列表
}
```

##### 添加评论
```typescript
POST /api/games/:gameId/comments

// 请求体
interface CreateCommentRequest {
  content: string;      // 评论内容（必填）
  rating?: number;      // 评分 1-5（可选）
  images?: string[];    // 图片URL数组（可选）
}

// 响应数据
interface CreateCommentResponse {
  id: string;          // 评论ID
  success: boolean;    // 创建结果
  comment: Comment;    // 创建的评论
}
```

### 2.4 安全设计

#### 2.4.1 iframe 安全策略
```typescript
// middleware/csp.ts
const cspMiddleware = () => {
  return (req, res, next) => {
    res.setHeader('Content-Security-Policy', `
      default-src 'self';
      frame-src 'self' ${allowedGameDomains.join(' ')};
      script-src 'self' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
    `);
    next();
  };
};
```

#### 2.4.2 认证与授权
```typescript
// middleware/auth.ts
const authMiddleware = (roles: string[]) => {
  return async (req, res, next) => {
    const token = req.headers.authorization;
    // 实现认证逻辑
  };
};
```

## 3. 游戏插件系统

### 3.1 插件接口定义
```typescript
interface GamePlugin {
  id: string;
  name: string;
  description: string;
  type: 'iframe' | 'api' | 'custom';
  url: string;
  tags: string[];
  category: string;
  config: {
    width: number;
    height: number;
    allowFullscreen: boolean;
    customParams?: Record<string, any>;
  };
  onMount?: () => void;
  onUnmount?: () => void;
}
```

### 3.2 插件加载机制
```typescript
// plugins/loader.ts
class PluginLoader {
  private plugins: Map<string, GamePlugin>;

  async loadPlugin(config: GamePluginConfig): Promise<void> {
    // 实现插件加载逻辑
  }

  async unloadPlugin(id: string): Promise<void> {
    // 实现插件卸载逻辑
  }
}
```

## 4. 性能优化

### 4.1 前端优化
- 路由级代码分割
- 组件懒加载
- 图片优化（WebP格式、响应式图片）
- 缓存策略
- 预加载关键资源

### 4.2 后端优化
- 数据库索引优化
- 缓存层（Redis）
- 负载均衡
- 请求限流
- 数据压缩

## 5. 监控与日志

### 5.1 监控指标
- 服务器资源使用率
- API 响应时间
- 错误率
- 用户会话数
- 游戏加载性能

### 5.2 日志收集
- 访问日志
- 错误日志
- 性能日志
- 用户行为日志

## 6. 部署流程

### 6.1 Docker 配置
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  backend:
    build: ./backend
    ports:
      - "4000:4000"
  mongodb:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db
```

### 6.2 CI/CD 流程
```yaml
# .github/workflows/main.yml
name: CI/CD Pipeline
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and Test
        run: |
          npm install
          npm test
          npm run build
```

## 7. 开发规范

### 7.1 代码规范
- ESLint 配置
- Prettier 格式化
- TypeScript 严格模式
- Git 提交规范

### 7.2 文档规范
- API 文档（OpenAPI/Swagger）
- 组件文档（Storybook）
- 代码注释规范
- 版本变更日志 