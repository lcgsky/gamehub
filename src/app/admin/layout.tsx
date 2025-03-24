'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // 检查用户是否为管理员
  useEffect(() => {
    // 清除任何可能引起问题的本地存储
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          // 如果用户名是demo但角色是admin，清除数据
          if (userData.username === 'demo' && userData.role === 'admin') {
            console.log('检测到错误的admin权限，正在清除');
            localStorage.removeItem('user');
            window.location.href = '/reset';
            return;
          }
        } catch (e) {
          console.error('解析用户数据出错:', e);
        }
      }
    }
    
    const checkAdminAccess = async () => {
      try {
        // 如果用户正在加载或没有用户登录，重定向到登录页面
        if (isLoading) {
          return; // 正在加载中，等待数据
        }
        
        if (!user) {
          // 没有用户登录，立即重定向
          router.replace('/login?redirect=/admin');
          return;
        }
        
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 200));
        
        console.log('当前用户:', JSON.stringify(user));
        
        // 明确检查用户是否为管理员
        const isAdmin = user.role === 'admin' && (user.id === '1' || user.id === '10');
        
        console.log(`用户ID: ${user.id}, 用户角色: ${user.role}, 是否管理员: ${isAdmin}`);
        
        if (!isAdmin) {
          console.log('用户无管理权限，重定向到首页');
          // 使用replace重定向到首页
          router.replace('/');
          return;
        }
        
        // 用户有权限访问管理页面
        setAuthorized(true);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminAccess();
  }, [user, isLoading, router]);
  
  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">正在验证管理员权限...</p>
        </div>
      </div>
    );
  }
  
  // 如果未授权，显示无权限页面
  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-lg p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">访问被拒绝</h2>
          <p className="text-gray-600 mb-4">您没有管理员权限，无法访问该页面。</p>
          
          {user && (
            <div className="mb-6 p-4 bg-gray-50 rounded text-left">
              <p className="text-sm text-gray-500 mb-2">当前登录信息:</p>
              <div className="flex items-center mb-2">
                <span className="font-semibold w-24 text-gray-600">用户名:</span>
                <span>{user.username}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="font-semibold w-24 text-gray-600">用户ID:</span>
                <span>{user.id}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-24 text-gray-600">用户角色:</span>
                <span className={user.role === 'admin' ? 'text-green-600' : 'text-gray-600'}>
                  {user.role === 'admin' ? '管理员' : '普通用户'}
                </span>
              </div>
            </div>
          )}
          
          <div className="flex space-x-4 justify-center">
            <Link 
              href="/reset"
              className="inline-block bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150"
            >
              重置系统
            </Link>
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // 用户已授权，显示管理界面
  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* 侧边导航栏 */}
      <aside className="bg-blue-800 text-white w-64 shrink-0 hidden md:block">
        <div className="p-4 border-b border-blue-700">
          <div className="text-xl font-bold">GameHub 管理后台</div>
          {user && (
            <div className="mt-2 text-sm text-blue-200">
              管理员: {user.username}
            </div>
          )}
        </div>
        <nav className="p-2">
          <ul>
            <li className="mb-1">
              <Link 
                href="/admin" 
                className="block p-3 rounded hover:bg-blue-700 transition duration-150"
              >
                仪表盘
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                href="/admin/games" 
                className="block p-3 rounded hover:bg-blue-700 transition duration-150"
              >
                游戏管理
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                href="/admin/categories" 
                className="block p-3 rounded hover:bg-blue-700 transition duration-150"
              >
                分类管理
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                href="/admin/users" 
                className="block p-3 rounded hover:bg-blue-700 transition duration-150"
              >
                用户管理
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                href="/admin/comments" 
                className="block p-3 rounded hover:bg-blue-700 transition duration-150"
              >
                评论管理
              </Link>
            </li>
            <li className="mb-1">
              <Link 
                href="/admin/statistics" 
                className="block p-3 rounded hover:bg-blue-700 transition duration-150"
              >
                数据统计
              </Link>
            </li>
            <li className="mt-6 border-t border-blue-700 pt-2">
              <Link 
                href="/reset"
                className="block p-3 rounded bg-red-600 hover:bg-red-700 transition duration-150 mb-1"
              >
                系统重置
              </Link>
              <Link 
                href="/logout" 
                className="block p-3 rounded bg-gray-600 hover:bg-gray-700 transition duration-150 mb-1"
              >
                退出登录
              </Link>
              <Link 
                href="/" 
                className="block p-3 rounded hover:bg-blue-700 transition duration-150"
              >
                返回前台
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* 移动端菜单 */}
      <div className="md:hidden bg-blue-800 text-white p-4 w-full sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-bold">GameHub 管理后台</div>
            {user && (
              <div className="text-sm text-blue-200">
                管理员: {user.username}
              </div>
            )}
          </div>
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* 主要内容区域 */}
      <main className="flex-grow p-6">
        {children}
      </main>
    </div>
  );
} 