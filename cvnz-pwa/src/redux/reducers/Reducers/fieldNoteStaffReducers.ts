import * as _ from "underscore";
import { rootState } from "../rootReducer";
import * as fieldNoteStaffActions from '../../actions/FieldNoteActions/fieldNoteStaffActions';
import { IInductionStaff } from "src/redux/model/fieldNote.model";

export interface IFieldNoteStaff {
  initialCheck: boolean,
  single?: IInductionStaff,
  lastError: string
}

export const initialState: IFieldNoteStaff = {
  initialCheck: false,
  single: undefined,
  lastError: ''
};

export function reducer(state = rootState?.fieldNoteStaff, action: fieldNoteStaffActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteStaffActions.ADD_UPDATE_FIELD_NOTE_STAFF:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteStaffActions.DELETE_FIELD_NOTE_STAFF:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteStaffActions.SET_STAFF_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: action.lastError,
      };
    case fieldNoteStaffActions.UNSET_STAFF_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: '',
      };
    default:
      return state ?? {};
  }
}
