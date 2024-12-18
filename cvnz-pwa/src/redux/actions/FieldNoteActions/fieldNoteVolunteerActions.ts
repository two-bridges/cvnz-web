import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Result } from "src/lib/result.model";
import { IInductionVolunteer } from "src/redux/model/fieldNote.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { firebaseUpsertBatchV3 } from "../apiStatusActions";

export const ADD_UPDATE_FIELD_NOTE_VOLUNTEER = 'ADD_UPDATE_FIELD_NOTE_VOLUNTEER';
export const DELETE_FIELD_NOTE_VOLUNTEER = 'DELETE_FIELD_NOTE_VOLUNTEER';
export const SET_VOLUNTEER_ERROR = 'SET_VOLUNTEER_ERROR';
export const UNSET_VOLUNTEER_ERROR = 'UNSET_VOLUNTEER_ERROR';


export type ActionTypes =
  | { type: typeof ADD_UPDATE_FIELD_NOTE_VOLUNTEER; payload: IInductionVolunteer }
  | { type: typeof DELETE_FIELD_NOTE_VOLUNTEER; payload: IInductionVolunteer[] }
  | { type: typeof SET_VOLUNTEER_ERROR; lastError: string }
  | { type: typeof UNSET_VOLUNTEER_ERROR; }

export const addUpdateFieldNoteVolunteer = (volunteer: IInductionVolunteer): ActionTypes => ({
  type: ADD_UPDATE_FIELD_NOTE_VOLUNTEER,
  payload: volunteer
});

export const setVolunteerError = (error: string): ActionTypes => ({
  type: SET_VOLUNTEER_ERROR,
  lastError: error
});

export const unsetVolunteerError = (): ActionTypes => ({
  type: UNSET_VOLUNTEER_ERROR,
});
export const addOrUpdateFieldNoteVolunteer = (options: { volunteer: IInductionVolunteer, organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let state = getState();
  var colpath = `Organisations/${options.organisationId}/Projects/${options.projectId}/FieldNotes/${options.fieldNoteId}/Volunteers`;
  if (!options.volunteer.fieldNoteId) {
    options.volunteer.fieldNoteId = options.fieldNoteId;
  }
  if (options.volunteer.deleted_utc) {
    let deletedBy = state.userSessionV2.user?.email;
    options.volunteer.deleted_by = deletedBy ? deletedBy : '';

  }
  let result = await firebaseUpsertBatchV3({
    entities: [options.volunteer],
    colPath: colpath,
    byUser: state.userSessionV2.user
  }) as Result<IInductionVolunteer[]>;
  if (result.isSuccess) {
    dispatch(addUpdateFieldNoteVolunteer(result.value[0]));
    return true;
  } else {
    dispatch(setVolunteerError(result.error));
    return false;
  }
};


