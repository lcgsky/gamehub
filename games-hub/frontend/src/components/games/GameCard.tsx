'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GamePlugin } from '@/types/game';

interface GameCardProps {
  game: GamePlugin;
  showCategory?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, showCategory = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/games/${game.id}`}
      className="block group"
    >
      <div 
        className="bg-white rounded-lg shadow hover:shadow-md transition duration-200 overflow-hidden h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 图片容器 */}
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={game.thumbnail}
            alt={game.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          {/* 分类标签 */}
          {showCategory && (
            <div className="absolute top-3 left-3">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                {game.category}
              </span>
            </div>
          )}
        </div>
        
        {/* 内容 */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 mb-2">{game.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-grow">{game.description}</p>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {game.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard; 