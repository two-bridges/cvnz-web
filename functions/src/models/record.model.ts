

import { IEntity } from "./entity.model";
import { IProject } from "./project.model";


export interface IStaff {
  id: string;
  Name: string;
  Email: string;
  IsAttending: boolean;
  IsStaff: boolean
}
// export interface IVolunteer {
//   id: string;
//   Name: string;
//   Email: string;
//   IsAttending: boolean;
// }
export interface IData {
  id: string;
  type: string;
  number: number;

}
export interface IRisk {
  id: string;
  type: string;
  description: string;
  likelihood: string;
  severity: string;
  Actions: [];
}

export function convertToFirebase(deep: IRecordDeep) {
  let entity = {
    ...deep
  };
  delete entity.project;
  return entity as IRecord;
}
export interface IRecord extends IEntity {
  id: string;
  projectId: string;
  activityId: string;
  meetingPoint: string;
  notes: string;
  numberOfStaff: number;
  staffHours: number;
  numberOfVolunteers: number;
  volunteersHours: number;
  recordDate: string;
  staff: IStaff[];
  //volunteer: IVolunteer[];
  data: IData[];
  risk: IRisk[];
}

export class Record implements IRecord {
  id: string;
  projectId: string;
  activityId: string;
  meetingPoint: string;
  notes: string;
  numberOfStaff: number;
  staffHours: number;
  numberOfVolunteers: number;
  volunteersHours: number;
  recordDate: string;
  staff: IStaff[];
  data: IData[];
  risk: IRisk[];
  created_utc: string;
  created_by: string;
  updated_utc: string;
  updated_by: string;
  deleted_utc: string;
  deleted_by: string;
  constructor(raw: IRecord) {
    this.id = raw.id;
    this.projectId = raw.projectId;
    this.activityId = raw.activityId;
    this.meetingPoint = raw.meetingPoint;
    this.notes = raw.notes;
    this.numberOfStaff = raw.numberOfStaff;
    this.staffHours = raw.staffHours;
    this.numberOfVolunteers = raw.numberOfVolunteers;
    this.volunteersHours = raw.volunteersHours;
    this.recordDate = raw.recordDate;
    this.staff = raw.staff;
    this.data = raw.data;
    this.risk = raw.risk;
    this.created_utc = raw.created_utc;
    this.created_by = raw.created_by;
    this.updated_utc = raw.updated_utc;
    this.updated_by = raw.updated_by;
    this.deleted_utc = raw.deleted_utc;
    this.deleted_by = raw.deleted_by;
  }
  totalHours() {
    let hours = 0;
    hours += this.volunteersHours * this.numberOfVolunteers;
    hours += this.staffHours * this.numberOfStaff;
    // console.log(`totalHours[${this.recordDate}]: ${hours} = (${this.volunteersHours} * ${this.numberOfVolunteers}) + (${this.staffHours} * ${this.numberOfStaff})`)
    return hours;
  }
  totalContribution() {
    let contribution = 42 * this.totalHours();
    // console.log(`totalContribution[${this.recordDate}]: ${contribution} = 42 * ${this.totalHours()}`);
    return contribution;
  }
}

export interface IRecordDeep extends IRecord {
  project?: IProject;
}

export class RecordDeep extends Record implements IRecordDeep {
  project?: IProject;
  constructor(raw: IRecordDeep) {
    super(raw);
    this.project = raw.project;
  }
}


export function CreateNewRecord() {
  let record: IRecord = {
    id: "",
    projectId: "",
    activityId: "",
    meetingPoint: "",
    notes: "",
    numberOfStaff: 0,
    staffHours: 0,
    numberOfVolunteers: 0,
    volunteersHours: 0,
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
    recordDate: (new Date()).toISOString(),
    staff: [],
    //volunteer: [],
    data: [],
    risk: []

  }

  return record;

};
