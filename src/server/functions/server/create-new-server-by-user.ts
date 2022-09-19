import { ServerService_CreateNewServerByUserProps, ServerService } from "../../services/Server";

export async function createNewServerByUser(props: ServerService_CreateNewServerByUserProps) {
  return await ServerService.createNewServerByUser(props);
}
