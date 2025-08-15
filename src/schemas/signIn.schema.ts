import { z } from "zod";
import { signInSchema as formSchema } from "@/types/forms";

// Re-export the schema from forms types
export const signInSchema = formSchema;

// Export the inferred type
export type SignInSchema = z.infer<typeof signInSchema>;
