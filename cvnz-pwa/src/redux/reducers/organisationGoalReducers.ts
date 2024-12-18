import * as _ from "underscore";
import { IGoal, IGoalType } from "src/redux/model/goal.model";
import { rootState } from "./rootReducer";

import * as organisationGoalActions from '../actions/organisationGoalActions';
import { addProjectGoal } from "../actions/Actions/projectGoalsActions";
import { HelperService } from "src/lib/helper";
import ProjectGoalList from "src/customviews/Projects/ProjectGoals/ProjectGoalList";
import { element } from "prop-types";


export interface IOrganisationGoalState {
  list: IGoalType[],
  initialCheck: boolean,
  goals: IGoal[]
}

export const initialState: IOrganisationGoalState = {
  list: [],
  initialCheck: false,
  goals: []

};

export const add = (presentGoalList: IGoalType[], newGoal: IGoalType, type: string) => {
  if (type === "add") {
    return [...HelperService.getArrayFromObjectList(presentGoalList),
      newGoal]
  } else {
    return [
      ...HelperService.getArrayFromObjectList(presentGoalList).map(item => item.goalName == newGoal.goal
        ?
        newGoal : item
      )
    ]
  }
}



export function reducer(state = rootState?.organisationGoalReducers, action: organisationGoalActions.ActionTypes) {
  switch (action.type) {
    case 'GET_ORGANISATION_GOALS':
      return {
        ...state,
        list: { ...action.payload },
      };

    case 'SAVE_ORGANISATION_GOAL':
      return {
        ...state,
        list: { ...action.payload.goals },
      };
    case 'DELETE_ORGANISATIONAL_GOAL':
      return {
        ...state,
        list: { ...action.payload },
      };
    default:
      return state ?? {};
  }
}
