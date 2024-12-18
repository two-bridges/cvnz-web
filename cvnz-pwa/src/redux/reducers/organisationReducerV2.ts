
import * as _ from "underscore";
import { ActionTypes } from "../actions/organisationActionsV2";
import * as editableOrganisationActions from "../actions/editableOrganisationActions";
import * as userSessionActions from '../actions/userSessionActions';
import { IEntityState } from "../model/entity-state.model";
import { IOrganisation } from "../model/organisation.model";
import { rootState } from './rootReducer';

export interface IOrganisationState extends IEntityState<IOrganisation> {
  lastError?: string;
}

export const initialState: IOrganisationState = {
  list: {},
  single: undefined,
  requesting: false,
  mutations: 0,
};



export function reducer(state = rootState?.organisationsV2, action: ActionTypes | editableOrganisationActions.ActionTypes): IOrganisationState {
  switch (action.type) {
    case 'SET_ORGANISATION':
      console.log(`Reducer - Organisation V2 - ${action.type}`);
      const newState = {
        ...state
      };
      if (action.entityState === 'clean') {
        newState.list = { ...newState.list };
        if (action.entity.id) {
          newState.list[action.entity.id] = action.entity;
        }
      }
      return newState;
    case 'SET_ORGANISATIONS':
      console.log(`Reducer - Organisation V2 - ${action.type}`);
      return {
        ...state,
        list: {
          ...action.payload.reduce((memo, item) => {
            memo[item.id] = item;
            return memo;
          }, {} as { [name: string]: IOrganisation })
        }
      };
    default:
      return state ?? {};
  }
}
