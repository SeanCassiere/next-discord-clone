import { BadReqTRPCError } from "../../utils/error";
import { prisma } from "../db/client";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

const KEY_ADMIN = "admin";
const KEY_OWNER = "owner";
const KEY_MEMBER = "member";

const defaultRoles = [
  { key: KEY_ADMIN, display: "Admin", isPublic: false, isInitial: false },
  { key: KEY_OWNER, display: "Owner", isPublic: false, isInitial: false },
  { key: KEY_MEMBER, display: "Member", isPublic: false, isInitial: true },
];

type ServerType = "PUBLIC" | "PRIVATE";

export type ServerService_CreateNewServerByUserProps = {
  ownerId: string;
  name: string;
  description: string;
  serverType: ServerType;
};
export type ServerService_GetServerListForUserProps = { userId: string };
export type ServerService_SetLastVisitedChannelForServer = {
  userId: string;
  channelId: string | null;
  serverId: string;
};
export type ServerService_GetUserChannelsForServerProps = {
  serverId: string;
  userId: string;
};
export type ServerService_GetBasicServerDetailsByIdProps = {
  serverId: string;
  userId: string;
};
export type ServerService_GetChannelDetailsByIdProps = {
  serverId: string;
  channelId: string;
  userId: string;
};
export type ServerService_CreateInviteLinkProps = {
  userId: string;
  serverId: string;
  expiresIn: ExpiryType;
};
type ExpiryType = "1-day" | "7-days" | "30-days" | "never";
export type ServerService_JoinUsingInviteCode = {
  inviteCode: string;
  userId: string;
};

type ServerIconTypes = "server-channel-default" | "server-channel-protected" | "server-channel-announcements";

class Server {
  private async _isUserInServer({ serverId, userId }: { serverId: string; userId: string }) {
    return await prisma.serverConnection.findFirst({ where: { serverId, userId }, include: { user: true } });
  }
  private getExpiryFormat(expiry: ExpiryType): [number, "days" | "day" | "year" | "years"] | null {
    if (expiry === "never") return null;
    const [number, type] = expiry.split("-");
    return [parseInt(number!), type! as any];
  }
  private _sortIconType(iconType: string | null): ServerIconTypes {
    const defaultIconType = "server-channel-default";
    if (!iconType) {
      return "server-channel-default";
    }

    switch (iconType.toLowerCase()) {
      case "server-channel-protected":
        return "server-channel-protected";
      case "server-channel-announcements":
        return "server-channel-announcements";
      case defaultIconType:
      default:
        return defaultIconType;
    }
  }
  private async _getUniqueServerCode(): Promise<string> {
    const code = nanoid(6);
    const find = await prisma.serverInvite.findFirst({ where: { code } });
    if (!find) {
      return code;
    }
    return await this._getUniqueServerCode();
  }

  async createNewServerByUser(props: ServerService_CreateNewServerByUserProps) {
    const { ownerId, name, description } = props;

    const createServer = await prisma.server.create({
      data: {
        name: name,
        description: description,
        serverType: props.serverType,
        roles: {
          create: defaultRoles.map((role) => ({
            key: role.key,
            name: role.display,
            isPublic: role.isPublic,
            isInitial: role.isInitial,
          })),
        },
      },
    });

    const ownerRole = await prisma.serverRole
      .findMany({
        where: { key: KEY_OWNER, serverId: createServer.id },
      })
      .then((results) => [...results].find((r) => r.key === KEY_OWNER));
    if (ownerRole) {
      await prisma.server.update({
        where: { id: createServer.id },
        data: {
          connections: {
            create: {
              user: { connect: { id: ownerId } },
              role: { connect: { id: ownerRole.id } },
            },
          },
        },
      });
    }

    const defaultGroup = await prisma.serverChannelGroup.create({
      data: { name: "Text channels", server: { connect: { id: createServer.id } } },
    });

    await prisma.serverChannel.create({
      data: {
        name: "Welcome",
        server: { connect: { id: createServer.id } },
        type: "server",
        parent: { connect: { id: defaultGroup.id } },
      },
    });

    return {
      id: createServer.id,
      name: createServer.name,
      description: createServer.description,
      image: createServer.image,
    };
  }

  async getServerListForUser(props: ServerService_GetServerListForUserProps) {
    const connections = await prisma.serverConnection.findMany({
      where: { userId: props.userId },
      include: { server: true },
    });

    const servers = connections.map((connection) => ({
      ...connection.server,
      lastVisitedChannel: connection.lastVisitedChannelId,
    }));

    return servers;
  }

