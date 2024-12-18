

import { createReducer } from "@reduxjs/toolkit";
import * as _ from "underscore";
import { IActivity } from '../model/activity.model';
import * as activityActions from '../actions/activityActions';
import { IEntityState } from '../model/entity-state.model';

export interface IActivityState extends IEntityState<IActivity> {
  lastError?: string;
}

export const initialState: IActivityState = {
  list: {},
  requesting: false,
  mutations: 0,
};

export const reducer = createReducer(initialState, builder =>
  builder
    // #### fetchActivities ####
    .addCase(activityActions.fetchActivities.fulfilled, (state, action) => {
      let idxList = _.indexBy(action.payload, p => p.id);
      let newState = {
        ...state,
        list: {
          ...state.list,
          ...idxList
        }
      };
      // console.log(`newState: ${JSON.stringify(newState, null, 2)}`);
      return newState;
    })
    .addCase(activityActions.fetchActivities.rejected, (state, action) => {
      let lastError = action.error && action.error.message;
      console.error(`${action.type}: ${lastError}`);
      return {
        ...state,
        lastError
      };
    })
    .addCase(activityActions.fetchActivities.pending, (state, action) => {
      // handle: the request is sent (but not yet received...)
      return state;
    })
    // #### saveProject ####

    //CREATE_PROJECT
    .addCase(activityActions.createActivity.fulfilled, (state, action) => {
      return {
        ...state,
        single: {
          ...action.payload
        }
      };
    })
    .addCase(activityActions.saveActivity.rejected, (state, action) => {
      let lastError = action.error && action.error.message;
      console.error(`${action.type}: ${lastError}`);
      return {
        ...state,
        lastError
      };
    })
    .addCase(activityActions.saveActivity.fulfilled, (state, action) => {
      return {
        ...state,
        list: {
          ...state.list,
          ...{ [action.payload.id]: action.payload }
        },
        single: {
          ...action.payload
        }
      };
    })
);
