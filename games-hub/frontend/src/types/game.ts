export interface GameConfig {
  width?: number;
  height?: number;
  allowFullscreen?: boolean;
  customParams?: Record<string, any>;
}

export interface GamePlugin {
  id: string;
  name: string;
  description: string;
  type: string;
  url: string;
  tags: string[];
  category: string;
  status: string;
  thumbnail: string;
  config: GameConfig;
  instructions?: string;
}

export interface GameComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  createdAt: string;
}

export interface GameStatistics {
  playCount: number;
  favoriteCount: number;
  averageRating: number;
} 