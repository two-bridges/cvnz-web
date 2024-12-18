
import * as actionTypes from '../actions';
import { createReducer } from "@reduxjs/toolkit";
import * as _ from "underscore";
import * as organisationActions from '../actions/organisationActions';
import { IEntityState } from '../model/entity-state.model';
import { IOrganisation } from '../model/organisation.model';

export interface IOrganisationState extends IEntityState<IOrganisation> {
  lastError?: string;
}

export const initialState: IOrganisationState = {
  list: {},
  single: undefined,
  requesting: false,
  mutations: 0,
};

export const reducer = createReducer(initialState, builder => {
  //debugger;
  return builder
    // #### fetchOrganisations ####
    .addCase(organisationActions.fetchOrganisations.fulfilled, (state, action) => {
      let idxList = _.indexBy(action.payload, p => p.id);
      let idxListName = _.indexBy(action.payload, p => p.name);
      let newState = {
        ...state,
        list: {
          ...state.list,
          ...idxList,
          ...idxListName
        }
      };
      return newState;
    })
    .addCase(organisationActions.fetchOrganisations.rejected, (state, action) => {
      let lastError = action.error && action.error.message;
      console.error(`${action.type}: ${lastError}`);
      return {
        ...state,
        lastError
      };
    })
    .addCase(organisationActions.fetchOrganisations.pending, (state, action) => {
      // handle: the request is sent (but not yet received...)
      return state;
    })

}
);
