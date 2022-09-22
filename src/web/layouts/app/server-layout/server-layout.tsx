import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../../../utils/trpc";
import ServerChannelSidebar from "../../../components/app/server-channel-sidebar";
import ChannelLayout from "../channel-layout";

const ServerLayout: React.FC<{ serverId: string; channelId?: string; titleSetter: (title: string) => void }> = ({
  serverId,
  channelId,
  titleSetter,
}) => {
  const router = useRouter();
  const { data: server, status } = trpc.useQuery(["server.get-basic-server-details-by-id", { serverId }], {
    onSuccess(data) {
      if (!data) {
        router.push("/channels/@me");
        return;
      }
    },
  });

  const { data: channel } = trpc.useQuery(
    ["server.get-channel-details-by-id", { serverId, channelId: channelId ?? "" }],
    {
      enabled: Boolean(channelId),
      onSettled: (data, error) => {
        if (!data || error) {
          router.push(`/channels/${serverId}`);
          return;
        }
      },
    }
  );

  if (status === "loading") return null;

  if (!channelId && server) {
    titleSetter(server.name);
  }

  if (channelId && server && channel) {
    titleSetter(`#${channel.name} - ${server.name}`);
  }

  return (
    <ChannelLayout
      Sidebar={<ServerChannelSidebar serverId={serverId} activeChannelId={channelId} serverDetails={server ?? null} />}
    >
      <div className="h-full">
        {channelId ? (
          <ul>
            <li>ServerId: {serverId}</li>
            <li>ChannelId: {channelId}</li>
          </ul>
        ) : (
          <ul className="text-gray-300 text-2xl">
            <li>No Channel Selected</li>
          </ul>
        )}
      </div>
    </ChannelLayout>
  );
};

export default ServerLayout;
