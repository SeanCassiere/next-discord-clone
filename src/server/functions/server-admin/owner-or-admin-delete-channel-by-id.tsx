import { ServerService, ServerService_AdminOrOwnerDeleteChannelProps } from "../../services/Server";

export async function ownerOrAdminDeleteChannelById(props: ServerService_AdminOrOwnerDeleteChannelProps) {
  return await ServerService.ownerOrAdminDeleteChannel(props);
}
