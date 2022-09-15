import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import MeLayout from "../../../layouts/app/me-layout";
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
      {conversationId && conversationId === "@me" && channelId && <MeLayout channelId={channelId} />}
      {conversationId && conversationId !== "@me" && channelId && (
        <ServerLayout serverId={conversationId} channelId={channelId} />
      )}
    </>
  );
};

export default ConversationWithChannelId;
