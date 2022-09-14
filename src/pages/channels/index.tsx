import React from "react";
import { useSession, signIn } from "next-auth/react";
import Head from "next/head";

const ChannelsIndexPage = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated" || !session) signIn();

  return (
    <>
      <Head>
        <title>Channels</title>
      </Head>
      <main>
        <h1>Channel page</h1>
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </main>
    </>
  );
};

export default ChannelsIndexPage;
