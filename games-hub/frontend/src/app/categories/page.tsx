'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/utils/i18n';

interface Category {
  id: string;
  name: {
    en: string;
    zh: string;
    ja: string;
    ko: string;
  };
  count: number;
  description: {
    en: string;
    zh: string;
    ja: string;
    ko: string;
  };
  image: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    // 模拟API请求获取分类数据
    setTimeout(() => {
      const mockCategories: Category[] = [
        {
          id: 'puzzle',
          name: {
            en: 'Puzzle',
            zh: '益智',
            ja: 'パズル',
            ko: '퍼즐'
          },
          count: 15,
          description: {
            en: 'Brain-teasing puzzle games that challenge your mind',
            zh: '考验思维的益智解谜游戏',
            ja: '頭脳を鍛え、思考力を試すパズルゲーム',
            ko: '두뇌를 단련하고 사고력을 시험하는 퍼즐 게임'
          },
          image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=500&auto=format&fit=crop'
        },
        {
          id: 'casual',
          name: {
            en: 'Casual',
            zh: '休闲',
            ja: 'カジュアル',
            ko: '캐주얼'
          },
          count: 12,
          description: {
            en: 'Fun and relaxing casual games',
            zh: '轻松有趣的休闲游戏',
            ja: '気軽に楽しめるカジュアルゲーム',
            ko: '가볍게 즐길 수 있는 캐주얼 게임'
          },
          image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=500&auto=format&fit=crop'
        },
        {
          id: 'arcade',
          name: {
            en: 'Arcade',
            zh: '街机',
            ja: 'アーケード',
            ko: '아케이드'
          },
          count: 8,
          description: {
            en: 'Classic arcade-style games',
            zh: '经典街机风格游戏',
            ja: 'クラシックなアーケードスタイルのゲーム',
            ko: '클래식한 아케이드 스타일의 게임'
          },
          image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500&auto=format&fit=crop'
        },
        {
          id: 'strategy',
          name: {
            en: 'Strategy',
            zh: '策略',
            ja: 'ストラテジー',
            ko: '전략'
          },
          count: 10,
          description: {
            en: 'Strategic games that require careful planning',
            zh: '需要精心规划的策略游戏',
            ja: '慎重な計画が必要なストラテジーゲーム',
            ko: '신중한 계획이 필요한 전략 게임'
          },
          image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=500&auto=format&fit=crop'
        },
        {
          id: 'adventure',
          name: {
            en: 'Adventure',
            zh: '冒险',
            ja: 'アドベンチャー',
            ko: '어드벤처'
          },
          count: 7,
          description: {
            en: 'Exciting adventure games full of exploration',
            zh: '充满探索的精彩冒险游戏',
            ja: '冒険と探索が満載のアドベンチャーゲーム',
            ko: '모험과 탐험이 가득한 어드벤처 게임'
          },
          image: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?q=80&w=500&auto=format&fit=crop'
        },
        {
          id: 'rpg',
          name: {
            en: 'RPG',
            zh: '角色扮演',
            ja: 'RPG',
            ko: 'RPG'
          },
          count: 5,
          description: {
            en: 'Immersive role-playing games',
            zh: '沉浸式角色扮演游戏',
            ja: '没入感のあるロールプレイングゲーム',
            ko: '몰입감 있는 롤플레잉 게임'
          },
          image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=500&auto=format&fit=crop'
        },
      ];
      
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{translate(translations, 'pages.categories.title')}</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.name[locale]}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-4 text-white">
                      <h2 className="text-xl font-bold">{category.name[locale]}</h2>
                      <p className="text-sm opacity-90">
                        {translate(translations, 'pages.categories.gamesCount', { count: category.count })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700">{category.description[locale]}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 