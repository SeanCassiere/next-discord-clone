import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import ServerLayout from "../../../layouts/app/server-layout";

const ConversationWithChannelId = () => {
  const router = useRouter();
  const conversationId = router.query.conversationId as string | undefined;
  const channelId = router.query.channelId as string | undefined;
  return (
    <>
      <Head>
        <title>
          {conversationId} # {channelId}
        </title>
      </Head>
      {conversationId && channelId && <ServerLayout serverId={conversationId} channelId={channelId} />}
    </>
  );
};

export default ConversationWithChannelId;
