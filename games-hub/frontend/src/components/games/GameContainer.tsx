'use client';

import { useRef, useEffect, useState } from 'react';
import { GamePlugin } from '@/types/game';

// 游戏配置接口
interface GameConfig {
  width: number;
  height: number;
  allowFullscreen: boolean;
  customParams?: Record<string, any>;
}

// 定义本地使用的GamePlugin类型（为了保持与现有代码的兼容性）
interface LocalGamePlugin {
  id: string;
  name: string;
  description: string;
  type: 'iframe' | 'api' | 'custom';
  url: string;
  tags: string[];
  category: string;
  config: GameConfig;
  status: string;
  thumbnail: string;
}

interface GameContainerProps {
  game: GamePlugin;
  onMount?: () => void;
  onUnmount?: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  game,
  onMount,
  onUnmount
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: game.config.width || 800,
    height: game.config.height || 600
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 将传入的GamePlugin转换为本地格式
  const normalizeGameType = (type: string): 'iframe' | 'api' | 'custom' => {
    if (type === 'iframe' || type === 'api' || type === 'custom') {
      return type;
    }
    // 默认为iframe类型
    return 'iframe';
  };

  // 响应式调整容器大小
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const gameWidth = game.config.width || 800;
        const gameHeight = game.config.height || 600;
        const aspectRatio = gameHeight / gameWidth;
        
        // 如果容器宽度小于游戏配置的宽度，按比例调整高度
        if (containerWidth < gameWidth) {
          setContainerDimensions({
            width: containerWidth,
            height: containerWidth * aspectRatio
          });
        } else {
          // 否则使用游戏配置的原始尺寸
          setContainerDimensions({
            width: gameWidth,
            height: gameHeight
          });
        }
      }
    };

    // 初始调整
    updateDimensions();

    // 监听窗口大小变化
    window.addEventListener('resize', updateDimensions);

    // 清理
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [game.config]);

  // 处理 iframe 加载
  useEffect(() => {
    const iframe = iframeRef.current;
    
    if (iframe) {
      const handleLoad = () => {
        setIsLoading(false);
        if (onMount) {
          onMount();
        }
      };
      
      const handleError = () => {
        setIsLoading(false);
        setError('无法加载游戏内容');
      };
      
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);
      
      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
        if (onUnmount) {
          onUnmount();
        }
      };
    }
  }, [onMount, onUnmount]);

  // 渲染不同类型的游戏
  const renderGameContent = () => {
    const gameType = normalizeGameType(game.type);
    
    switch (gameType) {
      case 'iframe':
        return (
          <iframe
            ref={iframeRef}
            src={game.url}
            width={containerDimensions.width}
            height={containerDimensions.height}
            allowFullScreen={game.config.allowFullscreen}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            style={{ border: 'none' }}
            title={game.name}
          />
        );
      case 'api':
        // API 类型的游戏集成需要自定义实现
        return <div>API 类型游戏集成 (待实现)</div>;
      case 'custom':
        // 自定义类型的游戏集成需要自定义实现
        return <div>自定义类型游戏集成 (待实现)</div>;
      default:
        return <div>不支持的游戏类型</div>;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="game-container w-full relative bg-gray-100 rounded-lg overflow-hidden"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-red-500">{error}</div>
        </div>
      )}
      
      <div className={`game-content ${isLoading ? 'invisible' : 'visible'}`}>
        {renderGameContent()}
      </div>
    </div>
  );
};

export default GameContainer; 