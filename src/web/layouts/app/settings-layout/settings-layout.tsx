import React from "react";
import classNames from "classnames";

import { useDialogStore } from "../../../hooks/stores/useDialogStore";
import { useSettingsScreenStore } from "../../../hooks/stores/useSettingsScreenStore";
import LeaveIcon from "../../../components/app/icons/leave";

const SettingsLayout = () => {
  const { currentScreen, setScreen, toggleSettingsDialog } = useSettingsScreenStore();
  const { toggleLogout } = useDialogStore();
  const menuItems = [
    { id: "title-user-settings", children: "User settings", type: "title", onClick: undefined },
    {
      id: "my-account",
      children: <>My Account</>,
      type: "item",
      onClick: () => {
        setScreen("my-account");
      },
    },
    {
      id: "my-profiles",
      children: <>Profiles</>,
      type: "item",
      onClick: () => {
        setScreen("my-profiles");
      },
    },
    { id: 999998, children: null, type: "divider", onClick: undefined },
    { id: "title-app-settings", children: "App settings", type: "title", onClick: undefined },
    {
      id: "advanced-settings",
      children: <>Advanced</>,
      type: "item",
      onClick: () => {
        setScreen("advanced-settings");
      },
    },
    { id: 999999, children: null, type: "divider", onClick: undefined },
    {
      id: "logout-link",
      children: (
        <React.Fragment>
          <span>Logout</span>
          <span>
            <LeaveIcon />
          </span>
        </React.Fragment>
      ),
      type: "item",
      onClick: () => {
        toggleLogout(true);
      },
    },
    { id: 10000, children: null, type: "divider", onClick: undefined },
  ];

  const closeSettings = () => {
    toggleSettingsDialog(false);
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-12">
      <div className="col-span-4 md:col-span-3 lg:col-span-2 lg:col-start-3">
        <div className="max-h-screen overflow-y-auto pt-16 pb-5 small-scroller channel-bar flex flex-col pl-1 lg:pl-16 xl:pl-20 gap-1">
          <div className="lg:px-2">
            {menuItems.map((item, idx) => {
              let component: React.ReactNode = null;
              if (item.type === "title") {
                component = (
                  <div
                    className={classNames(
                      "uppercase",
                      "font-extrabold",
                      "text-xs",
                      "ml-1",
                      { "mt-3": idx !== 0 },
                      "mb-2",
                      "lg:mx-2",
                      "text-gray-400",
                      "select-none"
                    )}
                  >
                    {item.children}
                  </div>
                );
              }
              if (item.type === "divider") {
                component = <Divider />;
              }
              if (item.type === "item") {
                component = (
                  <MenuItem active={item.id === currentScreen} onClick={item.onClick}>
                    {item.children}
                  </MenuItem>
                );
              }
              return <React.Fragment key={`menu-item-${item.id}`}>{component}</React.Fragment>;
            })}
          </div>
        </div>
      </div>
      <div className="col-span-8 md:col-span-9 lg:col-span-8 bg-discordgray-700 px-1">
        <div className="max-h-screen overflow-y-auto pt-16 pb-5 small-scroller grid grid-cols-12">
          <div className="col-span-10 md:col-span-11 lg:col-span-8 text-gray-400 font-normal text-sm px-2 sm:px-6 lg:px-12">
            {currentScreen === "my-account" && <MyAccount />}
            {currentScreen === "my-profiles" && <>Profiles</>}
            {currentScreen === "advanced-settings" && <>Advanced settings</>}
          </div>
          <div>
            <div
              className="fixed top-[calc(7%)] right-[calc(5%)] sm:right-[calc(3%)] md:right-[calc(2.7%)] lg:right-[calc(20%)] flex flex-col items-center justify-center gap-1 text-gray-400 cursor-pointer text-xs select-none uppercase font-medium md:font-extrabold"
              onClick={closeSettings}
            >
              <button
                className="w-7 md:w-8 lg:w-8 rounded-full aspect-square border-2 border-white border-opacity-25 flex items-center justify-center font-mono select-none outline-discordgray-600 ring-discordgray-600 focus:ring-discordgray-750 focus:outline-offset-4 focus:outline-discordgray-750 focus:border-opacity-25 text-xs md:text-lg font-semibold"
                onClick={closeSettings}
              >
                &times;
              </button>
              <span>Esc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyAccount = () => {
  return (
    <>
      {[...Array(50)].map((_, idx) => (
        <div key={`my-account-${idx}`}>{idx}</div>
      ))}
    </>
  );
};

const Divider = () => (
  <hr className="bg-discordgray-700 border border-discordgray-700 rounded-full my-2" aria-hidden="true" />
);

const MenuItem: React.FC<
  { children: React.ReactNode; active: boolean } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, active, ...rest }) => {
  return (
    <button
      className={classNames(
        "flex",
        "rounded",
        "items-center",
        "py-1.5",
        "px-2.5",
        "w-full",
        "my-0.5",
        "bg-discordgray-800",
        "hover:bg-discordgray-600",
        { "text-gray-400": !active },
        { "text-white": active, "bg-discordgray-600": active },
        "hover:text-gray-100",
        "text-sm",
        "font-medium",
        "justify-between",
        "text-left"
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SettingsLayout;
