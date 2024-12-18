import firebase from "firebase";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IGoal } from "src/redux/model/goal.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { firebaseUpsertBatchV2 } from "../apiStatusActions";

export const GET_PROJECT_GOALS = 'GET_PROJECT_GOALS';
export const UPDATE_PROJECT_GOAL = 'UPDATE_PROJECT_GOAL';
export const SAVE_PROJECT_GOAL = 'SAVE_PROJECT_GOAL';
export const PROJECT_GOAL_DATE_UPDATE = 'PROJECT_GOAL_DATE_UPDATE';

export type ActionTypes =
  | { type: typeof GET_PROJECT_GOALS; payload: IGoal[] }
  | { type: typeof SAVE_PROJECT_GOAL; payload: ({ goal: IGoal, type: string }) }
  | { type: typeof UPDATE_PROJECT_GOAL; payload: ({ goal: IGoal, event }) }
  | { type: typeof PROJECT_GOAL_DATE_UPDATE; payload: ({ goal: IGoal, name: string, value: string }) }

export const setProjectGoals = (projectGoals: IGoal[]): ActionTypes => ({
  type: GET_PROJECT_GOALS,
  payload: projectGoals
});

export const savedGoal = (goal: IGoal, type: string): ActionTypes => ({
  type: SAVE_PROJECT_GOAL,
  payload: { goal, type }
});

export const fetchProjectGoals = (options: { organisationId: string, projectId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection("Goals").get()
  let projectGoals = query.docs.map(doc => {
    return doc.data() as IGoal
  });
  projectGoals = projectGoals.filter(g => !g.deleted_utc);
  dispatch(setProjectGoals(projectGoals));
  return projectGoals;
};

export const addProjectGoal = (options: { projectGoal: IGoal, organisationId: string, projectId: string, type: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let state = getState();
  if (options.projectGoal.deleted_utc && !options.projectGoal.deleted_by) {
    options.projectGoal.deleted_by = state.userSessionV2.user?.id ?? "";
  }
  var colpath = `Organisations/${options.organisationId}/Projects/${options.projectId}/Goals`;
  let projectGoalSaved = await firebaseUpsertBatchV2({
    entities: [options.projectGoal],
    colPath: colpath,
    byUser: state.userSessionV2.user
  }) as IGoal;

  dispatch(savedGoal(projectGoalSaved, options.type));

};

export const updateGoal = (goal: IGoal, event): ActionTypes => ({
  type: UPDATE_PROJECT_GOAL,
  payload: { goal, event }
});

export const updateProjectGoal = (options: { projectGoal: IGoal, event }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(updateGoal(options.projectGoal, options.event));
};


export const updateGoalDates = (goal: IGoal, name: string, value: string): ActionTypes => ({
  type: PROJECT_GOAL_DATE_UPDATE,
  payload: { goal, name, value }
});

export const updateProjectGoalDates = (options: { projectGoal: IGoal, name: string, value: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(updateGoalDates(options.projectGoal, options.name, options.value));
};