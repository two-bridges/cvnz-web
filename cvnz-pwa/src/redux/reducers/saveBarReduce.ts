
import { createReducer } from "@reduxjs/toolkit";
import * as _ from "underscore";
import * as saveBarActions from '../actions/saveBarActions';


export const initialState = {
  visible: false,
  counter: 0
};

export const reducer = createReducer(initialState, builder =>
  builder
    // #### fetchProjects ####
    .addCase(saveBarActions.setVisible.fulfilled, (state, action) => {
      let newState = {
        ...state,
        visible: action.payload,
        counter: 0
      };
      // console.log(`newState: ${JSON.stringify(newState, null, 2)}`);
      return newState;
    })
    .addCase(saveBarActions.incrementCounter.fulfilled, (state, action) => {
      let newState = {
        ...state,
        counter: action.payload
      };
      // console.log(`newState: ${JSON.stringify(newState, null, 2)}`);
      return newState;
    })
);
