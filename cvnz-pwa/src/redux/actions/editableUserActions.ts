
import firebase from 'firebase';
import { myFirebase, db } from "../../firebase/firebase";
import { Action } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";
import * as apiStatusActions from "./apiStatusActions";
import { rootState } from "../reducers/rootReducer";
import { EntityStateType } from "../model/entity-state.model";
import { snakeCase } from "change-case";
import { IOrgUser, IUser, orgUserToFieldbaseUser } from "../model/user.model";
import uuid from 'uuid/v1';
import { Result } from "src/lib/result.model";
import { IUserSession } from '../model/userSession.model';

export const SAVE_USER = 'SAVE_USER';
export const UNSET_USER = 'UNSET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const DISABLE_USER = "DISABLE_USER";
export const SET_USER = 'SET_USER';

export type ActionTypes =
  | { type: typeof UNSET_USER; }
  | { type: typeof SET_USER; entity: IOrgUser | undefined; entityState: EntityStateType }
  | { type: typeof SAVE_USER; entity: IOrgUser; }
  | { type: typeof REMOVE_USER; id: string; }
  | { type: typeof DISABLE_USER; id: string; }
  ;

export const unsetUser = (): ActionTypes => ({
  type: UNSET_USER,
});

export const setUser = (user: IOrgUser | undefined, entityState: EntityStateType): ActionTypes => ({
  type: SET_USER,
  entity: user,
  entityState,
});

export const saveUser = (user: IOrgUser): ActionTypes => ({
  type: SAVE_USER,
  entity: user,
});
export const removeUser = (id: string): ActionTypes => ({
  type: REMOVE_USER,
  id,
});

export const disableUser = (id: string): ActionTypes => ({
  type: DISABLE_USER,
  id,
});
export async function doesEmailExist(email: string) {
  let result = await apiStatusActions.firebaseGetDocument<IOrgUser>({
    colPath: 'Users',
    docId: email,
  });

  return result.isSuccess;
}

export const newUser = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {

  const org = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  } as IOrgUser;

  dispatch(setUser(org, 'new'));

};

export const sendOrganisationInviteLoginAction = (email: string, orgId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  console.log(`Invite Email: ${email} to ${orgId}`);
  const result = await apiStatusActions.sendOrganisationInviteLogin(email, orgId);
  if (result.isFailure) {
    console.error(result.error);
  }

  return result;
};

export const sendPasswordResetEmail = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {

  const result = await apiStatusActions.sendPasswordResetEmail();

};

export const updatePassword = (code: string, newPassword: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let result = await apiStatusActions.updatePassword(code, newPassword);
  return result;
};

export const verifyPasswordResetCode = (code: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let result = await apiStatusActions.verifyPasswordResetCode(code);
  return result;
};


export interface IUserLookup {
  uid: string;
  email: string;
}

type TypFnLookupUser = (data: { params: { email: string } }) => { data: { user: IUserLookup } };
export async function lookupUser(email: string) {
  const app = firebase.app();
  const functions = app.functions("australia-southeast1");
  const fnLookupUser = functions.httpsCallable("lookupUser") as any as TypFnLookupUser;

  try {
    const result = await fnLookupUser({ params: { email } });

    console.dir(result);
    if (result?.data?.user) {
      return Result.CreateSuccess(result?.data?.user);
    } else {
      return Result.CreateSuccess({ uid: '', email: '' });
    }

  } catch (error) {
    return Result.CreateFailure<IUserLookup>(error as string);
  }
}

// returns: uid as string
async function createOrGetLogin(user: IUser) {
  if (!user) {
    return Result.CreateFailure<string>(`createFirebaseLoginIfMissing: missing user`);
  } else {
    let existsResult = await apiStatusActions.loginExists({ email: user?.email });
    if (existsResult.isSuccess) {
      if (existsResult.value) {

        const lookupResult = await lookupUser(user?.email);
        if (lookupResult.isSuccess && lookupResult.value?.uid) {
          return Result.CreateSuccess(lookupResult.value.uid);
        } else {
          return Result.CreateFailure<string>(`Lookup User: not found?`);
        }
      } else {
        const password = uuid().substring(0, 8);
        console.log("password", password);
        let registerResult = await apiStatusActions.registerUser({ email: user.email, password });

        if (registerResult.isSuccess) {
          return Result.CreateSuccess(registerResult.value.uid);
        } else {
          return Result.CreateFailure<string>(`User reg. failed: ${registerResult.error}`);
        }
      }
    } else {
      return Result.CreateFailure<string>(`Login lookup failed: ${existsResult.error}`);
    }
  }
}

async function upsertFieldBaseUserIfMissing(user: IOrgUser, byUser: IUser) {

  if (user.id) {

    // apiStatusActions.updateTimestamps(user, byUser);
    const doc = orgUserToFieldbaseUser(user);

    console.dir(['upsertFieldBaseUserIfMissing', user]);
    const userResult = await apiStatusActions.firebaseUpsertDocument({
      colPath: `/Users`,
      doc,
      byUser
    });

    return userResult;

  } else {

    return Result.CreateFailure<IUser>(`user.id was missing`);
  }

}

async function createOrGetOrganisationUser(orgUser: IOrgUser, byUser: IUser) {
  const userDocResult = await apiStatusActions.firebaseUpsertDocument({
    colPath: `Organisations/${orgUser.orgId}/Users`,
    doc: {
      ...orgUser,
    },
    byUser,
  });

  return userDocResult;
}

async function removeOrgUser() {

}

