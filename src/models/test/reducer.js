import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

const testReducer = createSlice({
  name: 'test',
  initialState: {
    questions: {
      entities: {},
      ids: [],
    },
  },
  reducers: {
    setQuestName(state, { payload }) {
      state.questions.entities[payload.id].questName = payload.questionName;
    },
    pushAnswer(state, { payload }) {
      const { id, qId, answer } = payload;
      state.questions.entities[id].answer = {
        entities: {
          ...state.questions.entities[id].answer.entities,
          [qId]: answer,
        },
        ids: [...state.questions.entities[id].answer.ids, qId],
      };
    },
    pushQuestion(state, { payload }) {
      const { id, answer, questName } = payload;
      state.questions.entities[id] = { id, answer, questName };
      state.questions.ids.push(id);
    },
    toggleChecked(state, { payload }) {
      const { id, radioId, checkedId } = payload;
      state.questions.entities[id].answer.entities[radioId].isChecked = true;
      if (checkedId) {
        state.questions.entities[id].answer.entities[
          checkedId
        ].isChecked = false;
      }
    },
    removeTrash(state, { payload }) {
      state.questions.entities[payload].answer.entities = {};
      state.questions.entities[payload].answer.ids = [];
    },
    updateFieldAnswer(state, { payload }) {
      const { id, obj } = payload;
      state.questions.entities[id].answer.entities[obj.id] = obj;
    },
  },
});

export default testReducer.reducer;
export const {
  setQuestName,
  pushAnswer,
  toggleChecked,
  removeTrash,
  pushQuestion,
  updateFieldAnswer,
} = testReducer.actions;
