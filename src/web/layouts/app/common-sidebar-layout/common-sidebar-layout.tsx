import React from "react";

const CommonSidebarLayout: React.FC<{
  Sidebar?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ children, Sidebar }) => {
  return (
    <div className="h-screen w-full flex flex-row">
      <nav className="flex-0 hidden md:block w-60 bg-discordgray-800">{Sidebar}</nav>
      <main className="flex-1 w-full bg-discordgray-700">{children}</main>
    </div>
  );
};

export default CommonSidebarLayout;
