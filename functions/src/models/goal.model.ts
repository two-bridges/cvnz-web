

import { IProject } from "./project.model";
import { IEntity } from "./entity.model";
import { IRecord } from "./record.model";

export interface IGoalType extends IEntity {
  goal: string;
  metric: string;
}

export interface IGoal extends IEntity {
  id: string;
  goalAmount: number;
  actualAmount: number;
  goalEndTime: string;
  goalName: string;
  goalStartTime: string;
  goalUnit: string;
  type: string;
  isActive: boolean;
  projectId: string;
  fieldNoteId: string;
  goalTypeId: number;
  outcomeAmount: number;
  images: string[];
}

export function convertToFirebase(deep: IGoalDeep) {
  let entity = {
    ...deep
  };
  delete entity.project;
  delete entity.record;
  delete entity.goalType;
  return entity as IGoalDeep;
}

export interface IGoalDeep extends IGoal {
  project?: IProject;
  record?: IRecord;
  goalType?: IGoalType;
}

export function CreateNewGoal() {
  let startTime = new Date();
  let endTime = new Date(+startTime);
  endTime.setMonth(endTime.getMonth() + 1);
  endTime.setDate(endTime.getDate() - 1);

  let goal: IGoal = {
    id: "",
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
    projectId: "",
    fieldNoteId: "",
    goalTypeId: 0,
    goalName: '',
    type: '',
    goalUnit: '',
    goalAmount: 0,
    actualAmount: 0,
    outcomeAmount: 0,
    goalStartTime: startTime.toISOString(),
    goalEndTime: endTime.toISOString(),
    isActive: false,
    images: [],
  }

  return goal;

};

export function CreateGoals() {
  let goals: IGoal[] = [

  ]

  return goals;

};
