import { DefaultSession } from "next-auth";
import type { Prisma } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      username: Prisma.UserMinAggregateOutputType["username"];
    } & DefaultSession["user"];
  }
}
