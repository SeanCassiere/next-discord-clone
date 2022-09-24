import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDialogStore } from "../../../hooks/stores/useDialogStore";
import { trpc } from "../../../../utils/trpc";
import { useSettingsScreenStore } from "../../../hooks/stores/useSettingsScreenStore";
import { useRouter } from "next/router";

export const ChannelDeleteActionDialog: React.FC<{ channelId: string }> = (props) => {
  const { channelId } = props;
  const trpcUtils = trpc.useContext();
  const { mutate } = trpc.useMutation(["server-admin.owner-or-admin-delete-channel-by-id"], {
    onSuccess: (data) => {
      if (data && data.success) {
        trpcUtils.invalidateQueries(["server.get-user-channels-for-server", { serverId: data.serverId }]);
        toggleSettingsDialog(false);
      }
    },
  });
  const { toggleSettingsDialog } = useSettingsScreenStore();
  return (
    <SettingsActionDialog
      onConfirm={() => mutate({ channelId: channelId })}
      dialogTitle="Delete Channel"
      dialogMessage="Are you sure you want to delete this channel? This action cannot be undone."
      dismissText="Cancel"
      confirmText="Delete"
    />
  );
};

export const ServerDeleteActionDialog: React.FC<{ serverId: string }> = (props) => {
  const { serverId } = props;
  const router = useRouter();
  const trpcUtils = trpc.useContext();
  const { mutate } = trpc.useMutation(["server-admin.owner-delete-server-by-id"], {
    onSuccess: (data) => {
      if (data && data.success) {
        router.push("/channels/@me");
        trpcUtils.invalidateQueries(["user.get-server-list-for-user"]);
        toggleSettingsDialog(false);
      }
    },
  });
  const { toggleSettingsDialog } = useSettingsScreenStore();
  return (
    <SettingsActionDialog
      onConfirm={() => mutate({ serverId: serverId })}
      dialogTitle="Delete Server"
      dialogMessage="Are you sure you want to delete this server? This action cannot be undone."
      dismissText="Cancel"
      confirmText="Delete"
    />
  );
};

const SettingsActionDialog: React.FC<{
  onConfirm: () => void;
  onDismiss?: () => void;
  dialogTitle: string;
  dialogMessage: string;
  dismissText: string;
  confirmText: string;
}> = (props) => {
  const { onConfirm, onDismiss, dialogTitle, dialogMessage, dismissText, confirmText } = props;
  const { isSettingsActionOpen, toggleSettingsActionDialog } = useDialogStore();

  const functionDismiss = () => {
    toggleSettingsActionDialog(false);
    if (onDismiss) onDismiss();
  };

  const functionConfirm = () => {
    onConfirm();
    toggleSettingsActionDialog(false);
  };

  return (
    <React.Fragment>
      <Transition show={isSettingsActionOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={functionDismiss}>
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
                <h2 className="leading text-xl text-gray-200 font-semibold px-4 mb-4">{dialogTitle}</h2>
                <p className="px-4 mb-16 text-sm text-gray-300">{dialogMessage}</p>
                <div className="w-full py-4 bg-discordgray-800 px-4 flex items-center justify-end text-sm tracking-tight gap-2 text-gray-200 font-medium">
                  <button
                    type="button"
                    className="px-5 py-2 rounded-sm hover:text-white hover:underline outline-none focus:outline-none"
                    onClick={functionDismiss}
                  >
                    {dismissText}
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2 rounded-sm text-white bg-red-500 hover:bg-red-600 transition-all duration-100 ease-in"
                    onClick={functionConfirm}
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
};
