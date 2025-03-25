'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { GamePlugin, GameComment, LocalizedString } from '@/types/game';
import GameContainer from '@/components/games/GameContainer';
import { useUser } from '@/context/UserContext';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/utils/i18n';

// 模拟游戏数据
const mockGames: GamePlugin[] = [
  {
    id: '1',
    name: {
      en: 'Galaxy Conqueror',
      zh: '银河征服者',
      ja: 'ギャラクシーコンカラー',
      ko: '은하 정복자'
    },
    description: {
      en: 'A strategic space exploration game where you explore unknown galaxies and expand your interstellar empire.',
      zh: '一款策略性太空探索游戏，探索未知星系，扩展你的星际帝国。',
      ja: '未知の銀河を探索し、星間帝国を拡大する戦略的な宇宙探索ゲーム。',
      ko: '미지의 은하를 탐험하고 당신의 성간 제국을 확장하는 전략적 우주 탐험 게임.'
    },
    type: 'iframe',
    url: 'https://play2048.co/',
    tags: ['space', 'strategy', 'exploration'],
    category: 'strategy',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {
      width: 600,
      height: 400,
      allowFullscreen: true
    }
  },
  {
    id: '2',
    name: {
      en: 'Magic World',
      zh: '魔法世界',
      ja: 'マジックワールド',
      ko: '마법 세계'
    },
    description: {
      en: 'A fantasy RPG where you play as a wizard, warrior, or ranger exploring a mysterious magical world.',
      zh: '一个奇幻的角色扮演游戏，扮演法师、战士或游侠探索神秘的魔法世界。',
      ja: '魔法使い、戦士、レンジャーとして神秘的な魔法の世界を探索するファンタジーRPG。',
      ko: '마법사, 전사 또는 레인저로 신비한 마법 세계를 탐험하는 판타지 RPG.'
    },
    type: 'iframe',
    url: 'https://www.google.com/fbx?fbx=snake_arcade',
    tags: ['fantasy', 'RPG', 'adventure'],
    category: 'rpg',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {
      width: 600,
      height: 400,
      allowFullscreen: true
    }
  },
  {
    id: '3',
    name: {
      en: 'Block Puzzle',
      zh: '方块解谜',
      ja: 'ブロックパズル',
      ko: '블록 퍼즐'
    },
    description: {
      en: 'Challenge your brain! Solve increasingly difficult puzzles that test your logic and observation skills.',
      zh: '挑战你的大脑！解决越来越难的谜题，测试你的逻辑思维和观察力。',
      ja: '頭脳に挑戦！論理的思考と観察力を試す、難易度が上がっていくパズルを解こう。',
      ko: '두뇌에 도전! 점점 어려워지는 퍼즐을 풀며 논리력과 관찰력을 시험해보세요.'
    },
    type: 'iframe',
    url: 'https://tetris.com/play-tetris',
    tags: ['puzzle', 'logic', 'casual'],
    category: 'puzzle',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {
      width: 600,
      height: 600,
      allowFullscreen: true
    }
  },
  {
    id: '4',
    name: {
      en: 'Super Racing',
      zh: '超级赛车',
      ja: 'スーパーレーシング',
      ko: '슈퍼 레이싱'
    },
    description: {
      en: 'Experience the thrill of high-speed racing! Multiple tracks and vehicles to choose from, become the king of the track.',
      zh: '体验极速飙车的刺激！多种赛道和车辆选择，成为赛道之王。',
      ja: '高速レースのスリルを体験！複数のコースと車両から選択し、トラックの王者となれ。',
      ko: '고속 레이싱의 스릴을 경험하세요! 다양한 트랙과 차량 중에서 선택하여 트랙의 왕이 되세요.'
    },
    type: 'iframe',
    url: 'https://minesweeper.online/',
    tags: ['racing', 'sports', 'competition'],
    category: 'sports',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {
      width: 600,
      height: 400,
      allowFullscreen: true
    }
  },
  {
    id: '5',
    name: {
      en: 'Zombie Siege',
      zh: '丧尸围城',
      ja: 'ゾンビシージ',
      ko: '좀비 공성전'
    },
    description: {
      en: 'Survive in a post-apocalyptic world, fight against zombie hordes, find resources, and build your base.',
      zh: '在末日世界中生存，对抗丧尸群，寻找资源，建立基地。',
      ja: 'ポストアポカリプスの世界で生き残り、ゾンビの大群と戦い、資源を見つけ、基地を建設する。',
      ko: '종말 이후의 세계에서 생존하며, 좀비 무리와 싸우고, 자원을 찾아 기지를 건설하세요.'
    },
    type: 'iframe',
    url: 'https://bruno-simon.com/html/breakout/',
    tags: ['survival', 'zombie', 'action'],
    category: 'action',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {
      width: 600,
      height: 400,
      allowFullscreen: true
    }
  }
];

