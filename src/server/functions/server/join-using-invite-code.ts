import { ServerService, ServerService_JoinUsingInviteCode } from "../../services/Server";

export async function joinUsingInviteCode(props: ServerService_JoinUsingInviteCode) {
  return await ServerService.joinUsingInviteCode(props);
}
