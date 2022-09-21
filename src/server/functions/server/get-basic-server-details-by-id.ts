import { ServerService, ServerService_GetBasicServerDetailsByIdProps } from "../../services/Server";

export async function getBasicServerDetailsById(props: ServerService_GetBasicServerDetailsByIdProps) {
  return await ServerService.getBasicServerDetailsById(props);
}
