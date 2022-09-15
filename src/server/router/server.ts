import { z } from "zod";
import { getUserChannelsForServer } from "../functions/server/get-user-channels-for-server";
import { createProtectedRouter } from "./context";

export const serverRouter = createProtectedRouter().query("get-user-channels-for-server", {
  input: z.object({ serverId: z.string() }),
  resolve: async ({ input: { serverId } }) => {
    return await getUserChannelsForServer(serverId);
  },
});
