import React from "react";
import {
  CreateServerBigOption,
  CreateServerFooter,
  CreateServerScreenProps,
  CreateServerWrapper,
} from "./create-server-dialog";

export const CreateServerMenu: React.FC<CreateServerScreenProps> = ({ changeMode, mode, show }) => {
  return (
    <CreateServerWrapper
      show={show}
      exitLeft={mode === "create-visibility" || mode === "join"}
      enterLeft={mode === "menu"}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="flex-1 select-none px-6">
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
        <div className="flex-0">
          <CreateServerFooter>
            <div className="flex flex-col gap-2 py-4">
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
      </div>
    </CreateServerWrapper>
  );
};
