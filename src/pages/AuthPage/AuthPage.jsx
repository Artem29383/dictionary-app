import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Input from 'components/Input/Input';
import ButtonRipple from 'components/ButtonRipple';
import useSelector from 'hooks/useSelector';
import { getErrorSelector } from 'models/user/selectors';
import useAction from 'hooks/useAction';
import { loginUserFailure } from 'models/user/reducer';
import routes from 'constants/routes';
import S from './AuthPage.styled';

const AuthPage = ({ logIn }) => {
  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onChange',
  });
  const setError = useAction(loginUserFailure);
  const error = useSelector(getErrorSelector);
  const watchLogin = watch('login');
  const watchPassword = watch('password');
  const authHandler = data => {
    logIn(data);
  };

  useEffect(() => {
    if (error.trim()) {
      setError('');
    }
  }, [watchLogin, watchPassword]);

  return (
    <S.AuthForm onSubmit={handleSubmit(authHandler)}>
      <S.WrapInput>
        <Input
          label="Логин"
          name="login"
          register={register({ required: true })}
        />
        {errors.login && <S.Error>Поле обязательно к заполнению</S.Error>}
      </S.WrapInput>
      <S.WrapInput>
        <Input
          label="Пароль"
          name="password"
          type="password"
          register={register({ required: true })}
        />
        {errors.password && <S.Error>Поле обязательно к заполнению</S.Error>}
      </S.WrapInput>
      <S.WrapInput className="margin10">
        <ButtonRipple className="center">Авторизация</ButtonRipple>
        <S.Error>{error}</S.Error>
        <S.SignUp to={routes.register} className="center">
          Регистрация
        </S.SignUp>
      </S.WrapInput>
    </S.AuthForm>
  );
};

export default AuthPage;

AuthPage.propTypes = {
  logIn: PropTypes.func.isRequired,
};
