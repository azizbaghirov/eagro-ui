export interface IMap {
  organization1?: IOrganization1;
}

export interface IOrganization1 {
  name: string;
  value: string;
}

export interface IOrganizationInfo {
  organizations: string[];
  factArea: number;
  factUse: string;
  district: string;
}
