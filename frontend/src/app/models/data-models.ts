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
  visible: boolean
}

export interface IUser {
  user_id: string,
  first_name: string,
  last_name: string,
  email: string,
  tel?: string,
  position?: string,
  access_level: string,
  organisation_id?: string,
}

export interface IOrganisation {
  organisation_id: string,
  name: string,
  inn: string, 
  address: string,
  description: string,
}

export class User {
  private user: IUser;

  constructor(user?: any) {
    this.user = user;
  }

  public get id(): string {
    return this.user.user_id;
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

  public get getOrganisationId(): string | undefined {
    return this.user.organisation_id;
  }

  public set setOrganisationId(id: string) {
    this.user.organisation_id = id;
  }

}