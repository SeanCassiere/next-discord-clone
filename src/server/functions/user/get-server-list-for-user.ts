import { ServerService, ServerService_GetServerListForUserProps } from "../../services/Server";

export async function serverGetServerListForUser(props: ServerService_GetServerListForUserProps) {
  return await ServerService.getServerListForUser(props);
}
