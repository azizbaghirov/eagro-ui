import { IOperation } from "interfaces/IAdmin";
import { IAdminStore } from "interfaces/IStore";
import { adminService } from "services/admin.service";
import create from "zustand";

const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      console.log("Applying useAdminStore", args);
      set(args);
      console.log("New State useAdminStore", get());
    },
    get,
    api
  );

let useAdminStore = create<IAdminStore>(
  log((set: any) => ({
    operationList: null,
    getOperationList: async () => {
      await adminService.getNavList().then((response) => {
        set({ operationList: response.data });
        set({ selectedOperation: response.data[0] });
      });
    },
    selectedOperaion: null,
    setSelectedOperation: (selectedOperation: IOperation) =>
      set({ selectedOperation: selectedOperation }),
  }))
);

export default useAdminStore;
