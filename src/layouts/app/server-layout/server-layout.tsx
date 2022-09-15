import React from "react";
import ChannelLayout from "../channel-layout";

const ServerLayout: React.FC<{ serverId: string; channelId?: string }> = ({ serverId, channelId }) => {
  return (
    <ChannelLayout
      Sidebar={
        <div className="h-full flex flex-col">
          <div className="flex-0 bg-red-200 h-28">sidebar header</div>
          <div className="flex-1 overflow-y-scroll">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={`server-sidebar-${i}`}>sidebar content</div>
            ))}
          </div>
          <div className="flex-0 bg-discordgray-800 h-16">bottom user stuff</div>
        </div>
      }
    >
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
