import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDialogStore } from "../../../../hooks/stores/useDialogStore";
import { trpc } from "../../../../../utils/trpc";
import { messageMaxLength, SetUserPublicMessageSchema } from "../../../../../validation/user";
import Input from "../../form/Input";
import RocketLineIcon from "../../icons/rocket-line";

const ChangeUserStatusDialog: React.FC = () => {
  const { isUserMessageDialogOpen, toggleUserMessageDialog } = useDialogStore();
  const trpcUtils = trpc.useContext();
  const { data: user } = trpc.useQuery(["user.get-user"]);

  const [typingMessage, setTypingMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(SetUserPublicMessageSchema) });

  trpc.useQuery(["user.get-user"], {
    onSuccess: (data) => {
      if (!data) return;
      setValue("message", data.publicMessage);
      setTypingMessage(data.publicMessage ?? "");
    },
  });

  const { mutate: setMessageForUser } = trpc.useMutation(["user.set-user-public-message"], {
    onSuccess: () => {
      trpcUtils.invalidateQueries(["user.get-user"]);
      toggleUserMessageDialog(false);
    },
  });

  return (
    <Transition show={isUserMessageDialogOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={() => toggleUserMessageDialog(false)}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="relative inline-block align-bottom bg-discordgray-700 rounded px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => toggleUserMessageDialog(false)}
                    className="w-6 h-6 font-mono flex items-center justify-center shadow rounded transition-all duration-100 bg-discordgray-900 hover:bg-discordgray-800 text-gray-400 hover:text-white focus:text-white"
                  >
                    &times;
                  </button>
                </div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-200 text-green-600">
                  <RocketLineIcon />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-discordgray-200">
                    {user && user.publicMessage ? "Update status" : "Set status"}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">What&lsquo;s cracking doc?</p>
                  </div>
                  <form
                    onSubmit={handleSubmit((data) => {
                      const { message } = data;
                      setMessageForUser({ message });
                    })}
                    className="mt-4 flex flex-col gap-2"
                  >
                    <Input
                      label="I'm currently"
                      placeholder="watching a movie..."
                      errorText={
                        errors?.message?.message && typeof errors?.message?.message === "string"
                          ? errors?.message?.message
                          : undefined
                      }
                      {...register("message", {
                        onChange: (evt) => {
                          setTypingMessage(evt.target.value);
                        },
                      })}
                      name="message"
                      type="text"
                    />
                    <span className="text-xs text-right text-gray-300 -mt-2">
                      {String(typingMessage).length}/{messageMaxLength}
                    </span>

                    <div className="mt-5 sm:mt-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      >
                        {user && user.publicMessage ? "Update" : "Set"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChangeUserStatusDialog;
