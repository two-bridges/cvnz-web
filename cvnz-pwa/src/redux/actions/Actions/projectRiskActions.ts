import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { db, myFirebase } from "src/firebase/firebase";
import { Result } from "src/lib/result.model";
import { result } from "underscore";
import { convertToFirebase, IProjectRisk } from "../../model/risk.model";
import { rootState } from "../../reducers/rootReducer";
import { firebaseUpsertBatchV3 } from "../apiStatusActions";

export const SAVE_PROJECT_RISK = 'SAVE_PROJECT_RISK';
export const GET_PROJECT_RISK_LIST = 'GET_PROJECT_RISK_LIST';
export const SET_PROJECT_RISK_ERROR = 'SET_PROJECT_RISK_ERROR';

export type ActionTypes =
  | { type: typeof SAVE_PROJECT_RISK; payload: ({ risk: IProjectRisk, type: string }) }
  | { type: typeof GET_PROJECT_RISK_LIST; payload: IProjectRisk[] }
  | { type: typeof SET_PROJECT_RISK_ERROR; lastError: string }


export const savedRisk = (risk: IProjectRisk, type: string): ActionTypes => ({
  type: SAVE_PROJECT_RISK,
  payload: { risk, type }
});

export const setProjectRiskError = (lastError: string): ActionTypes => ({
  type: SET_PROJECT_RISK_ERROR,
  lastError,
});

export const addRisk = (risk: IProjectRisk, organisationId: string, projectId: string, type: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let state = getState();
  if (navigator.onLine) {
    var colpath = `Organisations/${organisationId}/Projects/${projectId}/ProjectRisks`;
    let riskSaved = (await firebaseUpsertBatchV3({
      entities: [risk],
      colPath: colpath,
      convertToFirebase: convertToFirebase as any,
      byUser: state.userSessionV2.user
    })) as Result<IProjectRisk[]>;

    console.dir(["riskSaved", riskSaved]);

    if (riskSaved.isSuccess) {
      // IMPORTANT NOTE: riskSaved?.value is currently IProjectRisk[] at runtime but IProjectRisk at compile time.  
      // it would be be best to use IProjectRisk at runtime.  eg. riskSaved?.value[0]
      // however, this requires testing first as it will impact the data stored in redux state
      dispatch(savedRisk(riskSaved?.value as unknown as IProjectRisk, type));
      return true;
    } else {
      dispatch(setProjectRiskError(riskSaved.error));
      return false;
    }
  } else {
    dispatch(setProjectRiskError(`No internet connection, please try again later.`));
    return false;
  }
};

export const setProjectRisks = (projectRisks: IProjectRisk[]): ActionTypes => ({
  type: GET_PROJECT_RISK_LIST,
  payload: projectRisks
});



export const fetchProjectRisks = (options: { organisationId: string, projectId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection("ProjectRisks").get();
  let risks = query.docs.map(doc => {
    return doc.data() as IProjectRisk
  });
  dispatch(setProjectRisks(risks));
  return risks;
};
