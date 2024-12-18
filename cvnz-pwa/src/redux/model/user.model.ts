

import { IEntity, NewEntity } from "./entity.model";

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}


export interface IOrgUser extends IUser {
  isOrgAdmin: boolean;
  isDisabled: boolean;
  orgId: string;
}

export function orgUserToFieldbaseUser(orgUser: IOrgUser) {
  const user = { ...orgUser } as any;
  delete user.orgId;
  delete user.isOrgAdmin;
  return user as IUser;
}