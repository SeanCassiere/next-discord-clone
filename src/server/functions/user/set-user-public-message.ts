import { UserService, UserService_SetUserPublicMessage } from "../../services/User";
export async function setUserPublicMessage(props: UserService_SetUserPublicMessage) {
  return await UserService.setUserPublicMessage(props);
}
