import * as _ from "underscore";
import { rootState } from "../rootReducer";

import * as fieldNoteStaffListActions from '../../actions/FieldNoteActions/fieldNoteStaffListActions';
import * as fieldNoteStaffActions from '../../actions/FieldNoteActions/fieldNoteStaffActions';
import { HelperService } from "src/lib/helper";
import { IInductionStaff } from "src/redux/model/fieldNote.model";


export interface IFieldNoteStaff {
  list: IInductionStaff[],
  initialCheck: boolean,
  orgStaffList: IInductionStaff[],
}

export const initialState: IFieldNoteStaff = {
  list: [],
  initialCheck: false,
  orgStaffList: []
};

export function reducer(state = rootState?.fieldNoteStaffList, action: fieldNoteStaffActions.ActionTypes | fieldNoteStaffListActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteStaffListActions.SET_FIELD_NOTE_STAFFS:
      return {
        ...state,
        list: action.payload.filter(f => !f.deleted_utc)
      };
    case fieldNoteStaffListActions.SET_ORG_STAFF:
      return {
        ...state,
        orgStaffList: action.payload
      };
    case fieldNoteStaffActions.ADD_UPDATE_FIELD_NOTE_STAFF:
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
        list: [...list.filter(f => !f.deleted_utc)]
      };
    default:
      return state ?? {};
  }
}
