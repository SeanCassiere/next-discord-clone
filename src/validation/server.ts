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

export const CreateServerInviteLinkSchema = z.object({
  serverId: z.string(),
  expiresIn: z.enum(["1-day", "7-days", "30-days", "never"]),
});

export const JoinUsingInviteCodeSchema = z.object({
  inviteCode: z.string(),
});
