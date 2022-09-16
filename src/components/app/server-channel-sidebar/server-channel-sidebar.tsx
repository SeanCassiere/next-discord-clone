import React from "react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import UserPresenceInteractor from "../user-presence-interactor";

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
      <div className="flex-1 overflow-y-scroll text-gray-200">
        {data &&
          data.parents.map((parent) => (
            <div key={parent.id} className="mx-4 my-5">
              <h3 className="uppercase font-semibold">&nbsp;&nbsp;{parent.name}</h3>
              {data.channels
                .filter((p) => p.parent === parent.id)
                .map((channel) => (
                  <li
                    key={channel.id}
                    className="cursor-pointer my-2"
                    onClick={() => onClickChannel(channel.id)}
                    style={{ color: channel.id === activeChannelId ? "aqua" : undefined }}
                  >
                    {channel.name}
                  </li>
                ))}
            </div>
          ))}
      </div>
      <div className="flex-0 bg-discordgray-800 h-14">
        <UserPresenceInteractor />
      </div>
    </div>
  );
};

export default ServerChannelSidebar;
