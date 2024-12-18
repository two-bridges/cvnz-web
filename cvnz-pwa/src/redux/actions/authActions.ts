
import { myFirebase, db } from "../../firebase/firebase";
import { Action, Dispatch, Store } from "redux";
import { firebaseGet, beginApiCall, AppApiError, apiCallComplete } from "./apiStatusActions";
import { rootState, RootState } from "../reducers/rootReducer";
import { createReducer, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { store } from "../store/configureStore";
import firebase from "firebase";
import { IUser } from "../model/user.model";
import * as fb from "./apiStatusActions";


export const SET_ORG_USER_LOGIN_SUCCESS = 'ORG_USER_LOGIN_SUCCESS';
export const SET_ORG_USER_DETAILS = 'SET_ORG_USER_DETAILS';
export const SET_ORG_USER_LOGIN_FAILURE = 'ORG_USER_LOGIN_ERROR';
export const UNSET_ORG_USER_LOGIN_FAILURE = 'UNSET_ORG_USER_LOGIN_FAILURE';
export const SET_ORG_USER_LOGOUT = 'ORG_USER_LOGOUT';

export type ActionTypes =
  | { type: typeof SET_ORG_USER_LOGIN_SUCCESS; entity: IUser; }
  | { type: typeof SET_ORG_USER_DETAILS; entity: IUser; }
  | { type: typeof SET_ORG_USER_LOGOUT; }
  ;

export const setOrgUserLoginSuccess = (org: IUser): ActionTypes => ({
  type: SET_ORG_USER_LOGIN_SUCCESS,
  entity: org,
});

export const setOrgUserDetails = (user: IUser): ActionTypes => ({
  type: SET_ORG_USER_DETAILS,
  entity: user,
});

export type setOrgUserLoginSuccessType = typeof setOrgUserLoginSuccess;
export const setOrgUserLogout = (): ActionTypes => ({
  type: SET_ORG_USER_LOGOUT,
});

export const logoutOrgUser = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  // firebase sign in 
  let user = await fb.firebaseSignOut();

  dispatch(setOrgUserLogout());
};

export const AUTH_CHECK = 'auth/check';
export const check = createAsyncThunk<
  { user: firebase.User | null },
  {},
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  AUTH_CHECK,
  // Declare the type your function argument here:
  async (params, thunkApi) => {
    try {
      let user = myFirebase
        .auth()
        .currentUser;

      var abc = user ? { ...user } : null;
      return { user };

    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);

    }
  }
)
