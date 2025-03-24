'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  name: string;
  count: number;
  description: string;
  image: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟API请求获取分类数据
    setTimeout(() => {
      const mockCategories: Category[] = [
        {
          name: '益智',
          count: 15,
          description: '锻炼大脑，挑战思维的益智类游戏',
          image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=500&auto=format&fit=crop'
        },
        {
          name: '休闲',
          count: 12,
          description: '轻松有趣的休闲类游戏',
          image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=500&auto=format&fit=crop'
        },
        {
          name: '街机',
          count: 8,
          description: '经典街机风格的游戏',
          image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500&auto=format&fit=crop'
        },
        {
          name: '策略',
          count: 10,
          description: '需要深思熟虑的策略类游戏',
          image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=500&auto=format&fit=crop'
        },
        {
          name: '冒险',
          count: 7,
          description: '充满探索的冒险游戏',
          image: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?q=80&w=500&auto=format&fit=crop'
        },
        {
          name: '角色扮演',
          count: 5,
          description: '沉浸式的角色扮演游戏',
          image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=500&auto=format&fit=crop'
        },
      ];
      
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">游戏分类</h1>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/categories/${category.name}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-4 text-white">
                      <h2 className="text-xl font-bold">{category.name}</h2>
                      <p className="text-sm opacity-90">{category.count} 款游戏</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 