'use client';

import { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 注册Chart.js组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('week');
  const [gameMetrics, setGameMetrics] = useState({
    totalGames: 0,
    activeGames: 0,
    totalPlays: 0,
    averageRating: 0,
  });
  const [userMetrics, setUserMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    commentCount: 0,
  });
  
  // 图表数据
  const [categoryData, setCategoryData] = useState<any>(null);
  const [playsData, setPlaysData] = useState<any>(null);
  const [usersData, setUsersData] = useState<any>(null);
  const [ratingData, setRatingData] = useState<any>(null);

  useEffect(() => {
    fetchStatistics();
  }, [period]);

  const fetchStatistics = async () => {
    setIsLoading(true);
    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 设置基础指标
      setGameMetrics({
        totalGames: 45,
        activeGames: 32,
        totalPlays: 12568,
        averageRating: 4.2,
      });
      
      setUserMetrics({
        totalUsers: 587,
        activeUsers: 145,
        newUsers: period === 'week' ? 28 : (period === 'month' ? 86 : 312),
        commentCount: 723,
      });
      
      // 设置图表数据
      const timeLabels = period === 'week' 
        ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] 
        : (period === 'month' 
          ? Array.from({length: 30}, (_, i) => `${i+1}日`)
          : Array.from({length: 12}, (_, i) => `${i+1}月`));
      
      setCategoryData({
        labels: ['策略', '益智', '休闲', '动作', '角色扮演', '模拟', '射击', '冒险', '其他'],
        datasets: [
          {
            label: '按分类的游戏数量',
            data: [8, 12, 7, 5, 3, 4, 2, 3, 1],
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(199, 199, 199, 0.6)',
              'rgba(83, 102, 255, 0.6)',
              'rgba(78, 129, 188, 0.6)',
            ],
            borderWidth: 1,
          },
        ],
      });
      
      setPlaysData({
        labels: timeLabels,
        datasets: [
          {
            label: '游戏启动次数',
            data: generateRandomData(timeLabels.length, 20, 150),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
        ],
      });

      setUsersData({
        labels: timeLabels,
        datasets: [
          {
            label: '新注册用户',
            data: generateRandomData(timeLabels.length, 1, 12),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: '活跃用户',
            data: generateRandomData(timeLabels.length, 30, 80),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });

      setRatingData({
        labels: ['1星', '2星', '3星', '4星', '5星'],
        datasets: [
          {
            label: '评分分布',
            data: [23, 45, 132, 256, 267],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
          },
        ],
      });
      
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 生成随机数据辅助函数
  const generateRandomData = (length: number, min: number, max: number) => {
    return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1) + min));
  };

  // 图表配置选项
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">数据统计</h1>
        <div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="week">最近一周</option>
            <option value="month">最近一个月</option>
            <option value="year">最近一年</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载统计数据中...</p>
        </div>
      ) : (
        <>
          {/* 指标概览 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">游戏总数</h3>
              <p className="text-2xl font-bold">{gameMetrics.totalGames}</p>
              <p className="text-sm text-gray-600">活跃: {gameMetrics.activeGames} ({Math.round(gameMetrics.activeGames / gameMetrics.totalGames * 100)}%)</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">游戏启动次数</h3>
              <p className="text-2xl font-bold">{gameMetrics.totalPlays.toLocaleString()}</p>
              <p className="text-sm text-gray-600">平均评分: {gameMetrics.averageRating.toFixed(1)}/5</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">用户总数</h3>
              <p className="text-2xl font-bold">{userMetrics.totalUsers}</p>
              <p className="text-sm text-gray-600">新用户: +{userMetrics.newUsers} (本{period === 'week' ? '周' : (period === 'month' ? '月' : '年')})</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">活跃用户</h3>
              <p className="text-2xl font-bold">{userMetrics.activeUsers}</p>
              <p className="text-sm text-gray-600">评论总数: {userMetrics.commentCount}</p>
            </div>
          </div>

          {/* 图表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 游戏分类分布 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-700 font-medium mb-4">游戏分类分布</h3>
              {categoryData && (
                <div className="h-64">
                  <Bar data={categoryData} options={barOptions} />
                </div>
              )}
            </div>

            {/* 评分分布 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-700 font-medium mb-4">评分分布</h3>
              {ratingData && (
                <div className="h-64">
                  <Pie data={ratingData} />
                </div>
              )}
            </div>

            {/* 游戏启动趋势 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-700 font-medium mb-4">游戏启动趋势</h3>
              {playsData && (
                <div className="h-64">
                  <Line data={playsData} options={barOptions} />
                </div>
              )}
            </div>

            {/* 用户活跃度 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-700 font-medium mb-4">用户活跃度</h3>
              {usersData && (
                <div className="h-64">
                  <Bar data={usersData} options={barOptions} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 