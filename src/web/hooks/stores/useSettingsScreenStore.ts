import create from "zustand";

type StoreType = {
  currentScreen: string;
  subScreen: string | null;
  isSettingsDialogOpen: boolean;
  toggleSettingsDialog: (toValue?: boolean, opts?: { initialScreen: string; subScreen: string | null }) => void;
  setScreen: (screen: string) => void;
  setSubScreen: (subScreen: string | null) => void;

  createServerInput: {
    discoverable: boolean;
  };
  resetCreateServerInput: () => void;
  updateCreateServerInput: (dto: { [key: string]: string | boolean }) => void;
};
const initialServerInput: StoreType["createServerInput"] = {
  discoverable: true,
};

export const useSettingsScreenStore = create<StoreType>((set, get) => ({
  currentScreen: "my-account",
  subScreen: null,
  isSettingsDialogOpen: false,
  toggleSettingsDialog: (toValue, opts) => {
    let value;
    if (toValue !== undefined) {
      value = toValue;
    } else {
      value = !get().isSettingsDialogOpen;
    }
    set({ isSettingsDialogOpen: value });
    if (opts) {
      set({ currentScreen: opts.initialScreen, subScreen: opts.subScreen });
    }
  },
  setScreen: (screen) => {
    set({ currentScreen: screen });
  },
  setSubScreen: (subScreen) => {
    set({ subScreen });
  },

  createServerInput: initialServerInput,
  resetCreateServerInput: () => {
    set({ createServerInput: initialServerInput });
  },
  updateCreateServerInput: (dto) => {
    let updateObject = {};
    [...Object.entries(dto)].forEach(([key, value]) => {
      if (key === "discoverable") {
        updateObject = { ...updateObject, discoverable: value as boolean };
      }
    });

    set((state) => ({ createServerInput: { ...state.createServerInput, ...updateObject } }));
  },
}));
