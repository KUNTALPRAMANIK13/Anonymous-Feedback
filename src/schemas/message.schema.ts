import { z } from "zod";
import { messageSchema as formSchema } from "@/types/forms";

// Re-export the schema from forms types
export const messageSchema = formSchema;

// Export the inferred type
export type MessageSchema = z.infer<typeof messageSchema>;
