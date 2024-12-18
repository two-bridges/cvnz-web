
import * as actionTypes from '../../redux/actions';
import * as _ from "underscore";
import uuid from 'uuid/v1';
import * as types from "../actions/actionTypes";
import { IProject } from '../model/project.model';
import * as projectActions from '../actions/projectActions';
import { ILoadEntityListAction, ILoadEntitySingleAction } from '../actions/entityActions';
import { IEntity } from '../model/entity.model';

export interface IEntityState<E> {
  list: _.Dictionary<E>;
  single?: E;
  requesting: boolean;
  mutations: number;
  lastError?: string;
}

export type EntityStateType = 'new' | 'clean' | 'modified' | 'deleted';
export interface IEditableEntityState<E> {
  entity?: E;
  lastError?: string;
  entityState?: EntityStateType;
}
