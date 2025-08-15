import mongoose, { Schema, Model } from "mongoose";
import { UserDocument, CreateUserData } from "@/types/database";
import { MessageSchema } from "./Messages.model";

// User interface extending the document interface
export interface User extends UserDocument { }

// User schema with proper typing
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
    minlength: [2, "Username must be at least 2 characters"],
    maxlength: [20, "Username must be no more than 20 characters"],
    match: [/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [6, "Password must be at least 6 characters"],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password should contain at least one capital letter, one number, and one special character",
    ],
  },
  verifyCode: {
    type: String,
    required: [true, "Verification code is required"],
    length: [6, "Verification code must be exactly 6 characters"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verification code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create indexes for better performance
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ isVerified: 1 });
UserSchema.index({ isAcceptMessage: 1 });

// Static methods for type-safe operations
UserSchema.statics = {
  // Find user by username or email
  async findByUsernameOrEmail(identifier: string): Promise<User | null> {
    return this.findOne({
      $or: [
        { username: identifier },
        { email: identifier },
      ],
    });
  },

  // Find verified user by username
  async findVerifiedByUsername(username: string): Promise<User | null> {
    return this.findOne({
      username,
      isVerified: true,
    });
  },

  // Create user with proper typing
  async createUser(userData: CreateUserData): Promise<User> {
    return this.create(userData);
  },

  // Update user verification status
  async updateVerificationStatus(userId: string, isVerified: boolean): Promise<User | null> {
    return this.findByIdAndUpdate(
      userId,
      { isVerified },
      { new: true, runValidators: true }
    );
  },

  // Update message acceptance status
  async updateMessageAcceptance(userId: string, isAcceptMessage: boolean): Promise<User | null> {
    return this.findByIdAndUpdate(
      userId,
      { isAcceptMessage },
      { new: true, runValidators: true }
    );
  },

  // Add message to user
  async addMessage(userId: string, message: any): Promise<User | null> {
    return this.findByIdAndUpdate(
      userId,
      { $push: { messages: message } },
      { new: true, runValidators: true }
    );
  },

  // Remove message from user
  async removeMessage(userId: string, messageId: string): Promise<User | null> {
    return this.findByIdAndUpdate(
      userId,
      { $pull: { messages: { _id: messageId } } },
      { new: true, runValidators: true }
    );
  },
};

// Instance methods
UserSchema.methods = {
  // Check if verification code is valid and not expired
  isVerificationCodeValid(code: string): boolean {
    return (
      this['verifyCode'] === code &&
      this['verifyCodeExpiry'] &&
      new Date(this['verifyCodeExpiry']) > new Date()
    );
  },

  // Check if user can receive messages
  canReceiveMessages(): boolean {
    return this['isVerified'] && this['isAcceptMessage'];
  },

  // Get public profile data (without sensitive information)
  getPublicProfile() {
    return {
      username: this['username'],
      isAcceptMessage: this['isAcceptMessage'],
    };
  },
};

// Virtual fields
UserSchema.virtual('profileUrl').get(function () {
  return `/u/${this['username']}`;
});

UserSchema.virtual('messageCount').get(function () {
  return this['messages']?.length || 0;
});

// Ensure virtual fields are included when converting to JSON
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

// Type-safe model creation
const UserModel: Model<User> =
  (mongoose.models['User'] as Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
