'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// 统计卡片组件
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: number;
  changeText?: string;
  linkTo?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeText, linkTo }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
        {change !== undefined && (
          <p className={`text-sm font-medium mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% {changeText || '相比上月'}
          </p>
        )}
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        {icon}
      </div>
    </div>
    {linkTo && (
      <Link href={linkTo} className="text-blue-600 text-sm font-medium mt-4 inline-block hover:underline">
        查看详情 →
      </Link>
    )}
  </div>
);

export default function AdminDashboard() {
  const [statistics, setStatistics] = useState({
    totalGames: 0,
    activeGames: 0,
    totalUsers: 0,
    newUsers: 0,
    totalPlays: 0,
    averageRating: 0,
  });

  useEffect(() => {
    // 模拟从API获取数据
    const loadStatistics = async () => {
      // 在实际应用中，这里会从API获取真实数据
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatistics({
        totalGames: 42,
        activeGames: 38,
        totalUsers: 1250,
        newUsers: 128,
        totalPlays: 15782,
        averageRating: 4.3,
      });
    };

    loadStatistics();
  }, []);

  // 模拟最近添加的游戏
  const recentGames = [
    { id: '101', name: '太空探险家', category: '冒险', status: 'active', addedAt: '2023-12-10' },
    { id: '102', name: '幻影战士', category: '动作', status: 'active', addedAt: '2023-12-08' },
    { id: '103', name: '农场日记', category: '模拟', status: 'inactive', addedAt: '2023-12-05' },
    { id: '104', name: '狂野飙车', category: '赛车', status: 'active', addedAt: '2023-12-01' },
  ];

  // 模拟最近的用户活动
  const recentActivity = [
    { id: '1', type: 'comment', user: '张三', content: '评论了游戏"太空探险家"', time: '10分钟前' },
    { id: '2', type: 'register', user: '李四', content: '注册成为新用户', time: '1小时前' },
    { id: '3', type: 'rating', user: '王五', content: '给游戏"幻影战士"评分5星', time: '2小时前' },
    { id: '4', type: 'play', user: '赵六', content: '玩了游戏"农场日记"', time: '3小时前' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">仪表盘</h1>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="游戏总数"
          value={statistics.totalGames}
          icon={
            <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          change={5}
          linkTo="/admin/games"
        />
        
        <StatCard
          title="注册用户"
          value={statistics.totalUsers}
          icon={
            <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          change={12}
          linkTo="/admin/users"
        />
        
        <StatCard
          title="游戏启动次数"
          value={statistics.totalPlays}
          icon={
            <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          change={8}
          linkTo="/admin/statistics"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近添加的游戏 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">最近添加的游戏</h2>
            <Link href="/admin/games" className="text-blue-600 text-sm hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">游戏名称</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">添加日期</th>
                </tr>
              </thead>
              <tbody>
                {recentGames.map(game => (
                  <tr key={game.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium">{game.name}</td>
                    <td className="py-3 text-sm">{game.category}</td>
                    <td className="py-3 text-sm">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        game.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {game.status === 'active' ? '已上线' : '未上线'}
                      </span>
                    </td>
                    <td className="py-3 text-sm">{game.addedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 最近的用户活动 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">最近用户活动</h2>
            <Link href="/admin/users" className="text-blue-600 text-sm hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start py-3 border-b">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  {activity.type === 'comment' && (
                    <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )}
                  {activity.type === 'register' && (
                    <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  )}
                  {activity.type === 'rating' && (
                    <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  )}
                  {activity.type === 'play' && (
                    <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{activity.user}</span> {activity.content}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 