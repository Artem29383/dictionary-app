import { createSelector } from '@reduxjs/toolkit';

const getError = state => state.auth.msgError;

export const getErrorSelector = createSelector(getError, msgError => msgError);

export const getAuth = state => state.auth.isAuth;

export const getUser = state => state.auth.user;

export const getSuccessMsg = state => state.auth.msgSuccess;
