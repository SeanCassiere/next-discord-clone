import { userCheckIfRegistrationIsCompleted } from "../functions/user/check-registration-is-completed";
import { completeUserRegistration } from "../functions/user/complete-user-registration";
import { serverGetServerListForUser } from "../functions/user/get-server-list-for-user";
import { UserService } from "../services/User";
import { CompleteUserRegistrationSchema } from "../validation/user";
import { createProtectedRouter } from "./context";

export const userRouter = createProtectedRouter()
  .query("get-user", {
    resolve: async ({ ctx }) => {
      return await UserService.getUser({ userId: ctx.session.user.id });
    },
  })
  .query("get-server-list-for-user", {
    resolve: async ({ ctx }) => {
      return await serverGetServerListForUser({ userId: ctx.session.user.id });
    },
  })
  .query("check-user-registration-complete", {
    resolve: async ({ ctx }) => {
      return await userCheckIfRegistrationIsCompleted({ userId: ctx.session.user.id });
    },
  })
  .mutation("complete-registration-for-user", {
    input: CompleteUserRegistrationSchema,
    resolve: async ({ ctx, input }) => {
      return await completeUserRegistration({
        username: input.username,
        name: input.name,
        userId: ctx.session.user.id,
      });
    },
  });
