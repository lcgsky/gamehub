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

// 模拟数据
const mockCategories = [
  { id: 'action', name: '动作游戏', icon: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&w=60&h=60&q=80', count: 42 },
  { id: 'strategy', name: '策略游戏', icon: 'https://images.unsplash.com/photo-1611032440563-ff074a679b59?ixlib=rb-1.2.1&w=60&h=60&q=80', count: 36 },
  { id: 'puzzle', name: '益智游戏', icon: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&w=60&h=60&q=80', count: 28 },
  { id: 'rpg', name: '角色扮演', icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&w=60&h=60&q=80', count: 57 },
  { id: 'sports', name: '体育游戏', icon: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&w=60&h=60&q=80', count: 19 },
  { id: 'casual', name: '休闲游戏', icon: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&w=60&h=60&q=80', count: 64 },
];

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
  }
];

// 轮播图数据
const sliderData = [
  {
    id: '1',
    title: '探索全新的游戏世界',
    subtitle: '发现数千款网页游戏',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=500&q=80',
    link: '/categories'
  },
  {
    id: '2',
    title: '每周热门游戏推荐',
    subtitle: '看看大家都在玩什么',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=500&q=80',
    link: '/popular'
  },
  {
    id: '3',
    title: '加入我们的游戏社区',
    subtitle: '与全球玩家共同游戏',
    image: 'https://images.unsplash.com/photo-1493932484895-752d1471eab5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&h=500&q=80',
    link: '/community'
  }
];

export default function Home() {
  const [popularGames, setPopularGames] = useState<GamePlugin[]>([]);
  const [newGames, setNewGames] = useState<GamePlugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
                  alt={slide.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-xl text-white">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{slide.title}</h2>
                      <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
                      <Link href={slide.link}>
                        <span className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-150">
                          立即探索
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
            <h2 className="text-2xl font-bold text-gray-800">游戏分类</h2>
            <Link href="/categories">
              <span className="text-blue-600 hover:text-blue-800 font-medium">查看全部 &gt;</span>
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
                      alt={category.name}
                      width={60}
                      height={60}
                      className="object-cover transition duration-200 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} 款游戏</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 热门游戏部分 */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">热门游戏</h2>
            <Link href="/popular">
              <span className="text-blue-600 hover:text-blue-800 font-medium">查看全部 &gt;</span>
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
            <h2 className="text-2xl font-bold text-gray-800">最新上线</h2>
            <Link href="/newest">
              <span className="text-blue-600 hover:text-blue-800 font-medium">查看全部 &gt;</span>
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
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">想要寻找更多有趣的游戏？</h2>
              <p className="text-blue-100 max-w-md">浏览我们的完整游戏库，按分类筛选，或使用搜索功能找到你喜欢的游戏。</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/categories">
                <span className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium text-center hover:bg-gray-100 transition duration-150">
                  浏览分类
                </span>
              </Link>
              <Link href="/search">
                <span className="inline-block bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-center hover:bg-blue-800 transition duration-150">
                  搜索游戏
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
