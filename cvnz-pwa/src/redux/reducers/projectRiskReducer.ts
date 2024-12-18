import * as _ from "underscore";
import * as projectRiskActions from '../actions/Actions/projectRiskActions';
import { rootState } from './rootReducer';
import { IProjectRisk } from "../model/risk.model";
import { HelperService } from "src/lib/helper";

export interface IProjectRisksState {
  projectRisks: IProjectRisk[],
  initialCheck: boolean,
  lastError?: string;

}

export const initialState: IProjectRisksState = {
  projectRisks: [],
  initialCheck: false,
  lastError: ''

};


export const add = (presentGoalList: IProjectRisk[], newGoal: IProjectRisk, type: string) => {

  if (type === "add") {
    return [...HelperService.getArrayFromObjectList(presentGoalList), newGoal]
  } else {
    return [
      ...HelperService.getArrayFromObjectList(presentGoalList).map(item => item.name == newGoal.name
        ?
        newGoal : item
      )
    ]
  }
}

export function reducer(state = rootState?.projectRisks, action: projectRiskActions.ActionTypes) {

  switch (action.type) {
    case 'GET_PROJECT_RISK_LIST':
      return {
        ...state,
        projectRisks: { ...action.payload },
      }
    case 'SAVE_PROJECT_RISK':
      return {
        ...state,
        projectRisks: add(state.projectRisks, action.payload.risk, action.payload.type)
      };
    case 'SET_PROJECT_RISK_ERROR':
      console.log(`Reducer - ${action.type}`);
      return {
        ...state,
        lastError: action.lastError,
      };
    default:
      return state ?? {};
  }
}
