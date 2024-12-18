import * as _ from "underscore";
import { rootState } from "../rootReducer";
import * as fieldNoteActions from '../../actions/FieldNoteActions/fieldNoteActions';
import * as fieldNoteListActions from '../../actions/FieldNoteActions/fieldNoteListActions';
import { IFieldNote } from "src/redux/model/fieldNote.model";



export interface IFieldNoteState {
  list: IFieldNote[],
  initialCheck: boolean,
  single?: IFieldNote,
}

export const initialState: IFieldNoteState = {
  list: [],
  initialCheck: false,
  single: undefined,

};

export function reducer(state = rootState?.fieldNoteListReducers, action: fieldNoteActions.ActionTypes | fieldNoteListActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteListActions.SET_FIELD_NOTES:
      return {
        ...state,
        list: action.payload.filter(f => !f.deleted_utc)
      };
    case fieldNoteActions.ADD_UPDATE_FIELD_NOTE:
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
