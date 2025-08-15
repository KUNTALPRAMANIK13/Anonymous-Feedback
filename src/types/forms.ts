import { z } from "zod";

// Form schemas
export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password should contain at least one capital letter, one number, and one special character"
    ),
});

export const signInSchema = z.object({
  identifier: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(300, { message: "Content must be no longer than 300 characters" }),
});

export const verifySchema = z.object({
  code: z
    .string()
    .length(6, { message: "Verification code must be exactly 6 digits" })
    .regex(/^\d{6}$/, "Verification code must contain only digits"),
});

export const acceptMessageSchema = z.object({
  acceptMessage: z.boolean(),
});

export const checkEmailForForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password should contain at least one capital letter, one number, and one special character"
    ),
});

// Inferred types from schemas
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type VerifyFormData = z.infer<typeof verifySchema>;
export type AcceptMessageFormData = z.infer<typeof acceptMessageSchema>;
export type CheckEmailFormData = z.infer<typeof checkEmailForForgotPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Form validation states
export interface FormValidationState {
  isValid: boolean;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
}

// Form submission states
export interface FormSubmissionState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  success: string | null;
}
