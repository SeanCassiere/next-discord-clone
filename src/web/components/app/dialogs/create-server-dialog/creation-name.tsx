import React, { useId } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpc } from "../../../../../utils/trpc";
import { useSettingsScreenStore } from "../../../../hooks/stores/useSettingsScreenStore";
import { serverNameValidation } from "../../../../../validation/server";
import Input from "../../form/Input";
import { CreateServerFooter, CreateServerScreenProps, CreateServerWrapper } from "./create-server-dialog";

const ValidationSchema = z.object({ name: serverNameValidation });

export const CreationNameBody: React.FC<CreateServerScreenProps> = ({ mode, show, changeMode, closeDialog }) => {
  const router = useRouter();
  const inputId = useId();

  const trpcUtils = trpc.useContext();

  const { createServerInput } = useSettingsScreenStore();

  const discoverableValue = createServerInput.discoverable;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: zodResolver(ValidationSchema) });

  const { mutateAsync } = trpc.useMutation(["server.create-new-server-by-user"], {
    onSuccess(data) {
      if (data) {
        trpcUtils.invalidateQueries(["user.get-server-list-for-user"]);
        closeDialog();
        router.push(`/channels/${data.id}`);
      }
    },
  });

  return (
    <CreateServerWrapper show={show} exitLeft={false} enterLeft={mode === "create-visibility"}>
      <form
        onSubmit={handleSubmit(async (data) => {
          const { name } = data;

          try {
            await mutateAsync({ name, serverType: discoverableValue ? "PUBLIC" : "PRIVATE" });
          } catch (error) {
            setError("name", { message: "Something went wrong" });
          }
        })}
        className="h-full flex flex-col justify-between gap-6"
      >
        <div className="select-none px-6">
          <h1 className="mt-2 font-extrabold text-center text-3xl text-gray-800">Customize your server?</h1>
          <p className="mt-2 mb-2 sm:mb-4 text-sm text-center text-gray-500">
            Give your server a personality with a name! Don&apos;t worry, you can change this later.
          </p>
          <div className="flex flex-col gap-2">
            <div className="mb-2">
              <label className="text-xs font-semibold text-gray-700 uppercase" htmlFor={inputId}>
                Server name
                <span className="text-red-500">&nbsp;*</span>
              </label>
              <Input
                label={null}
                variant="light"
                placeholder={`e.g. Schrodinger's cat`}
                type="text"
                {...register("name")}
                errorText={
                  errors?.name?.message && typeof errors?.name?.message === "string" ? errors?.name?.message : undefined
                }
              />
              <p className="text-xs text-gray-700">
                By creating a server, you are agreeing to the&nbsp;
                <span className="text-indigo-600">Community Guidelines</span>.
              </p>
            </div>
          </div>
        </div>
        <div>
          <CreateServerFooter>
            <div className={classNames("flex", "justify-between", "items-center")}>
              <button
                type="button"
                onClick={() => {
                  changeMode("create-visibility");
                }}
                className="text-sm px-3 py-1.5 hover:underline text-gray-500 hover:text-gray-600"
              >
                Back
              </button>
              <button
                type="submit"
                className="tracking-tight text-sm rounded px-5 py-2 bg-indigo-600 disabled:bg-indigo-300 bg-opacity-90 text-gray-200 font-medium"
              >
                Create Server
              </button>
            </div>
          </CreateServerFooter>
        </div>
      </form>
    </CreateServerWrapper>
  );
};
