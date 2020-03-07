import { all } from '@redux-saga/core/effects';
import rootSagaAuth from 'models/user/saga';
import rootSagaDictionary from 'models/dictionary/saga';

export function* rootSaga() {
  yield all([rootSagaAuth(), rootSagaDictionary()]);
}
