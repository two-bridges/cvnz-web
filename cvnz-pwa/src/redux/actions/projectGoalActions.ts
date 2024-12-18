

import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoal, CreateNewGoal, convertToFirebase, IGoalDeep, IGoalType } from "../model/goal.model";
import { AppApiError, firebaseGet, firebaseUpsert } from "./apiStatusActions";
import { RootState } from "../reducers/rootReducer";
import * as _ from "underscore";
import { db, myFirebase } from "src/firebase/firebase";
export interface ICreateAndAddGoalCriteria {

}
export const CREATE_AND_ADD_GOAL = 'goal/create';

export const createAndAddGoal = createAsyncThunk<
  IGoal,
  ICreateAndAddGoalCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  CREATE_AND_ADD_GOAL,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {
      //get empty instance of the model with default values
      let goals = CreateNewGoal();
      return goals as IGoal;
    } catch (error) {
      throw error;
    }
  }
)



export interface ISaveGoalCriteria {
  entity: IGoalDeep;
  colPath?: string;
}
export const SAVE_GOAL = 'goal/save';
export const saveGoal = createAsyncThunk<
  IGoalDeep,
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
      debugger;
      // Save only the Shallow portion
      let goal = await firebaseUpsert({
        action: SAVE_GOAL,
        entity: criteria.entity,
        dispatch: thunkApi.dispatch,
        getState: thunkApi.getState(),
        convertToFirebase: convertToFirebase as any,
        colPath: criteria.colPath ? criteria.colPath : ''
      });

      return goal as IGoalDeep;
    } catch (error) {
      throw error;
    }
  }
)

export interface IFetchGoalCriteria {
  id?: string;
  projectId?: string;
  orgId?: string;
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
  async (criteria: IFetchGoalCriteria, thunkApi) => {
    try {
      // load goals
      let query = (await db.collection("Organisations")
        .doc(criteria.orgId)
        .collection("Projects").doc(criteria.projectId)
        .collection("Goals").get())
        .query;

      if (criteria.id) {
        query = query.where('id', '==', criteria.id);
      }

      let goalsSnapshot = await firebaseGet({
        action: FETCH_GOALS,
        query,
        dispatch: thunkApi.dispatch,
      });

      let goals = goalsSnapshot.docs.map(doc => doc.data() as IGoalDeep);
      let goalTypeIds = goalsSnapshot.docs.map(doc => doc.data().goalTypeId);
      let goalTypeDoc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] = [];

      // load related goalTypes
      let qGoalTypes = db.collection("GoalTypes").where('id', 'in', goalTypeIds);

      let chunkGoalTypeSnapshots = await firebaseGet({
        action: FETCH_GOALS,
        query: qGoalTypes,
        dispatch: thunkApi.dispatch,
      });
      goalTypeDoc = goalTypeDoc.concat(chunkGoalTypeSnapshots.docs);

      let goalTypes = goalTypeDoc.map(doc => doc.data() as IGoalType);

      goals = goals.map(goal => {
        let goalType = goalTypes.find(r => parseInt(r.id) === goal.goalTypeId);
        goal.goalType = goalType;
        return goal;
      });
      return goals;
    } catch (error) {
      throw error;
    }
  }
)
