import routes from 'constants/routes';
import AuthPage from 'pages/AuthPage';
import RegisterPage from 'pages/RegisterPage';
import DictionaryPage from 'pages/DictionaryPage';
import ControlWordsPage from 'pages/ControlWordsPage';

export default [
  {
    path: routes.auth,
    exact: true,
    component: AuthPage,
    isAuth: false,
  },
  {
    path: routes.register,
    exact: true,
    component: RegisterPage,
    isAuth: false,
  },
  {
    path: routes.dictionary,
    exact: true,
    component: DictionaryPage,
    isAuth: true,
    isAdmin: false,
  },
  {
    path: routes.edit,
    exact: true,
    component: DictionaryPage,
    isAuth: true,
    isAdmin: true,
  },
  {
    path: routes.controlWordsPage,
    exact: true,
    isAuth: true,
    component: ControlWordsPage,
  },
];
