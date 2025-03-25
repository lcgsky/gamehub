'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/AuthForm';
import { useUser } from '@/context/UserContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Language, Translations } from '@/types/i18n';

export default function LoginPage() {
  const { login, isLoading } = useUser();
  const [error, setError] = useState<string | undefined>();
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();
  const { locale } = useLanguage();
  const [translations, setTranslations] = useState<Translations>({} as Translations);

  useEffect(() => {
    async function loadTranslations() {
      const { getTranslations } = await import('@/utils/i18n');
      const trans = await getTranslations(locale as Language, 'common');
      setTranslations(trans as Translations);
    }
    loadTranslations();
  }, [locale]);

  const handleLogin = async (data: Record<string, string>) => {
    try {
      await login(data.email, data.password);
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(translations?.auth?.login_failed || 'Login failed, please try again later');
      }
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      let socialEmail, socialPassword;
      
      switch(provider) {
        case 'facebook':
          socialEmail = 'demo';
          socialPassword = 'password123';
          break;
        case 'google':
          socialEmail = 'test';
          socialPassword = 'test123';
          break;
        case 'apple':
          const random = Math.random() > 0.5;
          socialEmail = random ? 'demo' : 'test';
          socialPassword = random ? 'password123' : 'test123';
          break;
        default:
          throw new Error('Unknown social platform');
      }

      await login(socialEmail, socialPassword);
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(translations?.auth?.social_login_failed?.replace('{{message}}', err.message) || `Social login failed: ${err.message}`);
      } else {
        setError(translations?.auth?.login_failed || 'Login failed, please try again later');
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const loginFields = [
    {
      id: 'email',
      label: translations?.auth?.email || 'Email/Username',
      type: 'text',
      placeholder: translations?.auth?.email_placeholder || 'Please enter your email or username',
      required: true
    },
    {
      id: 'password',
      label: translations?.auth?.password || 'Password',
      type: 'password',
      placeholder: translations?.auth?.password_placeholder || 'Please enter your password',
      required: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <AuthForm
          title={translations?.auth?.login || 'Login'}
          fields={loginFields}
          submitText={translations?.auth?.submit_login || 'Login'}
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
          redirectText={translations?.auth?.no_account || "Don't have an account?"}
          redirectLink="/register"
          redirectLinkText={translations?.auth?.register_now || 'Register Now'}
        />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">{translations?.auth?.social_login || 'Or login with social account'}</p>
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
          {error && error.includes('social') && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
} 