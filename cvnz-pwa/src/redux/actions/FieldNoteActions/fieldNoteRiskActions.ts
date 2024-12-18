import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Result } from "src/lib/result.model";
import { convertToFirebase, IProjectRisk } from "src/redux/model/risk.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { firebaseUpsertBatchV3 } from "../apiStatusActions";

export const ADD_UPDATE_FIELD_NOTE_RISK = 'ADD_UPDATE_FIELD_NOTE_RISK';
export const DELETE_FIELD_NOTE_RISK = 'DELETE_FIELD_NOTE_RISK';
export const SET_RISK_ERROR = 'SET_RISK_ERROR';
export const UNSET_RISK_ERROR = 'UNSET_RISK_ERROR';


export type ActionTypes =
  | { type: typeof ADD_UPDATE_FIELD_NOTE_RISK; payload: IProjectRisk }
  | { type: typeof DELETE_FIELD_NOTE_RISK; payload: IProjectRisk[] }
  | { type: typeof SET_RISK_ERROR; lastError: string }
  | { type: typeof UNSET_RISK_ERROR; }

export const addUpdateFieldNoteRisk = (staff: IProjectRisk): ActionTypes => ({
  type: ADD_UPDATE_FIELD_NOTE_RISK,
  payload: staff
});

export const setRiskError = (error: string): ActionTypes => ({
  type: SET_RISK_ERROR,
  lastError: error
});

export const unsetRiskError = (): ActionTypes => ({
  type: UNSET_RISK_ERROR,
});
export const addOrUpdateFieldNoteRisk = (options: { risk: IProjectRisk, organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let state = getState();
  var colpath = `Organisations/${options.organisationId}/Projects/${options.projectId}/FieldNotes/${options.fieldNoteId}/Risks`;
  if (!options.risk.fieldNoteId) {
    options.risk.fieldNoteId = options.fieldNoteId;
  }
  if (options.risk.deleted_utc) {
    let deletedBy = state.userSessionV2.user?.email;
    options.risk.deleted_by = deletedBy ? deletedBy : '';
  }
  let result = await firebaseUpsertBatchV3({
    entities: [options.risk],
    colPath: colpath,
    convertToFirebase: convertToFirebase as any,
    byUser: state.userSessionV2.user
  }) as Result<IProjectRisk[]>;
  if (result.isSuccess) {
    dispatch(addUpdateFieldNoteRisk(result.value[0]));
    return true;
  } else {
    dispatch(setRiskError(result.error));
    return false;
  }
};


