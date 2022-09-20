import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import ServerListSidebar from "../../../components/app/server-list-sidebar";
import CompleteRegistration from "../../../components/app/dialogs/complete-registration";

const PersistentAppWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  const isLoggedIn = Boolean(status === "authenticated");

  const [showCompleteRegistration, setShowCompleteRegistration] = useState(false);

  trpc.useQuery(["user.check-user-registration-complete"], {
    onSuccess: (data) => {
      if (data.completed === false) {
        setShowCompleteRegistration(true);
      }
    },
  });

  const conversationId = router.query.conversationId;

  const activeConversationId = conversationId && typeof conversationId === "string" ? conversationId : "";

  if (!isLoggedIn && status !== "loading") signIn();

  return (
    <React.Fragment>
      <div className="flex overflow-x-hidden h-screen max-h-screen sm:max-w-screen-sm md:max-w-screen-md lg:max-w-full">
        <CompleteRegistration show={showCompleteRegistration} onComplete={() => setShowCompleteRegistration(false)} />
        {isLoggedIn && <ServerListSidebar activeConversationId={activeConversationId} />}
        <div className="flex-1 h-screen max-w-[calc(100vw - w-16)] overflow-x-hidden">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default PersistentAppWrapper;
