'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SearchBox from '../search/SearchBox';
import { useUser } from '@/context/UserContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // 点击外部关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">GameHub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className={`${pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'} transition duration-150`}
            >
              首页
            </Link>
            <Link 
              href="/categories" 
              className={`${pathname === '/categories' || pathname.startsWith('/categories/') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'} transition duration-150`}
            >
              分类
            </Link>
            <Link 
              href="/popular" 
              className={`${pathname === '/popular' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'} transition duration-150`}
            >
              热门
            </Link>
            <Link 
              href="/newest" 
              className={`${pathname === '/newest' ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'} transition duration-150`}
            >
              最新
            </Link>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block w-64">
              <SearchBox />
            </div>
            
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden relative">
                    <Image 
                      src={user.avatar || 'https://i.pravatar.cc/32?img=8'} 
                      alt={user.username}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="hidden md:block text-sm font-medium">{user.username}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      个人资料
                    </Link>
                    <Link 
                      href="/profile?tab=favorites" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      我的收藏
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link 
                      href="/logout" 
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      退出登录
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden md:block">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150">
                  登录
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`${pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-600'} px-2 py-1`}
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                href="/categories" 
                className={`${pathname === '/categories' || pathname.startsWith('/categories/') ? 'text-blue-600 font-semibold' : 'text-gray-600'} px-2 py-1`}
                onClick={() => setIsMenuOpen(false)}
              >
                分类
              </Link>
              <Link 
                href="/popular" 
                className={`${pathname === '/popular' ? 'text-blue-600 font-semibold' : 'text-gray-600'} px-2 py-1`}
                onClick={() => setIsMenuOpen(false)}
              >
                热门
              </Link>
              <Link 
                href="/newest" 
                className={`${pathname === '/newest' ? 'text-blue-600 font-semibold' : 'text-gray-600'} px-2 py-1`}
                onClick={() => setIsMenuOpen(false)}
              >
                最新
              </Link>
              <div className="relative mt-2">
                <SearchBox onClose={() => setIsMenuOpen(false)} />
              </div>
              
              {user ? (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-center px-2 py-1">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative">
                      <Image 
                        src={user.avatar || 'https://i.pravatar.cc/32?img=8'} 
                        alt={user.username}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="ml-2 font-medium">{user.username}</span>
                  </div>
                  <Link 
                    href="/profile" 
                    className="block px-2 py-1 text-gray-600 mt-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    个人资料
                  </Link>
                  <Link 
                    href="/profile?tab=favorites" 
                    className="block px-2 py-1 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    我的收藏
                  </Link>
                  <button 
                    className="w-full text-left px-2 py-1 text-red-600 mt-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    退出登录
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150 mt-2 w-full">
                    登录
                  </button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 