import * as _ from "underscore";
import { rootState } from "../rootReducer";

import * as fieldNoteGoalListActions from '../../actions/FieldNoteActions/fieldNoteGoalListActions';
import * as fieldNoteGoalActions from '../../actions/FieldNoteActions/fieldNoteGoalActions';
import { IGoal } from "src/redux/model/goal.model";


export interface IFieldNoteGoal {
  list: IGoal[],
  initialCheck: boolean,
}

export const initialState: IFieldNoteGoal = {
  list: [],
  initialCheck: false,
};

export function reducer(state = rootState?.fieldNoteGoalList, action: fieldNoteGoalActions.ActionTypes | fieldNoteGoalListActions.ActionTypes) {
  switch (action.type) {
    case fieldNoteGoalListActions.SET_FIELD_NOTE_GOALS:
      return {
        ...state,
        list: action.payload.filter(f => !f.deleted_utc)
      };
    case fieldNoteGoalActions.ADD_UPDATE_FIELD_NOTE_GOAL:
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
