import { call, takeEvery, put } from 'redux-saga/effects';
import { auth, register } from 'api/api';
import {
  loginUserFailure,
  loginUserSuccess,
  registerUserSuccess,
} from 'models/user/reducer';
import { LOGIN_USER, REGISTER_USER } from 'models/user/action';

function* signIn(action) {
  try {
    const { login, password } = action.payload;
    const { data } = yield call(auth);
    // eslint-disable-next-line array-callback-return,consistent-return
    const user = data.filter(u => {
      if (u.login === login) {
        if (u.password === password) {
          return u;
        }
      }
    });
    const isAuth = !!user.length;
    if (!isAuth) throw new Error('Неверные данные для входа...');
    localStorage.setItem('user', JSON.stringify({ isAuth, user }));
    yield put({
      type: loginUserSuccess,
      payload: { user, isAuth },
    });
  } catch (e) {
    yield put({
      type: loginUserFailure,
      payload: e.message,
    });
  }
}

function* signUp(action) {
  try {
    const { data } = yield call(auth);

    // eslint-disable-next-line array-callback-return,consistent-return
    const user = data.filter(u => {
      if (u.login === action.payload.login) {
        return u;
      }
    });

    if (user.length) throw new Error('Такой пользователь уже существует...');
    yield call(register, action.payload);
    yield put({
      type: registerUserSuccess,
      payload: 'Аккаунт создан',
    });
  } catch (e) {
    yield put({
      type: loginUserFailure,
      payload: e.message,
    });
  }
}

export default function* rootSagaAuth() {
  yield takeEvery(LOGIN_USER, signIn);
  yield takeEvery(REGISTER_USER, signUp);
}
