'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import GameCard from '@/components/games/GameCard';
import { GamePlugin } from '@/components/games/GameContainer';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  
  const [games, setGames] = useState<GamePlugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

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
    // 模拟API请求，获取特定分类的游戏数据
    setTimeout(() => {
      // 筛选当前分类的游戏
      let filteredGames = mockGames.filter(game => 
        game.category === decodeURIComponent(category)
      );
      
      // 根据排序条件排序游戏
      if (sortBy === 'newest') {
        // 最新发布，这里使用ID作为替代（实际应该用发布日期）
        filteredGames.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      } else if (sortBy === 'popular') {
        // 随机排序，模拟人气排序
        filteredGames.sort(() => Math.random() - 0.5);
      }
      
      setGames(filteredGames);
      setIsLoading(false);
    }, 1000);
  }, [category, sortBy]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  // 获取当前分类的描述
  const getCategoryDescription = () => {
    const descriptions: Record<string, string> = {
      '益智': '锻炼大脑，挑战思维的益智类游戏',
      '休闲': '轻松有趣的休闲类游戏',
      '街机': '经典街机风格的游戏',
      '策略': '需要深思熟虑的策略类游戏',
      '冒险': '充满探索的冒险游戏',
      '角色扮演': '沉浸式的角色扮演游戏',
    };
    
    const decodedCategory = decodeURIComponent(category);
    return descriptions[decodedCategory] || `${decodedCategory}类游戏`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回链接 */}
      <div className="mb-6">
        <Link href="/categories" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          返回所有分类
        </Link>
      </div>
      
      {/* 标题和描述 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{decodeURIComponent(category)}游戏</h1>
        <p className="text-gray-600">{getCategoryDescription()}</p>
      </div>
      
      {/* 筛选和排序 */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {isLoading ? '加载中...' : `共 ${games.length} 款游戏`}
        </p>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-gray-600">排序方式</label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">最新发布</option>
            <option value="popular">热门优先</option>
          </select>
        </div>
      </div>
      
      {/* 游戏列表 */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      ) : games.length === 0 ? (
        <div className="text-center py-12">
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
          <p className="mt-1 text-gray-500">该分类下暂时没有游戏。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
} 