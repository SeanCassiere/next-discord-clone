import { generateTag } from "../../utils/generate-tag";
import { prisma } from "../db/client";

export type UserService_CheckRegistrationIsComplete = {
  userId: string;
};
export type UserService_CompleteRegistration = {
  userId: string;
  name: string;
  username: string;
};
export type UserService_GetUniqueTagForUser = { username: string };
export type UserService_SetUserPublicMessage = { userId: string; publicMessage: string | null };

class User {
  async checkRegistrationIsComplete(props: UserService_CheckRegistrationIsComplete) {
    const { userId } = props;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    let completed = true;
    const missingTags: string[] = [];
    if (!user?.name) {
      completed = false;
      missingTags.push("name");
    }
    if (!user?.username) {
      completed = false;
      missingTags.push("username");
    }
    if (!user?.tag) {
      completed = false;
      missingTags.push("tag");
    }
    return { completed: completed, missing: missingTags };
  }

  async getUniqueTagForUser(props: UserService_GetUniqueTagForUser): Promise<string> {
    const tag = generateTag();
    const user = await prisma.user.findMany({
      where: { tag: tag, username: { equals: props.username } },
    });
    if (user.length === 0) {
      return tag;
    }
    return this.getUniqueTagForUser(props);
  }

  async completeRegistration(props: UserService_CompleteRegistration) {
    const tag = await this.getUniqueTagForUser({ username: props.username });
    const user = await prisma.user.update({
      where: { id: props.userId },
      data: {
        name: props.name,
        username: props.username,
        tag: tag,
      },
    });
    return user;
  }

  async getUser(props: { userId: string }) {
    return await prisma.user.findUnique({ where: { id: props.userId } });
  }

  async setUserPublicMessage(props: UserService_SetUserPublicMessage) {
    return await prisma.user.update({
      where: { id: props.userId },
      data: { publicMessage: props.publicMessage },
    });
  }
}

export const UserService = new User();
