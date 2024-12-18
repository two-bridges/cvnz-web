

import { Action } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";
import { rootState } from "../reducers/rootReducer";
import { IOrganisation } from '../model/organisation.model';

export const UNSET_ACTIVE_ORGANISATION = 'UNSET_ACTIVE_ORGANISATION';
export const SET_ACTIVE_ORGANISATION = 'SET_ACTIVE_ORGANISATION';

export type ActionTypes =
  | { type: typeof UNSET_ACTIVE_ORGANISATION; }
  | { type: typeof SET_ACTIVE_ORGANISATION; entity: IOrganisation | undefined }
  ;

export const unsetOrganisation = (): ActionTypes => ({
  type: UNSET_ACTIVE_ORGANISATION,
});

export const setOrganisation = (org: IOrganisation | undefined): ActionTypes => ({
  type: SET_ACTIVE_ORGANISATION,
  entity: org,
});

export const setActiveOrganisation = (org: IOrganisation): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  if (org) {
    sessionStorage.setItem('organisation', JSON.stringify(org))
    dispatch(setOrganisation(org));
  } else {
    sessionStorage.setItem('organisation', '')
    dispatch(setOrganisation(undefined));
  }
};
