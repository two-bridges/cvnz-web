
import { myFirebase, db } from "../../firebase/firebase";
import * as types from "./actionTypes";
import { Dispatch } from "redux";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkAction } from 'redux-thunk'
import { beginApiCall, apiCallComplete, firebaseGet, firebaseUpsert, AppApiError } from "./apiStatusActions";
import { RootState } from "../reducers/rootReducer";
import { ILoadEntityListAction, ILoadEntitySingleAction } from "./entityActions";
import { IActivity, CreateNewActivity, IActivityDeep, convertToFirebase } from "../model/activity.model";
import { IProject } from "../model/project.model";
import * as _ from "underscore";
export const createNewActivity = (data) => (dispatch) => {
  // debugger;
  dispatch({ type: types.ACTIVITY_CREATE });
  //  var data = {"name":"test name","value":"test value"};
  return db.collection("Activity").doc(data.id).set(data)

    .then(function () {
      console.log("Document activity successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document activity: ", error);
    })
    ;

};


export const ACTIVITY_LIST_LOAD = 'ACTIVITY_LIST_LOAD';
export interface ILoadActivityListAction extends ILoadEntityListAction<IActivityDeep> {
  type: typeof ACTIVITY_LIST_LOAD;
}

export function loadActivityList(options: {
  id?: string,
  projectId?: string,
}) {
  let action = ACTIVITY_LIST_LOAD;
  return async function (dispatch: Dispatch, getState: RootState) {
    try {

      let query = db.collectionGroup("Activities");

      if (options.id) {
        query = query.where('id', '==', options.id);
      }

      if (options.projectId) {
        query = query.where('projectId', '==', options.projectId);
      }

      let snapshot = await firebaseGet({
        action, query, dispatch, getState,
      });;

      let list = snapshot.docs.map(doc => doc.data() as IActivityDeep);

      return await dispatch({
        type: ACTIVITY_LIST_LOAD,
        success: true,
        list
      } as ILoadActivityListAction);

    } catch (error) {
      throw error;
    }
  };
}


export interface IFetchActivitiesCriteria {
  id?: string;
}
export const FETCH_ACTIVITIES = 'activities/fetchAll';
export const fetchActivities = createAsyncThunk<
  IActivityDeep[],
  IFetchActivitiesCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  FETCH_ACTIVITIES,
  // Declare the type your function argument here:
  async (criteria: IFetchActivitiesCriteria, thunkApi) => {
    try {
      // debugger;

      let query = db.collectionGroup("Activities");
      if (criteria.id) {
        query = query.where('id', '==', criteria.id);
      }
      let user = myFirebase.auth().currentUser;
      let activitiesSnapshot = await firebaseGet({
        action: FETCH_ACTIVITIES,
        query,
        dispatch: thunkApi.dispatch,
      });

      let activity = activitiesSnapshot.docs.map(doc => doc.data() as IActivityDeep);
      // load related projects
      let projectIds = activitiesSnapshot.docs.map(doc => doc.data().projectId);
      projectIds = projectIds.filter(id => !!id);

      let projectDocs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] = [];


      if (projectIds.length) {
        // LOAD IN CHUNKS
        let chunks = _.chunk(projectIds, 10);
        for (let iChunk = 0; iChunk < chunks.length; iChunk++) {

          const idChunk = chunks[iChunk];

          let qProjects = db.collection("Projects").where('id', 'in', idChunk);
          let chunkSnapshots = await firebaseGet({
            action: FETCH_ACTIVITIES,
            query: qProjects,
            dispatch: thunkApi.dispatch,
          });

          projectDocs = projectDocs.concat(chunkSnapshots.docs);
        }
        //collection group won't work here - it needs indexing
        //let qProjects = db.collectionGroup("Projects").where('id', 'in', projectIds);

        // for (var i = 0; i < projectIds.length; i++) {
        //   qProjects = qProjects.where("id", "==", projectIds[i]);

        //   console.log("qProjects", qProjects);
        // }

        // let projectsSnapshot = await firebaseGet({
        //   action: FETCH_GOALS,
        //   query: qProjects,
        //   dispatch: thunkApi.dispatch,
        // });
        let projects = projectDocs.map(doc => doc.data() as IProject);
        activity = activity.map(activity => {
          let prj = projects.find(p => p.id === activity.projectId);
          activity.project = prj;
          return activity;
        });
      }
      // if (projectIds.length) {
      //   //collection group won't work here - it needs indexing
      //   let qProjects = db.collection("Projects").where('id', 'in', projectIds);

      //   let projectsSnapshot = await firebaseGet({
      //     action: FETCH_ACTIVITIES,
      //     query: qProjects,
      //     dispatch: thunkApi.dispatch,
      //   });
      //   let projects = projectsSnapshot.docs.map(doc => doc.data() as IProject);
      //   activity = activity.map(activity => {
      //     let prj = projects.find(p => p.id === activity.projectId);
      //     activity.project = prj;
      //     return activity;
      //   });
      // }
      return activity;
    } catch (error) {
      // debugger;
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)



export interface ISaveActivityCriteria {
  entity: IActivityDeep;
}
export const SAVE_ACTIVITY = 'activities/save';
export const saveActivity = createAsyncThunk<
  IActivityDeep,
  ISaveActivityCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  SAVE_ACTIVITY,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {
      let activity = await firebaseUpsert({
        action: SAVE_ACTIVITY,
        entity: criteria.entity,
        dispatch: thunkApi.dispatch,
        getState: thunkApi.getState(),
        colPath: "Activities",
        convertToFirebase: convertToFirebase as any
      });
      return activity as IActivityDeep;
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)
export interface ICreateActivityCriteria {

}
export const CREATE_ACTIVITY = 'activities/create';
export const createActivity = createAsyncThunk<
  IActivityDeep,
  ICreateActivityCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  CREATE_ACTIVITY,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {
      //get empty instance of the model with default values
      let activity = CreateNewActivity();
      return activity as IActivityDeep;
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)
