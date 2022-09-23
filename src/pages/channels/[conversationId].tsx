import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";
import MeLayout from "../../web/layouts/app/me-layout";
import ServerLayout from "../../web/layouts/app/server-layout";

export const execeptionalServerIds = ["@me", "library"];
const ChannelOnlyConversationIdPage = () => {
  const router = useRouter();
  const conversationId = router.query.conversationId as string | undefined;
  const [title, setTitle] = useState("");

  const [serverId, setServerId] = useState<string | null>(null);

  const { data: server } = trpc.useQuery(["server.get-basic-server-details-by-id", { serverId: serverId! }], {
    enabled: Boolean(serverId),
    onSuccess(data) {
      if (!data) {
        router.push("/channels/@me");
        return;
      }
      if (data) {
        setTitle(`Discord | ${data.name}`);
      }
    },
  });

  useEffect(() => {
    if (conversationId && !execeptionalServerIds.includes(conversationId)) {
      setServerId(conversationId);
    }
    if (conversationId && execeptionalServerIds.includes(conversationId)) {
      setTitle(`Discord | ${conversationId}`);
    }
  }, [conversationId]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {conversationId && execeptionalServerIds.includes(conversationId) && (
        <MeLayout serverId={conversationId ?? null} />
      )}
      {conversationId && !execeptionalServerIds.includes(conversationId) && (
        <ServerLayout serverId={conversationId} server={server ?? null} channel={null} />
      )}
    </>
  );
};

export default ChannelOnlyConversationIdPage;
