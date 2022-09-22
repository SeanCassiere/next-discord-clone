import React from "react";
import { useSettingsScreenStore } from "../../../../hooks/stores/useSettingsScreenStore";
import {
  CreateServerBigOption,
  CreateServerFooter,
  CreateServerScreenProps,
  CreateServerWrapper,
} from "./create-server-dialog";

export const CreationVisibilityBody: React.FC<CreateServerScreenProps> = ({ changeMode, mode, show }) => {
  const { updateCreateServerInput, resetCreateServerInput } = useSettingsScreenStore();
  return (
    <CreateServerWrapper
      show={show}
      exitLeft={mode === "create-name"}
      enterLeft={mode === "create-name" || mode === "menu"}
    >
      <div className="h-full flex flex-col justify-between gap-6">
        <div className="select-none px-6">
          <h1 className="mt-2 font-extrabold text-center text-3xl text-gray-800">Who can join your server?</h1>
          <p className="mt-2 mb-2 sm:mb-4 text-sm text-center text-gray-500">
            Can your server be found in the guild-discovery? or can anyone join without an invite?
          </p>
          <div className="flex flex-col gap-2">
            <CreateServerBigOption
              smallText="People should be able to search and join!"
              onClick={() => {
                updateCreateServerInput({ discoverable: true });
                changeMode("create-name");
              }}
            >
              Yes! Anyone can join
            </CreateServerBigOption>
            <CreateServerBigOption
              smallText="Only those with an invitation link should be able to join"
              onClick={() => {
                updateCreateServerInput({ discoverable: false });
                changeMode("create-name");
              }}
            >
              Nope, invite only
            </CreateServerBigOption>
          </div>
        </div>
        <div className="flex-0">
          <CreateServerFooter>
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  resetCreateServerInput();
                  changeMode("menu");
                }}
                className="text-sm px-3 py-1.5 hover:underline text-gray-500 hover:text-gray-600"
              >
                Back
              </button>
            </div>
          </CreateServerFooter>
        </div>
      </div>
    </CreateServerWrapper>
  );
};
