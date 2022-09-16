import React, { useState } from "react";
import cn from "classnames";

import MicrophoneMutedIcon from "../icons/microphone-muted";
import MicrophoneUnmutedIcon from "../icons/microphone-unmuted";
import HeadphoneUnmuted from "../icons/headphone-unmuted";
import HeadphoneMuted from "../icons/headphone-muted";
import SettingsCog from "../icons/settings-cog";

const UserPresenceInteractor = () => {
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [headphonesEnabled, setHeadphonesEnabled] = useState(false);
  return (
    <div className="w-full h-full flex items-center group">
      <div className="flex-1 pl-1">
        <UserProfile customMessage={"🚀 LGTM"} onlineStatus="Online" />
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

const UserProfile: React.FC<{ customMessage: string | null; onlineStatus: string }> = ({
  customMessage,
  onlineStatus,
}) => {
  const lcOnlStatus = onlineStatus.trim().toLowerCase();

  return (
    <div className="h-10 flex items-center gap-1 cursor-pointer rounded transition-all duration-200 hover:bg-discordgray-600 p-2">
      <div className="flex-0 w-10 p-1 relative">
        <img
          src="https://cdn.discordapp.com/embed/avatars/0.png"
          className="object-cover rounded-full"
          alt="profile picture"
        />
        <PictureIndicator color={lcOnlStatus === "online" ? "green" : lcOnlStatus === "away" ? "amber" : "red"} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-white leading-tight">Source1</div>
        <div className="text-xs font-light text-discordgray-400 relative overflow-hidden">
          {customMessage ? (
            <>
              <span className="block transition-opacity duration-200 ease-in-out opacity-100 group-hover:opacity-0">
                {customMessage}
              </span>
              <span className="block transition-all duration-150 ease-linear absolute -bottom-5 group-hover:bottom-0">
                # 3546
              </span>
            </>
          ) : (
            <>
              <span className="block"># 3546</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PictureIndicator: React.FC<{ color: "green" | "amber" | "red" }> = ({ color }) => {
  const classNames = cn(
    "w-2.5",
    "h-2.5",
    "rounded-full",
    "absolute",
    "bottom-1",
    "right-1",
    "border",
    "border-white",
    {
      "bg-green-500": color === "green",
    },
    {
      "bg-amber-500": color === "amber",
    },
    {
      "bg-red-500": color === "red",
    }
  );
  return <span className={classNames} />;
};
