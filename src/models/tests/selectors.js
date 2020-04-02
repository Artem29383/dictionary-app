import { createSelector } from '@reduxjs/toolkit';

const getIsLoad = state => {
  return state.dataTests.isLoading;
};

const getTests = state => {
  return state.dataTests.tests.entities;
};

const getTestsIds = state => {
  return state.dataTests.tests.ids;
};

export const getTestsSelector = createSelector(
  [getTests],
  entities => entities
);

export const getTestsIdsSelector = createSelector([getTestsIds], ids => ids);

export const getIsLoadSelector = createSelector(
  [getIsLoad],
  isLoading => isLoading
);
