import React from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { Disclosure, Popover, Transition } from "@headlessui/react";

import { trpc, inferQueryOutput } from "../../../../utils/trpc";
import UserPresenceInteractor from "../user-presence-interactor";
import ServerChannelDefaultIcon from "../icons/server-channel-default";
import ServerChannelProtectedIcon from "../icons/server-channel-protected";
import ServerChannelAnnouncementIcon from "../icons/server-channel-announcement";
import ServerExitIcon from "../icons/server-exit";
import PencilIcon from "../icons/pencil";
import ChevronDownIcon from "../icons/chevron-down";
import SettingsCog from "../icons/settings-cog";
import TimesIcon from "../icons/times";
import PersonPlusIcon from "../icons/person-plus";
import { useSettingsScreenStore } from "../../../hooks/stores/useSettingsScreenStore";

const HeaderDivider = () => (
  <hr className="bg-discordgray-800 border border-discordgray-800 rounded-full my-1" aria-hidden="true" />
);
const HeaderOption: React.FC<
  { children: React.ReactNode } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, ...props }) => (
  <button className={classNames("my-0.5", "px-1", "w-full", "text-xs", "font-medium")} {...props}>
    {children}
  </button>
);

export type ServerBasicDetails = inferQueryOutput<"server.get-basic-server-details-by-id">;

