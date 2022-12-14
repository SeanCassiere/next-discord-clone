import create from "zustand";

type StoreType = {
  isUserMessageDialogOpen: boolean;
  toggleUserMessageDialog: (option?: boolean) => void;

  isCompleteRegistrationDialogOpen: boolean;
  toggleCompleteRegistrationDialog: (option?: boolean) => void;

  isLogoutOpen: boolean;
  toggleLogout: (option?: boolean) => void;

  isCreateServerOpen: boolean;
  toggleCreateServer: (option?: boolean) => void;

  isSettingsActionOpen: boolean;
  toggleSettingsActionDialog: (option?: boolean) => void;
};

export const useDialogStore = create<StoreType>((set, get) => ({
  isUserMessageDialogOpen: false,
  toggleUserMessageDialog: (option) => {
    let value;
    if (option !== undefined) {
      value = option;
    } else {
      value = !get().isUserMessageDialogOpen;
    }
    set({ isUserMessageDialogOpen: value });
  },

  isCompleteRegistrationDialogOpen: false,
  toggleCompleteRegistrationDialog: (option) => {
    let value;
    if (option !== undefined) {
      value = option;
    } else {
      value = !get().isCompleteRegistrationDialogOpen;
    }
    set({ isCompleteRegistrationDialogOpen: value });
  },

  isLogoutOpen: false,
  toggleLogout: (option) => {
    let value;
    if (option !== undefined) {
      value = option;
    } else {
      value = !get().isLogoutOpen;
    }
    set({ isLogoutOpen: value });
  },

  isCreateServerOpen: false,
  toggleCreateServer: (option) => {
    let value;
    if (option !== undefined) {
      value = option;
    } else {
      value = !get().isCreateServerOpen;
    }
    set({ isCreateServerOpen: value });
  },

  isSettingsActionOpen: false,
  toggleSettingsActionDialog: (option) => {
    let value;
    if (option !== undefined) {
      value = option;
    } else {
      value = !get().isSettingsActionOpen;
    }
    console.log({ value });
    set({ isSettingsActionOpen: value });
  },
}));
