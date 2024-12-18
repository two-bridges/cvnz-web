
import * as _ from "underscore";
import * as editableOrganisationActions from "../actions/editableOrganisationActions";
import { IEditableEntityState } from "../model/entity-state.model";
import { IOrganisation } from "../model/organisation.model";
import { rootState } from './rootReducer';

export interface IOrganisationState extends IEditableEntityState<IOrganisation> { }
export const initialState: IOrganisationState = {
  entity: undefined,
};

export function reducer(state = rootState?.editableOrganisation, action: editableOrganisationActions.ActionTypes): IOrganisationState {
  switch (action.type) {
    case editableOrganisationActions.SET_ORGANISATION_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: action.lastError,
      };
    case editableOrganisationActions.UNSET_ORGANISATION_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: '',
      };
    case editableOrganisationActions.SET_ORGANISATION:
      console.log(`Reducer - ${action.type}`);
      const newState = {
        ...state,
        entity: {
          ...action.entity
        } as IOrganisation,
        entityState: action.entityState,
      };
      return newState;
    case editableOrganisationActions.UNSET_ORGANISATION:
      console.log(`Reducer - ${action.type}`);
      return {
        ...initialState
      };
    default:
      return state ?? {};
  }
}
