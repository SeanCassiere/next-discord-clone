import create from "zustand";

type StoreType = {
  wasMicrophoneAlreadyOn: boolean;
  isMicrophoneTurnedOn: boolean;
  toggleMicrophoneState: (option?: boolean) => void;

  isSoundTurnedOn: boolean;
  toggleSoundState: (option?: boolean) => void;
};

export const useUserInteractorStore = create<StoreType>((set, get) => ({
  wasMicrophoneAlreadyOn: false,
  isMicrophoneTurnedOn: false,
  toggleMicrophoneState: (option) => {
    let value;
    if (option !== undefined) {
      value = option;
    } else {
      value = !get().isMicrophoneTurnedOn;
    }
    const currentSoundState = get().isSoundTurnedOn;
    let newSoundState = currentSoundState;
    if (value) {
      newSoundState = true;
    }
    set({ isMicrophoneTurnedOn: value, wasMicrophoneAlreadyOn: value, isSoundTurnedOn: newSoundState });
  },

  isSoundTurnedOn: true,
  toggleSoundState: (option) => {
    let value;
    if (option !== undefined) {
      value = option;
    } else {
      value = !get().isSoundTurnedOn;
    }

    const wasMicrophoneAlreadyOn = get().wasMicrophoneAlreadyOn;
    const isMicrophoneTurnedOn = get().isMicrophoneTurnedOn;
    let newMicrophoneBoolean = isMicrophoneTurnedOn;

    if (!value && wasMicrophoneAlreadyOn) {
      newMicrophoneBoolean = false;
    }
    if (value && !isMicrophoneTurnedOn && wasMicrophoneAlreadyOn) {
      newMicrophoneBoolean = true;
    }
    set({ isSoundTurnedOn: value, isMicrophoneTurnedOn: newMicrophoneBoolean });
  },
}));
