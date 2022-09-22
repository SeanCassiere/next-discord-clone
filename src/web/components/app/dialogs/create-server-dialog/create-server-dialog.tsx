import React, { Fragment, useCallback, useMemo, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import classNames from "classnames";

import { useDialogStore } from "../../../../hooks/stores/useDialogStore";
import ChevronRightIcon from "../../icons/chevron-right";
import { JoinServerBody } from "./join-server";
import { CreationVisibilityBody } from "./creation-visibility";
import { CreationNameBody } from "./creation-name";
import { useSettingsScreenStore } from "../../../../hooks/stores/useSettingsScreenStore";

type CreateServerMode = "menu" | "join" | "create-visibility" | "create-name";
export type CreateServerScreenProps = {
  changeMode: (mode: CreateServerMode) => void;
  mode: CreateServerMode;
  show: boolean;
};

const CreateServerDialog = () => {
  const [mode, setMode] = useState<CreateServerMode>("menu");
  const { isCreateServerOpen, toggleCreateServer } = useDialogStore();
  const { resetCreateServerInput } = useSettingsScreenStore();

  const closeDialog = () => {
    resetCreateServerInput();
    toggleCreateServer(false);
    setMode("menu");
  };

  const changeMode = useCallback((newMode: CreateServerMode) => {
    setMode(newMode);
  }, []);

  const sharedProps = {
    mode,
    changeMode,
  };

  const isLargeBody = useMemo(() => {
    const acceptedModes: CreateServerMode[] = ["join"];
    if (acceptedModes.includes(mode)) return true;
    return false;
  }, [mode]);

  return (
    <Transition show={isCreateServerOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={closeDialog}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={classNames(
                // "relative",
                "inline-block",
                "align-bottom",
                "bg-gray-100",
                "rounded",
                "text-left",
                "overflow-hidden",
                "shadow-xl",
                "transform",
                "transition-all",
                "duration-150",
                "h-auto",
                {
                  "sm:h-[calc(30rem)]": isLargeBody,
                  "sm:h-[calc(25.5rem)]": !isLargeBody,
                },
                "max-w-sm",
                "sm:my-8",
                "sm:align-middle",
                "sm:max-w-md",
                "w-screen"
              )}
            >
              <div className="flex flex-col h-full w-full">
                <div className="py-6 flex-1">
                  <div className="px-6 flex justify-end">
                    <button
                      type="button"
                      onClick={closeDialog}
                      className="w-6 h-6 font-mono flex items-center justify-center shadow rounded transition-all duration-100 bg-gray-400 hover:bg-gray-500 text-gray-100 hover:text-white focus:text-white"
                    >
                      &times;
                    </button>
                  </div>
                  <MenuBody {...sharedProps} show={mode === "menu"} />
                  <JoinServerBody {...sharedProps} show={mode === "join"} />
                  <CreationVisibilityBody {...sharedProps} show={mode === "create-visibility"} />
                  <CreationNameBody {...sharedProps} show={mode === "create-name"} />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export const CreateServerFooter: React.FC<{ isLargeFooter?: boolean; children: React.ReactNode }> = ({
  children,
  isLargeFooter = false,
}) => {
  return (
    <div
      className={classNames(
        "px-6",
        "relative",
        "transition-all",
        "duration-150",
        { "h-28": isLargeFooter, "h-20": !isLargeFooter },
        "bg-gray-200"
      )}
    >
      {children}
    </div>
  );
};

export const CreateServerWrapper: React.FC<{
  children: React.ReactNode;
  show: boolean;
  exitLeft: boolean;
  enterLeft: boolean;
}> = ({ children, show, exitLeft, enterLeft }) => (
  <div>
    <Transition
      enter="ease-out duration-150"
      enterFrom={classNames("opacity-0", { "translate-x-full": !enterLeft, "-translate-x-full": enterLeft })}
      enterTo={classNames("opacity-100", "translate-x-0")}
      leave="ease-in duration-150"
      leaveFrom={classNames("opacity-100", "translate-x-0")}
      leaveTo={classNames("opacity-50", { "translate-x-full": !exitLeft, "-translate-x-full": exitLeft })}
      show={show}
      as="div"
    >
      {children}
    </Transition>
  </div>
);

export const CreateServerBigOption: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { smallText?: string }
> = ({ children, smallText, ...props }) => {
  return (
    <button
      {...props}
      className="w-full border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-300 rounded-lg pl-6 pr-4 py-4 flex items-center"
    >
      <span className="flex-1 font-semibold text-left text-gray-600 flex flex-col">
        <span>{children}</span>
        {smallText && <span className="text-xs text-gray-400">{smallText}</span>}
      </span>
      <span className="flex-0 w-9 text-right flex justify-end">
        <ChevronRightIcon />
      </span>
    </button>
  );
};

const MenuBody: React.FC<CreateServerScreenProps> = ({ changeMode, mode, show }) => {
  return (
    <CreateServerWrapper
      show={show}
      exitLeft={mode === "create-visibility" || mode === "join"}
      enterLeft={mode === "menu"}
    >
      <div className="select-none px-6">
        <h1 className="mt-2 font-extrabold text-center text-3xl text-gray-800">Create a server</h1>
        <p className="mt-2 mb-4 text-sm text-center text-gray-500">
          Your server is where you and your friends hang out. Make yours and start talking.
        </p>
        <CreateServerBigOption
          onClick={() => {
            changeMode("create-visibility");
          }}
        >
          Create My Own
        </CreateServerBigOption>
      </div>
      <div>
        <CreateServerFooter isLargeFooter>
          <div className="flex flex-col gap-2 mt-20 pt-4">
            <h2 className="text-xl text-center text-gray-700 font-semibold">Have an invite already?</h2>
            <button
              className="px-4 py-2.5 transition-all duration-150 rounded text-center bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium"
              onClick={() => {
                changeMode("join");
              }}
            >
              Join a server
            </button>
          </div>
        </CreateServerFooter>
      </div>
    </CreateServerWrapper>
  );
};

export default CreateServerDialog;
