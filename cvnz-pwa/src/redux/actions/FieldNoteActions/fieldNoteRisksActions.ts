import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IProjectRisk } from "src/redux/model/risk.model";
import { rootState } from "src/redux/reducers/rootReducer";

export const SET_LOCAL_STORAGE_FIELD_NOTE_RISKS = 'SET_LOCAL_STORAGE_FIELD_NOTE_RISKS';
export const SET_FIELD_NOTE_RISKS = 'SET_FIELD_NOTE_RISKS';


export type ActionTypes =
  | { type: typeof SET_LOCAL_STORAGE_FIELD_NOTE_RISKS; payload: IProjectRisk[] }
  | { type: typeof SET_FIELD_NOTE_RISKS; payload: IProjectRisk[] }


export const setLocalStorageFieldNoteRisks = (risks: IProjectRisk[]): ActionTypes => ({
  type: SET_LOCAL_STORAGE_FIELD_NOTE_RISKS,
  payload: risks
});

export const setLocalFieldNoteRisks = (fieldNoteRisks: IProjectRisk[]): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  if (fieldNoteRisks) {
    localStorage.setItem('fieldNoteRisks', JSON.stringify(fieldNoteRisks));
    dispatch(setLocalStorageFieldNoteRisks(fieldNoteRisks));
  }
};

export const clearLocalFieldNoteRisks = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  localStorage.setItem('fieldNoteRisks', JSON.stringify([]));
};

export const getFieldNoteRisksFromFirebase = (options: { organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Risks').get()
  let fieldNoteRisks = query.docs.map(doc => {
    return doc.data() as IProjectRisk
  });
  dispatch(setFieldNoteRisks(fieldNoteRisks));
};

export const setFieldNoteRisks = (risks: IProjectRisk[]): ActionTypes => ({
  type: SET_FIELD_NOTE_RISKS,
  payload: risks
});

export const setNoteRisks = (fieldNoteRisks: IProjectRisk[]): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  if (fieldNoteRisks) {
    dispatch(setFieldNoteRisks(fieldNoteRisks));
  }
};


export const getProjectRisksFromFirebase = (options: { organisationId: string, projectId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection("ProjectRisks").get();
  let fieldNoteRisks = query.docs.map(doc => {
    return doc.data() as IProjectRisk
  });

  dispatch(setFieldNoteRisks(fieldNoteRisks));
  return fieldNoteRisks;
};
