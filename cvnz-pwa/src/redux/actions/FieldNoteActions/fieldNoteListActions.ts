import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IFieldNote } from "src/redux/model/fieldNote.model";
import { rootState } from "src/redux/reducers/rootReducer";

export const SET_FIELD_NOTES = 'SET_FIELD_NOTES';

export type ActionTypes =

  | { type: typeof SET_FIELD_NOTES; payload: IFieldNote[] }


export const setFieldNotes = (notes: IFieldNote[]): ActionTypes => ({
  type: SET_FIELD_NOTES,
  payload: notes
});

export const getFieldNotesFromFirebase = (options: { organisationId: string, projectId?: string, fieldNoteId?: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {

  let state = getState();
  let user = state.userSessionV2.user;
  let isOrgAdmin = state.userSessionV2.isOrgAdmin;

  let query = await myFirebase.firestore().collectionGroup('FieldNotes').where("organisationId", "==", options.organisationId);
  if (options.projectId) {
    query = query.where("projectId", "==", options.projectId);
  }
  let querySnapshot = await query.get();
  let notesList = querySnapshot.docs.map(doc => {
    return doc.data() as IFieldNote
  });

  if (!isOrgAdmin) {
    notesList = notesList.filter(n => n.created_by === user?.id);
  }
  dispatch(setFieldNotes(notesList));
};

