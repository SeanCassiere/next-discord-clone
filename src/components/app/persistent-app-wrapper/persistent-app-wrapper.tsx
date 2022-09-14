import React from "react";
import { useSession } from "next-auth/react";
import ServerListSidebar from "../server-list-sidebar";

const PersistentAppWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { status } = useSession();
  const isLoggedIn = Boolean(status === "authenticated");

  return (
    <div className="flex overflow-x-hidden h-screen max-h-screen sm:max-w-screen-sm md:max-w-screen-md lg:max-w-full">
      {isLoggedIn && <ServerListSidebar />}
      <div className="flex-1 h-screen max-w-[calc(100vw - w-16)] overflow-x-scroll">{children}</div>
    </div>
  );
};

export default PersistentAppWrapper;