// 模拟游戏评论数据
const mockComments: GameComment[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'GameMaster',
    userAvatar: 'https://i.pravatar.cc/40?img=1',
    rating: 5,
    content: {
      en: 'Very fun game with simple controls but challenging gameplay. Beautiful graphics and engaging story. Highly recommended!',
      zh: '非常好玩的游戏，操作简单但充满挑战性，画面制作精美，故事情节吸引人，强烈推荐！',
      ja: 'とても面白いゲームです。操作は簡単ですが、やりごたえがあります。グラフィックも美しく、ストーリーも魅力的です。強くお勧めします！',
      ko: '매우 재미있는 게임입니다. 조작은 간단하지만 도전적이며, 그래픽이 아름답고 스토리가 매력적입니다. 강력 추천!'
    },
    createdAt: '2023-12-15'
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'CasualGamer',
    userAvatar: 'https://i.pravatar.cc/40?img=2',
    rating: 4,
    content: {
      en: 'Overall a great game with nice graphics and sound effects, but some levels are a bit too difficult.',
      zh: '整体来说是一款很不错的游戏，画面和音效都很棒，但某些关卡难度有点高。',
      ja: '全体的に素晴らしいゲームで、グラフィックとサウンドは素晴らしいですが、一部のレベルは少し難しすぎます。',
      ko: '전반적으로 훌륭한 게임이며 그래픽과 사운드가 좋지만, 일부 레벨은 조금 어렵습니다.'
    },
    createdAt: '2023-12-10'
  }
];

