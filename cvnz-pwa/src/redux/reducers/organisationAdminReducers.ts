import * as _ from "underscore";
import { IGoal, IGoalType } from "src/redux/model/goal.model";
import { rootState } from "./rootReducer";

import * as organisationAdminActions from '../actions/organisationAdminActions';
import { element } from "prop-types";
import { IUser } from "../model/user.model";


export interface IOrganisationAdminState {
  single: IUser | undefined,
  list: IUser[],
  initialCheck: boolean,
}

export const initialState: IOrganisationAdminState = {
  single: undefined,
  list: [],
  initialCheck: false,
};




export function reducer(state = rootState?.organisationAdminReducers, action: organisationAdminActions.ActionTypes) {
  switch (action.type) {
    case 'GET_ORGANISATION_ADMIN':
      return {
        ...state,
        single: { ...action.payload },
      };
    case 'GET_ORGANISATION_ADMINS':
      return {
        ...state,
        list: { ...action.payload },
      };
    default:
      return state ?? {};
  }
}
