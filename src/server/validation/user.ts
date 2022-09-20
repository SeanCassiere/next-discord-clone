import { z } from "zod";

export const CompleteUserRegistrationSchema = z.object({
  name: z
    .string({ description: "Name" })
    .min(2, "Name must contain at least 2 character(s)")
    .max(45, "Name must be less than 45 character(s)"),
  username: z
    .string({ description: "Username" })
    .min(4, "Username must contain at least 4 character(s)")
    .max(20, "Username must be less than 45 character(s)"),
});
