import { createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash.memoize';

const getQuestions = state => state.test.questions.entities;

const getQuestionsIds = state => state.test.questions.ids;

export const getQuestionsSelector = createSelector(
  getQuestions,
  entities => entities
);

export const getQuestionsIdsSelector = createSelector(
  getQuestionsIds,
  ids => ids
);

export const getQuestSelector = createSelector(
  [getQuestionsSelector, getQuestionsIdsSelector],
  entities => {
    return memoize(dinamId => {
      // eslint-disable-next-line array-callback-return,consistent-return
      return entities[dinamId];
    });
  }
);
