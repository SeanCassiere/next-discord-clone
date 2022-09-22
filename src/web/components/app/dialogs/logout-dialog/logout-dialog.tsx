import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useDialogStore } from "../../../../hooks/stores/useDialogStore";
import { signOut } from "next-auth/react";

const LogoutDialog = () => {
  const { isLogoutOpen, toggleLogout } = useDialogStore();
  return (
    <Transition show={isLogoutOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={() => toggleLogout(false)}>
        <div className="flex items-center justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
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
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-discordgray-700 rounded pt-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full select-none">
              <h2 className="leading text-xl text-gray-200 font-semibold px-4 mb-4">Log Out</h2>
              <p className="px-4 mb-16 text-sm text-gray-300">Are you sure you want to logout?</p>
              <p></p>
              <div className="w-full py-4 bg-discordgray-800 px-4 flex items-center justify-end text-sm tracking-tight gap-2 text-gray-200 font-medium">
                <button
                  className="px-5 py-2 rounded-sm hover:text-white hover:underline"
                  onClick={() => toggleLogout(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 rounded-sm text-white bg-red-500 hover:bg-red-600 transition-all duration-100 ease-in"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Log Out
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LogoutDialog;
