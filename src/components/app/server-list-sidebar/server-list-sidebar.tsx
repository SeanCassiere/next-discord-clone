import React from "react";
import { useRouter } from "next/router";
import { BsPlus, BsFillLightningFill } from "react-icons/bs";
import { FaPoo, FaIceCream, FaCompass } from "react-icons/fa";

const ServerListSideBar = () => {
  const router = useRouter();
  return (
    <nav className="flex-0 overflow-y-scroll h-screen bg-discordgray-900 shadow-lg">
      <div className="w-16 flex flex-col">
        <SideBarIcon onClick={() => router.push("/channels/@me")} icon={<FaIceCream size="28" />} />
        <SideBarDivider />
        <SideBarIcon onClick={() => router.push("/channels/qwe")} icon={<BsPlus size="32" />} />
        <SideBarIcon onClick={() => router.push("/channels/abc")} icon={<BsFillLightningFill size="20" />} />
        <SideBarIcon onClick={() => router.push("/channels/uio")} icon={<FaPoo size="20" />} />
        <SideBarDivider />
        <SideBarIcon icon={<FaCompass size="22" />} />
      </div>
    </nav>
  );
};

const SideBarIcon: React.FC<
  { icon: React.ReactNode } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ icon, ...rest }) => {
  return (
    <button
      {...rest}
      type="button"
      className="relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto hover:bg-blue-600 bg-discordgray-800 text-discordgray-50 hover:text-white hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg"
    >
      {icon}
    </button>
  );
};

const SideBarDivider = () => {
  return <hr className="bg-gray-800 border border-gray-800 rounded-full mx-2" />;
};

export default ServerListSideBar;
