import React from "react";

const ChannelLayout: React.FC<{
  Sidebar?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ children, Sidebar }) => {
  return (
    <div className="h-screen w-full flex flex-row">
      <nav className="flex-0 w-64 bg-discordgray-800">{Sidebar}</nav>
      <main className="flex-1 w-full bg-discordgray-600">{children}</main>
    </div>
  );
};

export default ChannelLayout;
