export interface IFile {
  id: number;
  name: string;
  label: string;
  filePath: string;
  fileDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFilesData {
  id: number;
  name: string;
  label: string;
  files: IFile[];
}

export interface IFileGroup {
  id: number;
  name: string;
}

export interface IPDFReport {
  id?: number;
  name: string;
  fileDate: string;
  originalFileName?: string;
  status: boolean;
  groupId?: number;
  group?: IFileGroup;
  file?: File | null;
}
