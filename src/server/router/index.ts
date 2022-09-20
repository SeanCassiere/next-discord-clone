// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { userRouter } from "./user";
import { serverRouter } from "./server";
import { errorFormatter } from "../../utils/error";

export const appRouter = createRouter()
  .transformer(superjson)
  .formatError(errorFormatter)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("user.", userRouter)
  .merge("server.", serverRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
