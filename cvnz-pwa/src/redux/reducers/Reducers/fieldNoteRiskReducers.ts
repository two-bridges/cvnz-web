import * as _ from "underscore";
import { rootState } from "../rootReducer";
import * as fieldNoteRiskActions from '../../actions/FieldNoteActions/fieldNoteRiskActions';
import { IInductionStaff } from "src/redux/model/fieldNote.model";

export interface IFieldNoteRisk {
  initialCheck: boolean,
  single?: IInductionStaff,
  lastError: string
}

export const initialState: IFieldNoteRisk = {
  initialCheck: false,
  single: undefined,
  lastError: ''
};

export function reducer(state = rootState?.fieldNoteRisk, action: fieldNoteRiskActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteRiskActions.ADD_UPDATE_FIELD_NOTE_RISK:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteRiskActions.DELETE_FIELD_NOTE_RISK:
      return {
        ...state,
        single: action.payload
      };
    case fieldNoteRiskActions.SET_RISK_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: action.lastError,
      };
    case fieldNoteRiskActions.UNSET_RISK_ERROR:
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: '',
      };
    default:
      return state ?? {};
  }
}
