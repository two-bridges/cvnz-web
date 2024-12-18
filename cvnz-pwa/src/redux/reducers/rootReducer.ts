
import { combineReducers, CombinedState } from 'redux';
import * as userSession from './userSessionReducer';
import * as projectReducer from './projectReducer';
import * as goalReducer from './goalReducer';
import * as activityReducer from './activityReducer';
import * as organisationReducer from './organisationReducer';
import * as organisationReducerV2 from './organisationReducerV2';
import * as userReducerV2 from './userReducerV2';
import * as editableOrganisationReducer from './editableOrganisationReducer';
import * as editableUserReducer from './editableUserReducer';
import * as recordReducer from './recordReducer';
import * as riskReducer from './riskReducer';
import * as projectRiskReducer from './projectRiskReducer';
import * as saveBarReduce from './saveBarReduce';
import * as goalTypeReducer from './Reducers/goalTypeReducers';
import * as projectGoalReducers from './Reducers/projectGoalReducers';
import * as orgProjectReducers from './Reducers/orgProjectReducers';
import * as fieldNoteRiskReducers from './Reducers/fieldNoteRiskReducers';
import * as fieldNoteRisksReducers from './Reducers/fieldNoteRisksReducers';
import * as fieldNoteImageReducers from './Reducers/fieldNoteImageReducers';
import * as fieldNoteFirebaseReducers from '../reducers/FieldNoteFirebaseReducers/fieldNoteFirebaseReducers';
import * as projectReducers from './Reducers/projectReducers';
import * as activeOrganisationReducers from '../reducers/activeOrganisationReducers';
import * as organisationGoalReducers from '../reducers/organisationGoalReducers';
import * as organisationAdminReducers from '../reducers/organisationAdminReducers';
import * as allProjectGoalsReducers from './allProjectGoalsReducers';
import * as activeFieldNoteProjectReducers from './activeFieldNoteProjectReducers';

import * as fieldNoteStaffReducers from './Reducers/fieldNoteStaffReducers';
import * as fieldNoteStaffListReducers from './Reducers/fieldNoteStaffListReducers';


import * as fieldNoteVolunteerReducers from './Reducers/fieldNoteVolunteerReducers';
import * as fieldNoteVolunteerListReducers from './Reducers/fieldNoteVolunteerListReducers';

import * as fieldNoteGoalReducers from './Reducers/fieldNoteGoalReducers';
import * as fieldNoteGoalListReducers from './Reducers/fieldNoteGoalListReducers';

import * as fieldAdditionalNoteReducers from './Reducers/fieldAdditionalNoteReducers';
import * as fieldAdditionalNoteListReducers from './Reducers/fieldAdditionalNoteListReducers';

import * as fieldNoteReducers from './Reducers/fieldNoteReducers';
import * as fieldNoteListReducers from './Reducers/fieldNoteListReducers';


export const rootReducer = combineReducers({
  projects: projectReducer.reducer,
  goals: goalReducer.reducer,
  activities: activityReducer.reducer,
  records: recordReducer.reducer,
  userSessionV2: userSession.reducer,
  saveBar: saveBarReduce.reducer,
  organisations: organisationReducer.reducer,
  organisationsV2: organisationReducerV2.reducer,
  usersV2: userReducerV2.reducer,
  editableOrganisation: editableOrganisationReducer.reducer,
  editableUser: editableUserReducer.reducer,
  risks: riskReducer.reducer,
  projectRisks: projectRiskReducer.reducer,
  goalTypes: goalTypeReducer.reducer,
  projectGoals: projectGoalReducers.reducer,
  orgProjects: orgProjectReducers.reducer,
  fieldNoteRisk: fieldNoteRiskReducers.reducer,
  fieldNoteRisks: fieldNoteRisksReducers.reducer,
  fieldNoteImage: fieldNoteImageReducers.reducer,
  fieldNoteFirebase: fieldNoteFirebaseReducers.reducer,
  projectReducers: projectReducers.reducer,
  activeOrganisationReducers: activeOrganisationReducers.reducer,
  organisationGoalReducers: organisationGoalReducers.reducer,
  allProjectGoalsReducers: allProjectGoalsReducers.reducer,
  organisationAdminReducers: organisationAdminReducers.reducer,
  activeFieldNoteProjectReducers: activeFieldNoteProjectReducers.reducer,

  fieldNoteStaff: fieldNoteStaffReducers.reducer,
  fieldNoteStaffList: fieldNoteStaffListReducers.reducer,

  fieldNoteVolunteer: fieldNoteVolunteerReducers.reducer,
  fieldNoteVolunteerList: fieldNoteVolunteerListReducers.reducer,

  fieldNoteGoal: fieldNoteGoalReducers.reducer,
  fieldNoteGoalList: fieldNoteGoalListReducers.reducer,

  fieldAdditionalNote: fieldAdditionalNoteReducers.reducer,
  fieldAdditionalNoteList: fieldAdditionalNoteListReducers.reducer,

  fieldNote: fieldNoteReducers.reducer,
  fieldNoteListReducers: fieldNoteListReducers.reducer,

});


export const rootState = {
  projects: projectReducer.initialState,
  goals: goalReducer.initialState,
  activities: activityReducer.initialState,
  records: recordReducer.initialState,
  userSessionV2: userSession.initialState,
  saveBar: saveBarReduce.initialState,
  organisations: organisationReducer.initialState,
  organisationsV2: organisationReducerV2.initialState,
  usersV2: userReducerV2.initialState,
  risks: riskReducer.initialState,
  projectRisks: projectRiskReducer.initialState,
  goalTypes: goalTypeReducer.initialState,
  projectGoals: projectGoalReducers.initialState,
  orgProjects: orgProjectReducers.initialState,
  fieldNoteRisk: fieldNoteRiskReducers.initialState,
  fieldNoteRisks: fieldNoteRisksReducers.initialState,
  editableOrganisation: editableOrganisationReducer.initialState,
  editableUser: editableUserReducer.initialState,
  fieldNoteImage: fieldNoteImageReducers.initialState,
  fieldNoteFirebase: fieldNoteFirebaseReducers.initialState,
  projectReducers: projectReducers.initialState,
  activeOrganisationReducers: activeOrganisationReducers.initialState,
  organisationGoalReducers: organisationGoalReducers.initialState,
  organisationAdminReducers: organisationAdminReducers.initialState,
  allProjectGoalsReducers: allProjectGoalsReducers.initialState,
  activeFieldNoteProjectReducers: activeFieldNoteProjectReducers.initialState,

  fieldNoteStaff: fieldNoteStaffReducers.initialState,
  fieldNoteStaffList: fieldNoteStaffListReducers.initialState,

  fieldNoteVolunteer: fieldNoteVolunteerReducers.initialState,
  fieldNoteVolunteerList: fieldNoteVolunteerListReducers.initialState,


  fieldNoteGoal: fieldNoteGoalReducers.initialState,
  fieldNoteGoalList: fieldNoteGoalListReducers.initialState,

  fieldAdditionalNote: fieldNoteGoalReducers.initialState,
  fieldAdditionalNoteList: fieldAdditionalNoteListReducers.initialState,

  fieldNote: fieldNoteReducers.initialState,
  fieldNoteListReducers: fieldNoteListReducers.initialState,
};

// export type RootState = ReturnType<typeof rootReducer>
export type Store = typeof rootState;
export type RootState = CombinedState<Store>;
