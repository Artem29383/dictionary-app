import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from 'components/Input/Input';
import ButtonRipple from 'components/ButtonRipple';
import useSelector from 'hooks/useSelector';
import * as yup from 'yup';
import { getErrorSelector } from 'models/user/selectors';
import useAction from 'hooks/useAction';
import { loginUserFailure } from 'models/user/reducer';
import routes from 'constants/routes';
import { LOGIN_USER } from 'models/user/action';
import S from './AuthPage.styled';

const AuthPage = () => {
  const loginSchema = yup.object().shape({
    login: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль'),
  });
  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onChange',
    validationSchema: loginSchema,
  });
  const setError = useAction(loginUserFailure);
  const error = useSelector(getErrorSelector);
  const watchLogin = watch('login');
  const watchPassword = watch('password');
  const login = useAction(LOGIN_USER);
  const authHandler = data => {
    login(data);
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
          errors={errors.login}
        />
      </S.WrapInput>
      <S.WrapInput>
        <Input
          label="Пароль"
          name="password"
          type="password"
          register={register({ required: true })}
          errors={errors.password}
        />
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
