import { GamePlugin } from '@/types/game';

// 模拟游戏数据
export const mockGames: GamePlugin[] = [
  {
    id: '1',
    name: {
      en: 'Space Explorer',
      zh: '太空探险',
      ja: '宇宙探検',
      ko: '우주 탐험'
    },
    description: {
      en: 'Explore unknown planets and civilizations in the vast universe',
      zh: '在广阔的宇宙中探索未知的星球和文明',
      ja: '広大な宇宙で未知の惑星と文明を探索する',
      ko: '광활한 우주에서 미지의 행성과 문명을 탐험하세요'
    },
    type: 'adventure',
    url: 'https://example.com/game1',
    tags: ['space', 'exploration', 'sci-fi'],
    category: 'action',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '2',
    name: {
      en: 'Magic World',
      zh: '魔法世界',
      ja: 'マジックワールド',
      ko: '마법 세계'
    },
    description: {
      en: 'Adventure in a magical world, learn spells, and fight evil',
      zh: '在充满魔法的世界中冒险，学习法术，对抗邪恶',
      ja: '魔法の世界で冒険し、呪文を学び、悪と戦う',
      ko: '마법 세계에서 모험하고, 주문을 배우고, 악과 싸우세요'
    },
    type: 'rpg',
    url: 'https://example.com/game2',
    tags: ['magic', 'rpg', 'adventure'],
    category: 'rpg',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '3',
    name: {
      en: 'Racing Championship',
      zh: '赛车竞速',
      ja: 'レーシングチャンピオンシップ',
      ko: '레이싱 챔피언십'
    },
    description: {
      en: 'Experience the thrill of speed, compete on tracks around the world',
      zh: '体验极速快感，在世界各地的赛道上竞争',
      ja: 'スピードのスリルを体験し、世界中のコースで競い合う',
      ko: '속도의 스릴을 경험하고 전 세계 트랙에서 경쟁하세요'
    },
    type: 'racing',
    url: 'https://example.com/game3',
    tags: ['racing', 'sports', 'competition'],
    category: 'sports',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '4',
    name: {
      en: 'Super Racing',
      zh: '超级赛车',
      ja: 'スーパーレーシング',
      ko: '슈퍼 레이싱'
    },
    description: {
      en: 'Race through futuristic cities in high-speed vehicles',
      zh: '驾驶高速车辆在未来城市中竞速',
      ja: '未来都市を高速車両で駆け抜ける',
      ko: '미래 도시를 고속 차량으로 질주하세요'
    },
    type: 'racing',
    url: 'https://example.com/game4',
    tags: ['racing', 'speed', 'sports'],
    category: 'sports',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '5',
    name: {
      en: 'Zombie Siege',
      zh: '丧尸围城',
      ja: 'ゾンビシージ',
      ko: '좀비 시즈'
    },
    description: {
      en: 'Survive in a world overrun by zombies',
      zh: '在被丧尸占领的世界中生存',
      ja: 'ゾンビに支配された世界で生き残れ',
      ko: '좀비가 점령한 세상에서 생존하세요'
    },
    type: 'survival',
    url: 'https://example.com/game5',
    tags: ['survival', 'zombie', 'action'],
    category: 'action',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '6',
    name: {
      en: 'Fruit Ninja',
      zh: '水果忍者',
      ja: 'フルーツニンジャ',
      ko: '프루트 닌자'
    },
    description: {
      en: 'Slice fruits with ninja precision',
      zh: '用忍者的精准切水果',
      ja: '忍者の精度で果物を切る',
      ko: '닌자의 정확성으로 과일을 베세요'
    },
    type: 'casual',
    url: 'https://example.com/game6',
    tags: ['casual', 'arcade', 'mobile'],
    category: 'casual',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '7',
    name: {
      en: 'Future Warrior',
      zh: '未来战士',
      ja: 'フューチャーウォリアー',
      ko: '미래 전사'
    },
    description: {
      en: 'Fight in futuristic battles with advanced weapons',
      zh: '使用先进武器在未来战场上战斗',
      ja: '最先端の武器で未来の戦場を戦う',
      ko: '첨단 무기로 미래 전장에서 싸우세요'
    },
    type: 'action',
    url: 'https://example.com/game7',
    tags: ['fps', 'sci-fi', 'action'],
    category: 'action',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  },
  {
    id: '8',
    name: {
      en: 'Kingdom Builder',
      zh: '王国建设者',
      ja: 'キングダムビルダー',
      ko: '킹덤 빌더'
    },
    description: {
      en: 'Build and manage your medieval kingdom',
      zh: '建设和管理你的中世纪王国',
      ja: '中世の王国を建設し、統治する',
      ko: '중세 왕국을 건설하고 관리하세요'
    },
    type: 'strategy',
    url: 'https://example.com/game8',
    tags: ['strategy', 'medieval', 'building'],
    category: 'strategy',
    status: 'active',
    thumbnail: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    config: {}
  }
];

// 模拟分类数据
export const mockCategories = [
  { 
    id: 'action', 
    name: {
      en: 'Action Games',
      zh: '动作游戏',
      ja: 'アクションゲーム',
      ko: '액션 게임'
    }, 
    icon: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&w=60&h=60&q=80', 
    count: 42 
  },
  { 
    id: 'strategy', 
    name: {
      en: 'Strategy Games',
      zh: '策略游戏',
      ja: 'ストラテジーゲーム',
      ko: '전략 게임'
    }, 
    icon: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?ixlib=rb-1.2.1&w=60&h=60&q=80', 
    count: 36 
  },
  { 
    id: 'puzzle', 
    name: {
      en: 'Puzzle Games',
      zh: '益智游戏',
      ja: 'パズルゲーム',
      ko: '퍼즐 게임'
    }, 
    icon: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&w=60&h=60&q=80', 
    count: 28 
  },
  { 
    id: 'rpg', 
    name: {
      en: 'Role-Playing Games',
      zh: '角色扮演',
      ja: 'ロールプレイングゲーム',
      ko: '롤플레잉 게임'
    }, 
    icon: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&w=60&h=60&q=80', 
    count: 57 
  }
];

// 模拟游戏活跃度数据
export const gamePopularity = {
  '1': 2345,
  '2': 4567,
  '3': 1234
}; 