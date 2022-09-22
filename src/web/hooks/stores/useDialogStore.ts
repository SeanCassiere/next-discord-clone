import create from "zustand";

type StoreType = {
  isUserMessageDialogOpen: boolean;
  toggleUserMessageDialog: (option?: boolean) => void;

  isCompleteRegistrationDialogOpen: boolean;
  toggleCompleteRegistrationDialog: (option?: boolean) => void;

  isLogoutOpen: boolean;
  toggleLogout: (option?: boolean) => void;
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
      value = !get().isCompleteRegistrationDialogOpen;
    }
    set({ isLogoutOpen: value });
  },
}));
