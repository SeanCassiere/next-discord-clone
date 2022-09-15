import { setLastVisitedForChannel } from "../user/get-server-list-for-user";

export async function setLastViewedServerChannelForUser({
  serverId,
  channelId,
}: {
  userId: string;
  serverId: string;
  channelId: string;
}) {
  return await setLastVisitedForChannel({ serverId, channelId });
}
