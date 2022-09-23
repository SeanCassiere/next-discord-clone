import React from "react";
import MeChannelSidebar from "../../../components/app/me-channel-sidebar";
import CommonSidebarLayout from "../common-sidebar-layout";

const MeLayout: React.FC<{ channelId?: string; serverId: string | null }> = ({ channelId, serverId }) => {
  return (
    <CommonSidebarLayout Sidebar={<MeChannelSidebar serverId={serverId} activeChannelId={channelId} />}>
      <div className="h-full">
        <ul>
          <li>@me dashboard</li>
          <li>ChannelId: {channelId}</li>
        </ul>
      </div>
    </CommonSidebarLayout>
  );
};

export default MeLayout;
