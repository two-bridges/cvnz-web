import * as _ from "underscore";
import { rootState } from "../rootReducer";
import * as fieldNoteGoalActions from '../../actions/FieldNoteActions/fieldNoteGoalActions';
import { IInductionStaff } from "src/redux/model/fieldNote.model";

export interface IFieldNoteGoal {
  initialCheck: boolean,
  single?: IInductionStaff,
  lastError: string
}

export const initialState: IFieldNoteGoal = {
  initialCheck: false,
  single: undefined,
  lastError: ''
};

export function reducer(state = rootState?.fieldNoteGoal, action: fieldNoteGoalActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteGoalActions.ADD_UPDATE_FIELD_NOTE_GOAL:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteGoalActions.DELETE_FIELD_NOTE_GOAL:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteGoalActions.SET_GOAL_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: action.lastError,
      };
    case fieldNoteGoalActions.UNSET_GOAL_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: '',
      };
    default:
      return state ?? {};
  }
}
