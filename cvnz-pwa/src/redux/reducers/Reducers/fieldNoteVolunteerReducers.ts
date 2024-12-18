import * as _ from "underscore";
import { rootState } from "../rootReducer";
import * as fieldNoteVolunteerActions from '../../actions/FieldNoteActions/fieldNoteVolunteerActions';
import { IInductionStaff } from "src/redux/model/fieldNote.model";

export interface IFieldNoteInduction {
  initialCheck: boolean,
  single?: IInductionStaff,
  lastError: string
}

export const initialState: IFieldNoteInduction = {
  initialCheck: false,
  single: undefined,
  lastError: ''
};

export function reducer(state = rootState?.fieldNoteStaff, action: fieldNoteVolunteerActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteVolunteerActions.ADD_UPDATE_FIELD_NOTE_VOLUNTEER:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteVolunteerActions.DELETE_FIELD_NOTE_VOLUNTEER:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteVolunteerActions.SET_VOLUNTEER_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: action.lastError,
      };
    case fieldNoteVolunteerActions.UNSET_VOLUNTEER_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: '',
      };
    default:
      return state ?? {};
  }
}
