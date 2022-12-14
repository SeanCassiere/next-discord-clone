// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import superjson from "superjson";
import Head from "next/head";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import type { AppRouter } from "../server/router";
import "../web/styles/globals.css";

import PersistentAppWrapper from "../web/layouts/app/persistent-app-wrapper";
import { useMemo } from "react";
import { useRouter } from "next/router";

const appRoutes = ["/channels", "/guilds"];

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();
  const isAppRoute = useMemo(() => {
    for (const route of appRoutes) {
      if (router.route.includes(route)) {
        return true;
      }
    }
    return false;
  }, [router.route]);

  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="description" content="Discord clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isAppRoute && (
        <PersistentAppWrapper>
          <Component {...pageProps} />
        </PersistentAppWrapper>
      )}
      {!isAppRoute && <Component {...pageProps} />}
    </SessionProvider>
  );
};

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      // headers: () => {
      //   if (ctx?.req) {
      //     const headers = ctx?.req?.headers;
      //     delete headers?.connection;
      //     return {
      //       ...headers,
      //       "x-ssr": "1",
      //     };
      //   }
      //   return {};
      // }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
