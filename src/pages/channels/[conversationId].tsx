import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import MeLayout from "../../web/layouts/app/me-layout";
import ServerLayout from "../../web/layouts/app/server-layout";

const ChannelOnlyConversationIdPage = () => {
  const router = useRouter();
  const conversationId = router.query.conversationId as string | undefined;
  const [title, setTitle] = useState("");
  const titleSetter = useCallback((value: string) => setTitle(value), []);
  return (
    <>
      <Head>
        <title>Discord | {title}</title>
      </Head>
      {conversationId && conversationId?.toLowerCase() === "@me" && <MeLayout titleSetter={titleSetter} />}
      {conversationId && conversationId?.toLowerCase() !== "@me" && (
        <ServerLayout serverId={conversationId} titleSetter={titleSetter} />
      )}
    </>
  );
};

export default ChannelOnlyConversationIdPage;
