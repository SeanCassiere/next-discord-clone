import React, { useState } from "react";
import cn from "classnames";
import { Popover, Transition } from "@headlessui/react";

import { getNameAbbreviation } from "../../../utils/get-name-abbreviation";
import MicrophoneMutedIcon from "../icons/microphone-muted";
import MicrophoneUnmutedIcon from "../icons/microphone-unmuted";
import HeadphoneUnmuted from "../icons/headphone-unmuted";
import HeadphoneMuted from "../icons/headphone-muted";
import SettingsCog from "../icons/settings-cog";
import PencilIcon from "../icons/pencil";
import ChevronRightIcon from "../icons/chevron-right";

const UserPresenceInteractor = () => {
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [headphonesEnabled, setHeadphonesEnabled] = useState(false);
  return (
    <div className="w-full h-full flex items-center group bg-discordgray-750">
      <div className="flex-1 pl-1">
        <UserProfile
          customMessage={"🚀 LGTM"}
          onlineStatus="Online"
          profilePicture={"https://cdn.discordapp.com/embed/avatars/0.png"}
          // profilePicture={null}
          profileName={"Source1"}
          profileTag={"#0001"}
        />
      </div>
      <div className="flex-0 w-28 flex items-center justify-end gap-3 pr-3">
        <button type="button" className="text-discordgray-400" onClick={() => setMicrophoneEnabled((prev) => !prev)}>
          {microphoneEnabled ? <MicrophoneUnmutedIcon /> : <MicrophoneMutedIcon />}
        </button>
        <button type="button" className="text-discordgray-400" onClick={() => setHeadphonesEnabled((prev) => !prev)}>
          {headphonesEnabled ? <HeadphoneUnmuted /> : <HeadphoneMuted />}
        </button>
        <button type="button" className="text-discordgray-400">
          <SettingsCog />
        </button>
      </div>
    </div>
  );
};

export default UserPresenceInteractor;

const UserProfile: React.FC<{
  customMessage: string | null;
  onlineStatus: string;
  profilePicture: string | null;
  profileName: string;
  profileTag: string;
}> = ({ customMessage, onlineStatus, profilePicture, profileName, profileTag }) => {
  const lcOnlStatus = onlineStatus.trim().toLowerCase();

  return (
    <Popover>
      <Transition
        enter="transition duration-150 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-10 left-1 bottom-4">
          <div className="bg-discordgray-900 w-72 shadow rounded pb-2">
            <div className="w-full h-16 rounded-t bg-red-200 bg-opacity-75 flex items-start justify-end p-2">
              <button className="bg-gray-900 bg-opacity-25 rounded-3xl w-7 aspect-square text-sm flex items-center justify-center">
                <PencilIcon />
              </button>
            </div>
            <div className="w-full px-2">
              <div className="w-32 h-14 px-2 relative">
                <div className="text-xs w-24 h-24 absolute -top-3/4 left-2 rounded-full flex items-center justify-center overflow-hidden bg-red-500 border-4 border-discordgray-900">
                  <div className="relative w-full">
                    {profilePicture ? (
                      <img src={profilePicture} alt="image" className="object-cover" />
                    ) : (
                      <div className="w-full aspect-square flex items-center justify-center rounded-full font-medium text-3xl bg-discordgray-400">
                        {getNameAbbreviation(profileName)}
                      </div>
                    )}
                    <PictureIndicator
                      color={lcOnlStatus === "online" ? "green" : lcOnlStatus === "away" ? "amber" : "red"}
                      larger
                      absoluteLarge
                    />
                  </div>
                </div>
              </div>
              <div className="text-xl text-white my-3 px-2 py-1 font-bold select-none cursor-pointer">
                {profileName}
                <span className="text-gray-300">{profileTag}</span>
              </div>
              {customMessage && <div className="text-white text-sm px-2">{customMessage}</div>}
              <hr className="my-2 bg-discordgray-600 border border-discordgray-800 rounded-full" />
              <div className="my-1 py-1 px-2 select-none rounded-sm text-sm text-gray-300 hover:bg-indigo-500 hover:text-white flex justify-between items-center">
                <span>Online</span>
                <ChevronRightIcon />
              </div>
              <div className="my-1 py-1 px-2 select-none text-sm">
                <span className="text-gray-300">Edit custom status</span>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
      <Popover.Button className="h-10 flex items-center gap-1 cursor-pointer rounded transition-all duration-200 hover:bg-discordgray-600 p-2 select-none">
        <div className="flex-0 w-10 p-1 relative">
          {profilePicture ? (
            <>
              <img src={profilePicture} className="w-full object-cover rounded-full" alt="profile picture" />
            </>
          ) : (
            <div className="w-full aspect-square flex items-center justify-center rounded-full text-sm bg-discordgray-400">
              {getNameAbbreviation(profileName)}
            </div>
          )}
          <PictureIndicator
            absoluteSmall
            color={lcOnlStatus === "online" ? "green" : lcOnlStatus === "away" ? "amber" : "red"}
          />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white leading-tight">{profileName}</div>
          <div className="text-xs font-light text-discordgray-400 relative overflow-hidden">
            {customMessage ? (
              <>
                <span className="block transition-opacity duration-200 ease-in-out opacity-100 group-hover:opacity-0">
                  {customMessage}
                </span>
                <span className="block transition-all duration-150 ease-linear absolute -bottom-5 group-hover:bottom-0">
                  {profileTag}
                </span>
              </>
            ) : (
              <>
                <span className="block">{profileTag}</span>
              </>
            )}
          </div>
        </div>
      </Popover.Button>
    </Popover>
  );
};

const PictureIndicator: React.FC<{
  color: "green" | "amber" | "red";
  larger?: boolean;
  absoluteSmall?: boolean;
  absoluteLarge?: boolean;
}> = ({ color, larger, absoluteSmall, absoluteLarge }) => {
  const classNames = cn(
    {
      "w-4": !larger,
      "h-4": !larger,
    },
    {
      "w-6": larger,
      "h-6": larger,
    },
    "rounded-full",
    {
      absolute: absoluteSmall,
      "bottom-0": absoluteSmall,
      "right-0.5": absoluteSmall,
    },
    {
      absolute: absoluteLarge,
      "bottom-1": absoluteLarge,
      "right-2.5": absoluteLarge,
    },
    {
      "bg-green-500": color === "green",
    },
    {
      "bg-amber-500": color === "amber",
    },
    {
      "bg-red-500": color === "red",
    },
    "border-4",
    "border-discordgray-700"
  );
  return <span className={classNames} />;
};
