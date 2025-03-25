'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import GameCard from '@/components/games/GameCard';
import { GamePlugin, LocalizedString } from '@/types/game';
import { useLanguage } from '@/hooks/useLanguage';
import { translate } from '@/utils/i18n';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  
  const [games, setGames] = useState<GamePlugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [translations, setTranslations] = useState({});
  const { locale } = useLanguage();

  useEffect(() => {
    async function loadTranslations() {
      const { getTranslations } = await import('@/utils/i18n');
      const trans = await getTranslations(locale as "en" | "zh" | "ja" | "ko", 'common');
      setTranslations(trans);
    }
    loadTranslations();
  }, [locale]);

  // 模拟游戏数据
  const mockGames: GamePlugin[] = [
    {
      id: '1',
      name: {
        en: '2048',
        zh: '2048',
        ja: '2048',
        ko: '2048'
      },
      description: {
        en: 'Classic number puzzle game. Merge the same numbers to get 2048!',
        zh: '经典数字拼图游戏，合并相同的数字，获得2048！',
        ja: '古典的な数字パズルゲーム。同じ数字をマージして2048を目指そう！',
        ko: '클래식 숫자 퍼즐 게임. 같은 숫자를 합쳐 2048을 만드세요!'
      },
      type: 'iframe',
      url: 'https://play2048.co/',
      tags: ['puzzle', 'numbers', 'single-player'],
      category: category,
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
      name: {
        en: 'Tetris',
        zh: '俄罗斯方块',
        ja: 'テトリス',
        ko: '테트리스'
      },
      description: {
        en: 'Classic tetris game. Place falling blocks as long as possible.',
        zh: '经典的俄罗斯方块游戏，尽可能长时间地摆放下落的方块。',
        ja: '落ちてくるブロックを配置して、できるだけ長くプレイしよう。',
        ko: '떨어지는 블록을 최대한 오래 배치하세요.'
      },
      type: 'iframe',
      url: 'https://tetris.com/play-tetris',
      tags: ['puzzle', 'classic', 'single-player'],
      category: category,
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
      name: {
        en: 'Minesweeper',
        zh: '扫雷',
        ja: 'マインスイーパー',
        ko: '지뢰찾기'
      },
      description: {
        en: 'Classic minesweeper game. Mark mines and clear all safe areas.',
        zh: '经典的扫雷游戏，标记地雷并清除所有安全区域。',
        ja: '地雷を見つけて、安全な領域をすべてクリアしよう。',
        ko: '지뢰를 표시하고 모든 안전 구역을 제거하세요.'
      },
      type: 'iframe',
      url: 'https://minesweeper.online/',
      tags: ['puzzle', 'classic', 'single-player'],
      category: category,
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
      name: {
        en: 'Snake',
        zh: '贪吃蛇',
        ja: 'スネークゲーム',
        ko: '스네이크 게임'
      },
      description: {
        en: 'Control a snake, eat food and avoid hitting walls or biting yourself.',
        zh: '控制一条贪食蛇，吃掉食物并避免撞墙或咬到自己。',
        ja: 'ヘビを操作して、餌を食べ、壁や自分自身に当たらないようにしよう。',
        ko: '뱀을 조종하여 먹이를 먹고 벽이나 자신을 물지 않도록 하세요.'
      },
      type: 'iframe',
      url: 'https://www.google.com/fbx?fbx=snake_arcade',
      tags: ['casual', 'classic', 'single-player'],
      category: category,
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
      name: {
        en: 'Breakout',
        zh: '弹球游戏',
        ja: 'ブロック崩し',
        ko: '벽돌 깨기'
      },
      description: {
        en: 'Control the platform to bounce the ball and break all blocks.',
        zh: '控制平台反弹球，击碎所有砖块。',
        ja: 'パドルを操作してボールを跳ね返し、ブロックを全て破壊しよう。',
        ko: '패들을 조종하여 공을 튀기고 모든 블록을 깨세요.'
      },
      type: 'iframe',
      url: 'https://bruno-simon.com/html/breakout/',
      tags: ['arcade', 'classic', 'single-player'],
      category: category,
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
      name: {
        en: 'Dino Jump',
        zh: '跳跃游戏',
        ja: 'ジャンプゲーム',
        ko: '점프 게임'
      },
      description: {
        en: 'Control the character to avoid obstacles and jump as far as possible.',
        zh: '控制角色避开障碍物，尽可能地跳得更远。',
        ja: '障害物を避けてできるだけ遠くまでジャンプしよう。',
        ko: '캐릭터를 조종하여 장애물을 피하고 최대한 멀리 점프하세요.'
      },
      type: 'iframe',
      url: 'https://chromedino.com/',
      tags: ['arcade', 'adventure', 'single-player'],
      category: category,
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
      name: {
        en: 'Memory Match',
        zh: '记忆配对',
        ja: 'メモリーマッチ',
        ko: '메모리 매치'
      },
      description: {
        en: 'Flip cards to find matching pairs and test your memory.',
        zh: '翻转卡片，找到匹配的对子，测试你的记忆力。',
        ja: 'カードをめくってペアを見つけ、記憶力を試そう。',
        ko: '카드를 뒤집어 짝을 맞추고 기억력을 테스트하세요.'
      },
      type: 'iframe',
      url: 'https://poki.com/en/g/memory-match',
      tags: ['puzzle', 'memory', 'single-player'],
      category: category,
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
      name: {
        en: 'Tic Tac Toe',
        zh: '井字棋',
        ja: '三目並べ',
        ko: '틱택토'
      },
      description: {
        en: 'Classic tic-tac-toe game. Play against computer or friends.',
        zh: '经典的井字棋游戏，与电脑或朋友对战。',
        ja: 'クラシックな三目並べ。コンピュータや友達と対戦しよう。',
        ko: '클래식 틱택토 게임. 컴퓨터나 친구와 대전하세요.'
      },
      type: 'iframe',
      url: 'https://playtictactoe.org/',
      tags: ['strategy', 'board', 'multiplayer'],
      category: category,
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
        filteredGames.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      } else if (sortBy === 'popular') {
        filteredGames.sort(() => Math.random() - 0.5);
      }
      
      setGames(filteredGames);
      setIsLoading(false);
    }, 1000);
  }, [category, sortBy, translations]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回链接 */}
      <div className="mb-6">
        <Link href="/categories" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          {translate(translations, 'pages.categories.backToCategories')}
        </Link>
      </div>
      
      {/* 标题和描述 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{decodeURIComponent(category)}</h1>
        <p className="text-gray-600">
          {translate(translations, `pages.categories.descriptions.${category.toLowerCase()}`)}
        </p>
      </div>
      
      {/* 筛选和排序 */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {isLoading ? 
            translate(translations, 'pages.categories.loading') : 
            translate(translations, 'pages.categories.gamesCount', { count: games.length })
          }
        </p>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-gray-600">
            {translate(translations, 'pages.categories.sortBy')}
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">{translate(translations, 'pages.categories.sortOptions.newest')}</option>
            <option value="popular">{translate(translations, 'pages.categories.sortOptions.popular')}</option>
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
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {translate(translations, 'pages.categories.noGames.title')}
          </h3>
          <p className="mt-1 text-gray-500">
            {translate(translations, 'pages.categories.noGames.description')}
          </p>
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