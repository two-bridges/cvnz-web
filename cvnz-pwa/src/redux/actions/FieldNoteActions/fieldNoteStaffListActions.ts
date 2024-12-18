import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IInductionStaff } from "src/redux/model/fieldNote.model";
import { rootState } from "src/redux/reducers/rootReducer";
import _ from "underscore";

export const SET_FIELD_NOTE_STAFFS = 'SET_FIELD_NOTE_STAFFS';
export const SET_ORG_STAFF = 'SET_ORG_STAFF';

export type ActionTypes =

  | { type: typeof SET_FIELD_NOTE_STAFFS; payload: IInductionStaff[] }
  | { type: typeof SET_ORG_STAFF; payload: IInductionStaff[] }


export const setFieldNoteStaffs = (risks: IInductionStaff[]): ActionTypes => ({
  type: SET_FIELD_NOTE_STAFFS,
  payload: risks
});

export const getFieldNoteStaffsFromFirebase = (options: { organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Staffs').get()
  let staffList = query.docs.map(doc => {
    return doc.data() as IInductionStaff
  });

  dispatch(setFieldNoteStaffs(staffList));
};

export const setOrgVolunteers = (volunteers: IInductionStaff[]): ActionTypes => ({
  type: SET_ORG_STAFF,
  payload: volunteers
});
export const getOrgStaffsFromFirebase = (organisationId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collectionGroup("Staffs").get();
  let staffList = query.docs.map(doc => {
    return doc.data() as IInductionStaff
  });
  staffList = staffList.filter(v => v.orgId === organisationId);
  // volunteerList = _.uniq(volunteerList, "email");
  staffList = _.uniq(staffList, v => [v.firstName, v.lastName, v.email].join());

  dispatch(setOrgVolunteers(staffList));
};
