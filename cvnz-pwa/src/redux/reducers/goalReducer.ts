
import { createReducer } from "@reduxjs/toolkit";
import * as _ from "underscore";
import { IGoalDeep } from '../model/goal.model';
import * as goalActions from '../actions/goalsActions';
import * as projectActions from '../actions/projectActions';
import { IEntityState } from '../model/entity-state.model';

export interface IGoalState extends IEntityState<IGoalDeep> {
  lastError?: string;
}

export const initialState: IGoalState = {
  list: {},
  requesting: false,
  mutations: 0,
};

export const reducer = createReducer(initialState, builder =>
  builder
    .addCase(projectActions.fetchProjects.fulfilled, (state, action) => {
      let newState = {
        ...state,
        mutations: state.mutations + 1,
        list: {}
      };
      // console.log(`newState: ${JSON.stringify(newState, null, 2)}`);
      return newState;
    })
    // #### fetchGoals ####
    .addCase(goalActions.fetchGoals.fulfilled, (state, action) => {
      let idxList = _.indexBy(action.payload, p => p.id);
      let newState = {
        ...state,
        list: {
          ...state.list,
          ...idxList
        }
      };
      return newState;
    })
    .addCase(goalActions.fetchGoals.rejected, (state, action) => {
      let lastError = action.error && action.error.message;
      console.error(`${action.type}: ${lastError}`);
      return {
        ...state,
        lastError
      };
    })
    .addCase(goalActions.fetchGoals.pending, (state, action) => {
      // handle: the request is sent (but not yet received...)
      return state;
    })
    // #### saveProject ####
    .addCase(goalActions.saveGoal.rejected, (state, action) => {
      let lastError = action.error && action.error.message;
      console.error(`${action.type}: ${lastError}`);
      return {
        ...state,
        lastError
      };
    })
    .addCase(goalActions.saveGoal.fulfilled, (state, action) => {
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
);
