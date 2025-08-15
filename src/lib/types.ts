import { NextRequest, NextResponse } from "next/server";
import { AnyApiResponse, ApiResponse } from "@/types/apiResponse";

// Type-safe API response helper
export function createApiResponse<T extends ApiResponse>(
  data: T,
  status: number = 200
): NextResponse<T> {
  return NextResponse.json(data, { status });
}

// Type-safe error response helper
export function createErrorResponse(
  message: string,
  status: number = 500,
  error?: string
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(error && { error }),
    },
    { status }
  );
}

// Type-safe success response helper
export function createSuccessResponse<T = any>(
  message: string,
  data?: T,
  status: number = 200
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: true,
      message,
      ...(data && { data }),
    },
    { status }
  );
}

// Type-safe request body parser
export async function parseRequestBody<T>(
  request: NextRequest
): Promise<T> {
  try {
    return await request.json();
  } catch (error) {
    throw new Error("Invalid request body");
  }
}

// Type-safe query parameters parser
export function parseQueryParams<T extends Record<string, string>>(
  request: NextRequest
): T {
  const url = new URL(request.url);
  const params: Record<string, string> = {};

  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params as T;
}

// Type-safe session user
export interface SessionUser {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
}

// Type-safe API route handler
export type ApiRouteHandler = (
  request: NextRequest,
  context?: { params?: Record<string, string> }
) => Promise<NextResponse<AnyApiResponse>>;

// Type-safe middleware handler
export type MiddlewareHandler = (
  request: NextRequest
) => Promise<NextResponse | Response>;

// Type-safe validation result
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
}

// Type-safe pagination
export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Type-safe search parameters
export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  sort?: Record<string, 1 | -1>;
  pagination?: PaginationParams;
}

// Type-safe cache operations
export interface CacheOptions {
  ttl?: number;
  key?: string;
  tags?: string[];
}

// Type-safe logging levels
export type LogLevel = "error" | "warn" | "info" | "debug";

// Type-safe event emitter
export interface EventEmitter<T = any> {
  emit(event: string, data?: T): void;
  on(event: string, handler: (data?: T) => void): void;
  off(event: string, handler: (data?: T) => void): void;
}

// Type-safe configuration
export interface Config {
  get<T>(key: string, defaultValue?: T): T;
  set<T>(key: string, value: T): void;
  has(key: string): boolean;
}

// Type-safe database transaction
export interface DatabaseTransaction {
  commit(): Promise<void>;
  rollback(): Promise<void>;
  isActive(): boolean;
}

// Type-safe email template
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
  variables: Record<string, any>;
}

// Type-safe file upload
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination?: string;
  filename?: string;
  path?: string;
}

// Type-safe rate limiting
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
  retryAfter?: number;
}

// Type-safe authentication
export interface AuthInfo {
  isAuthenticated: boolean;
  user?: SessionUser;
  permissions?: string[];
  roles?: string[];
}

// Type-safe validation schema
export interface ValidationSchema<T> {
  validate(data: unknown): ValidationResult<T>;
  isValid(data: unknown): data is T;
}

// Type-safe error handling
export interface AppError extends Error {
  code: string;
  statusCode: number;
  isOperational: boolean;
  details?: Record<string, any>;
}

// Type-safe metrics
export interface Metric {
  name: string;
  value: number;
  unit: string;
  tags?: Record<string, string>;
  timestamp: Date;
}

// Type-safe health check
export interface HealthCheck {
  name: string;
  status: "healthy" | "unhealthy" | "degraded";
  responseTime: number;
  lastCheck: Date;
  details?: Record<string, any>;
}

// Type-safe feature flags
export interface FeatureFlag {
  name: string;
  enabled: boolean;
  percentage?: number;
  conditions?: Record<string, any>;
}

// Utility type for making all properties optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Utility type for making all properties required
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Utility type for picking specific properties
export type PickBy<T, K extends keyof T> = Pick<T, K>;

// Utility type for omitting specific properties
export type OmitBy<T, K extends keyof T> = Omit<T, K>;

// Utility type for deep partial
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Utility type for deep required
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
