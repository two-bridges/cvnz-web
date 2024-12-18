
import { CreateNewProject } from 'src/redux/model/project.model';
import { Action } from 'redux'

import { myFirebase, db } from "../../firebase/firebase";
import * as types from "./actionTypes";
import { Dispatch } from "redux";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { IProject } from "../model/project.model";
import { ThunkAction } from 'redux-thunk'
import { beginApiCall, apiCallComplete, firebaseGet, firebaseUpsert, AppApiError } from "./apiStatusActions";
import { RootState } from "../reducers/rootReducer";
import { ILoadEntityListAction, ILoadEntitySingleAction } from "./entityActions";
import { AppDispatch } from '../store/configureStore';
import { IRecord, CreateNewRecord, IRecordDeep, convertToFirebase } from '../model/record.model';
import { isRecord } from 'immutable';


export const RECORD_LIST_LOAD = 'RECORD_LIST_LOAD';
export interface ILoadRecordListAction extends ILoadEntityListAction<IRecordDeep> {
  type: typeof RECORD_LIST_LOAD;
}

export function loadRecordList(options: {
  id?: string,
  projectId?: string,
}) {
  let action = RECORD_LIST_LOAD;
  return async function (dispatch: Dispatch, getState: RootState) {
    try {

      let query = db.collectionGroup("Records");

      if (options.id) {
        query = query.where('id', '==', options.id);
      }
      if (options.id) {
        query = query.where('projectId', '==', options.projectId);
      }

      let snapshot = await firebaseGet({
        action, query, dispatch, getState,
      });;

      let list = snapshot.docs.map(doc => doc.data() as IRecordDeep);

      return await dispatch({
        type: RECORD_LIST_LOAD,
        success: true,
        list
      } as ILoadRecordListAction);

    } catch (error) {
      throw error;
    }
  };
}

export interface IFetchRecordsCriteria {
  id?: string;
  projectId?: string;
}
export const FETCH_RECORDS = 'records/fetchAll';
export const fetchRecords = createAsyncThunk<
  IRecordDeep[],
  IFetchRecordsCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  FETCH_RECORDS,
  // Declare the type your function argument here:
  async (criteria: IFetchRecordsCriteria, thunkApi) => {
    try {
      // debugger;

      let query = db.collectionGroup("Records");
      if (criteria.id) {
        query = query.where('id', '==', criteria.id);
      }
      if (criteria.projectId) {
        query = query.where('projectId', '==', criteria.projectId);
      }
      let user = myFirebase.auth().currentUser;
      let recordSnapshot = await firebaseGet({
        action: FETCH_RECORDS,
        query,
        dispatch: thunkApi.dispatch,
      });

      let record = recordSnapshot.docs.map(doc => doc.data() as IRecordDeep);
      // load related projects
      let projectIds = recordSnapshot.docs.map(doc => doc.data().projectId);
      projectIds = projectIds.filter(id => !!id);
      if (projectIds.length) {
        //collection group won't work here - it needs indexing
        let qProjects = db.collection("Projects").where('id', 'in', projectIds);

        let projectsSnapshot = await firebaseGet({
          action: FETCH_RECORDS,
          query: qProjects,
          dispatch: thunkApi.dispatch,
        });
        let projects = projectsSnapshot.docs.map(doc => doc.data() as IProject);
        record = record.map(record => {
          let prj = projects.find(p => p.id === record.projectId);
          record.project = prj;
          return record;
        });
      }

      return record;

    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)





export interface ISaveRecordCriteria {
  entity: IRecord;
}
export const SAVE_RECORD = 'records/save';
export const saveRecord = createAsyncThunk<
  IRecord,
  ISaveRecordCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  SAVE_RECORD,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {
      let record = await firebaseUpsert({
        action: SAVE_RECORD,
        entity: criteria.entity,
        dispatch: thunkApi.dispatch,
        getState: thunkApi.getState(),
        colPath: "Records",
        convertToFirebase: convertToFirebase as any
      });
      return record as IRecord;
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)
export interface ICreateRecordCriteria {

}
export const CREATE_RECORD = 'records/create';
export const createRecord = createAsyncThunk<
  IRecord,
  ICreateRecordCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  CREATE_RECORD,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {
      //get empty instance of the model with default values
      let record = CreateNewRecord();
      return record as IRecord;
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)

