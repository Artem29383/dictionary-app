import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

const userReducer = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    user: [],
    msgError: '',
    msgSuccess: '',
  },
  reducers: {
    logoutUser(state) {
      state.isAuth = false;
      state.user = [];
    },
    loginUserFailure(state, { payload }) {
      state.msgError = payload;
    },
    loginUserSuccess(state, { payload }) {
      Object.assign(state, payload);
    },
    registerUserSuccess(state, { payload }) {
      state.msgSuccess = payload;
    },
  },
});

export default userReducer.reducer;
export const {
  logoutUser,
  loginUserFailure,
  loginUserSuccess,
  registerUserSuccess,
} = userReducer.actions;

//
// export default createReducer(initialState, {
//   [LOGIN_USER_SUCCESS]: (state, { payload }) => {
//     Object.assign(state, payload);
//   },
//
//   [LOGOUT_USER]: state => {
//     state.isAuth = false;
//     state.user = [];
//   },
//
//   [LOGIN_USER_FAILURE]: (state, { payload }) => {
//     state.msgError = payload;
//   },
// });
