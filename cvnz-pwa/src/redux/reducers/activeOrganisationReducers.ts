import * as _ from "underscore";
import { rootState } from "./rootReducer";

import * as activeOrganisationActions from '../actions/activeOrganisationActions';
import { IOrganisation } from "../model/organisation.model";


export interface IActiveOrganisationState {
  initialCheck: boolean,
  single?: IOrganisation,
}

export const initialState: IActiveOrganisationState = {
  initialCheck: false,
  single: undefined,
};

export function reducer(state = rootState?.activeOrganisationReducers, action: activeOrganisationActions.ActionTypes) {
  switch (action.type) {
    case 'SET_ACTIVE_ORGANISATION':
      return {
        ...state,
        single: action.entity
      };
    default:
      return state ?? {};
  }
}
