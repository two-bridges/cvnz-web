
import { createReducer } from "@reduxjs/toolkit";
import * as _ from "underscore";
import { IProject } from '../model/project.model';
import * as projectActions from '../actions/projectActions';
import { IEntityState } from '../model/entity-state.model';

export interface IProjectState extends IEntityState<IProject> {
  lastError?: string;
}

export const initialState: IProjectState = {
  list: {},
  requesting: false,
  mutations: 0,
};

export const reducer = createReducer(initialState, builder =>
  builder
    // #### fetchProjects ####
    .addCase(projectActions.fetchProjects.fulfilled, (state, action) => {
      let idxList = _.indexBy(action.payload, p => p.id);
      let newState = {
        ...state,
        mutations: state.mutations + 1,
        list: {
          ...state.list,
          ...idxList
        }
      };
      // console.log(`newState: ${JSON.stringify(newState, null, 2)}`);
      return newState;
    })
    .addCase(projectActions.fetchProjects.rejected, (state, action) => {
      let lastError = action.error && action.error.message;
      console.error(`${action.type}: ${lastError}`);
      return {
        ...state,
        mutations: state.mutations + 1,
        lastError
      };
    })
    .addCase(projectActions.fetchProjects.pending, (state, action) => {
      // handle: the request is sent (but not yet received...)
      return state;
    })
    // #### saveProject ####

    // CREATE_PROJECT
    .addCase(projectActions.createProject.fulfilled, (state, action) => {
      return {
        ...state,
        mutations: state.mutations + 1,
        single: {
          ...action.payload
        }
      };
    })
    .addCase(projectActions.saveProject.rejected, (state, action) => {
      let lastError = action.error && action.error.message;
      console.error(`${action.type}: ${lastError}`);
      return {
        ...state,
        mutations: state.mutations + 1,
        lastError
      };
    })
    .addCase(projectActions.saveProject.fulfilled, (state, action) => {
      return {
        ...state,
        mutations: state.mutations + 1,
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

//create a new action and add an empty one to single
//single: CreateNewProject(),

//on save dispath save 
//single : savedproject/id
