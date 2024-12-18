import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IFieldNoteAdditionalNote } from "src/redux/model/fieldNote.model";
import { rootState } from "src/redux/reducers/rootReducer";

export const SET_ADDITIONAL_FIELD_NOTE = 'SET_ADDITIONAL_FIELD_NOTE';

export type ActionTypes =

  | { type: typeof SET_ADDITIONAL_FIELD_NOTE; payload: IFieldNoteAdditionalNote[] }


export const setAdditionalFieldNote = (notes: IFieldNoteAdditionalNote[]): ActionTypes => ({
  type: SET_ADDITIONAL_FIELD_NOTE,
  payload: notes
});

export const getAdditionalFieldNoteFromFirebase = (options: { organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('AdditionalNotes').get()
  let goalList = query.docs.map(doc => {
    return doc.data() as IFieldNoteAdditionalNote
  });

  dispatch(setAdditionalFieldNote(goalList));
};

