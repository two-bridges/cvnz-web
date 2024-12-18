import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Risk } from "src/customviews/Scripts";
import { myFirebase } from "src/firebase/firebase";
import { rootState } from "../reducers/rootReducer";

export const GET_RISK_LIST = 'GET_RISK_LIST';
export type ActionTypes =
  | { type: typeof GET_RISK_LIST; payload: Risk[] }

export const setRisks = (risk: Risk[]): ActionTypes => ({
  type: GET_RISK_LIST,
  payload: risk
});

export const FETCH_RISKS = 'risks/fetchAll';


export const fetchRisks = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Risks").get();
  let risks = query.docs.map(doc => {
    return doc.data() as Risk
  });
  dispatch(setRisks(risks));
  return risks;
};