  async setLastVisitedChannelForServer(props: ServerService_SetLastVisitedChannelForServer) {
    const connections = await prisma.serverConnection.findMany({
      where: { userId: props.userId, serverId: props.serverId },
    });
    if (connections.length === 0 || connections.length > 1) {
      return false;
    }
    const connection = connections[0]!;
    await prisma.serverConnection.update({
      where: { id: connection.id },
      data: {
        lastVisitedChannel: props.channelId
          ? {
              connect: { id: props.channelId },
            }
          : {
              disconnect: true,
            },
      },
    });

    return true;
  }

  async getUserChannelsForServer(props: ServerService_GetUserChannelsForServerProps) {
    const parentsQuery = prisma.serverChannelGroup.findMany({ where: { serverId: props.serverId } });
    const channelsQuery = prisma.serverChannel.findMany({ where: { serverId: props.serverId, type: "server" } });

    const [parents, channels] = await Promise.all([parentsQuery, channelsQuery]);

    return {
      parents: parents.map((p) => ({ id: p.id, name: p.name, createdAt: p.createdAt, updatedAt: p.updatedAt })),
      channels: channels.map((c) => ({
        id: c.id,
        name: c.name,
        iconType: this._sortIconType(c.iconType),
        parent: c.parentId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
    };
  }

  async getBasicServerDetailsById(props: ServerService_GetBasicServerDetailsByIdProps) {
    const server = await prisma.server.findFirst({ where: { id: props.serverId } });

    const userInServer = await prisma.serverConnection.findFirst({
      where: { serverId: props.serverId, userId: props.userId },
    });
    if (!userInServer) {
      return null;
    }
    if (!server) {
      return null;
    }
    return {
      ...server,
      serverType: server.serverType === "PUBLIC" ? ("PUBLIC" as const) : ("PRIVATE" as const),
    };
  }

  async getChannelDetailsById(props: ServerService_GetChannelDetailsByIdProps) {
    const channel = await prisma.serverChannel.findFirst({ where: { id: props.channelId, serverId: props.serverId } });
    if (!channel) {
      return null;
    }
    return channel;
  }

  async createInviteLink(props: ServerService_CreateInviteLinkProps) {
    const userConnection = await this._isUserInServer({ serverId: props.serverId, userId: props.userId });
    if (!userConnection) {
      throw new BadReqTRPCError("User is not a member of the server", "userId");
    }

    let expiry;
    const expiryFormat = this.getExpiryFormat(props.expiresIn);
    if (!expiryFormat) {
      expiry = dayjs().add(99, "years").toDate();
    } else {
      expiry = dayjs().add(expiryFormat[0], expiryFormat[1]).toDate();
    }

    const code = await this._getUniqueServerCode();

    return await prisma.serverInvite.create({
      data: {
        code: code,
        expiresAt: expiry,
        server: { connect: { id: props.serverId } },
        creator: { connect: { id: userConnection.id } },
      },
    });
  }
  async joinUsingInviteCode(props: ServerService_JoinUsingInviteCode) {
    const inviteCode = await prisma.serverInvite.findUnique({ where: { code: props.inviteCode } });
    if (!inviteCode) {
      throw new BadReqTRPCError("Invite does not exist", "inviteCode");
    }
    if (inviteCode.expiresAt < new Date()) {
      throw new BadReqTRPCError("Invite has expired", "inviteCode");
    }
    const userExists = await this._isUserInServer({ serverId: inviteCode.serverId, userId: props.userId });
    if (userExists) {
      throw new BadReqTRPCError("Already a member of the server", "inviteCode");
    }
    const roles = await prisma.serverRole.findMany({ where: { serverId: inviteCode.serverId, isInitial: true } });
    if (roles.length === 0) {
      throw new BadReqTRPCError("Server has no roles initial roles", "inviteCode");
    }
    const role = roles[0]!;

    await prisma.serverConnection.create({
      data: {
        server: { connect: { id: inviteCode.serverId } },
        user: { connect: { id: props.userId } },
        role: { connect: { id: role.id } },
      },
    });
    await prisma.serverInvite.update({ where: { id: inviteCode.id }, data: { uses: { increment: 1 } } });

    return await this.getBasicServerDetailsById({ userId: props.userId, serverId: inviteCode.serverId });
  }
}

export const ServerService = new Server();
