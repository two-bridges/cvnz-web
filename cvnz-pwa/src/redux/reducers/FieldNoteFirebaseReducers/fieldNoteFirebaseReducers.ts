import * as _ from "underscore";
import { IFieldNote } from "src/redux/model/fieldNote.model";
import { rootState } from "../rootReducer";
import * as fieldNoteFirebase from '../../actions/FieldNoteFirebaseActions/fieldNoteFirebaseActions';

export interface IFieldNotesState {
  list: IFieldNote[],
  initialCheck: boolean,
}

export const initialState: IFieldNotesState = {
  list: [],
  initialCheck: false
};

export function reducer(state = rootState?.fieldNoteFirebase, action: fieldNoteFirebase.ActionTypes) {

  switch (action.type) {
    case 'GET_PROJECT_FIELD_NOTES':
      return {
        ...state,
        list: { ...action.payload },
      }
    case 'FETCH_ALL_FIELD_NOTES':
      return {
        ...state,
        list: { ...action.payload },
      }
    default:
      return state ?? {};
  }
}
