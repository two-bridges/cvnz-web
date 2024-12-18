
import { IEntity } from "./entity.model";
import { ConsequenceType, IConsequence, ILikelihood, LikelihoodType } from "./risk-determination";

export interface IProjectRisk extends IEntity {
  id: string;
  name: string;
  risk_id: number;
  project_id: string;
  organisation_id: string;
  fieldNoteId: string;
  risk_rating: string;
  risk_controls: string[];
  likelihood: LikelihoodType;
  consequence: ConsequenceType;
}

export function convertToFirebase(deep: IProjectRisk) {
  let entity = {
    ...deep
  };

  return entity as IProjectRisk;
}

export function CreateNewProjectRisk() {
  let location: IProjectRisk = {
    id: "",
    name: "",
    risk_id: 0,
    project_id: "",
    organisation_id: "",
    fieldNoteId: '',
    risk_rating: '',
    risk_controls: [],
    likelihood: '',
    consequence: '',
    created_utc: "",
    created_by: "",
    updated_utc: "",
    updated_by: "",
    deleted_utc: "",
    deleted_by: "",
  }
  return location;

};
