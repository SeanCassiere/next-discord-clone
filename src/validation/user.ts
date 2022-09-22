import { z } from "zod";

const usernameValidation = z
  .string({ description: "Username" })
  .regex(new RegExp(/^[a-zA-Z0-9]+$/), "Should not contain special characters")
  .min(4, "Username must contain at least 4 character(s)")
  .max(20, "Username must be less than 20 character(s)");

export const CompleteUserRegistrationSchema = z.object({
  name: z
    .string({ description: "Name" })
    .min(2, "Name must contain at least 2 character(s)")
    .max(45, "Name must be less than 45 character(s)"),
  username: usernameValidation,
});

export const messageMaxLength = 25;

export const SetUserPublicMessageSchema = z.object({
  message: z
    .string({ description: "message" })
    .min(1, "Message must contain at least 1 character(s)")
    .max(messageMaxLength, `Message must be less than ${messageMaxLength} character(s)`)
    .nullable(),
});
