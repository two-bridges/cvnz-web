
import { CreateNewProject } from 'src/redux/model/project.model';
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

//set Visible
export interface ISetVisibleCriteria {
  visible: boolean;
}

export const SET_VISIBLE = 'saveBar/setVisible';
export const setVisible = createAsyncThunk<
  boolean,
  ISetVisibleCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  SET_VISIBLE,
  // Declare the type your function argument here:
  async (criteria: ISetVisibleCriteria, thunkApi) => {
    return criteria.visible;

  }
)

//set Visible
export interface IIncrementCounterCriteria {
  // counter: number;
}

export const INCREMENT_COUNTER = 'saveBar/incrementCounter';
export const incrementCounter = createAsyncThunk<
  number,
  ISetVisibleCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  INCREMENT_COUNTER,
  // Declare the type your function argument here:
  async (criteria: ISetVisibleCriteria, thunkApi) => {
    return thunkApi.getState().saveBar.counter + 1;

  }
)
