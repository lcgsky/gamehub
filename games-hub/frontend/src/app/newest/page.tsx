'use client';

import { useState, useEffect } from 'react';
import { GamePlugin } from '@/types/game';
import GameCard from '@/components/games/GameCard';
import { mockGames } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/utils/i18n';

export default function NewestGamesPage() {
  const [games, setGames] = useState<GamePlugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [translations, setTranslations] = useState({});
  const { locale } = useLanguage();

  useEffect(() => {
    async function loadTranslations() {
      const { getTranslations } = await import('@/utils/i18n');
      const trans = await getTranslations(locale, 'common');
      setTranslations(trans);
    }
    loadTranslations();
  }, [locale]);

  useEffect(() => {
    // 模拟API请求
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        // 模拟网络延迟
        setTimeout(() => {
          // 按ID倒序排列，模拟最新添加的游戏
          const sortedGames = [...mockGames].sort((a, b) => 
            parseInt(b.id) - parseInt(a.id)
          );

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
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {translate(translations, 'pages.newest.title')}
        </h1>
        <p className="text-gray-600 max-w-3xl">
          {translate(translations, 'pages.newest.description')}
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
            {translate(translations, 'pages.newest.all')}
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
              {translate(translations, `categories.${category}`)}
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
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {translate(translations, 'pages.newest.noGames')}
          </h3>
          <p className="text-gray-600 mb-6">
            {translate(translations, 'pages.newest.tryOther')}
          </p>
          <button
            onClick={() => setFilterCategory(null)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-150"
          >
            {translate(translations, 'pages.newest.viewAll')}
          </button>
        </div>
      )}
    </div>
  );
} 