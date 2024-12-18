import * as _ from "underscore";
import { IGoal, IGoalType } from "src/redux/model/goal.model";
import { rootState } from "./rootReducer";

import * as allProjectGoalsActions from '../actions/allProjectGoalsActions';
import { addProjectGoal } from "../actions/Actions/projectGoalsActions";
import { HelperService } from "src/lib/helper";
import ProjectGoalList from "src/customviews/Projects/ProjectGoals/ProjectGoalList";
import { element } from "prop-types";


export interface IAllGoalsState {
  initialCheck: boolean,
  goals: IGoal[]
}

export const initialState: IAllGoalsState = {
  initialCheck: false,
  goals: []

};

export function reducer(state = rootState?.allProjectGoalsReducers, action: allProjectGoalsActions.ActionTypes) {
  switch (action.type) {

    case 'LOAD_GOALS':
      return {
        ...state,
        goals: { ...action.payload },
      };
    default:
      return state ?? {};
  }
}
