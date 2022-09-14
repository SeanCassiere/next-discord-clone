import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import ServerLayout from "../../layouts/app/server-layout";

const ChannelOnlyConversationIdPage = () => {
  const router = useRouter();
  const conversationId = router.query.conversationId as string | undefined;
  return (
    <>
      <Head>
        <title>Channels</title>
      </Head>
      {conversationId && conversationId?.toLowerCase() === "@me" && <div>@me layout</div>}
      {conversationId && conversationId?.toLowerCase() !== "@me" && <ServerLayout serverId={conversationId} />}
    </>
  );
};

export default ChannelOnlyConversationIdPage;
