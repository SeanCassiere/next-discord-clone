import { prisma } from "../../db/client";
import { ServerService, ServerService_GetServerListForUserProps } from "../../services/Server";

const SERVER_LIST: {
  id: string;
  image: string | null;
  name: string;
  position: number;
  lastVisitedChannel: string | null;
}[] = [
  {
    id: "a9f9401f9a5c999e3fa716129f8b9398",
    image: null,
    name: "test",
    position: 1,
    lastVisitedChannel: null,
  },
  {
    id: "d26b37fba19944f6a18c8b5fbc833a87",
    image: "https://cdn.discordapp.com/embed/avatars/0.png",
    name: "My Server 2",
    position: 2,
    lastVisitedChannel: null,
  },
  {
    id: "ed0416b3ff30643dd593cb6a1d204349",
    image: null,
    name: "My Server 3",
    position: 3,
    lastVisitedChannel: null,
  },
  {
    id: "7a4b2e2dd77d9fa805caf8438ef0821d",
    image: null,
    name: "DarkCry",
    position: 4,
    lastVisitedChannel: null,
  },
  {
    id: "1f45ca7976b1af9481cd516c17e3dfff",
    image: "https://cdn.discordapp.com/icons/531166470579814420/a_04e82454e8b3db04b42ad09d6a161ca3.webp?size=96",
    name: "Formula 1",
    position: 5,
    lastVisitedChannel: null,
  },
];

export async function setLastVisitedForChannel({ serverId, channelId }: { serverId: string; channelId: string }) {
  const serverIndex = SERVER_LIST.findIndex((server) => server.id === serverId);

  try {
    if (serverIndex === -1) return false;
    const server = SERVER_LIST[serverIndex];
    if (serverIndex >= 0 && server) {
      (SERVER_LIST[serverIndex] as any).lastVisitedChannel = channelId;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function serverGetServerListForUser(props: ServerService_GetServerListForUserProps) {
  return await ServerService.getServerListForUser(props);
}

export async function getServersForUser(userId: string) {
  console.log("userId", userId, "\n\n");
  const servers = await prisma.serverConnection.findMany({ where: { userId }, include: { server: true } });
  console.log("servers", servers);
  // return servers;
}
