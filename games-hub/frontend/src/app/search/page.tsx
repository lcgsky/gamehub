'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import GameCard from '@/components/games/GameCard';
import { GamePlugin } from '@/components/games/GameContainer';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const tag = searchParams.get('tag') || '';
  
  const [games, setGames] = useState<GamePlugin[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(query);

  // 模拟游戏数据
  const mockGames: GamePlugin[] = [
    {
      id: '1',
      name: '2048',
      description: '经典数字拼图游戏，合并相同的数字，获得2048！',
      type: 'iframe',
      url: 'https://play2048.co/',
      tags: ['益智', '数字', '单人'],
      category: '益智',
      status: 'active',
      thumbnail: 'https://play-lh.googleusercontent.com/4lMV8LgA_wZIWLU19xYjzTzR_O2EBYdlHEs0wDuxCzLQXCXo8JrPbYIJGHfj0hKqxw=w240-h480-rw',
      config: {
        width: 600,
        height: 800,
        allowFullscreen: true
      }
    },
    {
      id: '2',
      name: '贪吃蛇',
      description: '控制一条贪食蛇，吃掉食物并避免撞墙或咬到自己。',
      type: 'iframe',
      url: 'https://www.google.com/fbx?fbx=snake_arcade',
      tags: ['休闲', '经典', '单人'],
      category: '休闲',
      status: 'active',
      thumbnail: 'https://www.google.com/logos/fnbx/snake_arcade/v5/snake_arcade_logo.svg',
      config: {
        width: 600,
        height: 500,
        allowFullscreen: true
      }
    },
    {
      id: '3',
      name: '俄罗斯方块',
      description: '经典的俄罗斯方块游戏，尽可能长时间地摆放下落的方块。',
      type: 'iframe',
      url: 'https://tetris.com/play-tetris',
      tags: ['益智', '经典', '单人'],
      category: '益智',
      status: 'active',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Emojione_1F579.svg/1024px-Emojione_1F579.svg.png',
      config: {
        width: 600,
        height: 700,
        allowFullscreen: true
      }
    },
    {
      id: '4',
      name: '扫雷',
      description: '经典的扫雷游戏，标记地雷并清除所有安全区域。',
      type: 'iframe',
      url: 'https://minesweeper.online/',
      tags: ['益智', '经典', '单人'],
      category: '益智',
      status: 'active',
      thumbnail: 'https://play-lh.googleusercontent.com/PXhCCR253C07UQ98icpIgQ_Mv9RJtZHmVoXTI7Qy7MLtUy27FP90NIm1VZeJ7mUxSx0=w240-h480-rw',
      config: {
        width: 600,
        height: 700,
        allowFullscreen: true
      }
    },
    {
      id: '5',
      name: '弹球游戏',
      description: '控制平台反弹球，击碎所有砖块。',
      type: 'iframe',
      url: 'https://bruno-simon.com/html/breakout/',
      tags: ['街机', '经典', '单人'],
      category: '街机',
      status: 'active',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDHAe4jKHt3L-wdRw5MOYpIrng_sLlXkbSuHC-K_HsXUDPZ83BQSz8wiBOQVBBW--gUcU&usqp=CAU',
      config: {
        width: 800,
        height: 600,
        allowFullscreen: true
      }
    },
    {
      id: '6',
      name: '跳跃游戏',
      description: '控制角色避开障碍物，尽可能地跳得更远。',
      type: 'iframe',
      url: 'https://chromedino.com/',
      tags: ['街机', '冒险', '单人'],
      category: '冒险',
      status: 'active',
      thumbnail: 'https://chromedino.com/assets/thumbnails/dino_game_2.jpg',
      config: {
        width: 800,
        height: 300,
        allowFullscreen: false
      }
    },
    {
      id: '7',
      name: '记忆配对',
      description: '翻转卡片，找到匹配的对子，测试你的记忆力。',
      type: 'iframe',
      url: 'https://poki.com/en/g/memory-match',
      tags: ['益智', '记忆', '单人'],
      category: '益智',
      status: 'active',
      thumbnail: 'https://play-lh.googleusercontent.com/4O5fxAaKufLSMGR59wj8NmQG7tYlG9GQGMh-pFXQ4xI2UIpGWVED4-mrsveXVt1j4Q=w526-h296-rw',
      config: {
        width: 700,
        height: 500,
        allowFullscreen: true
      }
    },
    {
      id: '8',
      name: '井字棋',
      description: '经典的井字棋游戏，与电脑或朋友对战。',
      type: 'iframe',
      url: 'https://playtictactoe.org/',
      tags: ['策略', '棋牌', '多人'],
      category: '策略',
      status: 'active',
      thumbnail: 'https://play-lh.googleusercontent.com/X8MiGXWGQXLyhierd8UmCkXK-a3WWWKGvCE3xZv2dePGi_6IP_QCWDyQkbPVUbzdHw=w240-h480-rw',
      config: {
        width: 500,
        height: 500,
        allowFullscreen: false
      }
    },
  ];

  useEffect(() => {
    // 模拟API请求，搜索游戏
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredGames = [...mockGames];
      
      // 根据搜索词过滤
      if (query) {
        const searchLower = query.toLowerCase();
        filteredGames = filteredGames.filter(game => 
          game.name.toLowerCase().includes(searchLower) || 
          game.description.toLowerCase().includes(searchLower) ||
          game.category.toLowerCase().includes(searchLower) ||
          game.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      // 根据标签过滤
      if (tag) {
        filteredGames = filteredGames.filter(game => 
          game.tags.includes(tag)
        );
      }
      
      // 提取所有唯一标签
      const tags = new Set<string>();
      mockGames.forEach(game => {
        game.tags.forEach(t => tags.add(t));
      });
      
      setGames(filteredGames);
      setAllTags(Array.from(tags));
      setIsLoading(false);
    }, 800);
  }, [query, tag]);

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 使用window.location来实现搜索参数更新并刷新页面
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">搜索游戏</h1>
      
      {/* 搜索表单 */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="输入游戏名称、描述或类别..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-150 whitespace-nowrap"
          >
            搜索
          </button>
        </form>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* 标签侧边栏 */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">热门标签</h3>
            <div className="flex flex-wrap gap-2">
              <Link 
                href="/search" 
                className={`px-3 py-1 rounded-full text-sm ${!tag ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition duration-150`}
              >
                全部
              </Link>
              {allTags.map((t) => (
                <Link 
                  key={t} 
                  href={`/search?${query ? `q=${encodeURIComponent(query)}&` : ''}tag=${encodeURIComponent(t)}`}
                  className={`px-3 py-1 rounded-full text-sm ${tag === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition duration-150`}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </aside>
        
        {/* 搜索结果 */}
        <div className="flex-grow">
          {/* 搜索信息 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {query || tag ? '搜索结果' : '所有游戏'}
            </h2>
            <p className="text-gray-600">
              {isLoading 
                ? '搜索中...' 
                : `找到 ${games.length} 款游戏 ${query ? `"${query}"` : ''} ${tag ? `标签: ${tag}` : ''}`}
            </p>
          </div>
          
          {/* 游戏列表 */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">没有找到游戏</h3>
              <p className="mt-1 text-gray-500">请尝试不同的搜索词或浏览其他分类。</p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  返回首页
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 