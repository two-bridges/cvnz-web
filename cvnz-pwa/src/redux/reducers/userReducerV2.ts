
import * as _ from "underscore";
import * as userActionsV2 from "../actions/userActionsV2";
import * as editableUserActions from "../actions/editableUserActions";
import * as editableOrganisationActions from "../actions/editableOrganisationActions";
import * as userSessionActions from '../actions/userSessionActions';
import { IEntityState } from "../model/entity-state.model";
import { IOrganisation } from "../model/organisation.model";
import { rootState } from './rootReducer';
import { IOrgUser, IUser } from "../model/user.model";

export interface IUserState extends IEntityState<IOrgUser> {
  lastError?: string;
}

export const initialState: IUserState = {
  list: {},
  single: undefined,
  requesting: false,
  mutations: 0,
};



export function reducer(state = rootState?.usersV2, action: userActionsV2.ActionTypes | editableUserActions.ActionTypes | editableOrganisationActions.ActionTypes): IUserState {
  switch (action.type) {
    case 'SET_ORGANISATION': {
      const newState = {
        ...state,
      };

      if (action.entityState === 'new') {
        newState.list = {};
      }

      return newState;
    }
    case 'REMOVE_USER': {
      console.log(`Reducer - userReducerV2 - ${action.type}`);
      const newState = {
        ...state,
      };

      newState.list = { ...newState.list };
      if (action.id && newState.list[action.id]) {
        delete newState.list[action.id];
      }

      return newState;
    }
    case 'SAVE_USER': {
      console.log(`Reducer - userReducerV2 - ${action.type}`);
      const newState = {
        ...state,
      };
      newState.list = { ...newState.list };
      if (action.entity?.id) {
        newState.list[action.entity.id] = action.entity;
      }

      return newState;
    }
    case 'SET_USER': {
      console.log(`Reducer - userReducerV2 - ${action.type}`);
      const newState = {
        ...state,
      };
      if (action.entityState === 'clean') {
        newState.list = { ...newState.list };
        if (action.entity?.id) {
          newState.list[action.entity.id] = action.entity;
        }
      }
      return newState;
    }
    case 'SET_ORG_USERS':
      console.log(`Reducer - ${action.type}`);

      const idx = action.payload.reduce((memo, item) => {
        memo[item.id] = item;
        return memo;
      }, {} as { [name: string]: IOrgUser });

      return {
        ...state,
        list: {
          ...idx
        }
      };
    default:
      return state ?? {};
  }
}
