
import { Action } from 'redux'

import { myFirebase, db } from "../../firebase/firebase";
import * as types from "./actionTypes";
import { Dispatch } from "redux";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { IGoal, IGoalDeep, CreateGoals, CreateNewGoal } from "../model/goal.model";
import { IProject } from "../model/project.model";
import { ThunkAction } from 'redux-thunk'
import { beginApiCall, apiCallComplete, firebaseGet, firebaseUpsert, firebaseUpsertBatch, AppApiError } from "./apiStatusActions";
import { RootState } from "../reducers/rootReducer";
import { ILoadEntityListAction, ILoadEntitySingleAction } from "./entityActions";
import { AppDispatch } from '../store/configureStore';
import * as _ from "underscore";
import { IRecord } from '../model/record.model';


// saveGoal
// fetchGoals

export interface IFetchGoalCriteria {
  id?: string;
  projectId?: string;
}
export const FETCH_GOALS = 'goals/fetchAll';
export const fetchGoals = createAsyncThunk<
  IGoalDeep[],
  IFetchGoalCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  FETCH_GOALS,
  // Declare the type your function argument here:
  async (criteria: IFetchGoalCriteria, thunkApi) => {
    try {
      // load goals
      let query = db.collectionGroup("Goals");
      if (criteria.id) {
        query = query.where('id', '==', criteria.id);
      }
      if (criteria.projectId) {
        query = query.where('projectId', '==', criteria.projectId);
      }
      let user = myFirebase.auth().currentUser;
      let goalsSnapshot = await firebaseGet({
        action: FETCH_GOALS,
        query,
        dispatch: thunkApi.dispatch,
      });
      let goals = goalsSnapshot.docs.map(doc => doc.data() as IGoalDeep);

      // load related projects


      let projectIds = goalsSnapshot.docs.map(doc => doc.data().projectId);
      projectIds = projectIds.filter(id => !!id);
      let projectDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] = [];
      let recordDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] = [];

      if (projectIds.length) {
        // LOAD IN CHUNKS
        let chunks = _.chunk(projectIds, 10);
        for (let iChunk = 0; iChunk < chunks.length; iChunk++) {

          const idChunk = chunks[iChunk];

          let qProjects = db.collection("Projects").where('id', 'in', idChunk);
          let qRecords = db.collection("Records").where('projectId', 'in', idChunk);
          let chunkSnapshots = await firebaseGet({
            action: FETCH_GOALS,
            query: qProjects,
            dispatch: thunkApi.dispatch,
          });
          let chunkRecordSnapshots = await firebaseGet({
            action: FETCH_GOALS,
            query: qRecords,
            dispatch: thunkApi.dispatch,
          });
          projectDocs = projectDocs.concat(chunkSnapshots.docs);
          recordDocs = recordDocs.concat(chunkRecordSnapshots.docs);
        }


        let projects = projectDocs.map(doc => doc.data() as IProject);
        let records = recordDocs.map(doc => doc.data() as IRecord);
        goals = goals.map(goal => {
          let prj = projects.find(p => p.id === goal.projectId);
          let record = records.find(r => r.projectId === goal.projectId);
          goal.project = prj;
          goal.record = record;
          return goal;
        });
      }



      return goals;
    } catch (error) {
      // debugger;

      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)

export interface ICreateGoalCriteria {

}
export const CREATE_GOAL = 'goals/create';
export const createGoals = createAsyncThunk<
  IGoal[],
  ICreateGoalCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  CREATE_GOAL,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {
      //get empty instance of the model with default values
      let goals = CreateGoals();
      return goals as IGoal[];
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)

export interface ISaveGoalCriteria {
  entities: IGoalDeep[];
}
export const SAVE_GOAL = 'goals/save';
export const saveGoal = createAsyncThunk<
  IGoalDeep[],
  ISaveGoalCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  SAVE_GOAL,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {

      // Save only the Shallow portion
      let goals = await firebaseUpsertBatch({
        action: SAVE_GOAL,
        entities: criteria.entities,
        dispatch: thunkApi.dispatch,
        getState: thunkApi.getState(),
        colPath: "Goals",
      });

      return goals as IGoalDeep[];
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)

