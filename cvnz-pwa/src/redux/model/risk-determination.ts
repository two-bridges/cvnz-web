

import { IEntity } from "./entity.model";


export interface ILikelihood {
  descriptor: LikelihoodType;
  outcomeDescription: string;
};

export interface IConsequence {
  descriptor: ConsequenceType;
  outcomeDescription: string;
};

export type LikelihoodType = "" | 'highly unlikely' | 'unlikely' | 'quiet possible' | "likely" | "almost certain";
export type ConsequenceType = "" | 'insignificant' | 'minor' | 'moderate' | 'major' | 'catastrophic';

// export const Likelihoods = {
//   'highly unlikely': {
//     descriptor: 'highly unlikely',
//     outcomeDescription: 'remote possibility (less than once every 5+ years)',
//   } as ILikelihood,
//   'unlikely': {
//     descriptor: 'highly unlikely',
//     outcomeDescription: 'remote possibility (less than once every 5+ years)',
//   } as ILikelihood,
// };
// export const Consequences = {
//   'insignificant': {
//     descriptor: 'insignificant',
//     outcomeDescription: 'no injury',
//   } as IConsequence,
//   'minor': {
//     descriptor: 'minor',
//     outcomeDescription: 'on-site first aid treatment',
//   } as IConsequence,

// };

export const Consequences: IConsequence[] = [
  {
    descriptor: 'insignificant',
    outcomeDescription: 'no injuries',
  },
  {
    descriptor: 'minor',
    outcomeDescription: 'on-site first aid treatment',
  },
  {
    descriptor: 'moderate',
    outcomeDescription: 'medical treatment required, loss of time',
  }, {
    descriptor: 'major',
    outcomeDescription: 'serious injury, hospitalisation',
  }, {
    descriptor: 'catastrophic',
    outcomeDescription: 'death, permanent disabililty',
  }
]

export const Likelihoods: ILikelihood[] = [
  {
    descriptor: 'highly unlikely',
    outcomeDescription: 'remote possibility (less than once every 5+ years)',
  },
  {
    descriptor: 'unlikely',
    outcomeDescription: 'remote possibility (less than once every 5+ years)',
  },
  {
    descriptor: 'quiet possible',
    outcomeDescription: 'occurs occassionally (monthly - yearly)',
  }, {
    descriptor: 'likely',
    outcomeDescription: 'occurs regularly (weekly-monthly)',
  },
  {
    descriptor: 'almost certain',
    outcomeDescription: 'expected to occurs(daily - weekly)',
  }
]

const RiskDetermination = {
  'highly unlikely': {
    'insignificant': 'Low Risk',
    'minor': 'Low Risk',
    'moderate': 'Low Risk',
    'major': 'Medium Risk',
    'catastrophic': 'High Risk',
  },
  'unlikely': {
    'insignificant': 'Low Risk',
    'minor': 'Medium Risk',
    'moderate': 'Medium Risk',
    'major': 'High Risk',
    'catastrophic': 'High Risk',
  },
  'quiet possible': {
    'insignificant': 'Low Risk',
    'minor': 'Medium Risk',
    'moderate': 'High Risk',
    'major': 'High Risk',
    'catastrophic': 'High Risk',
  },
  'likely': {
    'insignificant': 'Medium Risk',
    'minor': 'High Risk',
    'moderate': 'High Risk',
    'major': 'Extreme Risk',
    'catastrophic': 'Extreme Risk',
  },
  'almost certain': {
    'insignificant': 'Medium Risk',
    'minor': 'High Risk',
    'moderate': 'Extreme Risk',
    'major': 'Extreme Risk',
    'catastrophic': 'Extreme Risk',
  },
};


export function GetRiskDetermination(likelihood: LikelihoodType, consequence: ConsequenceType) {


  const determination = likelihood && consequence && RiskDetermination[likelihood][consequence];
  console.log("determination", determination);
  return determination;

}
