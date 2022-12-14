import React, { useId } from "react";
import { useRouter } from "next/router";
import Input from "../../form/Input";
import {
  CreateServerScreenProps,
  CreateServerWrapper,
  CreateServerBigOption,
  CreateServerFooter,
} from "./create-server-dialog";
import { useDialogStore } from "../../../../hooks/stores/useDialogStore";
import { useSettingsScreenStore } from "../../../../hooks/stores/useSettingsScreenStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JoinUsingInviteCodeSchema } from "../../../../../validation/server";
import { trpc } from "../../../../../utils/trpc";
import { getTypedErrorArray } from "../../../../utils/get-typed-error-array";

const EXAMPLE_CODE = "hTKzmak";

export const JoinServerBody: React.FC<CreateServerScreenProps> = ({ changeMode, mode, show, closeDialog }) => {
  const router = useRouter();
  const inputId = useId();
  const trpcUtils = trpc.useContext();
  const { toggleCreateServer } = useDialogStore();
  const { resetCreateServerInput } = useSettingsScreenStore();

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({ resolver: zodResolver(JoinUsingInviteCodeSchema) });

  const { mutate: joinServerMutation } = trpc.useMutation(["server.join-using-invite-code"], {
    onError: (error) => {
      const errorsToSet = getTypedErrorArray(error.shape.errors);
      errorsToSet.forEach((err) => {
        setError(err.path, { message: err.message });
      });
    },
    onSuccess: (data) => {
      trpcUtils.invalidateQueries(["user.get-server-list-for-user"]);
      if (data) {
        trpcUtils.invalidateQueries(["server.get-basic-server-details-by-id", { serverId: data.id }]);
        resetCreateServerInput();
        router.push(`/channels/${data.id}`);
        closeDialog();
      }
    },
  });

  return (
    <CreateServerWrapper show={show} exitLeft={false} enterLeft={mode === "menu"}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(async (data) => {
          await joinServerMutation({ inviteCode: data.inviteCode });
        })}
        className="h-full flex flex-col justify-between gap-6"
      >
        <div className="select-none px-6">
          <h1 className="mt-2 font-extrabold text-center text-3xl text-gray-800">Join a Server</h1>
          <p className="mt-2 mb-2 sm:mb-4 text-sm text-center text-gray-500">
            Enter an invite below to join an existing server.
          </p>
          <div className="ml-1 mt-0 sm:mt-2 mb-2">
            <div className="mb-2">
              <label className="text-xs font-semibold text-gray-700 uppercase" htmlFor={inputId}>
                Invite Link
                <span className="text-red-500">&nbsp;*</span>
              </label>
              <Input
                label={null}
                variant="light"
                placeholder={`e.g. ${EXAMPLE_CODE}`}
                {...register("inviteCode")}
                errorText={
                  errors?.inviteCode?.message && typeof errors?.inviteCode?.message === "string"
                    ? errors?.inviteCode?.message
                    : undefined
                }
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 uppercase">Invites should look like</span>
            <p className={"text-xs text-gray-600 mt-1 mb-3"}>
              {EXAMPLE_CODE}
              <br />
              https://url.tld/invite/{EXAMPLE_CODE}
              <br />
              https://url.tld/cool-people
            </p>
          </div>
          <CreateServerBigOption
            smallText="Check out our public communities in Server Discovery"
            onClick={() => {
              toggleCreateServer(false);
              changeMode("menu");
              router.push("/guilds");
            }}
          >
            Don&lsquo;t have an invite?
          </CreateServerBigOption>
        </div>
        <div className="flex-0">
          <CreateServerFooter>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  resetCreateServerInput();
                  changeMode("menu");
                }}
                className="text-sm px-3 py-1.5 hover:underline text-gray-500 hover:text-gray-600"
              >
                Back
              </button>
              <button
                type="submit"
                className="tracking-tight text-sm rounded px-5 py-2 bg-indigo-600 bg-opacity-90 text-gray-200 font-medium"
              >
                Join Server
              </button>
            </div>
          </CreateServerFooter>
        </div>
      </form>
    </CreateServerWrapper>
  );
};
