import { ServerService, ServerService_OwnerDeleteServerProps } from "../../services/Server";

export async function ownerDeleteServerById(props: ServerService_OwnerDeleteServerProps) {
  return await ServerService.ownerDeleteServer(props);
}
