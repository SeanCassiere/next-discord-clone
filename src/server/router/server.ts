import { z } from "zod";
import { createNewServerByUser } from "../functions/server/create-new-server-by-user";
import { getUserChannelsForServer } from "../functions/server/get-user-channels-for-server";
import { setLastViewedServerChannelForUser } from "../functions/server/set-last-viewed-server-channel-for-user";
import { createProtectedRouter } from "./context";

export const serverRouter = createProtectedRouter()
  .query("get-user-channels-for-server", {
    input: z.object({ serverId: z.string() }),
    resolve: async ({ input: { serverId }, ctx }) => {
      const { session } = ctx;
      const { user } = session;

      return await getUserChannelsForServer({ serverId, userId: user.id });
    },
  })
  .mutation("set-last-viewed-server-channel-for-user", {
    input: z.object({ serverId: z.string(), channelId: z.string() }),
    resolve: async ({ ctx, input }) => {
      const { session } = ctx;
      const { user } = session;

      return await setLastViewedServerChannelForUser({
        userId: user.id,
        serverId: input.serverId,
        channelId: input.channelId,
      });
    },
  })
  .mutation("create-new-server-by-user", {
    input: z.object({ name: z.string(), description: z.string().min(0) }),
    resolve: async ({ ctx, input }) => {
      const { session } = ctx;
      const { user } = session;

      return await createNewServerByUser({
        ownerId: user.id,
        name: input.name,
        description: input.description,
      });
    },
  });
