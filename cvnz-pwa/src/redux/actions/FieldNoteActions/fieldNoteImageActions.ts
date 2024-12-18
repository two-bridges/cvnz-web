import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { IImageUpload } from "src/redux/model/fieldNote.model";
import { rootState } from "src/redux/reducers/rootReducer";
import { firebaseUpsertBatchV2 } from "../apiStatusActions";

export const SET_LOCAL_STORAGE_FIELD_NOTE_IMAGES = 'SET_LOCAL_STORAGE_FIELD_NOTE_IMAGES';
export const GET_LOCAL_STORAGE_FIELD_NOTE_IMAGES = 'GET_LOCAL_STORAGE_FIELD_NOTE_IMAGES';
export const ADD_UPDATE_FIELD_NOTE_IMAGE = 'ADD_UPDATE_FIELD_NOTE_IMAGE';
export const SAVE_FIELD_NOTE_IMAGES = 'SAVE_FIELD_NOTE_IMAGES';

export type ActionTypes =
  | { type: typeof SAVE_FIELD_NOTE_IMAGES; payload?: ({ images: IImageUpload }) }
  | { type: typeof SET_LOCAL_STORAGE_FIELD_NOTE_IMAGES; payload?: IImageUpload[] }
  | { type: typeof GET_LOCAL_STORAGE_FIELD_NOTE_IMAGES; payload?: IImageUpload[] }
  | { type: typeof ADD_UPDATE_FIELD_NOTE_IMAGE; payload: ({ image: IImageUpload, type: string }) }


export const setLocalStorageFieldNoteImages = (images?: IImageUpload[]): ActionTypes => ({
  type: SET_LOCAL_STORAGE_FIELD_NOTE_IMAGES,
  payload: images
});

export const setLocalFieldNoteImages = (options: { images: IImageUpload[] }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  if (options.images) {
    localStorage.setItem('fieldNoteImages', JSON.stringify(options.images));
    dispatch(setLocalStorageFieldNoteImages(options.images));
  }
};

export const getLocalStorageFieldNoteImages = (image?: IImageUpload[]): ActionTypes => ({
  type: GET_LOCAL_STORAGE_FIELD_NOTE_IMAGES,
  payload: image
});

export const getLocalFieldNoteImages = (): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  const localStoredFieldNote = localStorage.getItem('fieldNoteImages');
  if (localStoredFieldNote) {
    dispatch(getLocalStorageFieldNoteImages(JSON.parse(localStoredFieldNote)));
  }
};


export const addUpdateFieldNoteImage = (image: IImageUpload, type: string): ActionTypes => ({
  type: ADD_UPDATE_FIELD_NOTE_IMAGE,
  payload: { image: image, type }
});

export const addOrUpdateFieldNoteImage = (image: IImageUpload, type: string): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(addUpdateFieldNoteImage(image, type));
};

export const saveFieldNoteImages = (image: IImageUpload): ActionTypes => ({
  type: SAVE_FIELD_NOTE_IMAGES,
  payload: { images: image }
});
export const addFieldNoteImagesToFirebase = (options: { image: IImageUpload, organisationId: string, projectId: string, fieldNoteId: string }): ThunkAction<void, typeof rootState, unknown, Action<string>> => async (dispatch, getState) => {
  let state = getState();
  var colpath = `Organisations/${options.organisationId}/Projects/${options.projectId}/FieldNotes/${options.fieldNoteId}/Images`;
  options.image.fieldNoteId = options.fieldNoteId;

  let savedFieldNote = await firebaseUpsertBatchV2({
    entities: [options.image],
    colPath: colpath,
    byUser: state.userSessionV2.user
  }) as IImageUpload;
  dispatch(saveFieldNoteImages(savedFieldNote));
};
