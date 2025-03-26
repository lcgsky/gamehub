import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'admin';
  favorites: Types.ObjectId[];
  createdAt: Date;
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'banned';
  comparePassword(candidatePassword: string): Promise<boolean>;
  addToFavorites(gameId: Types.ObjectId): Promise<void>;
  removeFromFavorites(gameId: Types.ObjectId): Promise<void>;
  isFavorite(gameId: Types.ObjectId): boolean;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username cannot be more than 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // 默认不返回密码字段
  },
  avatar: {
    type: String,
    default: undefined
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  lastLogin: {
    type: Date,
    default: undefined
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 密码加密中间件
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// 密码比对方法
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// 添加到收藏
userSchema.methods.addToFavorites = async function(gameId: Types.ObjectId): Promise<void> {
  if (!this.favorites.includes(gameId)) {
    this.favorites.push(gameId);
    await this.save();
  }
};

// 从收藏中移除
userSchema.methods.removeFromFavorites = async function(gameId: Types.ObjectId): Promise<void> {
  const index = this.favorites.indexOf(gameId);
  if (index > -1) {
    this.favorites.splice(index, 1);
    await this.save();
  }
};

// 检查是否已收藏
userSchema.methods.isFavorite = function(gameId: Types.ObjectId): boolean {
  return this.favorites.includes(gameId);
};

// 创建虚拟字段
userSchema.virtual('favoritesCount').get(function() {
  return this.favorites?.length || 0;
});

// 索引
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });
userSchema.index({ favorites: 1 });

export const User = model<IUser>('User', userSchema); 