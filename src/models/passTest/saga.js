// eslint-disable-next-line no-unused-vars
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { GET_TEST_DATA } from 'models/passTest/actions';
import { getTestForPassingTest } from 'api/api';
import { setLoadDataTest, setLoading } from 'models/passTest/reducer';

function* fetchPassingTest(action) {
  try {
    const { data } = yield call(getTestForPassingTest, action.payload);
    yield put({
      type: setLoadDataTest,
      payload: data,
    });
    yield put({
      type: setLoading,
      payload: false,
    });
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSagaPassTest() {
  yield takeEvery(GET_TEST_DATA, fetchPassingTest);
}
