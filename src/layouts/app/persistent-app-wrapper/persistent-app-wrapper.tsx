import React from "react";
import { useSession, signIn } from "next-auth/react";
import ServerListSidebar from "../../../components/app/server-list-sidebar";
import { useRouter } from "next/router";

const PersistentAppWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  const isLoggedIn = Boolean(status === "authenticated");

  const conversationId = router.query.conversationId;

  const activeConversationId = conversationId && typeof conversationId === "string" ? conversationId : "";

  if (!isLoggedIn && status !== "loading") signIn();

  return (
    <div className="flex overflow-x-hidden h-screen max-h-screen sm:max-w-screen-sm md:max-w-screen-md lg:max-w-full">
      {isLoggedIn && <ServerListSidebar activeConversationId={activeConversationId} />}
      <div className="flex-1 h-screen max-w-[calc(100vw - w-16)] overflow-x-hidden">{children}</div>
    </div>
  );
};

export default PersistentAppWrapper;