const ServerChannelSidebar: React.FC<{
  serverId: string;
  activeChannelId?: string;
  serverDetails: ServerBasicDetails;
}> = ({ serverId, activeChannelId, serverDetails }) => {
  const router = useRouter();
  const trpcUtils = trpc.useContext();

  const { toggleSettingsDialog } = useSettingsScreenStore();

  const { data } = trpc.useQuery(["server.get-user-channels-for-server", { serverId }], { refetchInterval: 60000 }); // refetch every 60 seconds
  const { mutate: storeViewedChannelForServer } = trpc.useMutation(["server.set-last-viewed-server-channel-for-user"]);

  const onClickChannel = (channelId: string) => {
    storeViewedChannelForServer(
      { serverId, channelId },
      {
        onSettled: () => {
          trpcUtils.invalidateQueries(["user.get-server-list-for-user"]);
        },
      }
    );
    router.push(`/channels/${serverId}/${channelId}`);
  };

  return (
    <div className="h-full flex flex-col">
      <Popover className="relative select-none">
        {({ open: serverMenuOpen }) => (
          <>
            <Popover.Button className="flex-0 w-full h-12 text-white bg-discordgray-800 hover:bg-discordgray-700 border-b border-b-discordgray-900 px-4 outline-none focus:outline-none">
              <div className="h-full flex justify-between items-center">
                <h1 className="text-lg">{serverDetails?.name}</h1>
                <span className="font-mono">{serverMenuOpen ? <TimesIcon /> : <ChevronDownIcon />}</span>
              </div>
            </Popover.Button>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute top-full shadow-md left-2.5 right-2.5 mt-2 bg-discordgray-900 rounded-sm p-2">
                <HeaderOption
                  onClick={() =>
                    toggleSettingsDialog(true, {
                      initialScreen: "overview",
                      subScreen: null,
                      context: "server",
                      contextReference: serverDetails?.id ?? null,
                    })
                  }
                >
                  <div className="flex justify-between items-center rounded-sm px-2 py-1.5 transition-all duration-150 bg-discordgray-900 hover:bg-indigo-600 text-gray-300 hover:text-white">
                    <span>Edit server</span>
                    <span>
                      <PencilIcon />
                    </span>
                  </div>
                </HeaderOption>
                <HeaderDivider />
                <HeaderOption>
                  <div className="flex justify-between items-center rounded-sm px-2 py-1.5 transition-all duration-150 bg-discordgray-900 hover:bg-red-600 text-red-500 hover:text-white">
                    <span>Leave server</span>
                    <span>
                      <ServerExitIcon />
                    </span>
                  </div>
                </HeaderOption>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <div className="flex-1 overflow-y-scroll text-gray-200 small-scroller channel-bar">
        {data && data.channels.filter((c) => c.parent === null).length > 0 && (
          <div className="ml-2 mr-0.5 my-5">
            <ul className="ml-0">
              {data.channels
                .filter((c) => c.parent === null)
                .map((channel) => (
                  <ChannelLink
                    serverId={serverId}
                    key={channel.id}
                    keyId={channel.id}
                    channel={channel}
                    active={channel.id === activeChannelId}
                    onClick={onClickChannel}
                  />
                ))}
            </ul>
          </div>
        )}

        {data &&
          data.parents.map((parent) => (
            <div key={parent.id} className="ml-2 mr-1 my-5">
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="uppercase font-semibold text-xs select-none flex items-center">
                      {open ? <>&equiv;</> : <>&ne;</>}&nbsp;{parent.name}
                    </Disclosure.Button>
                    <Disclosure.Panel as="ul" className="ml-0">
                      {data.channels
                        .filter((p) => p.parent === parent.id)
                        .map((channel) => (
                          <ChannelLink
                            serverId={serverId}
                            key={channel.id}
                            keyId={channel.id}
                            channel={channel}
                            active={channel.id === activeChannelId}
                            onClick={onClickChannel}
                          />
                        ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        {data && data.channels.length === 0 && <div className="text-center pt-4">No channels</div>}
      </div>
      <div className="flex-0 h-14">
        <UserPresenceInteractor />
      </div>
    </div>
  );
};

type ChannelType = inferQueryOutput<"server.get-user-channels-for-server">["channels"][0];

const ChannelLink = ({
  serverId,
  channel,
  keyId,
  active,
  onClick,
}: {
  serverId: string;
  channel: ChannelType;
  keyId: string;
  active: boolean;
  onClick: (channelId: string) => void;
}) => {
  const { toggleSettingsDialog } = useSettingsScreenStore();
  const { mutate: createInviteLink } = trpc.useMutation(["server.create-invite-link-for-server"], {
    onSuccess: (data) => {
      if (data) {
        navigator.clipboard.writeText(`${window.location.origin}/invite/${data.code}`);
        console.log("Invite code", data.code);
      }
    },
  });
  return (
    <li
      key={keyId}
      className={classNames(
        "cursor-pointer",
        "my-1",
        // "p-2",
        "rounded",
        "flex",
        "items-center",
        "text-sm",
        "font-medium",
        "transition-all",
        "duration-100",
        "select-none",
        {
          "text-white": active,
          "hover:text-gray-300": active,
          "bg-discordgray-600": active,
          "text-gray-400": !active,
          "hover:text-gray-200": !active,
        },
        {
          group: !active,
        }
      )}
    >
      <div onClick={() => onClick(channel.id)} className="pl-2 py-2 flex-1 flex items-center">
        <span>
          {channel.iconType === "server-channel-default" && <ServerChannelDefaultIcon />}
          {channel.iconType === "server-channel-protected" && <ServerChannelProtectedIcon />}
          {channel.iconType === "server-channel-announcements" && <ServerChannelAnnouncementIcon />}
        </span>
        <span>&nbsp;{channel.name}</span>
      </div>
      <div
        className={classNames("mt-0.5", "pr-2", "py-2", "flex", "items-center", "gap-1.5", {
          "opacity-0": !active,
          "group-hover:opacity-100": !active,
        })}
      >
        <button
          type="button"
          onClick={() => {
            createInviteLink({ serverId, expiresIn: "7-days" });
          }}
        >
          <PersonPlusIcon />
        </button>
        <button
          type="button"
          onClick={() => {
            toggleSettingsDialog(true, {
              initialScreen: "overview",
              subScreen: null,
              context: "channel",
              contextReference: channel.id,
            });
          }}
        >
          <SettingsCog width="14" height="14" />
        </button>
      </div>
    </li>
  );
};

export default ServerChannelSidebar;
