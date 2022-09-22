import { z } from "zod";

export const serverNameValidation = z
  .string()
  .min(2, "Name must contain at least 2 character(s)")
  .max(32, "Name must be less than 32 character(s)");

export const CreateServerRegistrationSchema = z.object({
  name: serverNameValidation,
  serverType: z.enum(["PUBLIC", "PRIVATE"]),
  description: z.string().default(""),
});
