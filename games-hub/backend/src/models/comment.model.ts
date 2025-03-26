import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  content: string;
  rating?: number;
  userId: mongoose.Types.ObjectId;
  gameId: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema<IComment>(
  {
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot be more than 1000 characters']
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to a user']
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: [true, 'Comment must belong to a game']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// 索引
commentSchema.index({ gameId: 1, createdAt: -1 });
commentSchema.index({ userId: 1, createdAt: -1 });
commentSchema.index({ status: 1, createdAt: -1 });

// 当评论被删除时，更新游戏的评分统计
commentSchema.pre('deleteOne', { document: true }, async function(this: IComment) {
  if (this.status === 'approved' && this.rating) {
    const Game = mongoose.model('Game');
    await Game.updateOne(
      { _id: this.gameId },
      {
        $inc: {
          totalRatings: -1,
          totalRatingScore: -this.rating
        }
      }
    );
  }
});

// 当评论状态改变时，更新游戏的评分统计
commentSchema.pre('save', async function(this: IComment, next) {
  if (!this.isModified('status') || !this.rating) {
    return next();
  }

  const Game = mongoose.model('Game');
  
  if (this.status === 'approved' && this.isModified('status')) {
    // 如果评论被批准，增加评分统计
    await Game.updateOne(
      { _id: this.gameId },
      {
        $inc: {
          totalRatings: 1,
          totalRatingScore: this.rating
        }
      }
    );
  } else if (this.status === 'rejected' && this.isModified('status')) {
    // 如果评论被拒绝，减少评分统计
    await Game.updateOne(
      { _id: this.gameId },
      {
        $inc: {
          totalRatings: -1,
          totalRatingScore: -this.rating
        }
      }
    );
  }

  next();
});

export const Comment = mongoose.model<IComment>('Comment', commentSchema); 