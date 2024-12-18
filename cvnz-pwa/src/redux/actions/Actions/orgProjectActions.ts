import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { myFirebase } from "src/firebase/firebase";
import { IFieldNote } from "src/redux/model/fieldNote.model";
import { IProject } from "src/redux/model/project.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { firebaseGetCollectionGroup, firebaseGetDocumentV2 } from "../apiStatusActions";

export const GET_ORG_PROJECTS = 'GET_ORG_PROJECTS';
export const SET_ORG_PROJECT = 'SET_ORG_PROJECT';
export const SET_LOCAL_STORAGE_FIELD_NOTE_PROJECT = 'SET_LOCAL_STORAGE_FIELD_NOTE_PROJECT';
export const GET_LOCAL_STORAGE_FIELD_NOTE_PROJECT = 'GET_LOCAL_STORAGE_FIELD_NOTE_PROJECT';
export const GET_FIELD_NOTE_PROJECT = 'GET_FIELD_NOTE_PROJECT';

export const SET_ORG_PROJECT_ERROR = 'SET_ORG_PROJECT_ERROR';
export const UNSET_ORG_PROJECT_ERROR = 'UNSET_ORG_PROJECT_ERROR';

export type ActionTypes =
  | { type: typeof GET_ORG_PROJECTS; payload: IProject[] }
  | { type: typeof SET_ORG_PROJECT; payload?: IProject }
  | { type: typeof SET_LOCAL_STORAGE_FIELD_NOTE_PROJECT; payload?: IProject }
  | { type: typeof GET_LOCAL_STORAGE_FIELD_NOTE_PROJECT; payload?: IProject }
  | { type: typeof GET_FIELD_NOTE_PROJECT; payload?: IProject }
  | { type: typeof SET_ORG_PROJECT_ERROR; lastError: string }
  | { type: typeof UNSET_ORG_PROJECT_ERROR; }


export const setOrgProjects = (projects: IProject[]): ActionTypes => ({
  type: GET_ORG_PROJECTS,
  payload: projects
});

export const setFieldNoteProject = (project?: IProject): ActionTypes => ({
  type: SET_ORG_PROJECT,
  payload: project
});

export const fetchOrgProjects = (options: { organisationId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(options.organisationId).collection("Projects").get()
  let projects = query.docs.map(doc => {
    return doc.data() as IProject
  });
  dispatch(setOrgProjects(projects));
  return projects;
};

export const setFieldNoteActiveProject = (project: IProject | undefined): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(setFieldNoteProject(project));
};

export const clearFieldNoteActiveProject = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(setFieldNoteProject(undefined));
};


export const setLocalStorageFieldNoteProject = (fieldNote?: IProject): ActionTypes => ({
  type: SET_LOCAL_STORAGE_FIELD_NOTE_PROJECT,
  payload: fieldNote
});

export const setLocalFieldNoteProject = (options: { fieldNoteProject: IProject | undefined }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  localStorage.setItem('fieldNoteProject', JSON.stringify(options.fieldNoteProject));
  dispatch(setLocalStorageFieldNoteProject(options.fieldNoteProject));
};


export const getLocalStorageFieldNoteProject = (project?: IProject): ActionTypes => ({
  type: GET_LOCAL_STORAGE_FIELD_NOTE_PROJECT,
  payload: project
});

export const getLocalFieldNoteProject = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  const localStoredFieldNote = localStorage.getItem('fieldNoteProject');
  if (localStoredFieldNote) {
    dispatch(getLocalStorageFieldNoteProject(JSON.parse(localStoredFieldNote)));
  }
};


export const getActiveFieldNoteProject = (options: { organisationId: string, projectId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let result = await firebaseGetDocumentV2<IProject>({
    colPath: `Organisations/${options.organisationId}/Projects/${options.projectId}`,
  });
  if (result.isSuccess) {
    dispatch(setFieldNoteProject(result.value));
  } else {
    dispatch(setOrgProjectError(result.error));
  }
};

export const setOrgProjectError = (lastError: string): ActionTypes => ({
  type: SET_ORG_PROJECT_ERROR,
  lastError,
});

export const unsetOrgProjectError = (): ActionTypes => ({
  type: UNSET_ORG_PROJECT_ERROR,
});