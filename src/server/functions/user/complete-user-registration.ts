import { UserService, UserService_CompleteRegistration } from "../../services/User";
export async function completeUserRegistration(props: UserService_CompleteRegistration) {
  return await UserService.completeRegistration(props);
}
