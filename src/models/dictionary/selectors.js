import { createSelector } from '@reduxjs/toolkit';
import memoize from 'lodash.memoize';

const getLoading = state => state.dictionary.isLoading;

const getWords = state => state.dictionary.dictionary.entities;

const getIds = state => state.dictionary.dictionary.ids;

export const getLoadingSelector = createSelector(
  getLoading,
  isLoading => isLoading
);

export const getFilteredWords = createSelector(
  [getWords, getIds],
  (entities, ids) => {
    return memoize(search => {
      return ids.filter(id =>
        entities[id].word.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
);

const getMsg = state => state.dictionary.msg;

export const getMsgSelector = createSelector(getMsg, msg => msg);

export const getWordsSelector = createSelector(getWords, entities => entities);

export const getIdsSelector = createSelector(getIds, ids => ids);
