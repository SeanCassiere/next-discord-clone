import React from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getBaseUrl } from "../../../../pages/_app";

const MarketingNavbar = () => {
  const { status } = useSession();
  const router = useRouter();
  return (
    <div className="container mx-auto max-w-6xl">
      <nav className="flex justify-between py-5">
        <div>
          <Link href="/">Discord Clone</Link>
        </div>
        <div>
          <button
            type="button"
            className="px-4 py-2 bg-white text-gray-700 rounded-full"
            onClick={() =>
              status !== "loading" && status === "authenticated"
                ? router.push("/channels/@me")
                : signIn(undefined, {
                    callbackUrl: `${getBaseUrl()}/channels/@me`,
                  })
            }
          >
            {status !== "loading" && status === "authenticated" ? "Open App" : "Log In"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MarketingNavbar;
