export interface IUser {
  id: number;
  name: string;
  pin: string;
  surname: string;
  fatherName: string;
  status: boolean;
  roles?: IRole[];
  authorities: string[]
}

export interface IRole {
  id: string;
  name: string;
}
