'use client';

import Image from 'next/image';
import Link from 'next/link';
import { GamePlugin, LocalizedString } from '@/types/game';
import { useLanguage } from '@/hooks/useLanguage';
import { translate } from '@/utils/i18n';
import { useState, useEffect } from 'react';

interface GameCardProps {
  game: GamePlugin;
}

export default function GameCard({ game }: GameCardProps) {
  const { locale } = useLanguage();
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    async function loadTranslations() {
      const { getTranslations } = await import('@/utils/i18n');
      const trans = await getTranslations(locale as keyof LocalizedString, 'common');
      setTranslations(trans);
    }
    loadTranslations();
  }, [locale]);

  return (
    <Link href={`/games/${game.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-150 overflow-hidden group">
        <div className="relative h-48">
          <Image
            src={game.thumbnail}
            alt={game.name[locale as keyof LocalizedString]}
            fill
            className="object-cover transition duration-200 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {translate(translations, `categories.${game.category.toLowerCase()}`)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1">
            {game.name[locale as keyof LocalizedString]}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {game.description[locale as keyof LocalizedString]}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {game.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
} 