export interface INavItem {
  id: number;
  name: string;
  label: string;
  icon: string;
  children: INavItem[];
  reports: INavReport[];
  top: boolean;
}

export interface INavReport {
  id: number;
  name: string;
  label: string;
  reportUrl: string;
  isMain?: boolean
}

export interface IBreadcrumb {
  label: string;
  name: string;
  url?: string
}