import { IUserStore } from "interfaces/IStore";
import { IUser } from "interfaces/IUser";
import create from "zustand";
import { detectDevice } from "utils/helpers";

const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      // console.log("Applying userStore", args);
      set(args);
      // console.log("New State userStore", get());
    },
    get,
    api
  );

let useUserStore = create<IUserStore>(
  log((set: any) => ({
    user: null,
    setUser: (user: IUser) => {
      set({ user: user });
    },
    device: detectDevice(),
    setDevice: (device: string) => {
      set({ device });
    },
    isNavMenuOpened: false,
    toggleIsNavMenuOpened: (isOpened: boolean) => {
      set({ isNavMenuOpened: isOpened });
    },
  }))
);

export default useUserStore;
