'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/context/UserContext';

// 扩展用户接口，添加额外的管理信息
interface AdminUser extends User {
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive' | 'banned';
  role: 'user' | 'admin';
  gamesPlayed: number;
  commentsCount: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // 筛选用户
  useEffect(() => {
    if (users.length === 0) return;

    let filtered = [...users];

    // 搜索词筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.id.toLowerCase().includes(searchLower)
      );
    }

    // 状态筛选
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // 角色筛选
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter, roleFilter]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟用户数据
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          avatar: 'https://i.pravatar.cc/150?img=1',
          role: 'admin',
          status: 'active',
          createdAt: '2023-01-15T10:30:00Z',
          lastLogin: '2023-11-20T08:45:00Z',
          gamesPlayed: 45,
          commentsCount: 12,
          favorites: ['1', '3', '5']
        },
        {
          id: '2',
          username: 'demo',
          email: 'demo@example.com',
          avatar: 'https://i.pravatar.cc/150?img=2',
          role: 'user',
          status: 'active',
          createdAt: '2023-02-20T14:15:00Z',
          lastLogin: '2023-11-19T16:30:00Z',
          gamesPlayed: 82,
          commentsCount: 24,
          favorites: ['2', '4', '6']
        },
        {
          id: '3',
          username: 'test',
          email: 'test@example.com',
          avatar: 'https://i.pravatar.cc/150?img=3',
          role: 'user',
          status: 'active',
          createdAt: '2023-03-10T09:45:00Z',
          lastLogin: '2023-11-18T11:20:00Z',
          gamesPlayed: 37,
          commentsCount: 9,
          favorites: ['1', '7']
        },
        {
          id: '4',
          username: 'gamer123',
          email: 'gamer123@example.com',
          avatar: 'https://i.pravatar.cc/150?img=4',
          role: 'user',
          status: 'active',
          createdAt: '2023-04-05T16:20:00Z',
          lastLogin: '2023-11-15T14:10:00Z',
          gamesPlayed: 125,
          commentsCount: 31,
          favorites: ['3', '8', '9', '12']
        },
        {
          id: '5',
          username: 'inactive_user',
          email: 'inactive@example.com',
          avatar: 'https://i.pravatar.cc/150?img=5',
          role: 'user',
          status: 'inactive',
          createdAt: '2023-05-12T11:30:00Z',
          lastLogin: '2023-09-01T10:45:00Z',
          gamesPlayed: 5,
          commentsCount: 1,
          favorites: []
        },
        {
          id: '6',
          username: 'banned_spammer',
          email: 'banned@example.com',
          avatar: 'https://i.pravatar.cc/150?img=6',
          role: 'user',
          status: 'banned',
          createdAt: '2023-06-18T08:15:00Z',
          lastLogin: '2023-07-20T09:30:00Z',
          gamesPlayed: 3,
          commentsCount: 42,
          favorites: []
        },
        {
          id: '7',
          username: 'casual_player',
          email: 'casual@example.com',
          avatar: 'https://i.pravatar.cc/150?img=7',
          role: 'user',
          status: 'active',
          createdAt: '2023-07-22T13:40:00Z',
          lastLogin: '2023-11-10T15:25:00Z',
          gamesPlayed: 28,
          commentsCount: 7,
          favorites: ['5', '11']
        },
        {
          id: '8',
          username: 'puzzle_lover',
          email: 'puzzle@example.com',
          avatar: 'https://i.pravatar.cc/150?img=8',
          role: 'user',
          status: 'active',
          createdAt: '2023-08-15T10:10:00Z',
          lastLogin: '2023-11-05T17:40:00Z',
          gamesPlayed: 64,
          commentsCount: 16,
          favorites: ['2', '4', '10']
        },
        {
          id: '9',
          username: 'strategy_master',
          email: 'strategy@example.com',
          avatar: 'https://i.pravatar.cc/150?img=9',
          role: 'user',
          status: 'active',
          createdAt: '2023-09-08T09:25:00Z',
          lastLogin: '2023-11-12T11:15:00Z',
          gamesPlayed: 49,
          commentsCount: 14,
          favorites: ['1', '6']
        },
        {
          id: '10',
          username: 'moderator',
          email: 'mod@example.com',
          avatar: 'https://i.pravatar.cc/150?img=10',
          role: 'admin',
          status: 'active',
          createdAt: '2023-10-01T11:50:00Z',
          lastLogin: '2023-11-19T10:35:00Z',
          gamesPlayed: 32,
          commentsCount: 18,
          favorites: ['3', '7', '9']
        }
      ];

      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理用户状态变更
  const handleStatusChange = async (userId: string, newStatus: 'active' | 'inactive' | 'banned') => {
    if (newStatus === 'banned' && !window.confirm('确定要封禁该用户吗？该操作将阻止用户登录和参与互动。')) {
      return;
    }
    
    setIsProcessing(userId);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 更新本地状态
      const updatedUsers = users.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus } 
          : user
      );
      
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user status:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  // 处理用户角色变更
  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    if (newRole === 'admin' && !window.confirm('确定要将该用户设为管理员吗？该操作将赋予用户管理后台的访问权限。')) {
      return;
    }
    
    setIsProcessing(userId);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 更新本地状态
      const updatedUsers = users.map(user => 
        user.id === userId 
          ? { ...user, role: newRole } 
          : user
      );
      
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user role:', error);
    } finally {
      setIsProcessing(null);
    }
  };

  // 格式化日期显示
  const formatDate = (dateString?: string) => {
    if (!dateString) return '未登录';
    
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
        <h1 className="text-2xl font-bold">用户管理</h1>
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
              placeholder="搜索用户名、邮箱或ID"
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
              <option value="active">活跃</option>
              <option value="inactive">非活跃</option>
              <option value="banned">已封禁</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              角色
            </label>
            <select
              id="role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">所有角色</option>
              <option value="user">普通用户</option>
              <option value="admin">管理员</option>
            </select>
          </div>
        </div>
      </div>

      {/* 用户列表 */}
      {isLoading ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载用户数据中...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">没有找到符合条件的用户</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  用户信息
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  角色
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  活跃度
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日期信息
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className={user.status === 'banned' ? 'bg-red-50' : (user.status === 'inactive' ? 'bg-gray-50' : '')}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative rounded-full overflow-hidden">
                        <Image
                          src={user.avatar || 'https://i.pravatar.cc/150'}
                          alt={user.username}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.role === 'admin' ? '管理员' : '普通用户'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'active' ? 'bg-green-100 text-green-800' : 
                        user.status === 'inactive' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {user.status === 'active' ? '活跃' : 
                        user.status === 'inactive' ? '非活跃' : 
                        '已封禁'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">游戏: {user.gamesPlayed}</div>
                    <div className="text-sm text-gray-900">评论: {user.commentsCount}</div>
                    <div className="text-sm text-gray-900">收藏: {user.favorites?.length || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">注册: {formatDate(user.createdAt)}</div>
                    <div className="text-sm text-gray-500">上次登录: {formatDate(user.lastLogin)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {isProcessing === user.id ? (
                      <div className="animate-pulse">处理中...</div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        {/* 状态操作 */}
                        <div className="flex space-x-2">
                          {user.status !== 'active' && (
                            <button 
                              onClick={() => handleStatusChange(user.id, 'active')}
                              className="text-green-600 hover:text-green-900"
                            >
                              启用
                            </button>
                          )}
                          {user.status !== 'inactive' && user.status !== 'banned' && (
                            <button 
                              onClick={() => handleStatusChange(user.id, 'inactive')}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              停用
                            </button>
                          )}
                          {user.status !== 'banned' && (
                            <button 
                              onClick={() => handleStatusChange(user.id, 'banned')}
                              className="text-red-600 hover:text-red-900"
                            >
                              封禁
                            </button>
                          )}
                        </div>
                        
                        {/* 角色操作 */}
                        <div className="flex space-x-2">
                          {user.role !== 'admin' && (
                            <button 
                              onClick={() => handleRoleChange(user.id, 'admin')}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              设为管理员
                            </button>
                          )}
                          {user.role !== 'user' && (
                            <button 
                              onClick={() => handleRoleChange(user.id, 'user')}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              设为普通用户
                            </button>
                          )}
                        </div>
                        
                        {/* 查看详情 */}
                        <Link 
                          href={`/admin/users/${user.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          查看详情
                        </Link>
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