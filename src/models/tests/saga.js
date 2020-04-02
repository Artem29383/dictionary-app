import { takeEvery, call, put } from '@redux-saga/core/effects';
import { GET_ALL_TESTS } from 'models/tests/actions';
import { getDataAllTests } from 'api/api';
import { normalized } from 'utils/normalized';
import { setLoad, setTests } from 'models/tests/reducer';

function* getAllTests() {
  try {
    const { data } = yield call(getDataAllTests);
    const dataNormalized = normalized(data, 'data');
    yield put({
      type: setTests,
      payload: dataNormalized,
    });
    yield put({
      type: setLoad,
      payload: false,
    });
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSagaTests() {
  yield takeEvery(GET_ALL_TESTS, getAllTests);
}
