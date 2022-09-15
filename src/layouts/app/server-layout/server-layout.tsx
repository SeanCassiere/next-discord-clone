import React from "react";
import ChannelLayout from "../channel-layout";

const ServerLayout: React.FC<{ serverId: string; channelId?: string }> = ({ serverId, channelId }) => {
  return (
    <ChannelLayout Sidebar={<div className="h-full">Sidebar</div>}>
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
