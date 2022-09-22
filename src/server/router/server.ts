import { z } from "zod";
import { CreateServerRegistrationSchema } from "../../validation/server";
import { createNewServerByUser } from "../functions/server/create-new-server-by-user";
import { getBasicServerDetailsById } from "../functions/server/get-basic-server-details-by-id";
import { getChannelDetailsById } from "../functions/server/get-channel-details-by-id";
import { getUserChannelsForServer } from "../functions/server/get-user-channels-for-server";
import { setLastViewedServerChannelForUser } from "../functions/server/set-last-viewed-server-channel-for-user";
import { createProtectedRouter } from "./context";

export const serverRouter = createProtectedRouter()
  .query("get-user-channels-for-server", {
    input: z.object({ serverId: z.string() }),
    resolve: async ({ input, ctx }) => {
      const { session } = ctx;
      const { user } = session;

      return await getUserChannelsForServer({ serverId: input.serverId, userId: user.id });
    },
  })
  .query("get-basic-server-details-by-id", {
    input: z.object({ serverId: z.string() }),
    resolve: async ({ ctx, input }) => {
      const { session } = ctx;
      const { user } = session;

      return await getBasicServerDetailsById({ serverId: input.serverId, userId: user.id });
    },
  })
  .query("get-channel-details-by-id", {
    input: z.object({ serverId: z.string(), channelId: z.string() }),
    resolve: async ({ ctx, input }) => {
      const { session } = ctx;
      const { user } = session;

      return await getChannelDetailsById({ serverId: input.serverId, channelId: input.channelId, userId: user.id });
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
    input: CreateServerRegistrationSchema,
    resolve: async ({ ctx, input }) => {
      const { session } = ctx;
      const { user } = session;

      return await createNewServerByUser({
        ownerId: user.id,
        name: input.name,
        description: input.description,
        serverType: input.serverType,
      });
    },
  });
