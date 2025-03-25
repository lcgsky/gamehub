export interface GameConfig {
  width?: number;
  height?: number;
  allowFullscreen?: boolean;
  customParams?: Record<string, any>;
}

export interface LocalizedString {
  en: string;
  zh: string;
  ja: string;
  ko: string;
}

export interface GamePlugin {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  type: string;
  url: string;
  tags: string[];
  category: string;
  status: 'active' | 'inactive';
  thumbnail: string;
  config: Record<string, any>;
  instructions?: LocalizedString;
}

export interface GameComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: LocalizedString;
  createdAt: string;
}

export interface GameStatistics {
  playCount: number;
  favoriteCount: number;
  averageRating: number;
} 