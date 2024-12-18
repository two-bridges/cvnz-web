import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { Result } from "src/lib/result.model";
import { convertToFirebase, IGoal } from "src/redux/model/goal.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { firebaseUpsertBatchV3 } from "../apiStatusActions";

export const ADD_UPDATE_FIELD_NOTE_GOAL = 'ADD_UPDATE_FIELD_NOTE_GOAL';
export const DELETE_FIELD_NOTE_GOAL = 'DELETE_FIELD_NOTE_GOAL';
export const SET_GOAL_ERROR = 'SET_GOAL_ERROR';
export const UNSET_GOAL_ERROR = 'UNSET_GOAL_ERROR';


export type ActionTypes =
  | { type: typeof ADD_UPDATE_FIELD_NOTE_GOAL; payload: IGoal }
  | { type: typeof DELETE_FIELD_NOTE_GOAL; payload: IGoal[] }
  | { type: typeof SET_GOAL_ERROR; lastError: string }
  | { type: typeof UNSET_GOAL_ERROR; }

export const addUpdateFieldNoteGoal = (goal: IGoal): ActionTypes => ({
  type: ADD_UPDATE_FIELD_NOTE_GOAL,
  payload: goal
});

export const setGoalError = (error: string): ActionTypes => ({
  type: SET_GOAL_ERROR,
  lastError: error
});

export const unsetGoalError = (): ActionTypes => ({
  type: UNSET_GOAL_ERROR,
});
export const addOrUpdateFieldNoteGoal = (options: { goal: IGoal, organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let state = getState();
  var colpath = `Organisations/${options.organisationId}/Projects/${options.projectId}/FieldNotes/${options.fieldNoteId}/Outcomes`;
  if (!options.goal.fieldNoteId) {
    options.goal.fieldNoteId = options.fieldNoteId;
  }
  if (options.goal.deleted_utc) {
    let deletedBy = state.userSessionV2.user?.id;
    options.goal.deleted_by = deletedBy ? deletedBy : '';
  }
  let result = await firebaseUpsertBatchV3({
    entities: [options.goal],
    colPath: colpath,
    convertToFirebase: convertToFirebase as any,
    byUser: state.userSessionV2.user
  }) as Result<IGoal[]>;
  if (result.isSuccess) {
    dispatch(addUpdateFieldNoteGoal(result.value[0]));
    return true;
  } else {
    dispatch(setGoalError(result.error));
    return false;
  }
};


export const isGoalUsedInFieldNotes = (options: { goal: IGoal, projectId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let query = await myFirebase.firestore().collectionGroup("Outcomes").where("projectId", "==", options.projectId).where("goalTypeId", "==", options.goal.goalTypeId).get();
  let goals = query.docs.map(doc => {
    return doc.data() as IGoal;
  });

  if (goals.length > 0) {
    return true;
  }
  else {
    return false;
  }
}

