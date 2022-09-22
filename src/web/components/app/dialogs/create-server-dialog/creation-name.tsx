import classNames from "classnames";
import React, { useId } from "react";
import { useSettingsScreenStore } from "../../../../hooks/stores/useSettingsScreenStore";
import Input from "../../form/Input";
import { CreateServerFooter, CreateServerScreenProps, CreateServerWrapper } from "./create-server-dialog";

export const CreationNameBody: React.FC<CreateServerScreenProps> = ({ mode, show, changeMode }) => {
  const { updateCreateServerInput, createServerInput } = useSettingsScreenStore();
  const inputId = useId();
  const errorText = "Server name must be between 2 and 32 characters long.";
  const showErrorText =
    createServerInput.isReady && (createServerInput.name.length <= 2 || createServerInput.name.length >= 32);

  const isReadyToSubmit = createServerInput.name.length >= 2 && createServerInput.name.length <= 32;

  const createServer = () => {
    alert("creating server");
    console.log("creating server");
  };
  return (
    <CreateServerWrapper show={show} exitLeft={false} enterLeft={mode === "create-visibility"}>
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
              required
              value={createServerInput.name}
              onChange={(evt) => {
                const value = evt.target.value;
                updateCreateServerInput({ name: value, isReady: false });
              }}
              errorText={showErrorText ? errorText : undefined}
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
          <div
            className={classNames(
              "pt-4",
              { "mt-20": !showErrorText, "mt-[3.85rem]": showErrorText },
              "flex",
              "justify-between",
              "items-center"
            )}
          >
            <button
              onClick={() => {
                updateCreateServerInput({ isReady: false });
                changeMode("create-visibility");
              }}
              className="text-sm px-3 py-1.5 hover:underline text-gray-500 hover:text-gray-600"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (isReadyToSubmit) {
                  createServer();
                } else {
                  updateCreateServerInput({ isReady: true });
                }
              }}
              className="tracking-tight text-sm rounded px-5 py-2 bg-indigo-600 disabled:bg-indigo-300 bg-opacity-90 text-gray-200 font-medium"
            >
              Create Server
            </button>
          </div>
        </CreateServerFooter>
      </div>
    </CreateServerWrapper>
  );
};
