import app from './app';
import { config } from './config';
import { connectDB } from './utils/database';

const startServer = async () => {
  try {
    // 连接数据库
    await connectDB();
    
    // 启动服务器
    app.listen(config.port, () => {
      console.log(`
🚀 Server running in ${config.env} mode
📡 Listening on port ${config.port}
🌐 http://localhost:${config.port}
      `);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception 💥:', error);
  process.exit(1);
});

// 处理未处理的 Promise 拒绝
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection 💥:', error);
  process.exit(1);
});

startServer(); 