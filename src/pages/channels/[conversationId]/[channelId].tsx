import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import MeLayout from "../../../web/layouts/app/me-layout";
import ServerLayout from "../../../web/layouts/app/server-layout";

const ConversationWithChannelId = () => {
  const router = useRouter();
  const conversationId = router.query.conversationId as string | undefined;
  const channelId = router.query.channelId as string | undefined;

  const [title, setTitle] = useState("");
  const titleSetter = useCallback((value: string) => setTitle(value), []);
  return (
    <>
      <Head>
        <title>Discord | {title}</title>
      </Head>
      {conversationId && conversationId === "@me" && channelId && (
        <MeLayout channelId={channelId} titleSetter={titleSetter} />
      )}
      {conversationId && conversationId !== "@me" && channelId && (
        <ServerLayout serverId={conversationId} channelId={channelId} titleSetter={titleSetter} />
      )}
    </>
  );
};

export default ConversationWithChannelId;
