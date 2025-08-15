import { Message } from "@/models/Messages.model";

// Base API Response interface
export interface ApiResponse {
  success: boolean;
  message: string;
}

// Specific API Response types
export interface AuthApiResponse extends ApiResponse {
  emailError?: string;
}

export interface MessageApiResponse extends ApiResponse {
  messages?: Array<Message>;
}

export interface AcceptMessageApiResponse extends ApiResponse {
  isAcceptingMessages?: boolean;
}

export interface UsernameCheckApiResponse extends ApiResponse {
  isUnique?: boolean;
}

export interface SuggestMessagesApiResponse extends ApiResponse {
  suggestions?: string[];
  error?: string;
}

// Error response type
export interface ErrorApiResponse extends ApiResponse {
  error?: string;
  stack?: string;
}

// Generic success response
export interface SuccessApiResponse extends ApiResponse {
  data?: any;
}

// User-related API responses
export interface UserApiResponse extends ApiResponse {
  user?: {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isAcceptMessage: boolean;
  };
}

// Verification API responses
export interface VerificationApiResponse extends ApiResponse {
  status?: boolean;
}

// Password change API response
export interface PasswordChangeApiResponse extends ApiResponse {
  email?: string;
}

// Recruiter API response
export interface RecruiterApiResponse extends ApiResponse {
  sessionToken?: string;
}

// Union type for all possible API responses
export type AnyApiResponse = 
  | AuthApiResponse 
  | MessageApiResponse 
  | AcceptMessageApiResponse 
  | UsernameCheckApiResponse 
  | SuggestMessagesApiResponse 
  | ErrorApiResponse 
  | SuccessApiResponse 
  | UserApiResponse 
  | VerificationApiResponse 
  | PasswordChangeApiResponse 
  | RecruiterApiResponse;
