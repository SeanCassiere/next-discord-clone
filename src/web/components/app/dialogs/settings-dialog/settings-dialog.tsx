import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useSettingsScreenStore } from "../../../../hooks/stores/useSettingsScreenStore";

const SettingsDialog: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSettingsDialogOpen, toggleSettingsDialog } = useSettingsScreenStore();
  return (
    <Transition
      enter="transition duration-150 ease-out"
      enterFrom="transform scale-125 opacity-30"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-150 ease-in"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-125 opacity-0"
      show={isSettingsDialogOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="absolute z-40 inset-0 bg-discordgray-800 w-full min-h-screen"
        onClose={() => toggleSettingsDialog(false)}
      >
        {children}
      </Dialog>
    </Transition>
  );
};

export default SettingsDialog;
