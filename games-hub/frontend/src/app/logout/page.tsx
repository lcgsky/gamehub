'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function LogoutPage() {
  const { logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    // 执行退出登录操作
    logout();
    
    // 重定向到首页
    router.push('/');
  }, [logout, router]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">正在退出登录...</p>
    </div>
  );
} 