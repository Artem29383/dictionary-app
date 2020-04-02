import { all } from '@redux-saga/core/effects';
import rootSagaAuth from 'models/user/saga';
import rootSagaDictionary from 'models/dictionary/saga';
import rootSagaTest from 'models/test/saga';
import rootSagaTests from 'models/tests/saga';
import rootSagaPassTest from 'models/passTest/saga';

export function* rootSaga() {
  yield all([
    rootSagaAuth(),
    rootSagaDictionary(),
    rootSagaTest(),
    rootSagaTests(),
    rootSagaPassTest(),
  ]);
}
