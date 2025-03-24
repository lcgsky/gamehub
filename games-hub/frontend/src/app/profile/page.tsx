'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { GamePlugin } from '@/types/game';

// 模拟游戏数据
const mockGames: Partial<GamePlugin>[] = [
  {
    id: '1',
    name: '银河征服者',
    description: '一款策略性太空探索游戏，探索未知星系，扩展你的星际帝国。',
    type: 'iframe',
    category: 'strategy',
    tags: ['太空', '策略', '探索'],
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: '方块解谜',
    description: '经典的方块消除游戏，测试你的逻辑思维和策略规划能力。',
    type: 'iframe',
    category: 'puzzle',
    tags: ['解谜', '益智', '休闲'],
    thumbnail: 'https://images.unsplash.com/photo-1628483368560-f713c829eb3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: '水果忍者',
    description: '切割飞舞的水果，避开炸弹，成为水果忍者大师！',
    type: 'iframe',
    category: 'casual',
    tags: ['休闲', '切水果', '手机游戏'],
    thumbnail: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export default function ProfilePage() {
  const { user, logout, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState('favorites');
  const [favoriteGames, setFavoriteGames] = useState<Partial<GamePlugin>[]>([]);
  const router = useRouter();

  // 如果未登录，重定向到登录页面
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // 模拟获取用户收藏的游戏
  useEffect(() => {
    if (user && user.favorites) {
      // 实际应用中，应该调用API获取用户收藏的游戏详情
      const filteredGames = mockGames.filter(game => 
        user.favorites?.includes(game.id as string)
      );
      setFavoriteGames(filteredGames);
    }
  }, [user]);

  // 处理退出登录
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 bg-gray-200 rounded-lg h-60"></div>
            <div className="md:w-2/3">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // 等待重定向
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">个人资料</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* 用户信息头部 */}
        <div className="relative h-40 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-16 left-6">
            <div className="bg-white p-1 rounded-full shadow">
              <Image 
                src={user.avatar || 'https://i.pravatar.cc/150?img=33'} 
                alt={user.username}
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        
        {/* 用户资料 */}
        <div className="pt-20 px-6 pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">注册于 {new Date().toLocaleDateString()}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-150"
            >
              退出登录
            </button>
          </div>
          
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8">
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'favorites'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  收藏的游戏
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'history'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  游戏历史
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  账号设置
                </button>
              </nav>
            </div>
            
            {/* 收藏的游戏 */}
            {activeTab === 'favorites' && (
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-4">我收藏的游戏</h3>
                {user.favorites && user.favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockGames.map(game => (
                      <Link href={`/games/${game.id}`} key={game.id} className="block group">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group-hover:shadow-md transition duration-200">
                          <div className="relative h-40">
                            <Image
                              src={game.thumbnail || ''}
                              alt={game.name || ''}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold">{game.name}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{game.description}</p>
                            <div className="flex mt-2 space-x-2">
                              {game.tags?.slice(0, 2).map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-md">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">您还没有收藏任何游戏</p>
                    <Link href="/categories" className="text-blue-600 hover:text-blue-800">
                      浏览游戏分类
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            {/* 游戏历史 */}
            {activeTab === 'history' && (
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-4">最近玩过的游戏</h3>
                <p className="text-gray-500 text-center py-12">游戏历史记录功能即将推出</p>
              </div>
            )}
            
            {/* 账号设置 */}
            {activeTab === 'settings' && (
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-4">账号设置</h3>
                <form className="max-w-md">
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      用户名
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={user.username}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      邮箱
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                      头像
                    </label>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={user.avatar || 'https://i.pravatar.cc/150?img=33'}
                        alt="头像"
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                      <button
                        type="button"
                        className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm"
                      >
                        更改头像
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150"
                  >
                    保存更改
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 