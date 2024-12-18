import * as _ from "underscore";
import { rootState } from "../rootReducer";

import * as fieldNoteImageActions from '../../actions/FieldNoteActions/fieldNoteImageActions';
import { HelperService } from "src/lib/helper";
import { IImageUpload } from "src/redux/model/fieldNote.model";


export interface IFieldNoteImages {
  list: IImageUpload[],
  initialCheck: boolean,
  single?: IImageUpload,

}

export const initialState: IFieldNoteImages = {
  list: [],
  initialCheck: false,
  single: undefined,

};
export const getLocalStoredData = () => {
  const localStoredFieldNote = localStorage.getItem('fieldNoteImages');
  if (localStoredFieldNote) {
    return JSON.parse(localStoredFieldNote) as IImageUpload[];
  } else {
    return [];
  }
}

function updateLocalStorage(newGoal: IImageUpload) {
  let getStoredLocally = getLocalStoredData();
  if (getStoredLocally) {
    return [
      ...getStoredLocally.map(item => item.id == newGoal.id
        ?
        newGoal : item
      )
    ]
  }
}

function addToLocalStorage(newGoal: IImageUpload) {
  let getStoredLocally = getLocalStoredData();
  if (getStoredLocally) {
    return [...HelperService.getArrayFromObjectList(getStoredLocally), newGoal]
  }
}

export const add = (presentGoalList: IImageUpload[], newGoal: IImageUpload, type: string) => {
  if (type === "add") {
    let updatedLocalStorage = addToLocalStorage(newGoal);
    localStorage.setItem('fieldNoteImages', JSON.stringify(updatedLocalStorage));
    return [...HelperService.getArrayFromObjectList(presentGoalList), newGoal]
  } else {
    let updatedLocalStorage = updateLocalStorage(newGoal);
    localStorage.setItem('fieldNoteImages', JSON.stringify(updatedLocalStorage));
    return [
      ...HelperService.getArrayFromObjectList(presentGoalList).map(item => item.id == newGoal.id
        ?
        newGoal : item
      )
    ]
  }
}

export function reducer(state = rootState?.fieldNoteImage, action: fieldNoteImageActions.ActionTypes) {
  switch (action.type) {
    case 'SET_LOCAL_STORAGE_FIELD_NOTE_IMAGES':
      return {
        ...state,
        list: action.payload
      };
    case 'GET_LOCAL_STORAGE_FIELD_NOTE_IMAGES':
      return {
        ...state,
        list: getLocalStoredData()
      };
    case 'ADD_UPDATE_FIELD_NOTE_IMAGE':
      return {
        ...state,
        list: add(state.list, action.payload.image, action.payload.type)
      };
    default:
      return state ?? {};
  }
}
