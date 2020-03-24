import {
  ADD_WORD,
  GET_DICTIONARY,
  REMOVE_WORD,
  UPDATE_FIELD_WORD,
} from 'models/dictionary/action';
import { takeEvery, call, put } from '@redux-saga/core/effects';
import { addWord, getDictionary } from 'api/api';
import {
  addNewWord,
  setDictionary,
  setLoading,
  setMsg,
  updateField,
} from 'models/dictionary/reducer';
import { denormalized } from 'utils/denormalized';
import { normalized } from 'utils/normalized';
import { removePropFromObject } from 'utils/removePropFromObject';
import { removeArrayElement } from 'utils/removeArrayElement';

function* getDict(action) {
  try {
    const { data } = yield call(getDictionary, action.payload);
    const dataNormalized = normalized(data[0].words);
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

function* updateFieldWord(action) {
  try {
    const { userId, login, value, field, ids, editId } = action.payload;
    let { entities } = action.payload;
    entities = {
      ...entities,
      [editId]: { ...entities[editId], [field]: value },
    };
    const { words } = yield call(denormalized, entities, ids);
    yield call(addWord, { id: userId, login, words });
    yield put({
      type: updateField,
      payload: {
        entities,
        ids,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

function* deleteWord(action) {
  try {
    const { userId, login, id } = action.payload;
    let { entities, ids } = action.payload;
    entities = removePropFromObject(entities, id);
    ids = removeArrayElement(ids, id);
    const { words } = yield call(denormalized, entities, ids);
    yield call(addWord, { id: userId, login, words });
    yield put({
      type: updateField,
      payload: {
        entities,
        ids,
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

export default function* rootSagaDictionary() {
  yield takeEvery(GET_DICTIONARY, getDict);
  yield takeEvery(ADD_WORD, addWordToDict);
  yield takeEvery(UPDATE_FIELD_WORD, updateFieldWord);
  yield takeEvery(REMOVE_WORD, deleteWord);
}
