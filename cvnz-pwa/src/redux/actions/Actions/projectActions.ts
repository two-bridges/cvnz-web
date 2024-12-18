import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { db, myFirebase } from "src/firebase/firebase";
import { IProject } from "src/redux/model/project.model";
import { convertToFirebase } from "../../model/risk.model";
import { rootState } from "../../reducers/rootReducer";

export const GET_PROJECTS = 'GET_PROJECTS';

export type ActionTypes =
  | { type: typeof GET_PROJECTS; payload: IProject[] }

export const setProjects = (projects: IProject[]): ActionTypes => ({
  type: GET_PROJECTS,
  payload: projects
});

export const fetchProjects = (organisationId: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  let query = await myFirebase.firestore().collection("Organisations").doc(organisationId).collection("Projects").get();
  let projects = query.docs.map(doc => {
    return doc.data() as IProject
  });
  dispatch(setProjects(projects));
  return projects;
};
