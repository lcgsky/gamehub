import { Schema, model, Document } from 'mongoose';

export interface IGame extends Document {
  name: string;
  description: string;
  type: 'iframe' | 'api' | 'custom';
  url: string;
  tags: string[];
  category: string;
  status: 'active' | 'inactive';
  config: {
    width: number;
    height: number;
    allowFullscreen: boolean;
    customParams?: Record<string, any>;
  };
  thumbnail?: string;
  instructions?: string;
  stats: {
    plays: number;
    favorites: number;
    totalRatings: number;
    totalRatingScore: number;
    averageRating: number;
    lastPlayed?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  incrementPlays(): Promise<void>;
  incrementFavorites(increment: boolean): Promise<void>;
  updateRatingStats(): Promise<void>;
}

const gameSchema = new Schema<IGame>({
  name: {
    type: String,
    required: [true, 'Please provide a game name'],
    unique: true,
    trim: true,
    maxlength: [100, 'Game name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a game description'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  type: {
    type: String,
    required: [true, 'Please specify the game type'],
    enum: ['iframe', 'api', 'custom']
  },
  url: {
    type: String,
    required: [true, 'Please provide the game URL'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Please specify the game category'],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  config: {
    width: {
      type: Number,
      required: [true, 'Please specify the game width'],
      min: [0, 'Width must be positive']
    },
    height: {
      type: Number,
      required: [true, 'Please specify the game height'],
      min: [0, 'Height must be positive']
    },
    allowFullscreen: {
      type: Boolean,
      default: true
    },
    customParams: {
      type: Schema.Types.Mixed
    }
  },
  thumbnail: {
    type: String,
    trim: true
  },
  instructions: {
    type: String,
    trim: true,
    maxlength: [2000, 'Instructions cannot be more than 2000 characters']
  },
  stats: {
    plays: {
      type: Number,
      default: 0
    },
    favorites: {
      type: Number,
      default: 0
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    totalRatingScore: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    lastPlayed: {
      type: Date
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 索引
gameSchema.index({ name: 'text', description: 'text' });
gameSchema.index({ tags: 1 });
gameSchema.index({ category: 1 });
gameSchema.index({ status: 1 });
gameSchema.index({ 'stats.plays': -1 });
gameSchema.index({ 'stats.favorites': -1 });
gameSchema.index({ 'stats.averageRating': -1 });
gameSchema.index({ createdAt: -1 });

// 增加游戏游玩次数
gameSchema.methods.incrementPlays = async function(): Promise<void> {
  this.stats.plays += 1;
  this.stats.lastPlayed = new Date();
  await this.save();
};

// 更新收藏数
gameSchema.methods.incrementFavorites = async function(increment: boolean): Promise<void> {
  this.stats.favorites += increment ? 1 : -1;
  await this.save();
};

// 更新评分统计
gameSchema.methods.updateRatingStats = async function(): Promise<void> {
  if (this.stats.totalRatings > 0) {
    this.stats.averageRating = this.stats.totalRatingScore / this.stats.totalRatings;
  } else {
    this.stats.averageRating = 0;
  }
  await this.save();
};

export const Game = model<IGame>('Game', gameSchema); 