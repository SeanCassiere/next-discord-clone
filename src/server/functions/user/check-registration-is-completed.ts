import { UserService, UserService_CheckRegistrationIsComplete } from "../../services/User";

export async function userCheckIfRegistrationIsCompleted(props: UserService_CheckRegistrationIsComplete) {
  return await UserService.checkRegistrationIsComplete(props);
}
