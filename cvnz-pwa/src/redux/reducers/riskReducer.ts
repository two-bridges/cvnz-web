import * as _ from "underscore";
import * as riskActions from '../actions/riskActions';
import { rootState } from './rootReducer';
import { Risk } from "../../customviews/Scripts";

export interface IRisksState {
  risks: Risk[],
  initialCheck: boolean,
}

export const initialState: IRisksState = {
  risks: [],
  initialCheck: false
};

export function reducer(state = rootState?.risks, action: riskActions.ActionTypes) {

  switch (action.type) {
    case 'GET_RISK_LIST':
      return {
        ...state,
        risks: { ...action.payload },
      };
    default:
      return state ?? {};
  }
}
