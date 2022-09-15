import { z } from "zod";
import { getUserChannelsForServer } from "../functions/server/get-user-channels-for-server";
import { setLastViewedServerChannelForUser } from "../functions/server/set-last-viewed-server-channel-for-user";
import { createProtectedRouter } from "./context";

export const serverRouter = createProtectedRouter()
  .query("get-user-channels-for-server", {
    input: z.object({ serverId: z.string() }),
    resolve: async ({ input: { serverId } }) => {
      return await getUserChannelsForServer(serverId);
    },
  })
  .mutation("set-last-viewed-server-channel-for-user", {
    input: z.object({ serverId: z.string(), channelId: z.string() }),
    resolve: async ({ ctx, input }) => {
      const {
        session: { user },
      } = ctx;
      return await setLastViewedServerChannelForUser({
        userId: user.id,
        serverId: input.serverId,
        channelId: input.channelId,
      });
    },
  });
