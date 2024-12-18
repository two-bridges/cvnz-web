
import { myFirebase, db } from "../../firebase/firebase";
import { Dispatch } from "redux";
import { IProject } from "../model/project.model";
import { ThunkAction } from 'redux-thunk'
import { RootState } from "../reducers/rootReducer";
import { IEntity } from "../model/entity.model";
import { Action } from "redux";

export interface IAppAction extends Action<string> {
}

export interface IEntityAction<E extends IEntity> extends IAppAction {
  // entityType: E;
  success: boolean;
  error?: string;
}

export interface ILoadEntityListAction<E extends IEntity> extends IEntityAction<E> {
  list: E[];
}

export interface ILoadEntitySingleAction<E extends IEntity> extends IEntityAction<E> {
  single: E;
}

export interface ISaveEntityAction<E extends IEntity> extends IEntityAction<E> {
  single: E;
}
