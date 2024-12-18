import * as _ from "underscore";
import { rootState } from "../rootReducer";

import * as fieldAdditionalNoteListActions from '../../actions/FieldNoteActions/fieldAdditionalNoteListActions';
import * as fieldAdditionalNoteActions from '../../actions/FieldNoteActions/fieldAdditionalNoteActions';
import { IFieldNoteAdditionalNote } from "src/redux/model/fieldNote.model";


export interface IFieldNoteGoal {
  list: IFieldNoteAdditionalNote[],
  initialCheck: boolean,
}

export const initialState: IFieldNoteGoal = {
  list: [],
  initialCheck: false,
};

export function reducer(state = rootState?.fieldAdditionalNoteList, action: fieldAdditionalNoteActions.ActionTypes | fieldAdditionalNoteListActions.ActionTypes) {
  switch (action.type) {
    case fieldAdditionalNoteListActions.SET_ADDITIONAL_FIELD_NOTE:
      return {
        ...state,
        list: action.payload
      };
    case fieldAdditionalNoteActions.ADD_UPDATE_ADDITIONAL_FIELD_NOTE:
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
