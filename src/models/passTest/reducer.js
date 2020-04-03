import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
/*
questions: {
      entities: [],
      ids: [],
    },
    Изначальные данные взятые с сервера
    currentQuestForPassing: {
      entities: {},
      ids: [],
      questId: null,
      correctAnswer: [],
      userAnswer: [],
    }
    Данные ткущего вопроса, на котороый в данный момент отвечает пользователь
    allCorrectUserAnswQuest: {
      entities: {},
      ids: [],
    }
    База ответов пользователя на отвеченные им вопросы
 */
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
    setDefaultAnswersRadio(state, { payload }) {
      state.currentQuestForPassing.entities[payload].isChecked = false;
    },
    setDefaultAnswerNumeric(state, { payload }) {
      state.currentQuestForPassing.entities[payload].value = '0';
    },
    setDefaultAnswersCheckBox(state, { payload }) {
      payload.forEach(p => {
        state.currentQuestForPassing.entities[p].isChecked = false;
      });
    },
    toggleChecked(state, { payload }) {
      const { radioId, checkedId } = payload;
      state.currentQuestForPassing.entities[radioId].isChecked = true;
      state.currentQuestForPassing.userAnswer = [radioId];
      if (checkedId) {
        state.currentQuestForPassing.entities[checkedId].isChecked = false;
      }
    },
    setNumericAnswer(state, { payload }) {
      const { taskId, value } = payload;
      state.currentQuestForPassing.entities[taskId].value = value;
      state.currentQuestForPassing.userAnswer = [value, taskId];
    },
    setErrorMessage(state, { payload }) {
      state.errorMessage = payload;
    },
    pushAnswer(state, { payload }) {
      const { questId, userQuestAnswer, type } = payload;
      state.allCorrectUserAnswQuest.entities[questId] = userQuestAnswer;
      state.allCorrectUserAnswQuest.entities[questId].type = type;
      if (!state.allCorrectUserAnswQuest.ids.includes(questId)) {
        state.allCorrectUserAnswQuest.ids.push(questId);
      }
      state.currentQuestForPassing.userAnswer = [];
    },
    setUserTouchedAnswer(state, { payload }) {
      const { answers } = payload;
      answers.forEach(ans => {
        state.currentQuestForPassing.entities[ans].isChecked = true;
        state.currentQuestForPassing.userAnswer.push(ans);
      });
    },
    setUserTouchedNumAnswer(state, { payload }) {
      const { taskId, answers } = payload;
      // eslint-disable-next-line prefer-destructuring
      state.currentQuestForPassing.entities[taskId].value = answers[0];
    },
    toggleCheckBox(state, { payload }) {
      state.currentQuestForPassing.entities[payload].isChecked = !state
        .currentQuestForPassing.entities[payload].isChecked;
      const index = state.currentQuestForPassing.userAnswer.indexOf(payload);
      if (index !== -1) {
        state.currentQuestForPassing.userAnswer.splice(index, 1);
      } else {
        state.currentQuestForPassing.userAnswer.push(payload);
      }
    },
  },
});

export default passTestReducer.reducer;
export const {
  setLoading,
  setLoadDataTest,
  setDataCurrentQuest,
  setDefaultAnswersRadio,
  toggleChecked,
  setErrorMessage,
  pushAnswer,
  removeTrash,
  setUserTouchedAnswer,
  setNumericAnswer,
  setDefaultAnswerNumeric,
  setUserTouchedNumAnswer,
  setDefaultAnswersCheckBox,
  toggleCheckBox,
} = passTestReducer.actions;
