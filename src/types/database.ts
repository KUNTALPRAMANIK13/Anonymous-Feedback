import { Document, Types } from "mongoose";

// Base document interface
export interface BaseDocument extends Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// User document interface
export interface UserDocument extends BaseDocument {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptMessage: boolean;
  messages: MessageDocument[];
}

// Message document interface
export interface MessageDocument extends BaseDocument {
  content: string;
  createdAt: Date;
}

// Database connection state
export interface DatabaseConnection {
  isConnected: number | undefined;
}

// Database query options
export interface QueryOptions {
  limit?: number;
  skip?: number;
  sort?: Record<string, 1 | -1>;
  select?: string | Record<string, 0 | 1>;
  populate?: string | Record<string, any>;
}

// Database update options
export interface UpdateOptions {
  new?: boolean;
  upsert?: boolean;
  runValidators?: boolean;
  setDefaultsOnInsert?: boolean;
}

// Database aggregation pipeline stages
export type AggregationStage = 
  | { $match: Record<string, any> }
  | { $sort: Record<string, 1 | -1> }
  | { $limit: number }
  | { $skip: number }
  | { $project: Record<string, 0 | 1 | any> }
  | { $lookup: Record<string, any> }
  | { $group: Record<string, any> }
  | { $unwind: string | Record<string, any> };

// Database operation results
export interface DatabaseOperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  affectedRows?: number;
}

// User creation data
export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified?: boolean;
  isAcceptMessage?: boolean;
  messages?: MessageDocument[];
}

// User update data
export interface UpdateUserData {
  username?: string;
  email?: string;
  password?: string;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  isVerified?: boolean;
  isAcceptMessage?: boolean;
}

// Message creation data
export interface CreateMessageData {
  content: string;
  createdAt?: Date;
}

// Message update data
export interface UpdateMessageData {
  content?: string;
}

// Database indexes
export interface DatabaseIndex {
  fields: Record<string, 1 | -1>;
  options?: {
    unique?: boolean;
    sparse?: boolean;
    background?: boolean;
    name?: string;
  };
}

// Database validation rules
export interface ValidationRule {
  type: string;
  required?: boolean;
  min?: number;
  max?: number;
  enum?: string[];
  match?: RegExp;
  unique?: boolean;
  default?: any;
  validate?: (value: any) => boolean | string;
}

// Database schema definition
export interface SchemaDefinition {
  [key: string]: ValidationRule | SchemaDefinition;
}

// Database transaction options
export interface TransactionOptions {
  readConcern?: string;
  writeConcern?: string;
  readPreference?: string;
}

// Database connection options
export interface ConnectionOptions {
  uri: string;
  options?: {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
    maxPoolSize?: number;
    serverSelectionTimeoutMS?: number;
    socketTimeoutMS?: number;
    bufferMaxEntries?: number;
    bufferCommands?: boolean;
  };
}

// Database statistics
export interface DatabaseStats {
  collections: number;
  views: number;
  objects: number;
  avgObjSize: number;
  dataSize: number;
  storageSize: number;
  indexes: number;
  indexSize: number;
}

// Database health check
export interface DatabaseHealth {
  status: "healthy" | "unhealthy" | "degraded";
  responseTime: number;
  lastCheck: Date;
  error?: string;
}

// Database backup info
export interface DatabaseBackup {
  id: string;
  createdAt: Date;
  size: number;
  status: "completed" | "failed" | "in_progress";
  error?: string;
}

// Database migration
export interface DatabaseMigration {
  version: number;
  name: string;
  appliedAt: Date;
  checksum: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
}
