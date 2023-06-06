import { IPDFReport } from "interfaces/IPDFReport";
import { IFileStore } from "interfaces/IStore";
import { fileService } from "services/file.service";
import create from "zustand";

const log = (config: any) => (set: any, get: any, api: any) =>
  config(
    (args: any) => {
      console.log("Applying useFileStore", args);
      set(args);
      console.log("New State useFileStore", get());
    },
    get,
    api
  );

let useFileStore = create<IFileStore>(
  log((set: any) => ({
    filesData: null,
    getFilesData: async (id: string) => {
      await fileService
        .getFiles(id)
        .then((response) => set({ filesData: response.data }));
    },
    getFilesByDate: async (id: string, date: string) => {
      await fileService
        .getFilesByDate(id, date)
        .then((response) => set({ filesData: response.data }));
    },
    filesDateRange: null,
    getFilesDateRange: async (id: string) => {
      await fileService
        .getFilesDates(id)
        .then((response) => set({ filesDateRange: response.data }));
    },
    fileGroups: null,
    getFileGroups: async () => {
      await fileService
        .getFileGroups()
        .then((response) => set({ fileGroups: response.data }));
    },
    createPDFReport: async (pdfReport: IPDFReport) => {
      await fileService.createPDFReport(pdfReport);
    },
    editPDFReport: async (pdfReport: IPDFReport, id: number) => {
      await fileService.editPDFReport(pdfReport, id);
    },
    deletePDFReport: async (id: number) => {
      await fileService.deletePDFReport(id);
    },
    getPDFReport: async (id: number) => {
      await fileService
        .getPDFReport(id)
        .then((response) => set({ pdfREport: response.data }));
    },
    pdfReport: null,
    getPDFReportList: async (payload: any) => {
      await fileService.getPDFReportList(payload).then((response) =>
        set({
          pdfReportList: {
            content: response.data.content,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
          },
        })
      );
    },
    pdfReportList: null,
    editStatusPDFReport: async (status: boolean, id: number) => {
      await fileService.editStatusPDFReport(status, id);
    },
  }))
);

export default useFileStore;
