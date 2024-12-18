import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Result } from "src/lib/result.model";
import { IFieldNoteAdditionalNote } from "src/redux/model/fieldNote.model";
import { convertToFirebase } from "src/redux/model/goal.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { firebaseUpsertBatchV3 } from "../apiStatusActions";

export const ADD_UPDATE_ADDITIONAL_FIELD_NOTE = 'ADD_UPDATE_ADDITIONAL_FIELD_NOTE';
export const DELETE_ADDITIONAL_FIELD_NOTE = 'DELETE_ADDITIONAL_FIELD_NOTE';
export const SET_ADDITIONAL_NOTE_ERROR = 'SET_ADDITIONAL_NOTE_ERROR';
export const UNSET_ADDITIONAL_NOTE_ERROR = 'UNSET_ADDITIONAL_NOTE_ERROR';


export type ActionTypes =
  | { type: typeof ADD_UPDATE_ADDITIONAL_FIELD_NOTE; payload: IFieldNoteAdditionalNote }
  | { type: typeof DELETE_ADDITIONAL_FIELD_NOTE; payload: IFieldNoteAdditionalNote[] }
  | { type: typeof SET_ADDITIONAL_NOTE_ERROR; lastError: string }
  | { type: typeof UNSET_ADDITIONAL_NOTE_ERROR; }

export const addUpdateAdditionalFieldNote = (note: IFieldNoteAdditionalNote): ActionTypes => ({
  type: ADD_UPDATE_ADDITIONAL_FIELD_NOTE,
  payload: note
});

export const setAdditionalNoteError = (error: string): ActionTypes => ({
  type: SET_ADDITIONAL_NOTE_ERROR,
  lastError: error
});

export const unsetAdditionalNoteError = (): ActionTypes => ({
  type: UNSET_ADDITIONAL_NOTE_ERROR,
});
export const addOrUpdateAdditionalFieldNote = (options: { note: IFieldNoteAdditionalNote, organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let state = getState();
  var colpath = `Organisations/${options.organisationId}/Projects/${options.projectId}/FieldNotes/${options.fieldNoteId}/AdditionalNotes`;
  if (!options.note.fieldNoteId) {
    options.note.fieldNoteId = options.fieldNoteId;
  }
  let result = await firebaseUpsertBatchV3({
    entities: [options.note],
    colPath: colpath,
    convertToFirebase: convertToFirebase as any,
    byUser: state.userSessionV2.user
  }) as Result<IFieldNoteAdditionalNote[]>;
  if (result.isSuccess) {
    dispatch(addUpdateAdditionalFieldNote(result.value[0]));
    return true;
  } else {
    dispatch(setAdditionalNoteError(result.error));
    return false;
  }
};


