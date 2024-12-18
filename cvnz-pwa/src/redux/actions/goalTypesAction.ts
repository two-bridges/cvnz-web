

import { db } from "../../firebase/firebase";
import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGoalType } from "../model/goal.model";
import { firebaseGet, AppApiError } from "./apiStatusActions";
import { RootState } from "../reducers/rootReducer";
import * as _ from "underscore";


// fetchGoalTypes

export interface IFetchGoalTypeCriteria {
  id?: string;
}
export const FETCH_GOALS = 'goalTypes/fetchAll';
export const fetchGoalTypes = createAsyncThunk<
  IGoalType[],
  IFetchGoalTypeCriteria,
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
  async (criteria: IFetchGoalTypeCriteria, thunkApi) => {
    try {
      // load goals
      let query = db.collectionGroup("GoalTypes");
      if (criteria.id) {
        query = query.where('id', '==', criteria.id);
      }

      let goalsSnapshot = await firebaseGet({
        action: FETCH_GOALS,
        query,
        dispatch: thunkApi.dispatch,
      });
      let goalTypes = goalsSnapshot.docs.map(doc => doc.data() as IGoalType);
      return goalTypes;
    } catch (error) {
      throw error;
    }
  }
)
