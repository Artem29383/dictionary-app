import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import authReducer from 'models/user/reducer';
import dictionaryReducer from 'models/dictionary/reducer';
import testReducer from 'models/test/reducer';
import { rootSaga } from './rootSaga';

export const history = createBrowserHistory();
const saga = createSagaMiddleware();
const isDev = process.env.NODE_ENV === 'development';

const reducer = combineReducers({
  auth: authReducer,
  dictionary: dictionaryReducer,
  test: testReducer,
  router: connectRouter(history),
});

const store = configureStore({
  reducer,
  middleware: [saga, routerMiddleware(history)],
  devTools: isDev,
});
saga.run(rootSaga);

export default store;
