import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { db } from "src/firebase/firebase";
import { IGoal } from "src/redux/model/goal.model";
import { rootState } from "src/redux/reducers/rootReducer";
import _ from "underscore";

export const GET_ORGANISATION_GOALS = 'GET_ORGANISATION_GOALS';
export const SAVE_ORGANISATION_GOAL = 'SAVE_ORGANISATION_GOAL';
export const DELETE_ORGANISATIONAL_GOAL = 'DELETE_ORGANISATIONAL_GOAL';
export const LOAD_GOALS = 'LOAD_GOALS';

export type ActionTypes =

  | { type: typeof LOAD_GOALS; payload: IGoal[] }

export const loadProjectGoals = (goalType: IGoal[]): ActionTypes => ({
  type: LOAD_GOALS,
  payload: goalType
});

export const loadingAllProjectGoals = (organisationId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let allProjectGoals: IGoal[] = [];

  const projRef = await db.collection('Organisations').doc(organisationId).collection('Projects').get();
  projRef.forEach(async e => {
    const querySnapshot = await db.collection('Organisations').doc(organisationId).collection('Projects').doc(e.data().id).collection('Goals').get();
    querySnapshot.forEach(e => {
      allProjectGoals.push(e.data() as IGoal);
    });

    allProjectGoals = allProjectGoals.filter(g => !g.deleted_utc);
    dispatch(loadProjectGoals(allProjectGoals));
    return allProjectGoals;
  });
}
