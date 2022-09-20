import React from "react";
import MeChannelSidebar from "../../../components/app/me-channel-sidebar";
import ChannelLayout from "../channel-layout";

const MeLayout: React.FC<{ channelId?: string }> = ({ channelId }) => {
  return (
    <ChannelLayout Sidebar={<MeChannelSidebar activeChannelId={channelId} />}>
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
