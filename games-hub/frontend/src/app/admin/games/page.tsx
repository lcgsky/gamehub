'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GamePlugin } from '@/types/game';

// 扩展GamePlugin类型以包含更多管理信息
interface AdminGameData extends Partial<GamePlugin> {
  plays?: number;
  rating?: number;
  lastUpdated?: string;
}

export default function AdminGamesPage() {
  const [games, setGames] = useState<AdminGameData[]>([]);
  const [filteredGames, setFilteredGames] = useState<AdminGameData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  
  // 获取游戏数据
  useEffect(() => {
    const fetchGames = async () => {
      try {
        // 模拟API请求获取游戏列表
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟游戏数据
        const mockGames: AdminGameData[] = [
          {
            id: '1',
            name: '银河征服者',
            description: '一款策略性太空探索游戏',
            type: 'iframe',
            category: '策略',
            status: 'active',
            thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            plays: 1245,
            rating: 4.7,
            lastUpdated: '2023-12-01'
          },
          {
            id: '2',
            name: '魔法世界',
            description: '一个奇幻的角色扮演游戏',
            type: 'iframe',
            category: '角色扮演',
            status: 'active',
            thumbnail: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            plays: 2341,
            rating: 4.3,
            lastUpdated: '2023-11-15'
          },
          {
            id: '3',
            name: '方块解谜',
            description: '挑战你的大脑！解决越来越难的谜题',
            type: 'iframe',
            category: '益智',
            status: 'active',
            thumbnail: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            plays: 3254,
            rating: 4.9,
            lastUpdated: '2023-11-05'
          },
          {
            id: '4',
            name: '超级赛车',
            description: '体验极速飙车的刺激！',
            type: 'iframe',
            category: '体育',
            status: 'active',
            thumbnail: 'https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            plays: 1897,
            rating: 4.1,
            lastUpdated: '2023-10-20'
          },
          {
            id: '5',
            name: '丧尸围城',
            description: '在末日世界中生存，对抗丧尸群',
            type: 'iframe',
            category: '动作',
            status: 'inactive',
            thumbnail: 'https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            plays: 1345,
            rating: 4.5,
            lastUpdated: '2023-10-10'
          },
          {
            id: '6',
            name: '水果忍者',
            description: '经典的手机休闲游戏',
            type: 'iframe',
            category: '休闲',
            status: 'active',
            thumbnail: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            plays: 5421,
            rating: 4.6,
            lastUpdated: '2023-09-25'
          },
          {
            id: '7',
            name: '未来战士',
            description: '科幻主题的第一人称射击游戏',
            type: 'iframe',
            category: '动作',
            status: 'inactive',
            thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            plays: 2312,
            rating: 4.0,
            lastUpdated: '2023-09-18'
          },
        ];
        
        setGames(mockGames);
        setFilteredGames(mockGames);
        
        // 提取所有分类
        const uniqueCategories = Array.from(new Set(mockGames.map(game => game.category || '')));
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch games:', error);
        setIsLoading(false);
      }
    };
    
    fetchGames();
  }, []);
  
  // 处理搜索和过滤
  useEffect(() => {
    let result = games;
    
    // 搜索过滤
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(game => 
        game.name?.toLowerCase().includes(lowercaseSearchTerm) ||
        game.description?.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // 状态过滤
    if (statusFilter !== 'all') {
      result = result.filter(game => game.status === statusFilter);
    }
    
    // 分类过滤
    if (categoryFilter !== 'all') {
      result = result.filter(game => game.category === categoryFilter);
    }
    
    setFilteredGames(result);
  }, [games, searchTerm, statusFilter, categoryFilter]);
  
  // 处理状态变更
  const handleStatusChange = async (gameId: string, newStatus: 'active' | 'inactive') => {
    try {
      // 模拟API调用更新游戏状态
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 更新本地状态
      const updatedGames = games.map(game => 
        game.id === gameId ? { ...game, status: newStatus } : game
      );
      
      setGames(updatedGames);
    } catch (error) {
      console.error('Failed to update game status:', error);
      alert('更新状态失败，请重试');
    }
  };
  
  // 处理游戏删除
  const handleDeleteGame = async (gameId: string) => {
    if (!confirm('确定要删除这个游戏吗？此操作不可撤销。')) {
      return;
    }
    
    try {
      // 模拟API调用删除游戏
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // 从列表中移除
      const updatedGames = games.filter(game => game.id !== gameId);
      setGames(updatedGames);
    } catch (error) {
      console.error('Failed to delete game:', error);
      alert('删除游戏失败，请重试');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">游戏管理</h1>
        <Link 
          href="/admin/games/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150"
        >
          添加游戏
        </Link>
      </div>
      
      {/* 搜索和过滤 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <input
              type="text"
              id="search"
              placeholder="搜索游戏名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">所有状态</option>
              <option value="active">在线</option>
              <option value="inactive">下线</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">所有分类</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* 游戏列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600">没有找到匹配的游戏。尝试调整搜索条件或添加新游戏。</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">游戏</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数据</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">更新日期</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGames.map((game) => (
                  <tr key={game.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <Image
                            src={game.thumbnail || 'https://via.placeholder.com/150'}
                            alt={game.name || ''}
                            className="object-cover rounded"
                            fill
                            sizes="40px"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{game.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{game.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{game.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{game.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          game.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {game.status === 'active' ? '已上线' : '已下线'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span>游玩次数: {game.plays}</span>
                        <span>评分: {game.rating} / 5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {game.lastUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/admin/games/edit/${game.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => handleStatusChange(
                            game.id || '', 
                            game.status === 'active' ? 'inactive' : 'active'
                          )}
                          className={`${
                            game.status === 'active' 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {game.status === 'active' ? '下线' : '上线'}
                        </button>
                        <button
                          onClick={() => handleDeleteGame(game.id || '')}
                          className="text-red-600 hover:text-red-900"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 