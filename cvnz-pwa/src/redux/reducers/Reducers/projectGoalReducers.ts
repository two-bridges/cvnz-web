import * as _ from "underscore";
import { IGoal, IGoalType } from "src/redux/model/goal.model";
import { rootState } from "../rootReducer";

import * as projectGoalsActions from '../../actions/Actions/projectGoalsActions';
import { addProjectGoal } from "../../actions/Actions/projectGoalsActions";
import { HelperService } from "src/lib/helper";
import ProjectGoalList from "src/customviews/Projects/ProjectGoals/ProjectGoalList";
import { element } from "prop-types";


export interface IProjectGoalState {
  projectGoals: IGoal[],
  initialCheck: boolean,
}

export const initialState: IProjectGoalState = {
  projectGoals: [],
  initialCheck: false
};


export const add = (presentGoalList: IGoal[], newGoal: IGoal, type: string) => {
  let present = HelperService.getArrayFromObjectList(presentGoalList);

  if (type === "add") {
    return [...present, newGoal] as IGoal[];
  } else {
    return [
      ...present.map(item => item.goalName == newGoal.goalName
        ?
        newGoal : item
      )
    ] as IGoal[]
  }
}

export const update = (presentGoalList: IGoal[], goal: IGoal, event) =>
  [
    ...HelperService.getArrayFromObjectList(presentGoalList).map(item => item.goalName == goal.goalName
      ? {
        ...item,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
      }
      : item)
  ]


export const updateDate = (presentGoalList: IGoal[], goal: IGoal, name: string, value: string) =>
  [
    ...HelperService.getArrayFromObjectList(presentGoalList).map(item => item.goalName == goal.goalName
      ? {
        ...item,
        [name]: value
      }
      : item)
  ]


export function reducer(state = rootState?.projectGoals, action: projectGoalsActions.ActionTypes) {
  switch (action.type) {
    case 'GET_PROJECT_GOALS':
      return {
        ...state,
        projectGoals: { ...action.payload },
      };
    case 'UPDATE_PROJECT_GOAL':
      return {
        ...state,
        projectGoals: update(state.projectGoals, action.payload.goal, action.payload.event)
      };
    case 'PROJECT_GOAL_DATE_UPDATE':
      return {
        ...state,
        projectGoals: updateDate(state.projectGoals, action.payload.goal, action.payload.name, action.payload.value)
      };
    case 'SAVE_PROJECT_GOAL':
      return {
        ...state,
        projectGoals: add(state.projectGoals, action.payload.goal, action.payload.type).filter(g => !g.deleted_utc)
      };

    default:
      return state ?? {};
  }
}
