import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ShieldCheckIcon from "../../icons/shield-check";
import Input from "../../form/Input";
import { CompleteUserRegistrationSchema } from "../../../../../server/validation/user";
import { trpc } from "../../../../../utils/trpc";
import { useDialogStore } from "../../../../hooks/stores/useDialogStore";

const CompleteRegistrationDialog: React.FC = () => {
  const trpcUtils = trpc.useContext();

  const { isUserMessageDialogOpen, toggleUserMessageDialog } = useDialogStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(CompleteUserRegistrationSchema) });

  const { mutate: completeRegistration } = trpc.useMutation(["user.complete-registration-for-user"], {
    onSuccess: () => {
      toggleUserMessageDialog(false);
      trpcUtils.invalidateQueries(["user.check-user-registration-complete"]);
      trpcUtils.invalidateQueries(["user.get-user"]);
    },
  });

  return (
    <Transition.Root show={isUserMessageDialogOpen} as={Fragment}>
      <Dialog as="div" onClose={() => {}} className="fixed z-50 inset-0 overflow-y-auto">
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
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
            <div className="relative inline-block align-bottom bg-discordgray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-200 text-green-600">
                  <ShieldCheckIcon />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-discordgray-200">
                    Complete Registration
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Fill-in the following details to complete your registration.
                    </p>
                    <form
                      onSubmit={handleSubmit((data) => {
                        const { name, username } = data;
                        completeRegistration({ name, username });
                      })}
                      className="mt-4 flex flex-col gap-2"
                    >
                      <Input
                        label="Name"
                        errorText={
                          errors?.name?.message && typeof errors?.name?.message === "string"
                            ? errors?.name?.message
                            : undefined
                        }
                        {...register("name")}
                        name="name"
                        type="name"
                      />

                      <Input
                        label="Username"
                        errorText={
                          errors?.username?.message && typeof errors?.username?.message === "string"
                            ? errors?.username?.message
                            : undefined
                        }
                        {...register("username")}
                        name="username"
                        type="text"
                      />

                      <div className="mt-5 sm:mt-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        >
                          Complete
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CompleteRegistrationDialog;