async function removeOrgMember(user: IOrgUser, byUserSession: IUserSession) {
  if (!byUserSession.isSysAdmin) {
    return Result.CreateFailure<IUser>('Must be SysAdmin');
  } else if (!byUserSession.user) {
    return Result.CreateFailure<IUser>('Must be logged in');
  } else if (user.isOrgAdmin) {
    return Result.CreateFailure<IUser>('Unset Org Admin first');
  }

  const result = await apiStatusActions.firebaseDeleteDocument({
    docPath: `Organisations/${user.orgId}/Users/${user.id}`,
  });
  return result;
}

async function disableOrgMember(user: IOrgUser, byUserSession: IUserSession) {
  if (!byUserSession.isSysAdmin) {
    return Result.CreateFailure<IUser>('Must be SysAdmin');
  } else if (!byUserSession.user) {
    return Result.CreateFailure<IUser>('Must be logged in');
  } else if (user.isOrgAdmin) {
    return Result.CreateFailure<IUser>('Unset Org Admin first');
  }
  let colPath = `Organisations/${user.orgId}/Users`;
  const result = await apiStatusActions.firebaseUpsertBatchV3({
    entities: [user],
    colPath: colPath,
  });
  return result;
}
export const removeOrgMemberAction = (orgUser: IOrgUser): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();

  const result = await removeOrgMember(orgUser, state.userSessionV2);
  if (result.isSuccess) {
    dispatch(removeUser(orgUser.id));
  }
  return result;
}

export const disableOrgMemberAction = (orgUser: IOrgUser): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();

  const result = await disableOrgMember(orgUser, state.userSessionV2);
  if (result.isSuccess) {
    dispatch(disableUser(orgUser.id));
  }
  return result;
}
async function setOrgAdminRole(user: IOrgUser, byUserSession: IUserSession) {
  if (!byUserSession.isSysAdmin) {
    return Result.CreateFailure<IUser>('Must be SysAdmin');
  } else if (!byUserSession.user) {
    return Result.CreateFailure<IUser>('Must be logged in');
  }

  const result = await apiStatusActions.firebaseUpsertDocument<IUser>({
    colPath: `Organisations/${user.orgId}/Admins`,
    doc: {
      ...user,
    },
    byUser: byUserSession.user,
  });

  return result;
}

async function unsetOrgAdminRole(user: IOrgUser, byUserSession: IUserSession) {
  if (!byUserSession.isSysAdmin) {
    return Result.CreateFailure<IUser>('Must be SysAdmin');
  } else if (!byUserSession.user) {
    return Result.CreateFailure<IUser>('Must be logged in');
  }

  const result = await apiStatusActions.firebaseDeleteDocument({
    docPath: `Organisations/${user.orgId}/Admins/${user.id}`,
  });

  return result;
}



export const unsetOrgAdminAction = (orgUser: IOrgUser): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();

  orgUser.isOrgAdmin = false;
  const result = await unsetOrgAdminRole(orgUser, state.userSessionV2);
  if (result.isSuccess) {
    dispatch(saveUser(orgUser));
  }
  return result;
}

export const setOrgAdminAction = (orgUser: IOrgUser): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();

  orgUser.isOrgAdmin = true;
  const result = await setOrgAdminRole(orgUser, state.userSessionV2);
  if (result.isSuccess) {
    dispatch(saveUser(orgUser));
  }
  return result;
}

export const removeOrgUserAction = (orgUser: IOrgUser): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();

  orgUser.isOrgAdmin = true;
  const result = await setOrgAdminRole(orgUser, state.userSessionV2);
  if (result.isSuccess) {
    dispatch(saveUser(orgUser));
  }
  return result;
}

export const addMemberToOrgAction = (orgUser: IOrgUser): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();

  const addResult = await addMemberToOrg(orgUser, state.userSessionV2);
  if (addResult.isSuccess) {
    dispatch(saveUser(orgUser));
    await dispatch(sendOrganisationInviteLoginAction(orgUser.email, orgUser.orgId));
  }
  return addResult;
}

export async function addMemberToOrg(orgUser: IOrgUser, byUserSession: IUserSession) {
  // validate user
  if (!orgUser) {
    return Result.CreateFailure<IOrgUser>(`addUserToOrg: missing user`);
  }

  // check sys admin
  if (!byUserSession.isSysAdmin) {
    return Result.CreateFailure<IOrgUser>(`only an admin can add users`);
  }

  if (!byUserSession.user) {
    return Result.CreateFailure<IOrgUser>(`missing user session`);
  }

  // Firebase login
  let loginResult = await createOrGetLogin(orgUser);
  if (loginResult.isFailure) {
    return Result.CreateFailure<IOrgUser>(`${loginResult.error} [createOrGetLogin]`);
  }

  // Fieldbase record
  const uid = loginResult.value;
  orgUser.id = uid;
  let fieldbaseUserResult = await upsertFieldBaseUserIfMissing(orgUser, byUserSession.user);
  if (fieldbaseUserResult.isFailure) {
    return Result.CreateFailure<IOrgUser>(`${fieldbaseUserResult.error} [upsertFieldBaseUserIfMissing]`);
  }

  // Orgnisation Record  
  let orgUserResult = await createOrGetOrganisationUser(orgUser, byUserSession.user);
  if (orgUserResult.isFailure) {
    return Result.CreateFailure<IOrgUser>(`${orgUserResult.error} [createOrGetOrganisationUser]`);
  }

  if (orgUser.isOrgAdmin) {
    const adminResult = await setOrgAdminRole(orgUser, byUserSession);
    if (adminResult.isFailure) {

      return Result.CreateFailure<IOrgUser>(`${adminResult.error} [setOrgAdminRoleToUser]`);
    }
  }

  return orgUserResult;
}
