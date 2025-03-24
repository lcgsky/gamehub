import mongoose, { Document, Schema } from 'mongoose';

// 游戏配置接口
export interface IGameConfig {
  width: number;
  height: number;
  allowFullscreen: boolean;
  customParams?: Record<string, any>;
}

// 游戏文档接口
export interface IGame extends Document {
  name: string;
  description: string;
  type: 'iframe' | 'api' | 'custom';
  url: string;
  tags: string[];
  category: string;
  status: 'active' | 'inactive';
  config: IGameConfig;
  thumbnail?: string;
  instructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 游戏配置Schema
const GameConfigSchema = new Schema<IGameConfig>({
  width: { type: Number, required: true, default: 800 },
  height: { type: Number, required: true, default: 600 },
  allowFullscreen: { type: Boolean, default: true },
  customParams: { type: Schema.Types.Mixed }
});

// 游戏Schema
const GameSchema = new Schema<IGame>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['iframe', 'api', 'custom'], 
    default: 'iframe' 
  },
  url: { type: String, required: true },
  tags: [{ type: String, trim: true }],
  category: { type: String, required: true, trim: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['active', 'inactive'], 
    default: 'inactive' 
  },
  config: { type: GameConfigSchema, required: true },
  thumbnail: { type: String },
  instructions: { type: String },
}, {
  timestamps: true,
});

// 创建索引
GameSchema.index({ name: 1 });
GameSchema.index({ tags: 1 });
GameSchema.index({ category: 1 });
GameSchema.index({ status: 1 });
GameSchema.index({ createdAt: -1 });
GameSchema.index({ type: 1 });
GameSchema.index({ 
  name: 'text', 
  description: 'text' 
}, {
  weights: {
    name: 10,
    description: 5
  }
});
GameSchema.index({ category: 1, status: 1 });
GameSchema.index({ tags: 1, createdAt: -1 });

export default mongoose.model<IGame>('Game', GameSchema); 