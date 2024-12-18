import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { db, myFirebase } from "src/firebase/firebase";
import { IGoal, IGoalType } from "src/redux/model/goal.model";
import { rootState } from "src/redux/reducers/rootReducer";
import _ from "underscore";
import { dateToIso, firebaseUpsertBatchV2 } from "./apiStatusActions";

export const GET_ORGANISATION_GOALS = 'GET_ORGANISATION_GOALS';
export const SAVE_ORGANISATION_GOAL = 'SAVE_ORGANISATION_GOAL';
export const DELETE_ORGANISATIONAL_GOAL = 'DELETE_ORGANISATIONAL_GOAL';

export type ActionTypes =
  | { type: typeof GET_ORGANISATION_GOALS; payload: IGoalType[] }
  | { type: typeof SAVE_ORGANISATION_GOAL; payload: ({ goals: IGoalType[], type: string }) }
  | { type: typeof DELETE_ORGANISATIONAL_GOAL; payload: IGoalType[] }

export const setOrganisationGoals = (organisationGoals: IGoalType[]): ActionTypes => ({
  type: GET_ORGANISATION_GOALS,
  payload: organisationGoals
});

export const savedGoal = (goals: IGoalType[], type: string): ActionTypes => ({
  type: SAVE_ORGANISATION_GOAL,
  payload: { goals: goals, type }
});

export const fetchOrganisationGoals = (options: { organisationId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("GoalTypes").get();

  let orgGoals = query.docs.map(doc => {
    return doc.data() as IGoalType
  });
  dispatch(setOrganisationGoals(orgGoals));
  return orgGoals;
};


export const deletedGoalType = (goalType: IGoalType[]): ActionTypes => ({
  type: DELETE_ORGANISATIONAL_GOAL,
  payload: goalType
});


export const deleteGoalType = (goalType: IGoalType, organisationId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();
  let goalList = Object.values(state.allProjectGoalsReducers.goals);
  let existsInProject = _.find(goalList, t => t.goalTypeId === parseInt(goalType.id));
  if (existsInProject) {
    return false;
  }
  else {
    const goalRef = await db.collection('Organisations').doc(organisationId).collection('GoalTypes').doc(goalType.id.toString())
    await goalRef.delete();
    dispatch(fetchOrganisationGoals({ organisationId: organisationId }));
    return true;
  }
};


export const addOrganisationGoal = (options: { projectGoal: IGoalType, organisationId: string, type: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  const state = getState();
  var colpath = `Organisations/${options.organisationId}/GoalTypes`;
  let orgGoalSaved = await firebaseUpsertBatchV2({
    entities: [options.projectGoal],
    colPath: colpath,
    byUser: state.userSessionV2.user

  }) as IGoalType;

  let typeList = Object.values(state.organisationGoalReducers.list)
  if (typeList) {
    typeList.push(orgGoalSaved[0])
  }
  dispatch(savedGoal(typeList, options.type));
};