import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IInductionVolunteer } from "src/redux/model/fieldNote.model";
import { rootState } from "src/redux/reducers/rootReducer";
import _ from "underscore";

export const SET_FIELD_NOTE_VOLUNTEERS = 'SET_FIELD_NOTE_VOLUNTEERS';
export const SET_ORG_VOLUNTEERS = 'SET_ORG_VOLUNTEERS';
export const FETCH_VOLUNTEERS = "FETCH_VOLUNTEERS";

export type ActionTypes =

  | { type: typeof SET_FIELD_NOTE_VOLUNTEERS; payload: IInductionVolunteer[] }
  | { type: typeof SET_ORG_VOLUNTEERS; payload: IInductionVolunteer[] }
  | { type: typeof FETCH_VOLUNTEERS; payload: IInductionVolunteer[] }


export const setFieldNoteVolunteers = (volunteers: IInductionVolunteer[]): ActionTypes => ({
  type: SET_FIELD_NOTE_VOLUNTEERS,
  payload: volunteers
});

export const getFieldNoteVolunteersFromFirebase = (options: { organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Volunteers').get()
  let volunteerList = query.docs.map(doc => {
    return doc.data() as IInductionVolunteer
  });
  dispatch(setFieldNoteVolunteers(volunteerList));
};


export const setOrgVolunteers = (volunteers: IInductionVolunteer[]): ActionTypes => ({
  type: SET_ORG_VOLUNTEERS,
  payload: volunteers
});
export const getOrgVolunteersFromFirebase = (organisationId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collectionGroup("Volunteers").where("orgId", "==", organisationId).get()
  let volunteerList = query.docs.map(doc => {
    return doc.data() as IInductionVolunteer
  });

  volunteerList = _.uniq(volunteerList, v => [v.firstName, v.lastName, v.email, v.phone].join());
  //volunteerList = _.uniq(volunteerList, "email");
  dispatch(setOrgVolunteers(volunteerList));
};
