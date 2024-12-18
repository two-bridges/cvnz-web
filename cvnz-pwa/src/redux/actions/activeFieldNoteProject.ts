import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { db, myFirebase } from "src/firebase/firebase";
import { IProject } from "src/redux/model/project.model";
import { rootState } from "../reducers/rootReducer";

export const GET_PROJECT = 'GET_PROJECT';

export type ActionTypes =
  | { type: typeof GET_PROJECT; payload: IProject }

export const setProject = (projects: IProject): ActionTypes => ({
  type: GET_PROJECT,
  payload: projects
});

export const fetchFieldNoteActiveProject = (organisationId: string, projectId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(organisationId).collection("Projects").where('id', '==', projectId).get();
  let project = query.docs.map(doc => {
    return doc.data() as IProject
  });
  dispatch(setProject(project[0]));
  return project[0];
};
