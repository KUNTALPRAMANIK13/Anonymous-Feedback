import { z } from "zod";
import { signUpSchema as formSchema } from "@/types/forms";

// Re-export the schema from forms types
export const signUpSchema = formSchema;

// Export the username validation separately for backward compatibility
export const usernameValidation = signUpSchema.shape.username;

// Export the inferred type
export type SignUpSchema = z.infer<typeof signUpSchema>;
