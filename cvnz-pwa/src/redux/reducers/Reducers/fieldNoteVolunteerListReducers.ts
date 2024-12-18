import * as _ from "underscore";
import { rootState } from "../rootReducer";

import * as fieldNoteVolunteerListActions from '../../actions/FieldNoteActions/fieldNoteVolunteerListActions';
import * as fieldNoteVolunteerActions from '../../actions/FieldNoteActions/fieldNoteVolunteerActions';
import { IInductionVolunteer } from "src/redux/model/fieldNote.model";


export interface IFieldNoteVolunteer {
  list: IInductionVolunteer[],
  initialCheck: boolean,
  orgVolList: IInductionVolunteer[],
}

export const initialState: IFieldNoteVolunteer = {
  list: [],
  initialCheck: false,
  orgVolList: []
};

export function reducer(state = rootState?.fieldNoteVolunteerList, action: fieldNoteVolunteerActions.ActionTypes | fieldNoteVolunteerListActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteVolunteerListActions.SET_FIELD_NOTE_VOLUNTEERS:
      return {
        ...state,
        list: action.payload.filter(f => !f.deleted_utc)
      };
    case fieldNoteVolunteerListActions.SET_ORG_VOLUNTEERS:
      return {
        ...state,
        orgVolList: action.payload
      };
    case fieldNoteVolunteerActions.ADD_UPDATE_FIELD_NOTE_VOLUNTEER:
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
