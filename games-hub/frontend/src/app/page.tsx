'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import GameCard from '@/components/games/GameCard';
import { GamePlugin } from '@/types/game';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/utils/i18n';
import { mockCategories, mockGames } from '@/data/mockData';

// 轮播图数据
const sliderData = [
  {
    id: '1',
    titleKey: 'home.hero.slide1.title',
    subtitleKey: 'home.hero.slide1.subtitle',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=500&q=80',
    link: '/categories'
  },
  {
    id: '2',
    titleKey: 'home.hero.slide2.title',
    subtitleKey: 'home.hero.slide2.subtitle',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=500&q=80',
    link: '/popular'
  },
  {
    id: '3',
    titleKey: 'home.hero.slide3.title',
    subtitleKey: 'home.hero.slide3.subtitle',
    image: 'https://images.unsplash.com/photo-1493932484895-752d1471eab5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=500&q=80',
    link: '/community'
  }
];

export default function Home() {
  const [popularGames, setPopularGames] = useState<GamePlugin[]>([]);
  const [newGames, setNewGames] = useState<GamePlugin[]>([]);
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
    // 模拟API请求
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        // 在实际应用中，这里应该是从API获取数据
        // 为了演示，我们使用setTimeout模拟网络请求延迟
        setTimeout(() => {
          // 随机排序以模拟不同数据
          const shuffled = [...mockGames].sort(() => 0.5 - Math.random());
          
          // 获取前4个作为热门游戏
          setPopularGames(shuffled.slice(0, 4));
          
          // 获取后4个作为最新游戏
          setNewGames(shuffled.slice(4, 8));
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching games:', error);
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <section className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-[300px] md:h-[400px] lg:h-[500px]"
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={translate(translations, slide.titleKey)}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-xl text-white">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                        {translate(translations, slide.titleKey)}
                      </h2>
                      <p className="text-lg md:text-xl mb-6">
                        {translate(translations, slide.subtitleKey)}
                      </p>
                      <Link href={slide.link}>
                        <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-150">
                          {translate(translations, 'home.hero.explore')}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* 分类部分 */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {translate(translations, 'home.categories.title')}
            </h2>
            <Link href="/categories">
              <span className="text-blue-600 hover:text-blue-800 font-medium">
                {translate(translations, 'home.categories.viewAll')} &gt;
              </span>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.id}`}
                className="bg-white rounded-lg shadow hover:shadow-md transition duration-150 p-4 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-3 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={category.icon}
                      alt={translate(translations, `categories.${category.id}`)}
                      width={60}
                      height={60}
                      className="object-cover transition duration-200 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800">
                    {translate(translations, `categories.${category.id}`)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {translate(translations, 'home.categories.gamesCount', { count: category.count })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 热门游戏部分 */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {translate(translations, 'home.popular.title')}
            </h2>
            <Link href="/popular">
              <span className="text-blue-600 hover:text-blue-800 font-medium">
                {translate(translations, 'home.popular.viewAll')} &gt;
              </span>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow animate-pulse h-64"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </section>

        {/* 最新游戏部分 */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {translate(translations, 'home.newest.title')}
            </h2>
            <Link href="/newest">
              <span className="text-blue-600 hover:text-blue-800 font-medium">
                {translate(translations, 'home.newest.viewAll')} &gt;
              </span>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow animate-pulse h-64"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </section>

        {/* CTA部分 */}
        <section className="bg-blue-600 text-white rounded-xl p-8 lg:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                {translate(translations, 'home.cta.title')}
              </h2>
              <p className="text-blue-100 max-w-md">
                {translate(translations, 'home.cta.description')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/categories">
                <span className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium text-center hover:bg-gray-100 transition duration-150">
                  {translate(translations, 'home.cta.browseCategories')}
                </span>
              </Link>
              <Link href="/search">
                <span className="inline-block bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-center hover:bg-blue-800 transition duration-150">
                  {translate(translations, 'home.cta.searchGames')}
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
