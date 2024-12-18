import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IFieldNote, IFieldNoteAdditionalNote, IImageUpload, IInductionStaff, IInductionVolunteer } from "src/redux/model/fieldNote.model";
import { IGoal } from "src/redux/model/goal.model";
import { IProjectRisk } from "src/redux/model/risk.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { firebaseGetDocumentV2 } from "../apiStatusActions";
import { setLocalFieldNoteImages } from "../FieldNoteActions/fieldNoteImageActions";
import { setLocalFieldNoteRisks } from "../FieldNoteActions/fieldNoteRisksActions";

export const GET_PROJECT_FIELD_NOTES = 'GET_PROJECT_FIELD_NOTES';
export const SET_PROJECT_FIELD_NOTES = 'SET_PROJECT_FIELD_NOTES';
export const FETCH_ALL_FIELD_NOTES = 'FETCH_ALL_FIELD_NOTES';

export type ActionTypes =
  | { type: typeof GET_PROJECT_FIELD_NOTES; payload: IFieldNote[] }
  | { type: typeof FETCH_ALL_FIELD_NOTES; payload: IFieldNote[] }

export const setProjectFieldNotes = (fieldNotes: IFieldNote[]): ActionTypes => ({
  type: GET_PROJECT_FIELD_NOTES,
  payload: fieldNotes
});


export const fetchProjectFieldNotes = (options: { organisationId: string, projectId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').get()
  let fieldNotes = query.docs.map(doc => {
    return doc.data() as IFieldNote
  });
  dispatch(setProjectFieldNotes(fieldNotes));
  return fieldNotes;
};


export const getProjectFieldNote = (options: { organisationId: string, projectId: string, fieldNoteId?: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let result = await firebaseGetDocumentV2<IFieldNote>({
    colPath: `Organisations/${options.organisationId}/Projects/${options.projectId}/FieldNotes/${options.fieldNoteId}`,
  });
  if (result.isSuccess) {
    let riskQuery = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Risks').get()
    let fieldNoteRisks = riskQuery.docs.map(doc => {
      return doc.data() as IProjectRisk
    });
    dispatch(setLocalFieldNoteRisks(fieldNoteRisks));

    let goalsQuery = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Outcomes').get()
    let fieldNoteGoals = goalsQuery.docs.map(doc => {
      return doc.data() as IGoal
    });


    let staffQuery = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Staffs').get()
    let fieldNoteStaffs = staffQuery.docs.map(doc => {
      return doc.data() as IInductionStaff
    });
    //dispatch(setLocalFieldNoteStaffs({ staffs: fieldNoteStaffs }));

    let volunteersQuery = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Volunteers').get()
    let fieldNoteVolunteers = volunteersQuery.docs.map(doc => {
      return doc.data() as IInductionVolunteer
    });
    if (fieldNoteVolunteers) {
      // dispatch(setLocalFieldNoteVolunteers({ volunteers: fieldNoteVolunteers }));
    } else {
      // dispatch(setLocalFieldNoteVolunteers({ volunteers: [] }));
    }


    let notesQuery = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('AdditionalNotes').get()
    let fieldNoteAdditionalNotes = notesQuery.docs.map(doc => {
      return doc.data() as IFieldNoteAdditionalNote
    });
    if (fieldNoteAdditionalNotes) {
      // dispatch(setLocalFieldAdditionalNote({ notes: fieldNoteAdditionalNotes }));
    } else {
      // dispatch(setLocalFieldAdditionalNote({ notes: [] }));
    }


    let imagesQuery = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Images').get()
    let fieldNoteImages = imagesQuery.docs.map(doc => {
      return doc.data() as IImageUpload
    });
    if (fieldNoteImages) {
      dispatch(setLocalFieldNoteImages({ images: fieldNoteImages }));
    } else {
      dispatch(setLocalFieldNoteImages({ images: [] }));
    }

  }
};

export const getFieldNoteRisks = (options: { organisationId: string, projectId: string, fieldNoteId?: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Risks').get()
  let fieldNoteRisks = query.docs.map(doc => {
    return doc.data() as IProjectRisk
  });
  dispatch(setLocalFieldNoteRisks(fieldNoteRisks));
};

export const getFieldNoteGoals = (options: { organisationId: string, projectId: string, fieldNoteId?: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").doc(options.projectId).collection('FieldNotes').doc(options.fieldNoteId).collection('Goals').get()
  let fieldNoteGoals = query.docs.map(doc => {
    return doc.data() as IGoal
  });
};




export const setAllFieldNotes = (fieldNotes: IFieldNote[]): ActionTypes => ({
  type: FETCH_ALL_FIELD_NOTES,
  payload: fieldNotes
});


export const fetchAllFieldNotes = (organisationId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {

  let allFieldNotes: IFieldNote[] = [];

  const fieldNoteRef = await myFirebase.firestore().collection('Organisations').doc(organisationId).collection('Projects').get();
  fieldNoteRef.forEach(async e => {
    const querySnapshot = await await myFirebase.firestore().collection('Organisations').doc(organisationId).collection('Projects').doc(e.data().id).collection('FieldNotes').get();
    querySnapshot.forEach(e => {
      allFieldNotes.push(e.data() as IFieldNote);
    });
    dispatch(setProjectFieldNotes(allFieldNotes));
    return allFieldNotes;
  });
};

export const fetchAllFieldNotesV1 = (organisationId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {

  let allFieldNotes: IFieldNote[] = [];
  const fieldNoteRef = await myFirebase.firestore().collectionGroup('FieldNotes').where("organisationId", "==", organisationId).get();
  fieldNoteRef.forEach(e => {
    allFieldNotes.push(e.data() as IFieldNote);
  });
  console.log("allFieldNotes", allFieldNotes);
  return allFieldNotes;
};