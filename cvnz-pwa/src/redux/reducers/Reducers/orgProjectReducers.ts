import * as _ from "underscore";
import { rootState } from "../rootReducer";

import * as orgProjectActions from '../../actions/Actions/orgProjectActions';
import { IProject } from "src/redux/model/project.model";


export interface IOrgProjectState {
  list: IProject[],
  initialCheck: boolean,
  single?: IProject,
  lastError: string,
}

export const initialState: IOrgProjectState = {
  list: [],
  initialCheck: false,
  single: undefined,
  lastError: '',

};
export const getLocalStoredData = () => {
  const localStoredFieldNote = localStorage.getItem('fieldNoteProject');
  if (localStoredFieldNote) {
    return JSON.parse(localStoredFieldNote);
  }
}
export function reducer(state = rootState?.orgProjects, action: orgProjectActions.ActionTypes) {
  switch (action.type) {
    case 'GET_ORG_PROJECTS':
      return {
        ...state,
        list: { ...action.payload },
      }
    case 'SET_ORG_PROJECT':
      return {
        ...state,
        single: action.payload
      };
    case 'SET_LOCAL_STORAGE_FIELD_NOTE_PROJECT':
      return {
        ...state,
        single: action.payload
      };
    case 'GET_LOCAL_STORAGE_FIELD_NOTE_PROJECT':
      return {
        ...state,
        single: getLocalStoredData()
      };
    default:
      return state ?? {};
  }
}
