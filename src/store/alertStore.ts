import { devtools } from "zustand/middleware";
import { IAlert, IAlertStore } from "interfaces/IStore";
import create from "zustand";

let useAlertStore = create<IAlertStore>()(
  devtools(
    ((set) => ({
      alert: null,
      setAlert: (alert: IAlert | null) => {
        set({ alert });
      },
    }))
  )
);

export default useAlertStore;
