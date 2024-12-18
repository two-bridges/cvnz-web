

import { IEntity } from "./entity.model";
import moment from 'moment';
import { IProject } from "./project.model";
export interface IActivity extends IEntity {
  id: string;
  projectId: string;
  endTime: string;
  startTime: string;
  activityDate: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  coordinates: string;
  notes: string;
  activityTypes: string[];
  isSafteyChecked: boolean;
  title: string;
}

export interface IActivityDeep extends IActivity {
  project?: IProject;
}

export function convertToFirebase(deep: IActivityDeep) {
  let entity = {
    ...deep
  };
  delete entity.project;
  return entity as IActivityDeep;
}

export function CreateNewActivity() {
  let activity: IActivity = {
    id: "",
    title: "",
    projectId: "",
    endTime: moment().toISOString(),
    startTime: moment().toISOString(),
    activityDate: moment().toISOString(),
    address1: "",
    address2: "",
    city: "",
    state: "",
    coordinates: "",
    notes: "",
    activityTypes: [],
    isSafteyChecked: true,
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
  }

  return activity;

};
