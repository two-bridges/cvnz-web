import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IGoal } from "src/redux/model/goal.model";
import { rootState } from "src/redux/reducers/rootReducer";

export const SET_FIELD_NOTE_GOALS = 'SET_FIELD_NOTE_GOALS';

export type ActionTypes =

  | { type: typeof SET_FIELD_NOTE_GOALS; payload: IGoal[] }


export const setFieldNoteGoals = (goals: IGoal[]): ActionTypes => ({
  type: SET_FIELD_NOTE_GOALS,
  payload: goals
});

export const getFieldNoteGoalsFromFirebase = (options: { organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Outcomes').get()
  let goalList = query.docs.map(doc => {
    return doc.data() as IGoal
  });

  dispatch(setFieldNoteGoals(goalList));
};


export const getProjectGoalsFromFirebase = (options: { organisationId: string, projectId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection("Goals").get();
  let fieldNoteGoals = query.docs.map(doc => {
    return doc.data() as IGoal
  });
  dispatch(setFieldNoteGoals(fieldNoteGoals));
  return fieldNoteGoals;
};
