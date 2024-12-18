import * as _ from "underscore";
import { IGoalType } from "src/redux/model/goal.model";
import { rootState } from "../rootReducer";

import * as goalTypesActions from '../../actions/Actions/goalTypesAction';


export interface IGoalTypeState {
  goalTypes: IGoalType[],
  initialCheck: boolean,
  idx: _.Dictionary<IGoalType>
}

export const initialState: IGoalTypeState = {
  goalTypes: [],
  initialCheck: false,
  idx: {}
};

export function reducer(state = rootState?.goalTypes, action: goalTypesActions.ActionTypes) {

  switch (action.type) {
    case 'GET_ALL_GOAL_TYPES':
      const idx = action.payload.reduce((memo, item) => {
        memo[item.id] = item;
        return memo;
      }, {} as { [id: string]: IGoalType });
      return {
        ...state,
        goalTypes: { ...action.payload },
        idx: idx
      };
    default:
      return state ?? {};
  }
}
