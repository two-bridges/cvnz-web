

import { Action } from "redux";
import { ThunkAction } from "@reduxjs/toolkit";
import { firebaseUpsertDocument, firebaseGetDocument } from "./apiStatusActions";
import { rootState } from "../reducers/rootReducer";
import { IOrganisation } from '../model/organisation.model';
import { EntityStateType } from "../model/entity-state.model";
import { snakeCase } from "change-case";
import { LATITUDE, LONGITUDE } from "src/constants/constants";
export const SAVE_ORGANISATION = 'SAVE_ORGANISATION';
export const UNSET_ORGANISATION = 'UNSET_ORGANISATION';
export const SET_ORGANISATION = 'SET_ORGANISATION';
export const SET_ORGANISATION_ERROR = 'SET_ORGANISATION_ERROR';
export const UNSET_ORGANISATION_ERROR = 'UNSET_ORGANISATION_ERROR';

export type ActionTypes =
  | { type: typeof UNSET_ORGANISATION; }
  | { type: typeof SET_ORGANISATION; entity: IOrganisation; entityState: EntityStateType }
  | { type: typeof SET_ORGANISATION_ERROR; lastError: string }
  | { type: typeof UNSET_ORGANISATION_ERROR; }
  ;

export const unsetOrganisation = (): ActionTypes => ({
  type: UNSET_ORGANISATION,
});

export const setOrganisation = (org: IOrganisation, entityState: EntityStateType): ActionTypes => ({
  type: SET_ORGANISATION,
  entity: org,
  entityState,
});

export const setOrganisationError = (lastError: string): ActionTypes => ({
  type: SET_ORGANISATION_ERROR,
  lastError,
});

export const unsetOrganisationError = (): ActionTypes => ({
  type: UNSET_ORGANISATION_ERROR,
});

export const loadOrganisation = (id: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(unsetOrganisationError());

  let result = await firebaseGetDocument<IOrganisation>({
    colPath: 'Organisations',
    docId: id,
  });

  if (result.isSuccess) {
    // firebase online
    dispatch(setOrganisation(result.value, 'clean'));
    sessionStorage.setItem("organisation", JSON.stringify(result.value));
    return result.value;
  } else {
    // firebase offline - check localstorage
    let orgStored = sessionStorage.getItem('organisation');
    if (orgStored) {
      const org = JSON.parse(orgStored) as IOrganisation;
      if (org.id === id) {
        dispatch(setOrganisation(org, 'clean'));
        return org;
      }
    }
    dispatch(setOrganisationError(result.error));
    return undefined;
  }
};

export const loadLocalOrganisation = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let orgStored = sessionStorage.getItem('organisation');
  if (orgStored) {
    const org = JSON.parse(orgStored) as IOrganisation;
    dispatch(loadOrganisation(org.id));
  }
};

export async function doesOrgExist(orgId: string) {
  let result = await firebaseGetDocument<IOrganisation>({
    colPath: 'Organisations',
    docId: orgId,
  });

  return result.isSuccess;
}

export const newOrganisation = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(unsetOrganisationError());

  const org = {
    hq_location: {
      address: '',
      googleMapId: '',
      longitude: LONGITUDE,
      latitude: LATITUDE,
    }
  } as IOrganisation;
  dispatch(setOrganisation(org, 'new'));

};

export const saveOrganisation = (org: IOrganisation): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {

  dispatch(unsetOrganisationError());
  const state = getState();
  let entity = { ...org } as IOrganisation;
  if (!(org?.name ?? '').trim()) {
    // Error: Blank Name
    dispatch(setOrganisationError(`Org name is required`));
    return false;
  }

  if (!entity.id) {
    // ## NEW ##
    entity.id = snakeCase(entity.name ?? '');
    if (await doesOrgExist(entity.id)) {
      // Error: Duplicate Key
      dispatch(setOrganisationError(`OrgId '${entity.id}' already exists, please change name`));
      return false;
    }
  }

  // ## SAVE ##
  const result = await firebaseUpsertDocument({
    colPath: 'Organisations',
    doc: entity,
    byUser: state.userSessionV2.user,
  });

  if (result.isSuccess) {
    // organisationsV2 reducer will add this to its list
    dispatch(setOrganisation(result.value, 'clean'));
    return true;
  } else {
    dispatch(setOrganisationError(result.error));
  }
  return false;

};
