import { ILoaderStore } from "interfaces/IStore";
import create from "zustand";

const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      // console.log("Applying Loaderstore", args);
      set(args);
      // console.log("New State Loader", get());
    },
    get,
    api
  );

let useLoaderStore = create<ILoaderStore>(
  log((set: any) => ({
    isLoading: false,
    toggleIsLoading: (isLoading: boolean) => {
      set({ isLoading });
    },
  }))
);
export default useLoaderStore;
