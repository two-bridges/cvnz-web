

import { createReducer } from "@reduxjs/toolkit";
import * as _ from "underscore";
import * as recordActions from '../actions/recordActions';
import { IEntityState } from '../model/entity-state.model';
import { IRecord } from '../model/record.model';

export interface IRecordState extends IEntityState<IRecord> {
  lastError?: string;
}

export const initialState: IRecordState = {
  list: {},
  requesting: false,
  mutations: 0,
};

export const reducer = createReducer(initialState, builder =>
  builder
    // #### fetchRecords ####
    .addCase(recordActions.fetchRecords.fulfilled, (state, action) => {
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
    .addCase(recordActions.fetchRecords.rejected, (state, action) => {
      let lastError = action.error && action.error.message;
      console.error(`${action.type}: ${lastError}`);
      return {
        ...state,
        lastError
      };
    })
    .addCase(recordActions.fetchRecords.pending, (state, action) => {
      // handle: the request is sent (but not yet received...)
      return state;
    })
    // #### save Record ####

    //CREATE_Record
    .addCase(recordActions.createRecord.fulfilled, (state, action) => {
      return {
        ...state,
        single: {
          ...action.payload
        }
      };
    })
    .addCase(recordActions.saveRecord.rejected, (state, action) => {
      let lastError = action.error && action.error.message;
      console.error(`${action.type}: ${lastError}`);
      return {
        ...state,
        lastError
      };
    })
    .addCase(recordActions.saveRecord.fulfilled, (state, action) => {
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
