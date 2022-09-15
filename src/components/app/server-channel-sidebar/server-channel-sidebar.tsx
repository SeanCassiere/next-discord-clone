import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../../utils/trpc";

const ServerChannelSidebar: React.FC<{ serverId: string }> = ({ serverId }) => {
  const router = useRouter();
  const { data } = trpc.useQuery(["server.get-user-channels-for-server", { serverId }]);
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
                    onClick={() => router.push(`/channels/${serverId}/${channel.id}`)}
                  >
                    {channel.name}
                  </li>
                ))}
            </div>
          ))}
      </div>
      <div className="flex-0 bg-discordgray-800 h-16">bottom user stuff</div>
    </div>
  );
};

export default ServerChannelSidebar;
