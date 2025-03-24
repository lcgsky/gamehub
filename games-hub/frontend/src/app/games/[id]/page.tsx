'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { GamePlugin } from '@/types/game';
import GameContainer from '@/components/games/GameContainer';
import { useUser } from '@/context/UserContext';

// 模拟游戏数据
const mockGames: GamePlugin[] = [
  {
    id: '1',
    name: '银河征服者',
    description: '一款策略性太空探索游戏，探索未知星系，扩展你的星际帝国。在这个宏大的太空策略游戏中，你将指挥一支星际舰队，探索未知的星系，建立殖民地，研究新技术，与其他文明进行外交或战争。每次游戏都会生成全新的银河系，提供无尽的可能性和挑战。游戏平衡了深度策略与易于上手的界面，适合各类玩家体验宇宙探索的乐趣。',
    type: 'iframe',
    url: 'https://play2048.co/',
    tags: ['太空', '策略', '探索'],
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
    name: '魔法世界',
    description: '一个奇幻的角色扮演游戏，扮演法师、战士或游侠探索神秘的魔法世界。在这款沉浸式RPG中，你将在一个充满魔法和神秘的世界中冒险。选择你的英雄职业，发展独特的技能树，收集强大的装备，完成史诗任务，揭开世界的秘密。游戏提供开放式的世界探索，多结局剧情，以及与其他玩家的互动。每个决定都会影响游戏世界和你的命运，创造属于你自己的冒险故事。',
    type: 'iframe',
    url: 'https://www.google.com/fbx?fbx=snake_arcade',
    tags: ['奇幻', 'RPG', '冒险'],
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
    name: '方块解谜',
    description: '挑战你的大脑！解决越来越难的谜题，测试你的逻辑思维和观察力。这款益智游戏包含数百个精心设计的谜题，从简单的开始，逐渐增加难度。利用物理规则、颜色匹配、空间思维等不同机制解决难题。游戏设计简洁优雅，适合任何年龄段的玩家。每个谜题都有多种解法，鼓励创造性思考。定期更新带来新的挑战，让你的大脑始终保持活跃。',
    type: 'iframe',
    url: 'https://tetris.com/play-tetris',
    tags: ['解谜', '益智', '休闲'],
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
    name: '超级赛车',
    description: '体验极速飙车的刺激！多种赛道和车辆选择，成为赛道之王。这款竞速游戏提供逼真的驾驶体验，包含全球数十条精确还原的赛道和上百款可解锁的车辆。感受每辆车独特的物理特性，通过赢得比赛获得积分升级你的车辆。游戏支持单人职业模式以及多人在线竞技，与全球玩家一决高下。定期举办线上锦标赛，争夺排行榜荣誉。',
    type: 'iframe',
    url: 'https://minesweeper.online/',
    tags: ['赛车', '竞速', '体育'],
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
    name: '丧尸围城',
    description: '在末日世界中生存，对抗丧尸群，寻找资源，建立基地。这款生存动作游戏将你置于丧尸爆发后的末日世界。你需要搜集资源，制作武器，建立和加固避难所。游戏结合了动作、生存和策略元素，提供紧张刺激的游戏体验。拥有日夜循环和复杂的丧尸AI系统，随着时间推移，丧尸会变得更加强大和智能。你可以单人游戏，也可以与朋友组队合作生存。',
    type: 'iframe',
    url: 'https://bruno-simon.com/html/breakout/',
    tags: ['生存', '丧尸', '动作'],
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
interface GameComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  createdAt: string;
}

const mockComments: GameComment[] = [
  {
    id: '1',
    userId: 'user1',
    userName: '游戏达人',
    userAvatar: 'https://i.pravatar.cc/40?img=1',
    rating: 5,
    content: '非常好玩的游戏，操作简单但充满挑战性，画面制作精美，故事情节吸引人，强烈推荐！',
    createdAt: '2023-12-15'
  },
  {
    id: '2',
    userId: 'user2',
    userName: '休闲玩家',
    userAvatar: 'https://i.pravatar.cc/40?img=2',
    rating: 4,
    content: '整体来说是一款很不错的游戏，画面和音效都很棒，但某些关卡难度有点高，希望能调整一下。',
    createdAt: '2023-12-10'
  },
  {
    id: '3',
    userId: 'user3',
    userName: '策略大师',
    userAvatar: 'https://i.pravatar.cc/40?img=3',
    rating: 5,
    content: '作为这类型的游戏来说，真的是极品之作。操作流畅，没有明显bug，策略性很强，每次游戏都有新发现。',
    createdAt: '2023-12-05'
  }
];

// 模拟相关游戏数据
const mockRelatedGames = [
  {
    id: '7',
    name: '未来战士',
    category: 'action',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    name: '王国建设者',
    category: 'strategy',
    thumbnail: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '12',
    name: '赛博朋克大冒险',
    category: 'action',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export default function GameDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, addToFavorites, removeFromFavorites } = useUser();
  const gameId = params.id as string;
  
  const [game, setGame] = useState<GamePlugin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedGames, setRelatedGames] = useState<any[]>([]);
  const [comments, setComments] = useState<GameComment[]>([]);
  const [showGame, setShowGame] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);

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

  // 检查游戏是否已收藏
  useEffect(() => {
    if (user && user.favorites && game) {
      setIsFavorite(user.favorites.includes(game.id));
    }
  }, [user, game]);

  const handlePlay = () => {
    setShowGame(true);
  };

  const handleStopPlay = () => {
    setShowGame(false);
  };

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userComment.trim() === '' || userRating === 0) {
      alert('请填写评论并选择评分');
      return;
    }

    setIsSubmitting(true);

    // 模拟评论提交
    setTimeout(() => {
      const newComment: GameComment = {
        id: `comment-${Date.now()}`,
        userId: 'current-user',
        userName: '当前用户',
        userAvatar: 'https://i.pravatar.cc/40?img=8',
        rating: userRating,
        content: userComment,
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
      {/* 返回链接 */}
      <div className="mb-6">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回游戏列表
        </Link>
      </div>

      {/* 游戏标题和信息 */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <div className="relative rounded-lg overflow-hidden shadow-md mb-4 aspect-[4/3]">
            <Image
              src={game.thumbnail}
              alt={game.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-3">游戏信息</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">类别：</div>
              <div className="font-medium">{game.category}</div>
              
              <div className="text-gray-600">类型：</div>
              <div className="font-medium">{game.type}</div>
              
              <div className="text-gray-600">状态：</div>
              <div className="font-medium">
                {game.status === 'active' ? 
                  <span className="text-green-600">在线</span> : 
                  <span className="text-red-600">离线</span>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{game.name}</h1>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {game.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* 描述 */}
          <div className="text-gray-600 mb-6 space-y-3">
            <p>{game.description}</p>
          </div>
          
          {/* 操作按钮 */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {!showGame ? (
                <button
                  onClick={handlePlay}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition duration-150 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  开始游戏
                </button>
              ) : (
                <button
                  onClick={handleStopPlay}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition duration-150 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  关闭游戏
                </button>
              )}
              
              <button
                onClick={handleToggleFavorite}
                disabled={isAddingToFavorites}
                className={`${
                  isFavorite 
                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                    : 'bg-pink-600 text-white hover:bg-pink-700'
                } px-6 py-3 rounded-md font-medium transition duration-150 flex items-center`}
              >
                {isAddingToFavorites ? (
                  <svg className="animate-spin w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                )}
                {isFavorite ? '取消收藏' : '加入收藏'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 游戏容器 */}
      {showGame && (
        <div className="mb-10">
          <GameContainer game={game} />
        </div>
      )}

      {/* 评论区 */}
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">用户评论</h2>
        
        {/* 评论表单 */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">发表评论</h3>
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">评分</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= userRating ? (
                      <span className="text-yellow-400">★</span>
                    ) : (
                      <span className="text-gray-300">★</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 mb-2">评论</label>
              <textarea
                id="comment"
                rows={4}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="分享你对这款游戏的看法..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150 disabled:bg-blue-400"
            >
              {isSubmitting ? '提交中...' : '发表评论'}
            </button>
          </form>
        </div>
        
        {/* 评论列表 */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">暂无评论，成为第一个评论的用户吧！</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={comment.userAvatar}
                        alt={comment.userName}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold text-gray-800 mr-2">{comment.userName}</h4>
                      <span className="text-gray-500 text-sm">{comment.createdAt}</span>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          {star <= comment.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 相关游戏 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">相似游戏</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedGames.map((relatedGame) => (
            <Link 
              key={relatedGame.id}
              href={`/games/${relatedGame.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden">
                <div className="relative w-full h-40">
                  <Image
                    src={relatedGame.thumbnail}
                    alt={relatedGame.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{relatedGame.name}</h3>
                  <p className="text-sm text-gray-600">{relatedGame.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 