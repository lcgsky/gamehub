'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';

// 扩展用户类型接口，添加角色
interface AdminUser {
  id: string;
  username: string;
  email: string;
  role?: string;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCheckingRole, setIsCheckingRole] = useState<boolean>(true);

  // 检查是否为管理员
  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      router.push('/login?redirect=/admin');
      return;
    }
    
    const checkAdminRole = async () => {
      setIsCheckingRole(true);
      try {
        // 模拟API调用检查用户角色
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 在真实环境中，这里应该是一个API调用来验证当前用户是否有管理员权限
        // 这里我们只是模拟一个验证过程，只允许ID为1或10的用户（参考admin/users/page.tsx中的数据）
        const adminIds = ['1', '10']; // 只有admin用户和moderator用户是管理员
        const hasAdminAccess = adminIds.includes(user.id);
        
        setIsAdmin(hasAdminAccess);
        
        if (!hasAdminAccess) {
          router.push('/');
        }
      } catch (error) {
        console.error('Failed to verify admin role:', error);
        setIsAdmin(false);
        router.push('/');
      } finally {
        setIsCheckingRole(false);
      }
    };
    
    checkAdminRole();
  }, [user, isLoading, router]);

  // 如果正在加载或验证角色，显示加载状态
  if (isLoading || isCheckingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">验证管理员权限中...</p>
        </div>
      </div>
    );
  }

  // 如果不是管理员，显示没有权限的提示
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ 访问被拒绝</div>
          <p className="text-gray-600 mb-4">您没有管理员权限，无法访问该页面。</p>
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* 侧边导航栏 */}
      <aside className="bg-blue-800 text-white w-64 shrink-0 hidden md:block">
        <div className="p-4 border-b border-blue-700">
          <h2 className="text-xl font-bold">GameHub 管理后台</h2>
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
            <li className="mt-6">
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
          <h2 className="text-xl font-bold">GameHub 管理后台</h2>
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