import React from "react";

const ServerLayout: React.FC<{ serverId: string; channelId?: string }> = ({ serverId, channelId }) => {
  return (
    <div>
      <h1>server layout</h1>
      <ul>
        <li>ServerId: {serverId}</li>
        <li>ChannelId: {channelId}</li>
      </ul>
    </div>
  );
};

export default ServerLayout;
