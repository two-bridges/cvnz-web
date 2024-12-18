import firebase from "firebase";
import { IUser } from "./user.model";

export interface IFbUid {
  uid: string,
}


export interface IUserSession {
  loggedIn: boolean,
  isLoggingIn: boolean,
  user?: IUser,
  fbUser?: IFbUid,
  isSysAdmin: boolean,
  orgId?: string,
  isOrgAdmin: boolean,
}

export function createLoggedOut() {
  return {
    loggedIn: false,
    isLoggingIn: false,
    isSysAdmin: false,
    isOrgAdmin: false,
  } as IUserSession;
}

export function createLoggedOutOrgSession(orgId: string, isOrgAdmin: boolean, isSysAdmin: boolean) {
  return {
    loggedIn: false,
    isLoggingIn: false,
    isSysAdmin,
    isOrgAdmin,
    orgId,
  } as IUserSession;
}

export function createLoggedOutSysAdminSession() {
  return {
    loggedIn: false,
    isLoggingIn: false,
    isSysAdmin: true,
    isOrgAdmin: false,
  } as IUserSession;
}

export function createLoggingIn() {
  return {
    loggedIn: false,
    isLoggingIn: true,
    isSysAdmin: false,
    isOrgAdmin: false,
  } as IUserSession;
}

export function createLoggedIn(options: { user: IUser, fbUser: IFbUid, isSysAdmin: boolean, orgId?: string, isOrgAdmin: boolean }) {
  return {
    loggedIn: true,
    isLoggingIn: false,
    user: options.user,
    fbUser: options.fbUser,
    isSysAdmin: options.isSysAdmin,
    orgId: options.orgId,
    isOrgAdmin: options.isOrgAdmin,
  } as IUserSession;
}