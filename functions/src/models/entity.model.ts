

import { EntityStateType } from "./entity-state.model";

export const NewEntity: IEntity = {
  id: "",
  created_utc: "",
  created_by: "",
  updated_utc: "",
  updated_by: "",
  deleted_utc: "",
  deleted_by: "",
}

export interface IEntity {
  id: string;
  created_utc: string;
  created_by: string;
  updated_utc: string;
  updated_by: string;
  deleted_utc: string;
  deleted_by: string;
}

export interface IEditableEntity extends IEntity {
  entityState: EntityStateType;
}
