import { z } from "zod";
import { ownerDeleteServerById } from "../functions/server-admin/owner-delete-server-by-id";
import { ownerOrAdminDeleteChannelById } from "../functions/server-admin/owner-or-admin-delete-channel-by-id";
import { createProtectedRouter } from "./context";

export const serverAdminRouter = createProtectedRouter()
  .mutation("owner-or-admin-delete-channel-by-id", {
    input: z.object({ channelId: z.string() }),
    resolve: async ({ ctx, input }) => {
      return await ownerOrAdminDeleteChannelById({ userId: ctx.session.user.id, channelId: input.channelId });
    },
  })
  .mutation("owner-delete-server-by-id", {
    input: z.object({ serverId: z.string() }),
    resolve: async ({ ctx, input }) => {
      return await ownerDeleteServerById({ userId: ctx.session.user.id, serverId: input.serverId });
    },
  });
