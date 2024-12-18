
import * as _ from "underscore";
import * as editableUserActions from "../actions/editableUserActions";
import { IEditableEntityState } from "../model/entity-state.model";
import { IOrgUser, IUser } from "../model/user.model";
import { rootState } from './rootReducer';

export interface IUserState extends IEditableEntityState<IOrgUser> { }
export const initialState: IUserState = {
  entity: undefined,
};

export function reducer(state = rootState?.editableUser, action: editableUserActions.ActionTypes): IUserState {
  switch (action.type) {
    case editableUserActions.SET_USER:
      console.log(`Reducer - ${action.type}`);
      const newState = {
        ...state,
        entity: {
          ...action.entity
        } as IOrgUser,
        entityState: action.entityState,
      };
      return newState;
    case editableUserActions.UNSET_USER:
      console.log(`Reducer - ${action.type}`);
      return {
        ...initialState
      };
    default:
      return state ?? {};
  }
}
