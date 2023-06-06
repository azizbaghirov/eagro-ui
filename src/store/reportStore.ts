import create from "zustand";
import { reportService } from "services/report.service";
import { IAlert, IReportStore } from "interfaces/IStore";
import { INavItem } from "interfaces/INavigation";
import useLoaderStore from "./loaderStore";
import useAlertStore from "./alertStore";

const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      // console.log("Applying", args);
      set(args);
      // console.log("New State", get());
    },
    get,
    api
  );

let useReportStore = create<IReportStore>(
  log((set: any) => ({
    reports: [],
    getReportList: async () => {
      useLoaderStore.setState({ isLoading: true });
      await reportService
        .getReportList()
        .then((response) => {
          set({ reports: response.data });
        })
        .catch((err) => {
          console.log(err);
          const { status } = err.response;

          switch (status) {
            case 401:
            case 403: {
              window.location.pathname = "/login";
              break;
            }
            default: {
              const alert: IAlert = {
                errMessage: "System Error",
                alertAction: () => useAlertStore.setState({ alert: null }),
              };
              useAlertStore.setState({ alert });
            }
          }
        })
        .finally(() => {
          useLoaderStore.setState({ isLoading: false });
        });
    },
    breadcrumb: [],
    setBreadcrumb: async (names: string[]) => {
      await reportService.getLabelsByNames(names).then((response) => {
        set({ breadcrumb: response.data });
      });
    },
    reportParams: [],
    setReportParams: (reportParams: string) => {
      set({ reportParams });
    },
    reportUrl: "",
    getReportUrl: async (reportId: number) => {
      await reportService
        .getReportUrl(reportId)
        .then((response) => {
          set({ reportUrl: response.data });
        })
        .catch((err) => {
          console.log(err);
          const { status } = err.response;

          switch (status) {
            case 401: {
              window.location.pathname = "/login";
              break;
            }
            default: {
             const alert: IAlert = {
                errMessage: err.response.data.message,
                alertAction: () => useAlertStore.setState({ alert: null }),
              };
              useAlertStore.setState({ alert });
            }
          }
        });
    },
    selectedReport: null,
    setSelectedReport: (selectedReport: INavItem) => {
      set({ selectedReport });
    },
    defaultReportParams: null,
    setDefaultReportParams: (defaultReportParams: string) =>
      set({ defaultReportParams: defaultReportParams }),
  }))
);

export default useReportStore;
