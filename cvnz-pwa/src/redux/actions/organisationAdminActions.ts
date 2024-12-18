import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { db, myFirebase } from "src/firebase/firebase";
import { rootState } from "src/redux/reducers/rootReducer";
import _ from "underscore";
import { IUser } from "../model/user.model";

export const GET_ORGANISATION_ADMIN = 'GET_ORGANISATION_ADMIN';
export const GET_ORGANISATION_ADMINS = 'GET_ORGANISATION_ADMINS';

export type ActionTypes =
  | { type: typeof GET_ORGANISATION_ADMIN; payload: IUser }
  | { type: typeof GET_ORGANISATION_ADMINS; payload: IUser[] }

export const setSingleAdmin = (organisationGoals: IUser): ActionTypes => ({
  type: GET_ORGANISATION_ADMIN,
  payload: organisationGoals
});

export const setMultipleAdmins = (organisationadmins: IUser[]): ActionTypes => ({
  type: GET_ORGANISATION_ADMINS,
  payload: organisationadmins
});


export const fetchOrganisationAdmin = (options: { organisationId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Admins").get();

  let orgUser = query.docs.map(doc => {
    return doc.data() as IUser
  });
  dispatch(setSingleAdmin(orgUser[0]));
  return orgUser[0];
};


export const fetchOrganisationAdmins = (options: { organisationId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Admins").get();

  let orgUser = query.docs.map(doc => {
    return doc.data() as IUser
  });
  dispatch(setMultipleAdmins(orgUser));
  return orgUser;
};
