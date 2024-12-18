
import { convertToFirebase, convertToFirebaseShallow, CreateNewProject, IProjectDeep } from 'src/redux/model/project.model';
import { Action } from 'redux'

import { myFirebase, db } from "../../firebase/firebase";
import { Dispatch } from "redux";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { IProject } from "../model/project.model";
import { ThunkAction } from 'redux-thunk'
import { beginApiCall, apiCallComplete, firebaseGet, firebaseUpsert, AppApiError } from "./apiStatusActions";
import { RootState } from "../reducers/rootReducer";
import { ILoadEntityListAction, ILoadEntitySingleAction } from "./entityActions";
import { AppDispatch } from '../store/configureStore';
import { IProjectRisk } from '../model/risk.model';


export type FnLoadProjectList = (args: IFetchProjectsCriteria) => Promise<{ payload: IFetchProjectsResponse, type: string, meta: { arg: IFetchProjectsCriteria, requestId: string } }>;

export interface IFetchProjectsCriteria {
  id?: string;
  orgId?: string;
}
export type IFetchProjectsResponse = IProject[];
export const FETCH_PROJECTS = 'projects/fetchAll';
export const fetchProjects = createAsyncThunk<
  IFetchProjectsResponse,
  IFetchProjectsCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  FETCH_PROJECTS,
  async (criteria: IFetchProjectsCriteria, thunkApi) => {
    try {
      let query = (await db.collection("Organisations").doc(criteria.orgId).collection("Projects").get()).query;
      if (criteria.id) {
        query = query.where('id', '==', criteria.id);
      }
      let snapshot = await firebaseGet({
        action: FETCH_PROJECTS,
        query,
        dispatch: thunkApi.dispatch,
      });
      let project = snapshot.docs.map(doc => doc.data() as IProjectDeep);
      let projectRiskTypeDoc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] = [];
      let projectRiskList: IProjectRisk[] = [];

      if (project && criteria.id) {
        //load risks
        let projectRisks = (await db.collection("Organisations").doc(criteria.orgId).collection("Projects").doc(criteria.id).collection("ProjectRisks").get()).query;
        let snapshot = await firebaseGet({
          action: FETCH_PROJECTS,
          query: projectRisks,
          dispatch: thunkApi.dispatch,
        });
        projectRiskTypeDoc = snapshot.docs;
        projectRiskList = projectRiskTypeDoc.map(doc => doc.data() as IProjectRisk);

      }
      return snapshot.docs.map(doc => {
        let project = doc.data() as IProjectDeep;
        if (projectRiskList) {
          project.projectRisk = projectRiskList;
        }
        return project;
      });
    } catch (error) {
      throw error;

    }
  }
)

export interface ISaveProjectCriteria {
  entity: IProject;
  colPath?: string
}
export const SAVE_PROJECT = 'projects/save';
export const saveProject = createAsyncThunk<
  IProject,
  ISaveProjectCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  SAVE_PROJECT,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {
      let project = await firebaseUpsert({
        action: SAVE_PROJECT,
        entity: criteria.entity,
        dispatch: thunkApi.dispatch,
        getState: thunkApi.getState(),
        colPath: criteria.colPath ? criteria.colPath : '',
        convertToFirebase: convertToFirebaseShallow as any
      });
      return project as IProject;
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)
export interface ICreateProjectCriteria {

}
export const CREATE_PROJECT = 'projects/create';
export const createProject = createAsyncThunk<
  IProjectDeep,
  ICreateProjectCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  CREATE_PROJECT,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {
      //get empty instance of the model with default values
      let project = CreateNewProject();
      return project as IProjectDeep;
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)
