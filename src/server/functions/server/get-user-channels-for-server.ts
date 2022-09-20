import { ServerService, ServerService_GetUserChannelsForServerProps } from "../../services/Server";

export async function getUserChannelsForServer(props: ServerService_GetUserChannelsForServerProps) {
  return await ServerService.getUserChannelsForServer(props);
}
