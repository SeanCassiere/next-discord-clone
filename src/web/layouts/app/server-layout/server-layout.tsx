import React from "react";
import ServerChannelSidebar from "../../../components/app/server-channel-sidebar";
import ChannelLayout from "../channel-layout";

const ServerLayout: React.FC<{ serverId: string; channelId?: string }> = ({ serverId, channelId }) => {
  return (
    <ChannelLayout Sidebar={<ServerChannelSidebar serverId={serverId} activeChannelId={channelId} />}>
      <div className="h-full">
        <ul>
          <li>ServerId: {serverId}</li>
          <li>ChannelId: {channelId}</li>
        </ul>
      </div>
    </ChannelLayout>
  );
};

export default ServerLayout;
