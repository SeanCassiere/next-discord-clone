import { ServerService, ServerService_CreateInviteLinkProps } from "../../services/Server";

export async function createInviteLinkForServer(props: ServerService_CreateInviteLinkProps) {
  return await ServerService.createInviteLink(props);
}
