

import { db, myFirebase } from "../../firebase/firebase";
import { Action, Dispatch } from "redux";
import { createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { firebaseGet, firebaseUpsert, AppApiError, firebaseQuery } from "./apiStatusActions";
import { rootState, RootState } from "../reducers/rootReducer";
import { convertToFirebase, CreateNewOrganisation, IOrganisation } from '../model/organisation.model';

export const SET_ORGANISATIONS = 'SET_ORGANISATIONS';

export type ActionTypes =
  | { type: typeof SET_ORGANISATIONS; payload: IOrganisation[] }
  ;

export const setOrganisations = (orgs: IOrganisation[]): ActionTypes => ({
  type: SET_ORGANISATIONS,
  payload: orgs
});

export const loadOrganisations = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {

  let query = myFirebase.firestore().collectionGroup("Organisations");

  let orgsResult = await firebaseQuery<IOrganisation>(query);

  if (orgsResult.isSuccess) {
    dispatch(setOrganisations(orgsResult.value));
  }

};
