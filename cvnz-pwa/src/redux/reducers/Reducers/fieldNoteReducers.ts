import * as _ from "underscore";
import { rootState } from "../rootReducer";
import { IFieldNote } from "src/redux/model/fieldNote.model";
import * as fieldNoteActions from '../../actions/FieldNoteActions/fieldNoteActions';


export interface IFieldNoteState {
  initialCheck: boolean,
  single?: IFieldNote,
  lastError: string,
}

export const initialState: IFieldNoteState = {
  initialCheck: false,
  single: undefined,
  lastError: "",
};

export function reducer(state = rootState?.fieldNote, action: fieldNoteActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteActions.ADD_UPDATE_FIELD_NOTE:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteActions.DELETE_FIELD_NOTE:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteActions.SET_FIELD_NOTE_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: action.lastError,
      };
    case fieldNoteActions.UNSET_FIELD_NOTE_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: '',
      };
    case fieldNoteActions.UNSET_FIELD_NOTE:
      console.log(`Reducer - ${action.type}`);
      return {
        ...initialState
      };
    case fieldNoteActions.SET_FIELD_NOTE:
      console.log(`Reducer - ${action.type}`);
      const newState = {
        ...state,
        single: {
          ...action.payload
        } as IFieldNote,
      };
      return newState;
    default:
      return state ?? {};
  }
}
