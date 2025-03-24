'use client';

import { useState } from 'react';
import Link from 'next/link';

// FAQ类型定义
interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'games' | 'account' | 'technical';
}

export default function FAQPage() {
  // 常见问题列表
  const faqs: FAQ[] = [
    {
      id: 1,
      question: '什么是GameHub？',
      answer: 'GameHub是一个专注于聚合各类在线游戏的平台。我们提供多种类型的游戏，让用户可以在一处轻松体验不同的游戏，无需下载安装。',
      category: 'general'
    },
    {
      id: 2,
      question: 'GameHub上的游戏是免费的吗？',
      answer: '是的，目前平台上的所有游戏都是免费提供的。未来可能会添加一些高级功能或游戏，可能需要付费才能使用。',
      category: 'general'
    },
    {
      id: 3,
      question: '需要注册账号才能玩游戏吗？',
      answer: '不需要。您可以直接访问网站并开始游戏。但是，注册账号可以帮助您保存游戏进度、收藏喜爱的游戏，以及参与评论讨论。',
      category: 'account'
    },
    {
      id: 4,
      question: '如何提交自己的游戏到GameHub？',
      answer: '我们欢迎开发者提交自己的游戏。请通过联系页面与我们取得联系，提供您的游戏相关信息，我们的团队会进行审核。',
      category: 'games'
    },
    {
      id: 5,
      question: '游戏无法正常加载怎么办？',
      answer: '这可能是由于网络连接问题或浏览器兼容性导致的。建议尝试刷新页面、清除浏览器缓存或尝试使用不同的浏览器。如问题持续存在，请通过联系页面向我们报告。',
      category: 'technical'
    },
    {
      id: 6,
      question: '可以在移动设备上玩这些游戏吗？',
      answer: '是的，GameHub采用响应式设计，大部分游戏可以在移动设备上正常运行。但由于部分游戏原始设计仅适配电脑使用，可能在移动设备上的体验不如电脑。',
      category: 'technical'
    },
    {
      id: 7,
      question: '如何保存游戏进度？',
      answer: '目前部分游戏可以自动保存进度，但需要您使用同一设备和浏览器。注册账号后，未来我们将提供更完善的游戏进度保存功能。',
      category: 'games'
    },
    {
      id: 8,
      question: '为什么我看不到某些游戏？',
      answer: '这可能是由于地区限制、浏览器兼容性问题或者该游戏正在维护。如果您确信应该能看到某款游戏，请通过联系页面向我们反馈。',
      category: 'games'
    }
  ];

  // 分类选项
  const categories = [
    { value: 'all', label: '全部问题' },
    { value: 'general', label: '一般问题' },
    { value: 'games', label: '游戏相关' },
    { value: 'account', label: '账号相关' },
    { value: 'technical', label: '技术支持' }
  ];

  // 状态管理
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // 过滤问题
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  // 切换问题展开/折叠
  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">常见问题 (FAQ)</h1>
      
      {/* 分类过滤器 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === cat.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              } transition duration-150`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* FAQ列表 */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <p className="text-gray-500">没有找到相关问题。</p>
        ) : (
          filteredFaqs.map(faq => (
            <div 
              key={faq.id} 
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    expandedId === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {expandedId === faq.id && (
                <div className="px-6 py-4 border-t border-gray-200 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* 联系支持 */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">没有找到您的问题？</h2>
        <p className="mb-4">如果以上常见问题未能解答您的疑问，请随时联系我们的支持团队。</p>
        <Link 
          href="/contact" 
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150"
        >
          联系支持
        </Link>
      </div>
    </div>
  );
} 