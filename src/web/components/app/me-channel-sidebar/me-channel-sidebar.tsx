import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import UserPresenceInteractor from "../user-presence-interactor";

const MeChannelSidebar: React.FC<{ serverId: string | null; activeChannelId?: string }> = ({
  activeChannelId,
  serverId,
}) => {
  const router = useRouter();
  const click = (id: string) => {
    router.push("/channels" + id);
  };
  return (
    <div className="h-full flex flex-col">
      <div className="flex-0 h-12 py-2.5 px-2.5 text-white bg-discordgray-800 border-b border-b-discordgray-900">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            className="h-7 w-full rounded bg-discordgray-900 text-sm text-discordgray-400 font-medium border border-discordgray-900"
            placeholder="Find or start a conversation"
          />
        </form>
      </div>
      <div className="flex-1 overflow-y-scroll text-gray-200 p-2 flex flex-col gap-0.5 small-scroller channel-bar">
        <SidebarOptionContainer selected={serverId === "@me" && !activeChannelId} onClick={() => click("/@me")}>
          Friends
        </SidebarOptionContainer>
        <SidebarOptionContainer selected={serverId === "library"} onClick={() => click("/library")}>
          Library
        </SidebarOptionContainer>
        <SidebarOptionContainer
          selected={serverId === "@me" && activeChannelId === "steam"}
          onClick={() => click("/@me/steam")}
        >
          Steam
        </SidebarOptionContainer>
      </div>
      <div className="flex-0 h-14">
        <UserPresenceInteractor />
      </div>
    </div>
  );
};

const SidebarOptionContainer: React.FC<
  { children: React.ReactNode; selected?: boolean } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ children, selected, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames(
        "px-4",
        "py-2.5",
        "rounded",
        "cursor-pointer",
        "select-none",
        "text-base",
        {
          "bg-discordgray-600": selected,
        },
        { "hover:bg-discordgray-700": !selected }
      )}
    >
      {children}
    </div>
  );
};

export default MeChannelSidebar;
