import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

const testsDataReducer = createSlice({
  name: 'tests',
  initialState: {
    tests: {
      entities: {},
      ids: [],
    },
    isLoading: false,
  },
  reducers: {
    setTests(state, { payload }) {
      state.tests.entities = payload.entities.data;
      state.tests.ids = payload.result;
    },
    setLoad(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export default testsDataReducer.reducer;
// eslint-disable-next-line no-empty-pattern
export const { setTests, setLoad } = testsDataReducer.actions;
