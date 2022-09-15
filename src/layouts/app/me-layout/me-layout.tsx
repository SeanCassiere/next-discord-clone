import React from "react";
import ChannelLayout from "../channel-layout";

const MeLayout: React.FC<{ channelId?: string }> = ({ channelId }) => {
  return (
    <ChannelLayout Sidebar={<div className="h-full">Sidebar</div>}>
      <div className="h-full">
        <ul>
          <li>@me dashboard</li>
          <li>ChannelId: {channelId}</li>
        </ul>
      </div>
    </ChannelLayout>
  );
};

export default MeLayout;
