import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

const passTestReducer = createSlice({
  name: 'passingTest',
  initialState: {
    id: null,
    questions: {
      entities: [],
      ids: [],
    },
    testName: null,
    isLoading: true,
    currentQuestForPassing: {
      entities: {},
      ids: [],
      questId: null,
      correctAnswer: [],
      userAnswer: [],
    },
    allCorrectUserAnswQuest: {
      entities: {},
      ids: [],
    },
    errorMessage: '',
  },
  reducers: {
    removeTrash(state) {
      state.id = null;
      state.questions = {
        entities: {},
        ids: [],
      };
      state.testName = null;
      state.isLoading = true;
      state.currentQuestForPassing = {
        entities: {},
        ids: [],
        questId: null,
        correctAnswer: {},
        userAnswer: [],
      };
      state.allCorrectUserAnswQuest = {
        entities: {},
        ids: [],
      };
      state.errorMessage = '';
    },
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    setLoadDataTest(state, { payload }) {
      const { id, testName, questions } = payload;
      state.id = id;
      state.questions = questions;
      state.testName = testName;
    },
    setDataCurrentQuest(state, { payload }) {
      Object.assign(state.currentQuestForPassing, payload);
    },
    setDefaultAnswers(state, { payload }) {
      state.currentQuestForPassing.entities[payload].isChecked = false;
    },
    toggleChecked(state, { payload }) {
      const { radioId, checkedId } = payload;
      state.currentQuestForPassing.entities[radioId].isChecked = true;
      state.currentQuestForPassing.userAnswer = [radioId];
      if (checkedId) {
        state.currentQuestForPassing.entities[checkedId].isChecked = false;
      }
    },
    setErrorMessage(state, { payload }) {
      state.errorMessage = payload;
    },
    pushAnswer(state, { payload }) {
      const { questId, userQuestAnswer } = payload;
      state.allCorrectUserAnswQuest.entities[questId] = userQuestAnswer;
      if (!state.allCorrectUserAnswQuest.ids.includes(questId)) {
        state.allCorrectUserAnswQuest.ids.push(questId);
      }
      state.currentQuestForPassing.userAnswer = [];
    },
    setUserTouchedAnswer(state, { payload }) {
      const { answers } = payload;
      console.log(answers);
      answers.forEach(ans => {
        state.currentQuestForPassing.entities[ans].isChecked = true;
      });
    },
  },
});

export default passTestReducer.reducer;
export const {
  setLoading,
  setLoadDataTest,
  setDataCurrentQuest,
  setDefaultAnswers,
  toggleChecked,
  setErrorMessage,
  pushAnswer,
  removeTrash,
  setUserTouchedAnswer,
} = passTestReducer.actions;
