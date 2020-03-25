// eslint-disable-next-line no-unused-vars
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { DEPLOY_TEST } from 'models/test/action';
import { deployingTest } from 'api/api';
import { push } from 'connected-react-router';

function* deployTest(action) {
  try {
    const { payload } = action;
    yield call(deployingTest, payload);
    yield put(push('/dictionary'));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSagaTest() {
  yield takeEvery(DEPLOY_TEST, deployTest);
}
