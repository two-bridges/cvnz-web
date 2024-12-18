import * as _ from "underscore";
import { rootState } from "../rootReducer";
import * as fieldNoteRisksActions from '../../actions/FieldNoteActions/fieldNoteRisksActions';
import * as fieldNoteRiskActions from '../../actions/FieldNoteActions/fieldNoteRiskActions';
import { IProjectRisk } from "src/redux/model/risk.model";
import { HelperService } from "src/lib/helper";


export interface IFieldNoteRisks {
  list: IProjectRisk[],
  initialCheck: boolean,
  single?: IProjectRisk,
}

export const initialState: IFieldNoteRisks = {
  list: [],
  initialCheck: false,
  single: undefined,

};

export function reducer(state = rootState?.fieldNoteRisks, action: fieldNoteRisksActions.ActionTypes | fieldNoteRiskActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteRisksActions.SET_FIELD_NOTE_RISKS:
      return {
        ...state,
        list: action.payload.filter(f => !f.deleted_utc)
      };
    case fieldNoteRiskActions.ADD_UPDATE_FIELD_NOTE_RISK:
      let list = state.list;
      if (action.payload) {
        if (list.find(l => l.id === action.payload?.id)) {
          list = list.map(e => e.id === action.payload?.id ? action.payload : e)
        } else {
          list = [
            action.payload,
            ...state.list
          ]
        }
      }
      return {
        ...state,
        list: [...list]
      };
    default:
      return state ?? {};
  }
}
