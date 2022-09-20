import React from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import { Disclosure } from "@headlessui/react";

import { trpc, inferQueryOutput } from "../../../../utils/trpc";
import UserPresenceInteractor from "../user-presence-interactor";
import ServerChannelDefaultIcon from "../icons/server-channel-default";
import ServerChannelProtectedIcon from "../icons/server-channel-protected";
import ServerChannelAnnouncementIcon from "../icons/server-channel-announcement";

const ServerChannelSidebar: React.FC<{ serverId: string; activeChannelId?: string }> = ({
  serverId,
  activeChannelId,
}) => {
  const router = useRouter();
  const trpcUtils = trpc.useContext();
  const { data } = trpc.useQuery(["server.get-user-channels-for-server", { serverId }]);
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
      <div className="flex-0 bg-red-200 h-12">sidebar header</div>
      <div className="flex-1 overflow-y-scroll text-gray-200 small-scroller channel-bar">
        {data && data.channels.filter((c) => c.parent === null).length > 0 && (
          <div className="mx-2 my-5">
            <ul className="ml-1.5">
              {data.channels
                .filter((c) => c.parent === null)
                .map((channel) => (
                  <ChannelLink
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
            <div key={parent.id} className="mx-2 my-5">
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="uppercase font-semibold text-xs select-none flex items-center">
                      {open ? <>&equiv;</> : <>&ne;</>}&nbsp;{parent.name}
                    </Disclosure.Button>
                    <Disclosure.Panel as="ul" className="ml-1.5">
                      {data.channels
                        .filter((p) => p.parent === parent.id)
                        .map((channel) => (
                          <ChannelLink
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
  channel,
  keyId,
  active,
  onClick,
}: {
  channel: ChannelType;
  keyId: string;
  active: boolean;
  onClick: (channelId: string) => void;
}) => {
  return (
    <li
      key={keyId}
      className={cn(
        "cursor-pointer",
        "my-2",
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
          "text-gray-400": !active,
          "hover:text-gray-200": !active,
        }
      )}
      onClick={() => onClick(channel.id)}
    >
      <span>
        {channel.iconType === "server-channel-default" && <ServerChannelDefaultIcon />}
        {channel.iconType === "server-channel-protected" && <ServerChannelProtectedIcon />}
        {channel.iconType === "server-channel-announcements" && <ServerChannelAnnouncementIcon />}
      </span>
      |&nbsp;{channel.name}
    </li>
  );
};

export default ServerChannelSidebar;
