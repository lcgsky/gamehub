'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GameComment } from '@/types/game';

// 扩展评论接口，添加游戏信息和状态
interface AdminComment extends GameComment {
  gameId: string;
  gameName: string;
  status: 'approved' | 'pending' | 'rejected';
  reportCount?: number;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [filteredComments, setFilteredComments] = useState<AdminComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [reportedFilter, setReportedFilter] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  // 模拟获取评论数据
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟评论数据
      const mockComments: AdminComment[] = [
        {
          id: '1',
          gameId: '1',
          gameName: '银河征服者',
          userId: '101',
          userName: '星际探险家',
          userAvatar: 'https://i.pravatar.cc/150?img=68',
          rating: 5,
          content: '这个游戏太棒了！我喜欢探索星系的感觉，界面设计也很直观。',
          createdAt: '2023-11-15T08:30:00Z',
          status: 'approved',
          reportCount: 0
        },
        {
          id: '2',
          gameId: '2',
          gameName: '方块消除',
          userId: '102',
          userName: '消除达人',
          userAvatar: 'https://i.pravatar.cc/150?img=47',
          rating: 4,
          content: '很有趣的益智游戏，但最后几关难度有点高。',
          createdAt: '2023-11-14T15:45:00Z',
          status: 'approved',
          reportCount: 0
        },
        {
          id: '3',
          gameId: '3',
          gameName: '赛车英雄',
          userId: '103',
          userName: '速度狂人',
          userAvatar: 'https://i.pravatar.cc/150?img=52',
          rating: 2,
          content: '控制不太顺畅，有时会卡顿，希望能改进。',
          createdAt: '2023-11-12T10:20:00Z',
          status: 'approved',
          reportCount: 0
        },
        {
          id: '4',
          gameId: '1',
          gameName: '银河征服者',
          userId: '104',
          userName: '游戏测试员',
          userAvatar: 'https://i.pravatar.cc/150?img=12',
          rating: 1,
          content: '这游戏根本就是垃圾，浪费时间！@#$%^&*',
          createdAt: '2023-11-11T09:15:00Z',
          status: 'rejected',
          reportCount: 5
        },
        {
          id: '5',
          gameId: '4',
          gameName: '魔法之门',
          userId: '105',
          userName: '魔法师',
          userAvatar: 'https://i.pravatar.cc/150?img=32',
          rating: 5,
          content: '魔法效果做得很精美，沉浸感强，推荐给所有奇幻爱好者！',
          createdAt: '2023-11-10T14:50:00Z',
          status: 'approved',
          reportCount: 0
        },
        {
          id: '6',
          gameId: '5',
          gameName: '农场物语',
          userId: '106',
          userName: '田园生活',
          userAvatar: 'https://i.pravatar.cc/150?img=26',
          rating: 4,
          content: '很放松的游戏，音乐也很优美，就是加载有点慢。',
          createdAt: '2023-11-10T11:35:00Z',
          status: 'pending',
          reportCount: 0
        },
        {
          id: '7',
          gameId: '2',
          gameName: '方块消除',
          userId: '107',
          userName: '新手玩家',
          userAvatar: 'https://i.pravatar.cc/150?img=62',
          rating: 3,
          content: '还不错，但教程可以做得更详细一些。',
          createdAt: '2023-11-09T16:25:00Z',
          status: 'pending',
          reportCount: 0
        },
        {
          id: '8',
          gameId: '3',
          gameName: '赛车英雄',
          userId: '108',
          userName: '广告链接',
          userAvatar: 'https://i.pravatar.cc/150?img=59',
          rating: 5,
          content: '游戏很一般，推荐大家去玩www.example.com的游戏，那个更好玩！',
          createdAt: '2023-11-08T13:40:00Z',
          status: 'rejected',
          reportCount: 3
        }
      ];

      setComments(mockComments);
      setFilteredComments(mockComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 筛选评论
  useEffect(() => {
    if (comments.length === 0) return;

    let filtered = [...comments];

    // 搜索词筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(comment => 
        comment.content.toLowerCase().includes(searchLower) ||
        comment.userName.toLowerCase().includes(searchLower) ||
        comment.gameName.toLowerCase().includes(searchLower)
      );
    }

    // 状态筛选
    if (statusFilter !== 'all') {
      filtered = filtered.filter(comment => comment.status === statusFilter);
    }

    // 被举报筛选
    if (reportedFilter !== null) {
      filtered = filtered.filter(comment => 
        reportedFilter 
          ? (comment.reportCount && comment.reportCount > 0)
          : (!comment.reportCount || comment.reportCount === 0)
      );
    }

    setFilteredComments(filtered);
  }, [comments, searchTerm, statusFilter, reportedFilter]);

  // 处理评论状态变更
  const handleStatusChange = async (commentId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    setIsProcessing(commentId);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 更新本地状态
      const updatedComments = comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, status: newStatus } 
          : comment
      );
      
      setComments(updatedComments);
    } catch (error) {
      console.error('Error updating comment status:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  // 处理评论删除
  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('确定要删除这条评论吗？此操作无法撤销。')) return;
    
    setIsProcessing(commentId);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 从列表中移除评论
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">评论管理</h1>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              搜索
            </label>
            <input
              type="text"
              id="search"
              placeholder="搜索用户名、评论内容或游戏"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full md:w-48">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              状态
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">所有状态</option>
              <option value="approved">已通过</option>
              <option value="pending">待审核</option>
              <option value="rejected">已拒绝</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label htmlFor="reported" className="block text-sm font-medium text-gray-700 mb-1">
              举报
            </label>
            <select
              id="reported"
              value={reportedFilter === null ? 'all' : reportedFilter ? 'reported' : 'notReported'}
              onChange={(e) => {
                const val = e.target.value;
                setReportedFilter(
                  val === 'all' ? null : (val === 'reported' ? true : false)
                );
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">所有评论</option>
              <option value="reported">被举报</option>
              <option value="notReported">未被举报</option>
            </select>
          </div>
        </div>
      </div>

      {/* 评论列表 */}
      {isLoading ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载评论数据中...</p>
        </div>
      ) : filteredComments.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">没有找到符合条件的评论</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  用户信息
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  评论内容
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  游戏 / 评分
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComments.map((comment) => (
                <tr key={comment.id} className={comment.status === 'rejected' ? 'bg-red-50' : (comment.status === 'pending' ? 'bg-yellow-50' : '')}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative rounded-full overflow-hidden">
                        <Image
                          src={comment.userAvatar}
                          alt={comment.userName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{comment.userName}</div>
                        <div className="text-sm text-gray-500">{formatDate(comment.createdAt)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md">
                      {comment.content}
                    </div>
                    {comment.reportCount && comment.reportCount > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                        已被举报 {comment.reportCount} 次
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <Link href={`/admin/games/${comment.gameId}`} className="text-blue-600 hover:underline">
                        {comment.gameName}
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm text-gray-500">评分: {comment.rating}/5</div>
                      <div className="ml-1 flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${comment.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {comment.status === 'approved' ? '已通过' : 
                        comment.status === 'pending' ? '待审核' : 
                        '已拒绝'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {isProcessing === comment.id ? (
                      <div className="animate-pulse">处理中...</div>
                    ) : (
                      <div className="flex space-x-2">
                        {comment.status !== 'approved' && (
                          <button 
                            onClick={() => handleStatusChange(comment.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            通过
                          </button>
                        )}
                        {comment.status !== 'rejected' && (
                          <button 
                            onClick={() => handleStatusChange(comment.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            拒绝
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          删除
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 