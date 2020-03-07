import { ADD_WORD, GET_DICTIONARY } from 'models/dictionary/action';
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { addWord, getDictionary } from 'api/api';
import { normalize, schema } from 'normalizr';
import {
  addNewWord,
  setDictionary,
  setLoading,
  setMsg,
} from 'models/dictionary/reducer';
import { denormalized } from 'utils/denormalized';

function* getDict(action) {
  try {
    const { data } = yield call(getDictionary, action.payload);
    const dictionarySchema = new schema.Entity('dictionary');
    const dictionary = [dictionarySchema];
    const dataNormalized = normalize(data[0].words, dictionary);
    yield put({
      type: setDictionary,
      payload: {
        entities: dataNormalized.entities.dictionary,
        ids: dataNormalized.result,
      },
    });
    yield put({
      type: setLoading,
      payload: false,
    });
  } catch (e) {
    console.log(e);
  }
}

function* addWordToDict(action) {
  try {
    const { id, login, data, entities, ids } = action.payload;
    let { words } = yield call(denormalized, entities, ids);
    yield (words = [...words, data]);
    yield call(addWord, { id, login, words });
    yield put({
      type: addNewWord,
      payload: data,
    });
    yield put({
      type: setMsg,
      payload: 'Слово добавлено',
    });
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSagaDictionary() {
  yield takeEvery(GET_DICTIONARY, getDict);
  yield takeEvery(ADD_WORD, addWordToDict);
}
