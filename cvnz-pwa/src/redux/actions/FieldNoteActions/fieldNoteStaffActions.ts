import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Result } from "src/lib/result.model";
import { IInductionStaff } from "src/redux/model/fieldNote.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { dateToIso, firebaseUpsertBatchV3 } from "../apiStatusActions";

export const ADD_UPDATE_FIELD_NOTE_STAFF = 'ADD_UPDATE_FIELD_NOTE_STAFF';
export const DELETE_FIELD_NOTE_STAFF = 'DELETE_FIELD_NOTE_STAFF';
export const SET_STAFF_ERROR = 'SET_STAFF_ERROR';
export const UNSET_STAFF_ERROR = 'UNSET_STAFF_ERROR';


export type ActionTypes =
  | { type: typeof ADD_UPDATE_FIELD_NOTE_STAFF; payload: IInductionStaff }
  | { type: typeof DELETE_FIELD_NOTE_STAFF; payload: IInductionStaff[] }
  | { type: typeof SET_STAFF_ERROR; lastError: string }
  | { type: typeof UNSET_STAFF_ERROR; }

export const addUpdateFieldNoteStaff = (staff: IInductionStaff): ActionTypes => ({
  type: ADD_UPDATE_FIELD_NOTE_STAFF,
  payload: staff
});

export const setStaffError = (error: string): ActionTypes => ({
  type: SET_STAFF_ERROR,
  lastError: error
});

export const unsetStaffError = (): ActionTypes => ({
  type: UNSET_STAFF_ERROR,
});
export const addOrUpdateFieldNoteStaff = (options: { staff: IInductionStaff, organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let state = getState();
  var colpath = `Organisations/${options.organisationId}/Projects/${options.projectId}/FieldNotes/${options.fieldNoteId}/Staffs`;
  if (!options.staff.fieldNoteId) {
    options.staff.fieldNoteId = options.fieldNoteId;
  }
  if (options.staff.deleted_utc) {
    let deletedBy = state.userSessionV2.user?.id;
    options.staff.deleted_by = deletedBy ? deletedBy : '';
  }
  let result = await firebaseUpsertBatchV3({
    entities: [options.staff],
    colPath: colpath,
    byUser: state.userSessionV2.user
  }) as Result<IInductionStaff[]>;
  if (result.isSuccess) {
    dispatch(addUpdateFieldNoteStaff(result.value[0]));
    return true;
  } else {
    dispatch(setStaffError(result.error));
    return false;
  }
};


