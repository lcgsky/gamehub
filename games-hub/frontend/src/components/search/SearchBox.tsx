'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GamePlugin } from '@/types/game';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  onClose?: () => void;
}

// 模拟游戏数据（实际应用中可以共享数据或使用API）
const mockGames: Partial<GamePlugin>[] = [
  { id: '1', name: '银河征服者', category: 'strategy', tags: ['太空', '策略', '探索'] },
  { id: '2', name: '魔法世界', category: 'rpg', tags: ['奇幻', 'RPG', '冒险'] },
  { id: '3', name: '方块解谜', category: 'puzzle', tags: ['解谜', '益智', '休闲'] },
  { id: '4', name: '超级赛车', category: 'sports', tags: ['赛车', '竞速', '体育'] },
  { id: '5', name: '丧尸围城', category: 'action', tags: ['生存', '丧尸', '动作'] },
  { id: '6', name: '水果忍者', category: 'casual', tags: ['休闲', '切水果', '手机游戏'] },
  { id: '7', name: '未来战士', category: 'action', tags: ['FPS', '科幻', '动作'] },
  { id: '8', name: '王国建设者', category: 'strategy', tags: ['策略', '中世纪', '建设'] },
];

const SearchBox: React.FC<SearchBoxProps> = ({ 
  placeholder = '搜索游戏...', 
  className = '',
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Partial<GamePlugin>[]>([]);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // 处理搜索
  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([]);
      return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const filtered = mockGames.filter(game => 
      game.name?.toLowerCase().includes(searchLower) ||
      game.category?.toLowerCase().includes(searchLower) ||
      game.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    ).slice(0, 5); // 最多显示5个结果
    
    setResults(filtered);
  }, [searchTerm]);
  
  // 搜索输入框获取焦点时打开下拉框
  const handleFocus = () => {
    setIsOpen(true);
  };
  
  // 处理搜索提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      setSearchTerm('');
      if (onClose) onClose();
    }
  };
  
  // 选择搜索结果
  const handleSelectResult = (id: string) => {
    router.push(`/games/${id}`);
    setIsOpen(false);
    setSearchTerm('');
    if (onClose) onClose();
  };
  
  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <button 
          type="submit"
          className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </form>
      
      {/* 搜索结果下拉框 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          {results.length > 0 ? (
            <ul>
              {results.map((game) => (
                <li key={game.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => handleSelectResult(game.id!)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition duration-150 flex items-center"
                  >
                    <span className="flex-grow">
                      <span className="block font-medium text-gray-900">{game.name}</span>
                      <span className="block text-sm text-gray-500">
                        {game.category} • {game.tags?.join(', ')}
                      </span>
                    </span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </li>
              ))}
              <li className="px-4 py-2 bg-gray-50">
                <Link 
                  href={`/search?q=${encodeURIComponent(searchTerm)}`}
                  className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => {
                    setIsOpen(false);
                    if (onClose) onClose();
                  }}
                >
                  查看全部搜索结果
                </Link>
              </li>
            </ul>
          ) : searchTerm.length >= 2 ? (
            <div className="px-4 py-3 text-gray-500 text-center">
              没有找到匹配的游戏
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBox; 