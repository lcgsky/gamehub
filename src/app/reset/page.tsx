'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ResetPage() {
  const [isResetting, setIsResetting] = useState(true);
  const [message, setMessage] = useState('正在重置系统状态...');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // 执行重置操作
    const resetSystem = () => {
      try {
        // 强制清除所有相关的本地存储数据
        localStorage.clear(); // 首先清除所有数据
        
        // 设置初始用户数据（这会在登录时被重新载入）
        const initialUsers = [
          {
            id: '1',
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin123',
            avatar: 'https://i.pravatar.cc/150?img=1',
            favorites: ['1', '3'],
            role: 'admin'
          },
          {
            id: '2',
            username: 'demo',
            email: 'demo@example.com',
            password: 'password123',
            avatar: 'https://i.pravatar.cc/150?img=2',
            favorites: ['2', '5'],
            role: 'user'
          },
          {
            id: '10',
            username: 'moderator',
            email: 'mod@example.com',
            password: 'mod123',
            avatar: 'https://i.pravatar.cc/150?img=10',
            favorites: ['3', '7', '9'],
            role: 'admin'
          }
        ];
        
        // 重新设置用户数据
        localStorage.setItem('registeredUsers', JSON.stringify(initialUsers));
        
        // 设置重置成功消息
        setMessage('系统状态已成功重置！您可以返回首页并使用正确的凭据登录。');
        console.log('系统状态已重置，所有本地存储数据已清除');
      } catch (error) {
        console.error('重置系统状态时出错:', error);
        setMessage('重置系统时出现错误');
        setError(error instanceof Error ? error.message : '未知错误');
      } finally {
        setIsResetting(false);
      }
    };
    
    // 延迟1秒执行重置，显示加载效果
    const timer = setTimeout(resetSystem, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">系统重置</h1>
        
        {isResetting ? (
          <div className="my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">{message}</p>
          </div>
        ) : (
          <div className="my-8">
            {error ? (
              <div>
                <div className="text-red-500 text-5xl mb-4">✗</div>
                <p className="text-gray-600 mb-6">{message}</p>
                <p className="text-red-500 mb-6">{error}</p>
              </div>
            ) : (
              <div>
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <p className="text-gray-600 mb-6">{message}</p>
              </div>
            )}
            
            <div className="text-gray-700 mb-6 text-left p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">管理员账户:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>用户名: admin</li>
                <li>密码: admin123</li>
              </ul>
              <h3 className="font-bold mt-4 mb-2">普通用户账户:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>用户名: demo</li>
                <li>密码: password123</li>
              </ul>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <Link 
                href="/login"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition duration-150"
              >
                去登录
              </Link>
              <Link 
                href="/"
                className="inline-block bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition duration-150"
              >
                返回首页
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 