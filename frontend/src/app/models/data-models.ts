import DevExpress from "devextreme";

export type IDxFormItems = Array<
  | DevExpress.ui.dxFormSimpleItem
  | DevExpress.ui.dxFormGroupItem
  | DevExpress.ui.dxFormTabbedItem
  | DevExpress.ui.dxFormEmptyItem
  | DevExpress.ui.dxFormButtonItem
>;

export interface IAppDxTabItem {
  text: string
  path: string
  template: string
}

export interface IUser {
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  tel?: string,
  position?: string,
  access_level: string,
  organisation?: IOrganisation,
}

export interface IOrganisation {
  name: string,
  inn: string, 
  address: string,
}

export class User {
  private user: IUser;

  constructor(user: any) {
    this.user = user;
  }

  public get fullUser(): IUser {
    return this.user;
  }

  public get firstName(): string {
    return this.user.first_name;
  }

  public get lastName(): string {
    return this.user.last_name;
  }

  public get email(): string {
    return this.user.email;
  }

  public get tel(): string | undefined {
    return this.user.tel;
  }

  public get position(): string | undefined {
    return this.user.position;
  }

  public get accessLevel(): string {
    return this.user.access_level;
  }

  public get organisation(): IOrganisation | undefined {
    return this.user.organisation;
  }

}