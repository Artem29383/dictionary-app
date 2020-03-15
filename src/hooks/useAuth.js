import { useEffect } from 'react';
import { getAuth, getUserSelector } from 'models/user/selectors';
import useSelector from 'hooks/useSelector';
import useAction from 'hooks/useAction';
import { loginUserSuccess } from 'models/user/reducer';

const useAuth = () => {
  const isAuth = useSelector(getAuth);
  const user = useSelector(getUserSelector);
  const login = useAction(loginUserSuccess);
  useEffect(() => {
    if (isAuth) {
      login({ isAuth, user });
    }
  }, [isAuth]);
  return { isAuth, user };
};

export default useAuth;