// 模拟相关游戏数据
const mockRelatedGames = [
  {
    id: '7',
    name: {
      en: 'Future Warrior',
      zh: '未来战士',
      ja: 'フューチャーウォリアー',
      ko: '미래 전사'
    },
    category: 'action',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    name: {
      en: 'Kingdom Builder',
      zh: '王国建设者',
      ja: 'キングダムビルダー',
      ko: '왕국 건설자'
    },
    category: 'strategy',
    thumbnail: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12',
    name: {
      en: 'Cyberpunk Adventure',
      zh: '赛博朋克大冒险',
      ja: 'サイバーパンクアドベンチャー',
      ko: '사이버펑크 어드벤처'
    },
    category: 'action',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export default function GameDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, addToFavorites, removeFromFavorites } = useUser();
  const { locale } = useLanguage();
  const [translations, setTranslations] = useState({});
  const gameId = params.id as string;
  
  const [game, setGame] = useState<GamePlugin | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [comments, setComments] = useState<GameComment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedGames, setRelatedGames] = useState<Partial<GamePlugin>[]>([]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      setIsLoading(true);
      try {
        // 在实际项目中，这里应该调用API获取游戏详情
        setTimeout(() => {
          const foundGame = mockGames.find(g => g.id === gameId);
          
          if (foundGame) {
            setGame(foundGame);
            setRelatedGames(mockRelatedGames);
            setComments(mockComments);
          } else {
            setError('找不到该游戏');
          }
          
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setError('获取游戏详情时出错');
        setIsLoading(false);
      }
    };

    if (gameId) {
      fetchGameDetails();
    }
  }, [gameId]);

  useEffect(() => {
    async function loadTranslations() {
      const { getTranslations } = await import('@/utils/i18n');
      const trans = await getTranslations(locale, 'common');
      setTranslations(trans);
    }
    loadTranslations();
  }, [locale]);

  // 检查游戏是否已收藏
  useEffect(() => {
    if (user && user.favorites && game) {
      setIsFavorite(user.favorites.includes(game.id));
    }
  }, [user, game]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStopPlay = () => {
    setIsPlaying(false);
  };

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userComment.trim() === '' || userRating === 0) {
      alert(translate(translations, 'game.commentValidation'));
      return;
    }

    setIsSubmitting(true);

    // 模拟评论提交
    setTimeout(() => {
      const newComment: GameComment = {
        id: `comment-${Date.now()}`,
        userId: 'current-user',
        userName: 'Current User',
        userAvatar: 'https://i.pravatar.cc/40?img=8',
        rating: userRating,
        content: {
          en: userComment,
          zh: userComment,
          ja: userComment,
          ko: userComment
        } as LocalizedString,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setComments([newComment, ...comments]);
      setUserComment('');
      setUserRating(0);
      setIsSubmitting(false);
    }, 1000);
  };

  // 处理收藏/取消收藏
  const handleToggleFavorite = async () => {
    if (!user) {
      // 未登录，重定向到登录页面
      router.push('/login');
      return;
    }

    if (!game) return;

    try {
      setIsAddingToFavorites(true);
      
      if (isFavorite) {
        await removeFromFavorites(game.id);
        setIsFavorite(false);
      } else {
        await addToFavorites(game.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-gray-200 rounded-lg h-80 w-full"></div>
            </div>
            <div className="md:w-2/3">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {error || '游戏不存在'}
        </h2>
        <p className="text-gray-600 mb-6">
          无法找到请求的游戏，它可能已被移除或您输入了错误的链接。
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-150"
        >
          返回首页
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        {translate(translations, 'game.backToList')}
      </button>

      {game ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 游戏容器 */}
            <div className="lg:col-span-2">
              {isPlaying ? (
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <GameContainer game={game} />
                  <button
                    onClick={handleStopPlay}
                    className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    {translate(translations, 'game.stopGame')}
                  </button>
                </div>
              ) : (
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={game.thumbnail}
                    alt={game.name[locale]}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <button
                      onClick={handlePlay}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-150"
                    >
                      {translate(translations, 'game.playGame')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 游戏信息 */}
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4">{game.name[locale]}</h1>
                <p className="text-gray-600 mb-4">{game.description[locale]}</p>
                
                <div className="mb-4">
                  <h2 className="font-medium text-gray-800 mb-2">{translate(translations, 'game.category')}</h2>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded inline-block">
                    {translate(translations, `categories.${game.category}`)}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h2 className="font-medium text-gray-800 mb-2">{translate(translations, 'game.tags')}</h2>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {user && (
                  <button
                    onClick={handleToggleFavorite}
                    className={`w-full py-2 px-4 rounded ${
                      isFavorite
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isFavorite
                      ? translate(translations, 'game.removeFromFavorites')
                      : translate(translations, 'game.addToFavorites')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 评论区 */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{translate(translations, 'game.userComments')}</h2>
            
            {user ? (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-medium mb-4">{translate(translations, 'game.writeComment')}</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">{translate(translations, 'game.yourRating')}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(rating)}
                        className={`text-2xl ${
                          rating <= userRating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder={translate(translations, 'game.commentPlaceholder')}
                    className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                  >
                    {translate(translations, 'game.submitComment')}
                  </button>
                </form>
              </div>
            ) : null}

            {comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={comment.userAvatar}
                        alt={comment.userName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <div className="font-medium">{comment.userName}</div>
                        <div className="text-gray-500 text-sm">{comment.createdAt}</div>
                      </div>
                      <div className="ml-auto text-yellow-400">
                        {'★'.repeat(comment.rating)}
                        <span className="text-gray-300">{'★'.repeat(5 - comment.rating)}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content[locale]}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {translate(translations, 'game.noComments')}
              </div>
            )}
          </div>

          {/* 相似游戏 */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{translate(translations, 'game.similarGames')}</h2>
            {relatedGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedGames.map((game) => (
                  <Link key={game.id} href={`/games/${game.id}`}>
                    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition duration-150">
                      <div className="relative h-48">
                        <Image
                          src={game.thumbnail || ''}
                          alt={game.name?.[locale] || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{game.name?.[locale]}</h3>
                        <p className="text-sm text-gray-600">
                          {translate(translations, `categories.${game.category}`)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {translate(translations, 'game.noSimilarGames')}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
} 