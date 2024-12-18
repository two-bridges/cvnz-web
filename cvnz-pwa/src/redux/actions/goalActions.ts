

import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoal, CreateNewGoal } from "../model/goal.model";
import { AppApiError, firebaseUpsert } from "./apiStatusActions";
import { RootState } from "../reducers/rootReducer";
import * as _ from "underscore";

export interface ISaveGoalCriteria {
  entity: IGoal;
  colPath?: string;
}
export const SAVE_GOAL = 'goal/save';
export const saveSingleGoal = createAsyncThunk<
  IGoal,
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
      let goals = await firebaseUpsert({
        action: SAVE_GOAL,
        entity: criteria.entity,
        dispatch: thunkApi.dispatch,
        getState: thunkApi.getState(),
        colPath: criteria.colPath ? criteria.colPath : ''
      });

      return goals as IGoal;
    } catch (error) {
      throw error;
    }
  }
)




export interface ICreateSingleGoalCriteria {

}
export const CREATE_SINGLE_GOAL = 'goal/create';
export const createSingleGoal = createAsyncThunk<
  IGoal,
  ICreateSingleGoalCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  CREATE_SINGLE_GOAL,
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
