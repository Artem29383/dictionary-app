import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

const dictionaryReducer = createSlice({
  name: 'dictionary',
  initialState: {
    dictionary: {
      entities: [],
      ids: [],
    },
    isLoading: false,
    msg: '',
    wordsForTest: [],
  },
  reducers: {
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    setDictionary(state, { payload }) {
      state.dictionary = payload;
    },
    addNewWord(state, { payload }) {
      state.dictionary = {
        entities: { ...state.dictionary.entities, [payload.id]: payload },
        ids: [...state.dictionary.ids, payload.id],
      };
    },
    setMsg(state, { payload }) {
      state.msg = payload;
    },
    updateField(state, { payload }) {
      state.dictionary = payload;
    },
    fillArrayForTest(state, { payload }) {
      state.wordsForTest = payload;
    },
  },
});

export default dictionaryReducer.reducer;
export const {
  setLoading,
  setDictionary,
  addNewWord,
  setMsg,
  updateField,
  fillArrayForTest,
} = dictionaryReducer.actions;
