
import { myFirebase, db } from "../../firebase/firebase";
import { Action, Dispatch, Store } from "redux";
import { firebaseGet, beginApiCall, AppApiError, apiCallComplete } from "./apiStatusActions";
import * as apiStatusActions from "./apiStatusActions";
import { rootState, RootState } from "../reducers/rootReducer";
import { createReducer, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { store } from "../store/configureStore";
import firebase from "firebase";
import { createLoggedOutSysAdminSession, createLoggedIn, createLoggedOut, IUserSession, createLoggedOutOrgSession } from "../model/userSession.model";
import { Result } from "src/lib/result.model";
import { IOrgUser, IUser } from "../model/user.model";
import { result } from "underscore";
import { lookupUser } from "./editableUserActions";

export const UNSET_USER_SESSION = 'UNSET_ADMIN_USER';
export const SET_USER_SESSION = 'SET_ADMIN_USER';

export type ActionTypes =
  | { type: typeof SET_USER_SESSION; payload: IUserSession }
  | { type: typeof UNSET_USER_SESSION; payload: IUserSession }
  ;

const setUserSession = (payload: IUserSession): ActionTypes => ({
  type: SET_USER_SESSION,
  payload,
});

const unsetUserSession = (): ActionTypes => ({
  type: UNSET_USER_SESSION,
  payload: createLoggedOut()
});

async function signInWithEmailAndPassword(email: string, password: string) {
  console.log(`Actions - Auth - loginAdmin()`);
  try {
    let auth = await myFirebase.auth().signInWithEmailAndPassword(email, password);
    if (auth.user) {
      return Result.CreateSuccess(auth.user);
    } else {
      return Result.CreateFailure<firebase.User>(`user not logged in`);
    }
  } catch (error) {
    return Result.CreateFailure<firebase.User>(`user not logged in ${new String(error)}`);
  }

}

async function isSysAdminUser(uid: string) {
  const sysAdminDocResult = await apiStatusActions.firebaseGetDocumentOrNull<IUser>({ docPath: `/Admins/${uid}` });
  if (sysAdminDocResult.isFailure) {
    return Result.CreateFailure<boolean>(sysAdminDocResult.error);
  }

  if (sysAdminDocResult.value) {
    return Result.CreateSuccess(true);
  } else {
    return Result.CreateSuccess(false);
  }
}

export type OrgRoleType = 'org_unregistered' | 'org_member' | 'org_admin';
async function getOrgRole(uid: string, orgId: string) {
  const orgUserDocResult = await apiStatusActions.firebaseGetDocumentOrNull<IUser>({ docPath: `/Organisations/${orgId}/Users/${uid}` });
  if (orgUserDocResult.isFailure) {
    return Result.CreateFailure<OrgRoleType>(orgUserDocResult.error);
  } else if (!orgUserDocResult.value) {
    return Result.CreateSuccess<OrgRoleType>('org_unregistered');
  }

  const orgAdminDocResult = await apiStatusActions.firebaseGetDocumentOrNull<IUser>({ docPath: `/Organisations/${orgId}/Admins/${uid}` });
  if (orgAdminDocResult.isFailure) {
    return Result.CreateFailure<OrgRoleType>(orgAdminDocResult.error);
  }
  if (orgAdminDocResult.value) {
    return Result.CreateSuccess<OrgRoleType>('org_admin');
  } else {
    return Result.CreateSuccess<OrgRoleType>('org_member');
  }
}

async function loadOrgSessionFromUid(uid: string, orgId: string) {

  const userDocResult = await apiStatusActions.firebaseGetDocumentOrNull<IUser>({ docPath: `/Users/${uid}` });
  if (userDocResult.isFailure) {
    return Result.CreateFailure<IUserSession>(userDocResult.error);
  } else if (!userDocResult.value) {
    return Result.CreateFailure<IUserSession>('Login documents missing?');
  }

  const user = userDocResult.value;
  const orgAccessResult = await getOrgRole(user.id, orgId);
  if (orgAccessResult.isFailure) {
    return Result.CreateFailure<IUserSession>(orgAccessResult.error);
  } else if (orgAccessResult.value === 'org_unregistered') {
    return Result.CreateFailure<IUserSession>(`Not registered in organisation ${orgId}`);
  }
  const isSysAdminResult = await isSysAdminUser(user.id);
  if (isSysAdminResult.isFailure) {
    return Result.CreateFailure<IUserSession>(isSysAdminResult.error);
  }
  const isSysAdmin = isSysAdminResult.value;
  const orgAccess = orgAccessResult.value;
  const session = createLoggedIn({
    user,
    fbUser: { uid },
    isSysAdmin,
    isOrgAdmin: orgAccess === 'org_admin',
    orgId,
  });

  return Result.CreateSuccess(session);
}

export const orgLoginAction = (options: { email: string, password: string, orgId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {

  const loginResult = await signInWithEmailAndPassword(options.email, options.password);
  if (loginResult.isFailure) {
    return Result.CreateFailure<IUserSession>(loginResult.error);
  }

  const fbUser = loginResult.value;
  const userDocResult = await apiStatusActions.firebaseGetDocumentOrNull<IOrgUser>({ docPath: `Organisations/${options.orgId}/Users/${fbUser.uid}` });

  // allow login, only if user is not disabled in organisation
  if (!userDocResult?.value?.isDisabled) {
    const sessionResult = await loadOrgSessionFromUid(fbUser.uid, options.orgId);
    dispatch(setUserSession(sessionResult.value));
    localStorage.setItem('user_session', JSON.stringify(sessionResult.value));
    return sessionResult;
  } else {
    return Result.CreateFailure("Login Failed, user is disabled");
  }

  // // TODO: syncronously call setAdminUser (this function is async but set is sync)
  // // source: 21:55 https://www.youtube.com/watch?v=emhwHjAsyss
  // if (auth.user) {
  //   dispatch(setUserSession(auth.user));
  //   localStorage.setItem('loggedInAdmin', JSON.stringify(auth.user));
  // } else {
  //   dispatch(unsetUserSession());
  // }

  // return auth.user;

};

export const sysAdminLoginAction = (email: string, password: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {

  const loginResult = await signInWithEmailAndPassword(email, password);
  if (loginResult.isFailure) {
    return Result.CreateFailure<IUserSession>(loginResult.error);
  }

  const fbUser = loginResult.value;
  const userDocResult = await apiStatusActions.firebaseGetDocumentOrNull<IUser>({ docPath: `/Users/${fbUser.uid}` });
  if (userDocResult.isFailure) {
    return Result.CreateFailure<IUserSession>(userDocResult.error);
  } else if (!userDocResult.value) {
    return Result.CreateFailure<IUserSession>('Login documents missing?');
  }
  const user = userDocResult.value;
  const isSysAdminResult = await isSysAdminUser(fbUser.uid);
  if (isSysAdminResult.isFailure) {
    return Result.CreateFailure<IUserSession>(isSysAdminResult.error);
  }
  const isSysAdmin = isSysAdminResult.value;
  if (isSysAdmin) {
    console.log('check sys admin');
    const session = createLoggedIn({
      user,
      fbUser,
      isSysAdmin,
      isOrgAdmin: false,
    });
    dispatch(setUserSession(session));

    localStorage.setItem('user_session', JSON.stringify(session));
    return Result.CreateSuccess(session);
  } else {
    return Result.CreateFailure<IUserSession>('Not a Sys Admin');
  }
};

// appear logged out but retain some critical knowledge of the user
// the idea here is that if a user signs out but then goes offline, they will be stuck offline and we cannot discover their organisation.  This is mainly for organisation users in the field (not for sys admins in the office, doing org setup duties)
// DG: consider replacing this "cache knowledge" with a smarter sign in page that lets the user choose their experience
export const signOut = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();
  let user = await myFirebase.auth().signOut();

  let session: IUserSession;
  if (state.userSessionV2.orgId) {
    // log out, but cache the org in local storage
    session = createLoggedOutOrgSession(state.userSessionV2.orgId, state.userSessionV2.isOrgAdmin, state.userSessionV2.isSysAdmin);
  } else {
    // log out, cache nothing
    session = createLoggedOut()
  }

  localStorage.setItem('user_session', JSON.stringify(session));
  dispatch(setUserSession(session));

  return user;
};

export const destroySession = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();
  let user = await myFirebase.auth().signOut();

  localStorage.removeItem('user_session');
  dispatch(unsetUserSession());

  return null;
};

// this is not a "sign in", it's just a session recovery feature
export const recoverOrgSession = (orgId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {

  let email = myFirebase.auth().currentUser?.email ?? '';
  let uid = myFirebase.auth().currentUser?.uid ?? '';

  if (email && uid) {
    const lookupResult = await lookupUser(email);
    if (lookupResult.isSuccess) {
      const sessionResult = await loadOrgSessionFromUid(uid, orgId);

      dispatch(setUserSession(sessionResult.value));
      localStorage.setItem('user_session', JSON.stringify(sessionResult.value));

    }
  }

};

// this is not a "sign in", it's just a session recovery feature
export const recoverStoredSession = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {

  // use session: from cache
  let storedSession = createLoggedOut();

  let jsonUserSession = localStorage.getItem('user_session');
  if (jsonUserSession) {
    // cached session is available
    storedSession = JSON.parse(jsonUserSession) as IUserSession;
  }

  if (storedSession) {
    dispatch(setUserSession(storedSession));
  }

};
