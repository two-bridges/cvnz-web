
import * as _ from "underscore";
import * as userSessionActions from '../actions/userSessionActions';
import { createLoggedOut, IUserSession } from "../model/userSession.model";
import { rootState } from './rootReducer';

export const initialState: IUserSession = createLoggedOut();

export function reducer(state = rootState?.userSessionV2, action: userSessionActions.ActionTypes) {
  switch (action.type) {
    case 'SET_ADMIN_USER':
      console.log(`Reducer - userSession - SET_ADMIN_USER`);
      return { ...action.payload };
    case 'UNSET_ADMIN_USER':
      console.log(`Reducer - userSession - UNSET_ADMIN_USER`);
      return { ...createLoggedOut() };
    default:
      return state ?? {};
  }
}
