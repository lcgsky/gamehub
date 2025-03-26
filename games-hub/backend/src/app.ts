import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

const app: Express = express();

// 基础中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: config.allowedOrigins,
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// API 路由
app.use('/api', routes);

// 健康检查端点
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理中间件
app.use(errorHandler);

// 处理未找到的路由
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app; 