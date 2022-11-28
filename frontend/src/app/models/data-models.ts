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
  dashboard_id: string,
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

  public get dashboardId(): string {
    return this.user.dashboard_id;
  }

}

export interface Status {
  id: string,
  name: string,
}

export interface Task {
  _id: string,
  name: string,
  theme: string,
  description: string,
  status: {
    _id: string,
    name: string,
  },
  executor: {
    _id: string,
    first_name: string,
    last_name: string,
  },
  creator: {
    _id: string,
    first_name: string,
    last_name: string,
  },
  dashborad: {
    _id: string,
    name: string,
  },
  createdAt: string,
  updatedAt: string,
  deadline: string,
}

export const StatusesColor = {
  'Stack': '#808080',
  'Analysis': '#BE9FE1',
  'Developing': '#FF8C69',
  'Testing': '#43BCD7',
  'Completed': '#75AB05'
}

export type StatusType = 'Stack' | 'Analysis' | 'Developing' | 'Testing' | 'Completed'