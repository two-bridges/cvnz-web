import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Result } from "src/lib/result.model";
import { convertToFirebase, CreateNewFieldNote, IFieldNote } from "src/redux/model/fieldNote.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { firebaseGetCollectionGroup, firebaseGetDocumentV2, firebaseUpsertBatchV3 } from "../apiStatusActions";

import firebase from 'firebase';
const app = firebase.app();
const functions = app.functions("australia-southeast1");

export const ADD_UPDATE_FIELD_NOTE = 'ADD_UPDATE_FIELD_NOTE';

export const DELETE_FIELD_NOTE = 'DELETE_FIELD_NOTE';
export const SET_FIELD_NOTE_ERROR = 'SET_FIELD_NOTE_ERROR';
export const UNSET_FIELD_NOTE_ERROR = 'UNSET_FIELD_NOTE_ERROR';
export const UNSET_FIELD_NOTE = 'UNSET_FIELD_NOTE';
export const SET_FIELD_NOTE = 'SET_FIELD_NOTE';


export type ActionTypes =
  | { type: typeof ADD_UPDATE_FIELD_NOTE; payload: IFieldNote }
  | { type: typeof DELETE_FIELD_NOTE; payload: IFieldNote[] }
  | { type: typeof SET_FIELD_NOTE_ERROR; lastError: string }
  | { type: typeof UNSET_FIELD_NOTE_ERROR; }
  | { type: typeof UNSET_FIELD_NOTE; }
  | { type: typeof SET_FIELD_NOTE; payload: IFieldNote }

export const unsetFieldNote = (): ActionTypes => ({
  type: UNSET_FIELD_NOTE,
});

export const setFieldNote = (note: IFieldNote): ActionTypes => ({
  type: SET_FIELD_NOTE,
  payload: note
});


export const addUpdateFieldNote = (note: IFieldNote): ActionTypes => ({
  type: ADD_UPDATE_FIELD_NOTE,
  payload: note
});

export const setFieldNoteError = (error: string): ActionTypes => ({
  type: SET_FIELD_NOTE_ERROR,
  lastError: error
});

export const unsetFieldNoteError = (): ActionTypes => ({
  type: UNSET_FIELD_NOTE_ERROR,
});

export const addOrUpdateFieldNote = (options: { note: IFieldNote, organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();
  var colpath = `Organisations/${options.organisationId}/Projects/${options.projectId}/FieldNotes`;
  let result = await firebaseUpsertBatchV3({
    entities: [options.note],
    colPath: colpath,
    convertToFirebase: convertToFirebase as any,
    byUser: state.userSessionV2.user
  }) as Result<IFieldNote[]>;
  if (result.isSuccess) {
    dispatch(addUpdateFieldNote(result.value[0]));
    return result.value[0];
  } else {
    dispatch(setFieldNoteError(result.error));
  }
};

export const reCalculate = (options: { organisationId: string, projectId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  var test = await functions.httpsCallable("reCalculate");
  console.log(`### reCalculate ###`);
  test({ organisationId: options.organisationId, projectId: options.projectId }).then(result => {
    console.log(`reCalculate : DONE`);
    console.log(result);
  }).catch(function (error) {
    console.log(`reCalculate : ERROR`);
    console.log("error", error);
  });

};

export const getFieldNoteFromFirebase = (options: { organisationId: string, projectId?: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  if (options.projectId === "new" && options.fieldNoteId === "new") {
    let note = CreateNewFieldNote();
    note.organisationId = options.organisationId;
    note.status = 'InProgress';
    if (note) {
      dispatch(unsetFieldNoteError());
      dispatch(addUpdateFieldNote(note));
    }
  } else {
    let result = await firebaseGetDocumentV2<IFieldNote>({
      colPath: `Organisations/${options.organisationId}/Projects/${options.projectId}/FieldNotes/${options.fieldNoteId}`,
    });
    if (result.isSuccess) {
      dispatch(addUpdateFieldNote(result.value));
    } else {
      dispatch(setFieldNoteError(result.error));
    }
  }
};

export async function getInProgressFieldNotes(options: { organisationId: string, createdBy: string }) {
  let result = await firebaseGetCollectionGroup<IFieldNote>({
    colGroupName: 'FieldNotes',
    clauses: [
      {
        fieldPath: 'organisationId',
        opStr: '==',
        value: options.organisationId,
      },
      {
        fieldPath: 'created_by',
        opStr: '==',
        value: options.createdBy,
      },
      {
        fieldPath: 'status',
        opStr: '==',
        value: 'InProgress',
      },
    ],
  });
  console.dir(result);
  return result;
};
