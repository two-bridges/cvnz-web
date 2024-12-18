

import { IEntity } from "./entity.model";
import { CreateNewLocation, ILocation } from "./location.model";

export interface IOrganisation extends IEntity {
  name: string;
  hq_location: ILocation;
  imageUrl: string
}

export function convertToFirebase(deep: IOrganisation) {
  let entity = {
    ...deep
  };
  return entity as IOrganisation;
}

export function CreateNewOrganisation() {
  let organisation: IOrganisation = {
    id: "",
    name: "",
    hq_location: CreateNewLocation(),
    imageUrl: '',
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
  }

  return organisation;

};
