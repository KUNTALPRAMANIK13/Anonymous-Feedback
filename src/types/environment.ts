// Environment variable types
export interface EnvironmentVariables {
  // Database
  MONGODB_URI: string;
  
  // Authentication
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  
  // Email Service (Resend)
  RESEND_API_KEY: string;
  EMAIL_FROM?: string;
  
  // AI Service (Google Gemini)
  GOOGLE_GENERATIVE_AI_API_KEY: string;
  
  // Recruiter Demo
  RECRUITER_ACCESS_KEY?: string;
  RECRUITER_DEMO_USERNAME?: string;
  RECRUITER_DEMO_EMAIL?: string;
  
  // Application
  NODE_ENV: "development" | "production" | "test";
  PORT?: string;
  
  // Security
  CORS_ORIGIN?: string;
  RATE_LIMIT_WINDOW_MS?: string;
  RATE_LIMIT_MAX_REQUESTS?: string;
}

// Environment validation schema
export interface EnvironmentValidation {
  required: (keyof EnvironmentVariables)[];
  optional: (keyof EnvironmentVariables)[];
  defaults: Partial<EnvironmentVariables>;
}

// Configuration object
export interface AppConfig {
  database: {
    uri: string;
    options: {
      useNewUrlParser: boolean;
      useUnifiedTopology: boolean;
      maxPoolSize: number;
      serverSelectionTimeoutMS: number;
      socketTimeoutMS: number;
    };
  };
  
  auth: {
    secret: string;
    url: string;
    session: {
      strategy: "jwt";
      maxAge: number;
    };
  };
  
  email: {
    provider: "resend";
    apiKey: string;
    from: string;
  };
  
  ai: {
    provider: "google-gemini";
    apiKey: string;
    model: string;
    maxTokens: number;
    temperature: number;
  };
  
  app: {
    name: string;
    version: string;
    environment: "development" | "production" | "test";
    port: number;
    url: string;
  };
  
  security: {
    cors: {
      origin: string | string[];
      credentials: boolean;
    };
    rateLimit: {
      windowMs: number;
      max: number;
    };
  };
  
  features: {
    recruiterDemo: boolean;
    emailVerification: boolean;
    passwordRecovery: boolean;
    aiSuggestions: boolean;
  };
}

// Feature flags
export interface FeatureFlags {
  recruiterDemo: boolean;
  emailVerification: boolean;
  passwordRecovery: boolean;
  aiSuggestions: boolean;
  darkMode: boolean;
  analytics: boolean;
  notifications: boolean;
}

// API configuration
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  headers: Record<string, string>;
}

// Email configuration
export interface EmailConfig {
  provider: "resend" | "nodemailer" | "sendgrid";
  apiKey: string;
  from: string;
  replyTo?: string;
  templates: {
    verification: string;
    passwordReset: string;
    welcome: string;
  };
}

// AI configuration
export interface AIConfig {
  provider: "google-gemini" | "openai" | "anthropic";
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  topK: number;
  fallbackQuestions: string[];
}

// Database configuration
export interface DatabaseConfig {
  uri: string;
  name: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
    maxPoolSize: number;
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
    bufferMaxEntries: number;
    bufferCommands: boolean;
  };
  indexes: {
    users: Array<{
      fields: Record<string, 1 | -1>;
      options?: Record<string, any>;
    }>;
    messages: Array<{
      fields: Record<string, 1 | -1>;
      options?: Record<string, any>;
    }>;
  };
}

// Logging configuration
export interface LoggingConfig {
  level: "error" | "warn" | "info" | "debug";
  format: "json" | "simple";
  transports: Array<"console" | "file" | "http">;
  file?: {
    filename: string;
    maxSize: string;
    maxFiles: number;
  };
}

// Monitoring configuration
export interface MonitoringConfig {
  enabled: boolean;
  provider: "sentry" | "datadog" | "newrelic";
  dsn?: string;
  environment: string;
  tracesSampleRate: number;
}

// Cache configuration
export interface CacheConfig {
  provider: "memory" | "redis" | "memcached";
  ttl: number;
  maxSize: number;
  redis?: {
    url: string;
    password?: string;
    db: number;
  };
}

// File upload configuration
export interface FileUploadConfig {
  provider: "local" | "s3" | "cloudinary";
  maxSize: number;
  allowedTypes: string[];
  s3?: {
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  };
}
