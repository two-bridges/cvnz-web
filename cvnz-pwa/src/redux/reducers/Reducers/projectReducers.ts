import * as _ from "underscore";
import { rootState } from "../rootReducer";
import * as projectActions from '../../actions/Actions/projectActions';
import { IProject } from "src/redux/model/project.model";

export interface IProjectGoalState {
  list: IProject[],
  initialCheck: boolean,
  idx: _.Dictionary<any>
}

export const initialState: IProjectGoalState = {
  list: [],
  initialCheck: false,
  idx: {}

};
export function reducer(state = rootState?.projectReducers, action: projectActions.ActionTypes) {
  switch (action.type) {
    case 'GET_PROJECTS':
      const idx = action.payload.reduce((memo, item) => {
        memo[item.id] = item;
        return memo;
      }, {} as { [id: string]: IProject });
      return {
        ...state,
        list: { ...action.payload },
        idx: idx
      };
    default:
      return state ?? {};
  }
}
