

import { db, myFirebase } from "../../firebase/firebase";
import { Dispatch } from "redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseGet, firebaseUpsert, AppApiError } from "./apiStatusActions";
import { RootState } from "../reducers/rootReducer";
import { convertToFirebase, CreateNewOrganisation, IOrganisation } from '../model/organisation.model';


export type FnLoadOrganisationList = (args: IFetchOrganisationCriteria) => Promise<{ payload: IFetchOrganisationResponse, type: string, meta: { arg: IFetchOrganisationCriteria, requestId: string } }>;

export interface IFetchOrganisationCriteria {
  id?: string;
  created_by?: string;
  name?: string;
}
export type IFetchOrganisationResponse = IOrganisation[];
export const FETCH_ORGANISATION = 'organisation/fetchAll';
export const fetchOrganisations = createAsyncThunk<
  IFetchOrganisationResponse,
  IFetchOrganisationCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  FETCH_ORGANISATION,
  // Declare the type your function argument here:
  async (criteria: IFetchOrganisationCriteria, thunkApi) => {
    try {
      let query = myFirebase.firestore().collectionGroup("Organisations");
      if (criteria.id) {
        query = query.where('id', '==', criteria.id);
      }
      if (criteria.name) {
        query = query.where('name', '==', criteria.name);
      }

      let snapshot = await firebaseGet({
        action: FETCH_ORGANISATION,
        query,
        dispatch: thunkApi.dispatch,
      });

      return snapshot.docs.map(doc => doc.data() as IOrganisation);
    } catch (error) {
      throw error;
    }
  }
)

export interface ISaveOrganisationCriteria {
  entity: IOrganisation;
  colPath: string;
}
export const SAVE_ORGANISATION = 'organisation/save';
export const saveOrganisation = createAsyncThunk<
  IOrganisation,
  ISaveOrganisationCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(
  SAVE_ORGANISATION,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {

    try {
      let organisation = await firebaseUpsert({
        action: SAVE_ORGANISATION,
        entity: criteria.entity,
        dispatch: thunkApi.dispatch,
        getState: thunkApi.getState(),
        colPath: criteria.colPath,
        convertToFirebase: convertToFirebase as any
      });

      return organisation as IOrganisation;
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)
export interface ICreateOrganisationCriteria {
}
export const CREATE_ORGANISATION = 'organisation/create';
export const createOrganisation = createAsyncThunk<
  IOrganisation,
  ICreateOrganisationCriteria,
  {
    dispatch: Dispatch,
    state: RootState,
    extra: {
    },
    rejectValue: AppApiError
  }
>(

  CREATE_ORGANISATION,
  // Declare the type your function argument here:
  async (criteria, thunkApi) => {
    try {

      //get empty instance of the model with default values
      let organisation = CreateNewOrganisation();
      return organisation as IOrganisation;
    } catch (error) {
      throw error; // return thunkApi.rejectWithValue({ errorMessage: `firebase error: [${JSON.stringify(error, null, 2)}]` } as AppApiError);
    }
  }
)
