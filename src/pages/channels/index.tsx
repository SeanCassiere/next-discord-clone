import React from "react";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

const ChannelsIndexPage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated" || !session) signIn();
  if (status === "authenticated" && session) {
    router.push("/channels/@me");
  }

  return (
    <>
      <Head>
        <title>Channels</title>
      </Head>
      <main></main>
    </>
  );
};

export default ChannelsIndexPage;
