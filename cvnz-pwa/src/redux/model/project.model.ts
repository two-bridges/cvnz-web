

import { LONGITUDE, LATITUDE } from "src/constants/constants";
import { IEntity } from "./entity.model";
import { IGoal } from "./goal.model";
import { ILocation } from "./location.model";
import { IProjectRisk } from "./risk.model";

export interface IProject extends IEntity {
  address: string;
  city: string;
  files: string;
  phone: string;
  projectImage: string;
  projectName: string;
  projectType: string;
  primaryContact: string;
  state: string;
  status: string;
  inductionNotes: string;
  location: ILocation;
}

export function convertToFirebaseShallow(deep: IProject) {
  let entity = {
    ...deep
  };
  delete (entity as IProjectDeep).projectRisk;
  delete (entity as IProjectDeep).projectGoals;

  console.log(JSON.stringify(entity));
  return entity as IProject;
}

export function convertToFirebase(deep: IProjectDeep) {
  let entity = {
    ...deep
  };
  delete entity.projectRisk;
  return entity as IProjectDeep;
}

export interface IProjectDeep extends IProject {
  projectRisk?: IProjectRisk[];
  projectGoals?: IGoal[];
}
export function CreateNewProject() {
  let project: IProject = {
    id: "",
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
    address: "",
    city: "",
    files: "",
    phone: "",
    projectImage: "",
    projectName: "",
    projectType: "",
    primaryContact: "",
    state: "",
    status: "active",
    inductionNotes: '',
    location: {
      address: "",
      longitude: LONGITUDE,
      latitude: LATITUDE,
      googleMapId: "",
    }

  }

  return project;

};
