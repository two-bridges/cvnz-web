

import { applyMiddleware, createStore, compose, Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, rootReducer, rootState } from '../reducers/rootReducer';
import { useDispatch } from 'react-redux';

// const middleware = [...getDefaultMiddleware<RootState>({ thunk: { extraArgument: null }, immutableCheck: true, serializableCheck: true })]

// https://redux-toolkit.js.org/api/configureStore
export const store = configureStore({
  reducer: rootReducer,
  // DG: reverts to getDefaultMiddelware(): https://redux-toolkit.js.org/api/getDefaultMiddleware.  Is this enough?
  // attempted workarounds to middleware issues: https://github.com/reduxjs/redux-toolkit/issues/552
  middleware: [thunkMiddleware] as const,
  devTools: true,
});
export type AppDispatch = typeof store.dispatch;
