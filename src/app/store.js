import { configureStore } from '@reduxjs/toolkit';
import placeReducer from '../reducer/placeSlice';
import reduxPromise from 'redux-promise';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import rootSaga from './rootSaga';
import rootEpic from './rootEpic';

// Create middlewares
const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    place: placeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }) // Keep thunk for Redux Toolkit asyncThunk
      .concat(reduxPromise)               // Redux Promise
      .concat(sagaMiddleware)             // Redux Saga
      .concat(epicMiddleware),            // Redux Observable
});

// Run saga and epic middleware
sagaMiddleware.run(rootSaga);
epicMiddleware.run(rootEpic);