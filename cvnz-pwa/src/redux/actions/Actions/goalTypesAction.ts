import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IGoalType } from "src/redux/model/goal.model";
import { rootState } from "src/redux/reducers/rootReducer";

export const GET_ALL_GOAL_TYPES = 'GET_ALL_GOAL_TYPES';
export type ActionTypes =
  | { type: typeof GET_ALL_GOAL_TYPES; payload: IGoalType[] }

export const setAllGoalTypes = (goalTypes: IGoalType[]): ActionTypes => ({
  type: GET_ALL_GOAL_TYPES,
  payload: goalTypes
});



export const fetchGoalTypes = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("GoalTypes").get();
  let goalTypes = query.docs.map(doc => {
    return doc.data() as IGoalType
  });
  dispatch(setAllGoalTypes(goalTypes));
  return goalTypes;
};
