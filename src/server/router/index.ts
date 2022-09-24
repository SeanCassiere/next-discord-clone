// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { errorFormatter } from "../../utils/error";
import { authRouter } from "./auth-router";
import { userRouter } from "./user";
import { serverRouter } from "./server";
import { serverAdminRouter } from "./server-admin";

export const appRouter = createRouter()
  .transformer(superjson)
  .formatError(errorFormatter)
  .merge("auth.", authRouter)
  .merge("user.", userRouter)
  .merge("server.", serverRouter)
  .merge("server-admin.", serverAdminRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
