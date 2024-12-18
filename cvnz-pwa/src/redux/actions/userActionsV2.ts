

import { myFirebase } from "../../firebase/firebase";
import { Action } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";
import { firebaseQuery } from "./apiStatusActions";
import { rootState } from "../reducers/rootReducer";
import { IOrgUser, IUser } from "../model/user.model";
import { Result } from "src/lib/result.model";

export const SET_ORG_USERS = 'SET_ORG_USERS';

export type ActionTypes =
  | { type: typeof SET_ORG_USERS; payload: IOrgUser[] }
  ;

export const setUsers = (users: IOrgUser[]): ActionTypes => ({
  type: SET_ORG_USERS,
  payload: users
});

export const loadUsers = (orgId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let membersResult = await getOrgMembers(orgId);
  if (membersResult.isFailure) {
    return Result.CreateFailure<IOrgUser[]>(`getOrgMembers: ${membersResult.error}`);
  }

  let adminsResult = await getOrgAdmins(orgId);
  if (adminsResult.isFailure) {
    return Result.CreateFailure<IOrgUser[]>(`getOrgAdmins: ${adminsResult.error}`);
  }

  let loginsResult = await getFieldbaseUsers(membersResult.value.map(e => e.id));
  if (loginsResult.isFailure) {
    return Result.CreateFailure<IOrgUser[]>(`getFieldbaseUsers: ${loginsResult.error}`);
  }

  let orgUsers = membersResult.value
    .filter(orgMember => {
      const fieldbaseLogin = loginsResult.value.find(login => login.id == orgMember.id);
      return !!fieldbaseLogin;
    })
    .map(orgMember => {
      const isOrgAdmin = !!adminsResult.value.find(admin => admin.id == orgMember.id);
      const fieldbaseLogin = loginsResult.value.find(login => login.id == orgMember.id);
      return {
        ...orgMember,
        ...fieldbaseLogin,
        isOrgAdmin
      } as IOrgUser;
    });

  dispatch(setUsers(orgUsers));
};

async function getOrgMembers(orgId: string) {
  let query = myFirebase.firestore().collection(`Organisations/${orgId}/Users`);
  return await firebaseQuery<IUser>(query);

}

async function getFieldbaseUsers(uids: string[]) {
  if (uids.length > 0) {
    let query = myFirebase.firestore().collection(`Users`).where('id', 'in', uids);
    return await firebaseQuery<IUser>(query);
  } else {
    return Result.CreateSuccess([] as IUser[]);
  }
}

async function getOrgAdmins(orgId: string) {
  let query = myFirebase.firestore().collection(`Organisations/${orgId}/Admins`);
  return await firebaseQuery<IUser>(query);
}
