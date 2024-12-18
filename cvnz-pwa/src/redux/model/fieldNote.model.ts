
import moment from 'moment';
import { LONGITUDE, LATITUDE } from 'src/constants/constants';
import { IEntity } from "./entity.model";
import { ILocation } from './location.model';

export interface IFieldNoteAdditionalNote {
  id: string;
  description: string;
  fieldNoteId: string;
  images: string[]
}
export function convertToFirebaseAdditionalNotes(deep: IFieldNoteAdditionalNote) {
  let entity = {
    ...deep
  };
  return entity as IFieldNoteAdditionalNote;
}

export interface IImageUpload extends IEntity {
  id: string;
  imgUrl: string;
  fieldNoteId: string;
  goalId: string;
}

export function CreateNewImageUpload() {
  let fieldNote: IImageUpload = {
    id: '',
    imgUrl: '',
    fieldNoteId: '',
    goalId: '',
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
  }
  return fieldNote;
}

export interface IInductionStaff extends IEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  fieldNoteId: string;
  orgId: string;
}

export function CreateNewInductionStaff() {
  let fieldNote: IInductionStaff = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    fieldNoteId: '',
    orgId: "",
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
  }
  return fieldNote;
}


export interface IInductionVolunteer extends IEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inductionStatus: boolean;
  fieldNoteId: string;
  orgId: string;

}

export function CreateNewInductionVolunteer() {
  let fieldNote: IInductionVolunteer = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inductionStatus: false,
    fieldNoteId: '',
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
    orgId: "",

  }
  return fieldNote;
}


export function CreateNewFieldNoteAdditionalNote() {
  let fieldNote: IFieldNoteAdditionalNote = {
    id: '',
    description: '',
    fieldNoteId: '',
    images: []
  }
  return fieldNote;
}

export interface IFieldNote extends IEntity {
  id: string;
  projectId: string;
  organisationId: string;
  fieldNoteDate: string;
  notes: string;
  status: string;
  location: ILocation;
}
export function convertToFirebase(deep: IFieldNote) {
  let entity = {
    ...deep
  };
  return entity as IFieldNote;
}

export function CreateNewFieldNote() {
  let fieldNote: IFieldNote = {
    id: "",
    projectId: '',
    organisationId: "",
    status: '',
    fieldNoteDate: moment().toISOString(),
    notes: '',
    location: {
      address: "",
      longitude: LONGITUDE,
      latitude: LATITUDE,
      googleMapId: "",
    },
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
  }

  return fieldNote;

};
