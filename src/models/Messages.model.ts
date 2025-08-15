import mongoose, { Schema, Model } from "mongoose";
import { MessageDocument, CreateMessageData } from "@/types/database";

// Message interface extending the document interface
export interface Message extends MessageDocument { }

// Message schema with proper typing
export const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: [true, "Message content is required"],
    trim: true,
    minlength: [10, "Message content must be at least 10 characters"],
    maxlength: [300, "Message content must be no longer than 300 characters"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: true, // Index for better query performance
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create indexes for better performance
MessageSchema.index({ createdAt: -1 }); // Descending order for recent messages first

// Static methods for type-safe operations
MessageSchema.statics = {
  // Create message with proper typing
  async createMessage(messageData: CreateMessageData): Promise<Message> {
    return this.create(messageData);
  },

  // Find messages by date range
  async findByDateRange(startDate: Date, endDate: Date): Promise<Message[]> {
    return this.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ createdAt: -1 });
  },

  // Find recent messages
  async findRecent(limit: number = 10): Promise<Message[]> {
    return this.find()
      .sort({ createdAt: -1 })
      .limit(limit);
  },

  // Search messages by content
  async searchByContent(searchTerm: string): Promise<Message[]> {
    return this.find({
      content: {
        $regex: searchTerm,
        $options: 'i', // Case-insensitive search
      },
    }).sort({ createdAt: -1 });
  },
};

// Instance methods
MessageSchema.methods = {
  // Get formatted creation date
  getFormattedDate(): string {
    return this['createdAt'].toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Get relative time (e.g., "2 hours ago")
  getRelativeTime(): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - this['createdAt'].getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  },

  // Check if message is recent (within last 24 hours)
  isRecent(): boolean {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    return this['createdAt'] > oneDayAgo;
  },

  // Get message preview (first 50 characters)
  getPreview(): string {
    return this['content'].length > 50
      ? `${this['content'].substring(0, 50)}...`
      : this['content'];
  },
};

// Virtual fields
MessageSchema.virtual('isNew').get(function () {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  return this['createdAt'] > oneHourAgo;
});

MessageSchema.virtual('wordCount').get(function () {
  return this['content'].split(/\s+/).filter(word => word.length > 0).length;
});

// Ensure virtual fields are included when converting to JSON
MessageSchema.set('toJSON', { virtuals: true });
MessageSchema.set('toObject', { virtuals: true });

// Type-safe model creation
const MessageModel: Model<Message> =
  (mongoose.models['Message'] as Model<Message>) ||
  mongoose.model<Message>("Message", MessageSchema);

export default MessageModel;
