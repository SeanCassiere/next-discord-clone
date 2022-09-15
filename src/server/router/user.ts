import { serverGetServerListForUser } from "../functions/server/get-server-list-for-user";
import { createProtectedRouter } from "./context";

export const userRouter = createProtectedRouter().query("get-server-list-for-user", {
  resolve: async ({ ctx }) => {
    const {
      session: { user },
    } = ctx;
    return await serverGetServerListForUser(user.id);
  },
});
