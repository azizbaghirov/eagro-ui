import { IFileGroup, IFilesData, IPDFReport } from "./IPDFReport";
import { INavItem, INavReport } from "./INavigation";
import { IUser } from "./IUser";
import { IOperation } from "./IAdmin";

export interface IReportStore {
  reports: INavItem[];
  getReportList: () => void;
  breadcrumb: string[];
  setBreadcrumb: (breadcrumb: string[]) => void;
  reportParams: string[];
  setReportParams: (reportParams: string[]) => void;
  selectedReport: INavReport;
  setSelectedReport: (selectedReport: INavReport) => void;
  reportUrl: string;
  getReportUrl: (id: number) => void;
  defaultReportParams: string[];
  setDefaultReportParams: (defaultReportParams: string[]) => void;
}

export interface IAlertStore {
  alert: IAlert | null;
  setAlert: (allert: IAlert | null) => void;
}

export interface IAlert {
  errMessage?: string;
  successMessage?: string;
  confirmMessage?: string;
  alertAction?: () => void;
  isConfirmRequired?: boolean;
  isAuthError?: boolean;
}

export interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  device: string;
  setDevice: (device: string) => void;
  isNavMenuOpened: boolean;
  toggleIsNavMenuOpened: (isNavMenuOpened: boolean) => void;
}

export interface ILoaderStore {
  isLoading: boolean;
  toggleIsLoading: (isLoading: boolean) => void;
}

export interface IFileStore {
  filesData: IFilesData;
  getFilesData: (id: string) => void;
  filesDateRange: string[];
  getFilesDateRange: (id: string) => void;
  getFilesByDate: (id: string, date: string) => void;
  fileGroups: IFileGroup[];
  getFileGroups: () => void;
  createPDFReport: (pdfReport: IPDFReport) => Promise<void>;
  editPDFReport: (pdfReport: IPDFReport, id: number) => Promise<void>;
  editStatusPDFReport: (status: boolean, id: number) => void;
  deletePDFReport: (id: number) => Promise<void>;
  getPDFReport: (id: number) => void;
  getPDFReportList: (payload: any) => void;
  pdfReportList: any;
  pdfReport: IPDFReport;
}

export interface IAdminStore {
  operationList: IOperation[];
  getOperationList: () => void;
  selectedOperation: IOperation;
  setSelectedOperation: (selectedOperaion: IOperation) => void;
}
