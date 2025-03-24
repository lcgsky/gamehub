'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm';
import { useUser } from '@/context/UserContext';

export default function RegisterPage() {
  const { register, login, isLoading } = useUser();
  const [error, setError] = useState<string | undefined>();
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (data: Record<string, string>) => {
    try {
      // 密码确认验证
      if (data.password !== data.confirmPassword) {
        setError('两次输入的密码不一致');
        return;
      }
      
      await register(data.username, data.email, data.password);
      router.push('/'); // 注册成功后跳转到首页
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('注册失败，请稍后再试');
      }
    }
  };

  // 处理社交账号注册/登录
  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    try {
      // 模拟社交登录延迟
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 创建一个基于社交平台的用户名和邮箱
      const username = `${provider}user${Date.now().toString().slice(-4)}`;
      const email = `${username}@example.com`;
      const password = `${provider}${Date.now().toString().slice(-6)}`;
      
      // 尝试注册新用户
      try {
        await register(username, email, password);
        router.push('/');
      } catch (registerError) {
        // 如果注册失败（例如用户名或邮箱已存在），则尝试登录已有账号
        if (provider === 'facebook') {
          await login('demo', 'password123');
        } else if (provider === 'google') {
          await login('test', 'test123');
        } else {
          throw registerError;
        }
        router.push('/');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`社交账号注册失败: ${err.message}`);
      } else {
        setError('社交账号注册失败，请稍后再试');
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const registerFields = [
    {
      id: 'username',
      label: '用户名',
      type: 'text',
      placeholder: '请输入用户名',
      required: true
    },
    {
      id: 'email',
      label: '邮箱',
      type: 'email',
      placeholder: '请输入邮箱地址',
      required: true
    },
    {
      id: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码（至少6位）',
      required: true
    },
    {
      id: 'confirmPassword',
      label: '确认密码',
      type: 'password',
      placeholder: '请再次输入密码',
      required: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <AuthForm
          title="注册账号"
          fields={registerFields}
          submitText="注册"
          onSubmit={handleRegister}
          isLoading={isLoading}
          error={error}
          redirectText="已有账号？"
          redirectLink="/login"
          redirectLinkText="立即登录"
        />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">或使用社交账号注册</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading || socialLoading !== null}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150 disabled:opacity-50 relative"
            >
              {socialLoading === 'facebook' ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              )}
            </button>
            <button 
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading || socialLoading !== null}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150 disabled:opacity-50 relative"
            >
              {socialLoading === 'google' ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
                </svg>
              )}
            </button>
            <button 
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading || socialLoading !== null}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150 disabled:opacity-50 relative"
            >
              {socialLoading === 'apple' ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                <svg className="w-5 h-5 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                </svg>
              )}
            </button>
          </div>
          {error && error.includes('社交账号') && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
} 