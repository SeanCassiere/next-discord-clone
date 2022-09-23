import React from "react";

import { inferQueryOutput } from "../../../../utils/trpc";
import { ServerBasicDetails } from "../../../components/app/server-channel-sidebar/server-channel-sidebar";
import ServerChannelSidebar from "../../../components/app/server-channel-sidebar";
import CommonSidebarLayout from "../common-sidebar-layout";

export type ChannelDetailsById = inferQueryOutput<"server.get-channel-details-by-id">;

const ServerLayout: React.FC<{
  serverId: string;
  server: ServerBasicDetails | null;
  channel: ChannelDetailsById | null;
}> = ({ serverId, server, channel }) => {
  return (
    <CommonSidebarLayout
      Sidebar={
        <ServerChannelSidebar
          serverId={serverId}
          activeChannelId={channel?.id ?? undefined}
          serverDetails={server ?? null}
        />
      }
    >
      <div className="h-full">
        {channel ? (
          <ul>
            <li>ServerId: {serverId}</li>
            <li>ChannelId: {channel.id}</li>
          </ul>
        ) : (
          <ul className="text-gray-300 text-2xl">
            <li>No Channel Selected</li>
          </ul>
        )}
      </div>
    </CommonSidebarLayout>
  );
};

export default ServerLayout;
