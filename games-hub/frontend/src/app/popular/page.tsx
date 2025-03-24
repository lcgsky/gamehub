'use client';

import { useState, useEffect } from 'react';
import GameCard from '@/components/games/GameCard';
import { GamePlugin } from '@/types/game';
import Link from 'next/link';

// 模拟数据
const mockGames: GamePlugin[] = [
  {
    id: '1',
    name: '银河征服者',
    description: '一款策略性太空探索游戏，探索未知星系，扩展你的星际帝国',
    type: 'strategy',
    url: 'https://example.com/game1',
    tags: ['太空', '策略', '探索'],
    category: 'strategy',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '2',
    name: '魔法世界',
    description: '一个奇幻的角色扮演游戏，扮演法师、战士或游侠探索神秘的魔法世界',
    type: 'rpg',
    url: 'https://example.com/game2',
    tags: ['奇幻', 'RPG', '冒险'],
    category: 'rpg',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '3',
    name: '方块解谜',
    description: '挑战你的大脑！解决越来越难的谜题，测试你的逻辑思维和观察力',
    type: 'puzzle',
    url: 'https://example.com/game3',
    tags: ['解谜', '益智', '休闲'],
    category: 'puzzle',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '4',
    name: '超级赛车',
    description: '体验极速飙车的刺激！多种赛道和车辆选择，成为赛道之王',
    type: 'sports',
    url: 'https://example.com/game4',
    tags: ['赛车', '竞速', '体育'],
    category: 'sports',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '5',
    name: '丧尸围城',
    description: '在末日世界中生存，对抗丧尸群，寻找资源，建立基地',
    type: 'action',
    url: 'https://example.com/game5',
    tags: ['生存', '丧尸', '动作'],
    category: 'action',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '6',
    name: '水果忍者',
    description: '经典的手机休闲游戏，切开飞舞的水果，躲避炸弹，获得高分',
    type: 'casual',
    url: 'https://example.com/game6',
    tags: ['休闲', '切水果', '手机游戏'],
    category: 'casual',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '7',
    name: '未来战士',
    description: '科幻主题的第一人称射击游戏，使用未来武器对抗外星入侵者',
    type: 'action',
    url: 'https://example.com/game7',
    tags: ['FPS', '科幻', '动作'],
    category: 'action',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '8',
    name: '王国建设者',
    description: '建立和管理你自己的中世纪王国，处理资源，扩展领土，抵御侵略',
    type: 'strategy',
    url: 'https://example.com/game8',
    tags: ['策略', '中世纪', '建设'],
    category: 'strategy',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '9',
    name: '太空冒险',
    description: '探索未知宇宙，完成任务，与外星文明接触',
    type: 'adventure',
    url: 'https://example.com/game9',
    tags: ['探险', '太空', '科幻'],
    category: 'rpg',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '10',
    name: '城市建设者',
    description: '建造和管理你自己的城市，应对各种挑战和灾难',
    type: 'simulation',
    url: 'https://example.com/game10',
    tags: ['模拟', '建设', '管理'],
    category: 'strategy',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '11',
    name: '农场模拟',
    description: '经营你的农场，种植作物，饲养动物，扩展你的农业帝国',
    type: 'simulation',
    url: 'https://example.com/game11',
    tags: ['模拟', '农场', '休闲'],
    category: 'casual',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1c7c37b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '12',
    name: '赛博朋克大冒险',
    description: '在未来的赛博朋克城市中探索，完成任务，升级能力',
    type: 'adventure',
    url: 'https://example.com/game12',
    tags: ['科幻', '赛博朋克', '冒险'],
    category: 'action',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  }
];

// 模拟游戏活跃度数据 (用于排序热门游戏)
const gamePopularity = {
  '1': 2345,
  '2': 4567,
  '3': 1234,
  '4': 3456,
  '5': 5678,
  '6': 2123,
  '7': 6789,
  '8': 3234,
  '9': 4345,
  '10': 7890,
  '11': 3456,
  '12': 5432
};

export default function PopularGamesPage() {
  const [games, setGames] = useState<GamePlugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    // 模拟API请求
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        // 模拟网络延迟
        setTimeout(() => {
          // 按热门程度排序 (使用我们的模拟数据)
          const sortedGames = [...mockGames].sort((a, b) => {
            const popA = gamePopularity[a.id as keyof typeof gamePopularity] || 0;
            const popB = gamePopularity[b.id as keyof typeof gamePopularity] || 0;
            return popB - popA;
          });

          setGames(sortedGames);
          
          // 提取唯一分类
          const categories = Array.from(new Set(mockGames.map(game => game.category)));
          setUniqueCategories(categories);
          
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching games:', error);
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  // 过滤显示的游戏
  const displayedGames = filterCategory 
    ? games.filter(game => game.category === filterCategory)
    : games;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">热门游戏</h1>
        <p className="text-gray-600 max-w-3xl">
          发现最受玩家欢迎的游戏。这些游戏根据玩家数量、评分和活跃度排序，让你一目了然地找到最热门的选择。
        </p>
      </div>

      {/* 分类过滤器 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilterCategory(null)}
            className={`px-4 py-2 rounded-full transition duration-150 ${
              filterCategory === null 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            全部
          </button>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-full transition duration-150 ${
                filterCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 游戏列表 */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow animate-pulse h-64"></div>
          ))}
        </div>
      ) : displayedGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-800 mb-2">没有找到游戏</h3>
          <p className="text-gray-600 mb-6">尝试选择其他分类或清除筛选条件</p>
          <button
            onClick={() => setFilterCategory(null)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-150"
          >
            查看所有游戏
          </button>
        </div>
      )}
    </div>
  );
} 