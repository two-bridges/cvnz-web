import * as _ from "underscore";
import { rootState } from "./rootReducer";
import * as activeFieldNoteProject from '../actions/activeFieldNoteProject';
import { IProject } from "src/redux/model/project.model";

export interface IProjectGoalState {
  single: IProject | undefined,
  initialCheck: boolean,
}

export const initialState: IProjectGoalState = {
  single: undefined,
  initialCheck: false,

};
export function reducer(state = rootState?.activeFieldNoteProjectReducers, action: activeFieldNoteProject.ActionTypes) {
  switch (action.type) {
    case 'GET_PROJECT':
      return {
        ...state,
        single: action.payload
      };
    default:
      return state ?? {};
  }
}
