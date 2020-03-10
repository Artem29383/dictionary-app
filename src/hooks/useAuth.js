import { useState, useEffect, useCallback } from 'react';
import { getAuth } from 'models/user/selectors';
import { LOGIN_USER } from 'models/user/action';
import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';
import { logoutUser } from 'models/user/reducer';
import { setDictionary } from 'models/dictionary/reducer';

const useAuth = () => {
  const isAuth = useSelector(getAuth);
  const resetDictionary = useAction(setDictionary);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('user')) || { isAuth: false, user: null }
  );
  const logout = useAction(logoutUser);
  const signIn = useAction(LOGIN_USER);

  const loginClick = useCallback(({ login, password }) => {
    signIn({ login, password });
  }, []);

  const logoutClick = useCallback(() => {
    setData({ isAuth: false, user: null });
    localStorage.removeItem('user');
    resetDictionary({
      entities: [],
      ids: [],
    });
    logout();
  }, []);

  useEffect(() => {
    if (isAuth) {
      setData(JSON.parse(localStorage.getItem('user')));
    }
  }, [isAuth, logoutClick]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      setData(JSON.parse(localStorage.getItem('user')));
    }
  }, []);
  return { data, logoutClick, loginClick };
};

export default useAuth;
