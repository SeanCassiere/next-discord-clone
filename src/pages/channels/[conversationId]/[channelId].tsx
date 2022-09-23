import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import MeLayout from "../../../web/layouts/app/me-layout";
import ServerLayout from "../../../web/layouts/app/server-layout";
import { execeptionalServerIds } from "../[conversationId]";

const ConversationWithChannelId = () => {
  const router = useRouter();
  const conversationId = router.query.conversationId as string | undefined;
  const channelId = router.query.channelId as string | undefined;

  const [serverId, setServerId] = useState<string | null>(null);

  const [title, setTitle] = useState("");

  const { data: server } = trpc.useQuery(["server.get-basic-server-details-by-id", { serverId: serverId! }], {
    enabled: Boolean(serverId),
    onSuccess(data) {
      if (!data) {
        router.push("/channels/@me");
        return;
      }
      if (data && !channelId) {
        setTitle(`Discord | ${data.name}`);
      }
    },
  });

  useEffect(() => {
    if (conversationId && !execeptionalServerIds.includes(conversationId)) {
      setServerId(conversationId);
    }
    if (conversationId && execeptionalServerIds.includes(conversationId)) {
      setTitle(`Discord | ${channelId}`);
    }
  }, [channelId, conversationId]);

  const { data: channel } = trpc.useQuery(
    ["server.get-channel-details-by-id", { serverId: serverId!, channelId: channelId ?? "" }],
    {
      enabled: Boolean(serverId) && Boolean(channelId),
      onSettled: (data, error) => {
        if (!data || error) {
          router.push(`/channels/${serverId}`);
          return;
        }
        if (channelId && server && data) {
          setTitle(`Discord | #${data.name} - ${server.name}`);
        }
      },
    }
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {conversationId && execeptionalServerIds.includes(conversationId) && channelId && (
        <MeLayout serverId={conversationId ?? null} channelId={channelId} />
      )}
      {conversationId && !execeptionalServerIds.includes(conversationId) && channelId && (
        <ServerLayout serverId={conversationId} server={server ?? null} channel={channel ?? null} />
      )}
    </>
  );
};

export default ConversationWithChannelId;
