import { ServerService, ServerService_SetLastVisitedChannelForServer } from "../../services/Server";

export async function setLastViewedServerChannelForUser(props: ServerService_SetLastVisitedChannelForServer) {
  return await ServerService.setLastVisitedChannelForServer(props);
}
