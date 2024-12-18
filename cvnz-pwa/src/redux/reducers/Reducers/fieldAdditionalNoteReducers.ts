import * as _ from "underscore";
import { rootState } from "../rootReducer";
import * as fieldAdditionalNoteActions from '../../actions/FieldNoteActions/fieldAdditionalNoteActions';
import { IFieldNoteAdditionalNote, } from "src/redux/model/fieldNote.model";

export interface IFieldAdditionalNote {
  initialCheck: boolean,
  single?: IFieldNoteAdditionalNote,
  lastError: string
}

export const initialState: IFieldAdditionalNote = {
  initialCheck: false,
  single: undefined,
  lastError: ''
};

export function reducer(state = rootState?.fieldAdditionalNote, action: fieldAdditionalNoteActions.ActionTypes) {
  switch (action.type) {
    case fieldAdditionalNoteActions.ADD_UPDATE_ADDITIONAL_FIELD_NOTE:
      return {
        ...state,
        single: action.payload
      };
    case fieldAdditionalNoteActions.DELETE_ADDITIONAL_FIELD_NOTE:
      return {
        ...state,
        single: action.payload
      };
    case fieldAdditionalNoteActions.SET_ADDITIONAL_NOTE_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: action.lastError,
      };
    case fieldAdditionalNoteActions.UNSET_ADDITIONAL_NOTE_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: '',
      };
    default:
      return state ?? {};
  }
}
