import { ServerService, ServerService_GetChannelDetailsByIdProps } from "../../services/Server";

export async function getChannelDetailsById(props: ServerService_GetChannelDetailsByIdProps) {
  return await ServerService.getChannelDetailsById(props);
}
