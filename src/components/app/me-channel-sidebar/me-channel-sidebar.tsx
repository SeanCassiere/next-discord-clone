import React from "react";
import UserPresenceInteractor from "../user-presence-interactor";

const MeChannelSidebar: React.FC<{ activeChannelId?: string }> = ({ activeChannelId }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-0 bg-indigo-200 h-12">@me side header</div>
      <div className="flex-1 overflow-y-scroll text-gray-200">Hello world</div>
      <div className="flex-0 bg-discordgray-800 h-14">
        <UserPresenceInteractor />
      </div>
    </div>
  );
};

export default MeChannelSidebar;
