import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '4000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/games-hub',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
  
  // 数据库配置
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '27017', 10),
    name: process.env.DB_NAME || 'games-hub',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  
  // JWT配置
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  
  // 日志配置
  log: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'dev',
  }
}; 